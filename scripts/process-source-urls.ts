import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {
  fetchUrlMetadata,
  getCachedMetadata,
  setCachedMetadata,
  getAllCachedMetadata,
  loadCacheFromMap,
  normalizeYouTubeUrl,
} from '../lib/source-url-metadata'
import { extractSourceUrls, processSourceUrls } from '../lib/source-url-processor'
import type { SourceUrlMetadata } from '../lib/source-url-metadata'

const postsDirectory = path.join(process.cwd(), 'content/blog')
const cacheDirectory = path.join(process.cwd(), 'cache')
const cacheFile = path.join(cacheDirectory, 'source-url-metadata.json')

// Parse command line arguments
const args = process.argv.slice(2)
const isDryRun = args.includes('--dry-run')
const shouldResume = args.includes('--resume')

// Batch processing configuration
const BATCH_SIZE = 5
const BATCH_DELAY_MS = 200

interface BlogPostFile {
  fileName: string
  fullPath: string
}

/**
 * Loads cached metadata from file (for resume capability)
 */
function loadCacheFromFile(): Map<string, SourceUrlMetadata> {
  if (!shouldResume || !fs.existsSync(cacheFile)) {
    return new Map()
  }

  try {
    const cacheContent = fs.readFileSync(cacheFile, 'utf8')
    const cacheData = JSON.parse(cacheContent) as Record<
      string,
      SourceUrlMetadata
    >
    const cacheMap = new Map<string, SourceUrlMetadata>()
    Object.entries(cacheData).forEach(([url, metadata]) => {
      cacheMap.set(url, metadata)
    })
    console.log(`📦 Loaded ${cacheMap.size} cached metadata entries`)
    return cacheMap
  } catch (error) {
    console.error('⚠️  Failed to load cache file, starting fresh')
    return new Map()
  }
}

/**
 * Saves metadata cache to file
 */
function saveCacheToFile(metadataMap: Map<string, SourceUrlMetadata>): void {
  if (!fs.existsSync(cacheDirectory)) {
    fs.mkdirSync(cacheDirectory, { recursive: true })
  }

  const cacheData: Record<string, SourceUrlMetadata> = {}
  metadataMap.forEach((metadata, url) => {
    cacheData[url] = metadata
  })

  fs.writeFileSync(cacheFile, JSON.stringify(cacheData, null, 2), 'utf8')
  console.log(`💾 Saved ${metadataMap.size} metadata entries to cache`)
}

/**
 * Delays execution for specified milliseconds
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Processes URLs in batches with rate limiting
 */
async function fetchMetadataBatch(
  urls: string[],
  metadataMap: Map<string, SourceUrlMetadata>
): Promise<void> {
  const totalUrls = urls.length
  let processed = 0

  // Load cache into memory
  loadCacheFromMap(metadataMap)

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE)
    processed += batch.length

    console.log(
      `📡 Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(totalUrls / BATCH_SIZE)} (${processed}/${totalUrls} URLs)...`
    )

    // Process batch in parallel
    const results = await Promise.allSettled(
      batch.map(async (url) => {
        // Check cache first
        const normalizedUrl = normalizeYouTubeUrl(url) || url
        const cached = getCachedMetadata(normalizedUrl)
        if (cached) {
          return { url: normalizedUrl, metadata: cached, fromCache: true }
        }

        // Fetch metadata
        const metadata = await fetchUrlMetadata(url)
        if (metadata) {
          setCachedMetadata(metadata)
          return { url: normalizedUrl, metadata, fromCache: false }
        }

        return { url: normalizedUrl, metadata: null, fromCache: false }
      })
    )

    // Process results
    results.forEach((result, index) => {
      const url = batch[index]
      if (result.status === 'fulfilled') {
        const { metadata, fromCache } = result.value
        if (metadata) {
          metadataMap.set(metadata.url, metadata)
          if (fromCache) {
            console.log(`  ✓ ${url} (from cache)`)
          } else {
            console.log(`  ✓ ${url} → ${metadata.title}`)
          }
        } else {
          console.error(`  ✗ ${url} → Failed to fetch metadata`)
        }
      } else {
        console.error(`  ✗ ${url} → Error: ${result.reason}`)
      }
    })

    // Delay between batches (except for the last batch)
    if (i + BATCH_SIZE < urls.length) {
      await delay(BATCH_DELAY_MS)
    }
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting source URL processing...\n')

  if (isDryRun) {
    console.log('🔍 DRY RUN MODE - No files will be modified\n')
  }

  // Load existing cache if resuming
  const existingCache = loadCacheFromFile()
  const metadataMap = new Map<string, SourceUrlMetadata>(existingCache)

  // Get all blog post files
  if (!fs.existsSync(postsDirectory)) {
    console.error(`❌ Blog directory not found: ${postsDirectory}`)
    process.exit(1)
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const posts: BlogPostFile[] = fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => ({
      fileName,
      fullPath: path.join(postsDirectory, fileName),
    }))

  console.log(`📚 Found ${posts.length} blog posts\n`)

  // Step 1: Extract all source URLs from all posts
  console.log('📋 Step 1: Extracting source URLs from all posts...')
  const allUrls = new Set<string>()

  posts.forEach((post) => {
    const fileContents = fs.readFileSync(post.fullPath, 'utf8')
    const parsed = matter(fileContents)
    const matches = extractSourceUrls(parsed.content)

    matches.forEach((match) => {
      if (match.isGeneric) {
        allUrls.add(match.url)
      }
    })
  })

  const uniqueUrls = Array.from(allUrls)
  console.log(`   Found ${uniqueUrls.length} unique source URLs to process\n`)

  if (uniqueUrls.length === 0) {
    console.log('✅ No source URLs to process. Exiting.')
    return
  }

  // Step 2: Fetch metadata for all unique URLs
  console.log('📡 Step 2: Fetching metadata for source URLs...\n')
  await fetchMetadataBatch(uniqueUrls, metadataMap)

  // Save cache
  saveCacheToFile(metadataMap)

  console.log(`\n✅ Fetched metadata for ${metadataMap.size} URLs\n`)

  // Step 3: Process each blog post
  console.log('✏️  Step 3: Processing blog posts...\n')

  let updatedCount = 0
  let skippedCount = 0

  posts.forEach((post, index) => {
    const fileContents = fs.readFileSync(post.fullPath, 'utf8')
    const parsed = matter(fileContents)

    // Process content
    const processedContent = processSourceUrls(parsed.content, metadataMap)

    // Check if content changed
    if (processedContent !== parsed.content) {
      if (!isDryRun) {
        // Write updated content back
        const updatedFile = matter.stringify(processedContent, parsed.data)
        fs.writeFileSync(post.fullPath, updatedFile, 'utf8')
      }

      updatedCount++
      console.log(`${index + 1}. ✓ ${post.fileName} (updated)`)
    } else {
      skippedCount++
      console.log(`${index + 1}. - ${post.fileName} (no changes)`)
    }
  })

  console.log(`\n✅ Processing complete!`)
  console.log(`   Updated: ${updatedCount} posts`)
  console.log(`   Skipped: ${skippedCount} posts`)

  if (isDryRun) {
    console.log(`\n💡 Run without --dry-run to apply changes`)
  }
}

// Run main function
main().catch((error) => {
  console.error('❌ Fatal error:', error)
  process.exit(1)
})
