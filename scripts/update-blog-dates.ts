import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/blog')

// Start from today (most recent post gets today's date)
const startDate = new Date()

function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function subtractDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() - days)
  return result
}

interface BlogPostFile {
  fileName: string
  fullPath: string
  createdTime: Date
}

// Get all blog post files with their stats
const fileNames = fs.readdirSync(postsDirectory)
const posts: BlogPostFile[] = fileNames
  .filter((name) => name.endsWith('.mdx'))
  .map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName)
    const stats = fs.statSync(fullPath)
    // Use birthtime (creation time) if available, otherwise use mtime (modification time)
    const createdTime =
      stats.birthtime.getTime() > 0 ? stats.birthtime : stats.mtime

    return {
      fileName,
      fullPath,
      createdTime,
    }
  })

// Sort by creation time (newest first)
posts.sort((a, b) => b.createdTime.getTime() - a.createdTime.getTime())

console.log(`Found ${posts.length} blog posts`)
console.log(
  `\nUpdating dates starting from ${formatDate(startDate)} going backwards...\n`
)

// Update each post
posts.forEach((post, index) => {
  const targetDate = subtractDays(startDate, index)
  const newDate = formatDate(targetDate)

  // Read file
  const fileContents = fs.readFileSync(post.fullPath, 'utf8')
  const parsed = matter(fileContents)

  // Get old date
  const oldDate = (parsed.data.date as string) || 'N/A'

  // Update date
  parsed.data.date = newDate

  // Write back
  const updatedContent = matter.stringify(parsed.content, parsed.data)
  fs.writeFileSync(post.fullPath, updatedContent, 'utf8')

  console.log(`${index + 1}. ${post.fileName}`)
  console.log(`   Old date: ${oldDate} → New date: ${newDate}`)
})

console.log(`\n✅ Successfully updated ${posts.length} blog posts!`)
console.log(
  `\nDate range: ${formatDate(subtractDays(startDate, posts.length - 1))} to ${formatDate(startDate)}`
)
