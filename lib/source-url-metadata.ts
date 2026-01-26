/**
 * Source URL Metadata Utilities
 * 
 * Provides functions to fetch and process metadata (titles) from source URLs
 * in blog posts, supporting both YouTube videos and regular web pages.
 */

export type SourceUrlMetadata = {
  url: string
  title: string
  type: 'youtube' | 'web' | 'unknown'
  fetchedAt: number // timestamp
}

/**
 * Validates URL format using native URL constructor
 * @param url - URL string to validate
 * @returns true if valid URL, false otherwise
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Detects URL type (YouTube, web, or unknown)
 * @param url - URL to check
 * @returns URL type
 */
export function detectUrlType(url: string): 'youtube' | 'web' | 'unknown' {
  if (!isValidUrl(url)) {
    return 'unknown'
  }

  try {
    const urlObj = new URL(url)
    const hostname = urlObj.hostname.toLowerCase()

    // Check for YouTube domains
    if (
      hostname === 'youtube.com' ||
      hostname === 'www.youtube.com' ||
      hostname === 'youtu.be' ||
      hostname === 'm.youtube.com' ||
      hostname === 'youtube-nocookie.com'
    ) {
      return 'youtube'
    }

    // Check for YouTube paths even if domain is different (rare but possible)
    if (urlObj.pathname.includes('/watch') || urlObj.pathname.includes('/embed')) {
      const searchParams = urlObj.searchParams
      if (searchParams.has('v')) {
        return 'youtube'
      }
    }

    // Default to web for valid URLs
    return 'web'
  } catch {
    return 'unknown'
  }
}

/**
 * Normalizes YouTube URLs to standard youtube.com/watch format
 * Handles various YouTube URL formats:
 * - youtu.be/VIDEO_ID
 * - youtube.com/watch?v=VIDEO_ID
 * - youtube.com/embed/VIDEO_ID
 * - youtube.com/v/VIDEO_ID
 * 
 * @param url - YouTube URL in any format
 * @returns Normalized YouTube URL or null if not a YouTube URL
 */
export function normalizeYouTubeUrl(url: string): string | null {
  if (!isValidUrl(url)) {
    return null
  }

  try {
    const urlObj = new URL(url)
    const hostname = urlObj.hostname.toLowerCase()

    // Handle youtu.be short URLs
    if (hostname === 'youtu.be') {
      const videoId = urlObj.pathname.slice(1) // Remove leading slash
      if (videoId) {
        // Preserve timestamp if present
        const timestamp = urlObj.searchParams.get('t')
        const normalized = `https://www.youtube.com/watch?v=${videoId}`
        return timestamp ? `${normalized}&t=${timestamp}` : normalized
      }
      return null
    }

    // Handle youtube.com/watch URLs
    if (hostname.includes('youtube.com') && urlObj.pathname === '/watch') {
      const videoId = urlObj.searchParams.get('v')
      if (videoId) {
        // Reconstruct URL with video ID and preserve other params (like t= for timestamp)
        const params = new URLSearchParams()
        params.set('v', videoId)
        
        // Preserve timestamp if present
        const timestamp = urlObj.searchParams.get('t')
        if (timestamp) {
          params.set('t', timestamp)
        }
        
        // Preserve other query parameters
        urlObj.searchParams.forEach((value, key) => {
          if (key !== 'v' && key !== 't') {
            params.set(key, value)
          }
        })
        
        return `https://www.youtube.com/watch?${params.toString()}`
      }
      return null
    }

    // Handle youtube.com/embed URLs
    if (hostname.includes('youtube.com') && urlObj.pathname.startsWith('/embed/')) {
      const videoId = urlObj.pathname.split('/embed/')[1]?.split('?')[0]
      if (videoId) {
        // Preserve timestamp if present
        const timestamp = urlObj.searchParams.get('t')
        const normalized = `https://www.youtube.com/watch?v=${videoId}`
        return timestamp ? `${normalized}&t=${timestamp}` : normalized
      }
      return null
    }

    // Handle youtube.com/v/ URLs (legacy format)
    if (hostname.includes('youtube.com') && urlObj.pathname.startsWith('/v/')) {
      const videoId = urlObj.pathname.split('/v/')[1]?.split('?')[0]
      if (videoId) {
        return `https://www.youtube.com/watch?v=${videoId}`
      }
      return null
    }

    // Not a YouTube URL
    return null
  } catch {
    return null
  }
}

/**
 * Fetches YouTube video metadata using oEmbed API
 * @param url - Normalized YouTube URL
 * @returns Promise<SourceUrlMetadata | null>
 */
