import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import type { BlogPost } from '@/lib/mdx'

export type BlogGroup = {
  /** Canonical slug used for edit URL and list primary identity (en slug if present, else tr slug). */
  primarySlug: string
  /** English version, if it exists. */
  en?: BlogPost
  /** Turkish version, if it exists. */
  tr?: BlogPost
}

/**
 * Builds blog groups from all posts. Pairs are formed only when both posts exist
 * and link to each other (reciprocal alternateSlug). Otherwise posts appear as solo groups.
 * Each pair is keyed once by sorted [slug, alternateSlug].join('|').
 * primarySlug = en post's slug if en exists, else tr post's slug.
 */
export function getBlogGroups(): BlogGroup[] {
  const posts = getAllPosts()
  const bySlug = new Map<string, BlogPost>()
  posts.forEach((p) => bySlug.set(p.slug, p))

  const pairKeys = new Set<string>()
  const groups: BlogGroup[] = []

  for (const post of posts) {
    const otherSlug = post.alternateSlug
    if (!otherSlug) {
      groups.push({
        primarySlug: post.slug,
        ...(post.locale === 'en' ? { en: post } : { tr: post }),
      })
      continue
    }
    const other = bySlug.get(otherSlug)
    const reciprocal = other?.alternateSlug === post.slug
    if (!other || !reciprocal) {
      groups.push({
        primarySlug: post.slug,
        ...(post.locale === 'en' ? { en: post } : { tr: post }),
      })
      continue
    }
    const key = [post.slug, otherSlug].sort().join('|')
    if (pairKeys.has(key)) continue
    pairKeys.add(key)
    const enPost = post.locale === 'en' ? post : other
    const trPost = post.locale === 'tr' ? post : other
    groups.push({
      primarySlug: enPost.slug,
      en: enPost,
      tr: trPost,
    })
  }

  groups.sort((a, b) => {
    const dateA = a.en?.date ?? a.tr?.date ?? ''
    const dateB = b.en?.date ?? b.tr?.date ?? ''
    if (dateA < dateB) return 1
    if (dateA > dateB) return -1
    return 0
  })

  return groups
}

/**
 * Returns the blog group for the given primary slug, or null if not found.
 * Loads the post for primarySlug and, if it has alternateSlug, the other post too.
 */
export function getBlogGroupByPrimarySlug(primarySlug: string): BlogGroup | null {
  const post = getPostBySlug(primarySlug)
  if (!post) return null
  const otherSlug = post.alternateSlug
  if (!otherSlug) {
    return {
      primarySlug: post.slug,
      ...(post.locale === 'en' ? { en: post } : { tr: post }),
    }
  }
  const other = getPostBySlug(otherSlug)
  if (!other || other.alternateSlug !== post.slug) {
    return {
      primarySlug: post.slug,
      ...(post.locale === 'en' ? { en: post } : { tr: post }),
    }
  }
  const enPost = post.locale === 'en' ? post : other
  const trPost = post.locale === 'tr' ? post : other
  return {
    primarySlug: enPost.slug,
    en: enPost,
    tr: trPost,
  }
}
