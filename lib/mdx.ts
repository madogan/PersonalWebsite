import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  readingTime: number
  content: string
  locale: 'en' | 'tr' // Post language (defaults to 'en' for backward compatibility)
  alternateLocale?: 'en' | 'tr' // Alternate language version (optional)
  alternateSlug?: string // Slug of alternate language post (optional)
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const readingTimeResult = readingTime(content)

      return {
        slug,
        title: data.title || '',
        description: data.description || '',
        date: data.date || '',
        tags: data.tags || [],
        readingTime: Math.ceil(readingTimeResult.minutes),
        content,
        locale: (data.locale === 'tr' ? 'tr' : 'en') as 'en' | 'tr', // Default to 'en' for backward compatibility
        alternateLocale:
          data.alternateLocale === 'tr' || data.alternateLocale === 'en'
            ? data.alternateLocale
            : undefined,
        alternateSlug: data.alternateSlug || undefined,
      } as BlogPost
    })

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const readingTimeResult = readingTime(content)

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      tags: data.tags || [],
      readingTime: Math.ceil(readingTimeResult.minutes),
      content,
      locale: (data.locale === 'tr' ? 'tr' : 'en') as 'en' | 'tr', // Default to 'en' for backward compatibility
      alternateLocale:
        data.alternateLocale === 'tr' || data.alternateLocale === 'en'
          ? data.alternateLocale
          : undefined,
      alternateSlug: data.alternateSlug || undefined,
    } as BlogPost
  } catch (error) {
    return null
  }
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tagsSet = new Set<string>()

  posts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag))
  })

  return Array.from(tagsSet).sort()
}

export function getPostsByLocale(locale: 'en' | 'tr'): BlogPost[] {
  const posts = getAllPosts()
  return posts.filter((post) => post.locale === locale)
}

/**
 * Prioritizes posts by user's preferred locale.
 * For bilingual posts linked via alternateSlug, shows preferred locale version first.
 * Maintains date sorting as secondary sort (newest first).
 */
export function prioritizePostsByLocale(
  posts: BlogPost[],
  preferredLocale: 'en' | 'tr'
): BlogPost[] {
  // Create a map to group posts by their alternateSlug relationships
  // Key: slug or alternateSlug, Value: array of posts in the group
  const postMap = new Map<string, BlogPost>()
  const groups = new Map<string, BlogPost[]>()

  // First pass: index all posts by slug
  posts.forEach((post) => {
    postMap.set(post.slug, post)
  })

  // Second pass: group posts that are linked via alternateSlug
  posts.forEach((post) => {
    if (post.alternateSlug && postMap.has(post.alternateSlug)) {
      // Both posts exist - create a group
      const groupKey = [post.slug, post.alternateSlug].sort().join('|')
      if (!groups.has(groupKey)) {
        groups.set(groupKey, [])
      }
      const group = groups.get(groupKey)!
      if (!group.find((p) => p.slug === post.slug)) {
        group.push(post)
      }
      const alternatePost = postMap.get(post.alternateSlug)!
      if (!group.find((p) => p.slug === alternatePost.slug)) {
        group.push(alternatePost)
      }
    }
  })

  // Create a set of posts that are in groups
  const groupedPostSlugs = new Set<string>()
  groups.forEach((group) => {
    group.forEach((post) => {
      groupedPostSlugs.add(post.slug)
    })
  })

  // Separate grouped and ungrouped posts
  const groupedPosts: BlogPost[] = []
  const ungroupedPosts: BlogPost[] = []

  posts.forEach((post) => {
    if (groupedPostSlugs.has(post.slug)) {
      groupedPosts.push(post)
    } else {
      ungroupedPosts.push(post)
    }
  })

  // Process groups: prioritize preferred locale
  const prioritizedGroups: BlogPost[] = []
  groups.forEach((group) => {
    // Sort group: preferred locale first, then by date (newest first)
    const sortedGroup = [...group].sort((a, b) => {
      // If one matches preferred locale, it comes first
      if (a.locale === preferredLocale && b.locale !== preferredLocale) {
        return -1
      }
      if (a.locale !== preferredLocale && b.locale === preferredLocale) {
        return 1
      }
      // Both same locale preference, sort by date (newest first)
      if (a.date < b.date) {
        return 1
      }
      if (a.date > b.date) {
        return -1
      }
      return 0
    })

    // Add the first post (preferred locale if available) to prioritized list
    prioritizedGroups.push(sortedGroup[0])
  })

  // Combine prioritized groups with ungrouped posts
  const allPrioritized = [...prioritizedGroups, ...ungroupedPosts]

  // Final sort: maintain date sorting (newest first) as secondary sort
  return allPrioritized.sort((a, b) => {
    // First, prioritize preferred locale (but only if not already grouped)
    const aInGroup = groupedPostSlugs.has(a.slug)
    const bInGroup = groupedPostSlugs.has(b.slug)

    // If one is in a group and already prioritized, keep it
    // Otherwise, prefer posts matching preferred locale
    if (!aInGroup && !bInGroup) {
      if (a.locale === preferredLocale && b.locale !== preferredLocale) {
        return -1
      }
      if (a.locale !== preferredLocale && b.locale === preferredLocale) {
        return 1
      }
    }

    // Sort by date (newest first)
    if (a.date < b.date) {
      return 1
    }
    if (a.date > b.date) {
      return -1
    }
    return 0
  })
}