async function fetchYouTubeMetadata(url: string): Promise<SourceUrlMetadata | null> {
  const normalizedUrl = normalizeYouTubeUrl(url)
  if (!normalizedUrl) {
    return null
  }

  try {
    const oEmbedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(normalizedUrl)}&format=json`
    
    // Create AbortController for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    const response = await fetch(oEmbedUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; PersonalWebsiteBot/1.0)',
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    
    if (data.title && typeof data.title === 'string') {
      return {
        url: normalizedUrl,
        title: data.title,
        type: 'youtube',
        fetchedAt: Date.now(),
      }
    }

    return null
  } catch (error) {
    // Silently fail - return null instead of throwing
    return null
  }
}

/**
 * Fetches web page title by scraping HTML
 * @param url - Web page URL
 * @returns Promise<SourceUrlMetadata | null>
 */
async function fetchWebPageMetadata(url: string): Promise<SourceUrlMetadata | null> {
  if (!isValidUrl(url)) {
    return null
  }

  try {
    // Create AbortController for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    let response: Response | null = null
    let finalUrl = url
    let redirectCount = 0
    const maxRedirects = 3

    // Follow redirects (up to maxRedirects)
    while (redirectCount < maxRedirects) {
      response = await fetch(finalUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; PersonalWebsiteBot/1.0)',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        redirect: 'manual', // Handle redirects manually
      })

      clearTimeout(timeoutId)

      // Check for redirect
      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get('location')
        if (location) {
          // Handle relative redirects
          try {
            finalUrl = new URL(location, finalUrl).toString()
            redirectCount++
            continue
          } catch {
            break
          }
        } else {
          break
        }
      } else if (response.ok) {
        break
      } else {
        return null
      }
    }

    if (!response || !response.ok) {
      return null
    }

    const html = await response.text()
    
    // Extract title from <title> tag
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    if (titleMatch && titleMatch[1]) {
      const title = titleMatch[1].trim()
      if (title) {
        return {
          url: finalUrl,
          title: title,
          type: 'web',
          fetchedAt: Date.now(),
        }
      }
    }

    // Fallback to Open Graph og:title
    const ogTitleMatch = html.match(/property=["']og:title["']\s+content=["']([^"']+)["']/i)
    if (ogTitleMatch && ogTitleMatch[1]) {
      const title = ogTitleMatch[1].trim()
      if (title) {
        return {
          url: finalUrl,
          title: title,
          type: 'web',
          fetchedAt: Date.now(),
        }
      }
    }

    return null
  } catch (error) {
    // Silently fail - return null instead of throwing
    return null
  }
}

/**
 * Fetches metadata (title) from a URL (YouTube or web page)
 * Tries YouTube oEmbed API first, then falls back to web scraping
 * 
 * @param url - The URL to fetch metadata from
 * @returns Promise<SourceUrlMetadata | null>
 */
export async function fetchUrlMetadata(url: string): Promise<SourceUrlMetadata | null> {
  if (!isValidUrl(url)) {
    return null
  }

  const urlType = detectUrlType(url)

  // Try YouTube oEmbed API first
  if (urlType === 'youtube') {
    const metadata = await fetchYouTubeMetadata(url)
    if (metadata) {
      return metadata
    }
    // Fallback to web scraping if oEmbed fails
    return await fetchWebPageMetadata(url)
  }

  // For web pages, use web scraping
  if (urlType === 'web') {
    return await fetchWebPageMetadata(url)
  }

  // Unknown URL type
  return null
}

/**
 * In-memory cache for build-time scripts
 * Key: normalized URL, Value: SourceUrlMetadata
 */
const buildTimeCache = new Map<string, SourceUrlMetadata>()

/**
 * Gets cached metadata from in-memory cache (for build-time scripts)
 * @param url - URL to check in cache
 * @returns Cached metadata or null
 */
export function getCachedMetadata(url: string): SourceUrlMetadata | null {
  const normalizedUrl = normalizeYouTubeUrl(url) || url
  return buildTimeCache.get(normalizedUrl) || null
}

/**
 * Sets metadata in in-memory cache (for build-time scripts)
 * @param metadata - Metadata to cache
 */
export function setCachedMetadata(metadata: SourceUrlMetadata): void {
  buildTimeCache.set(metadata.url, metadata)
}

/**
 * Clears in-memory cache (for build-time scripts)
 */
export function clearCache(): void {
  buildTimeCache.clear()
}

/**
 * Gets all cached metadata (for build-time scripts - resume capability)
 * @returns Map of URL to metadata
 */
export function getAllCachedMetadata(): Map<string, SourceUrlMetadata> {
  return new Map(buildTimeCache)
}

/**
 * Loads metadata into cache from a Map (for build-time scripts - resume capability)
 * @param metadataMap - Map of URL to metadata to load
 */
export function loadCacheFromMap(metadataMap: Map<string, SourceUrlMetadata>): void {
  metadataMap.forEach((metadata, url) => {
    buildTimeCache.set(url, metadata)
  })
}
