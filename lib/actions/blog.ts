'use server'

import { getPostBySlug, getAllPosts, writeBlogPost, deleteBlogPost } from '@/lib/mdx'
import type { BlogPostPayload } from '@/lib/mdx'
import { getBlogGroupByPrimarySlug } from '@/lib/blog-groups'
import { blogPostPayloadSchema, slugSchema } from '@/lib/schemas/blog'

export type CreateBlogResult = { success: true; slug: string } | { success: false; error: string }
export type UpdateBlogResult = { success: true; slug: string } | { success: false; error: string }
export type UpdateBlogGroupResult = { success: true; slug: string } | { success: false; error: string }
export type DeleteBlogResult = { success: true } | { success: false; error: string }

export type BlogGroupFormPayload = {
  en?: unknown
  tr?: unknown
}

export async function createBlogPostAction(
  input: unknown
): Promise<CreateBlogResult> {
  try {
    const parsed = blogPostPayloadSchema.safeParse(input)
    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join('; ')
      return { success: false, error: message }
    }
    const payload = parsed.data
    const existing = getPostBySlug(payload.slug)
    if (existing) {
      return { success: false, error: 'A post with this slug already exists' }
    }
    await writeBlogPost(payload as BlogPostPayload)
    return { success: true, slug: payload.slug }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create post'
    return { success: false, error: message }
  }
}

export async function updateBlogPostAction(
  oldSlug: string,
  input: unknown
): Promise<UpdateBlogResult> {
  try {
    const slugParsed = slugSchema.safeParse(oldSlug)
    if (!slugParsed.success) {
      return { success: false, error: 'Invalid slug' }
    }
    const parsed = blogPostPayloadSchema.safeParse(input)
    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join('; ')
      return { success: false, error: message }
    }
    const payload = parsed.data
    const existing = getPostBySlug(oldSlug)
    if (!existing) {
      return { success: false, error: 'Post not found' }
    }
    if (payload.slug !== oldSlug) {
      const conflict = getPostBySlug(payload.slug)
      if (conflict) {
        return { success: false, error: 'A post with the new slug already exists' }
      }
      await writeBlogPost(payload as BlogPostPayload)
      await deleteBlogPost(oldSlug)
    } else {
      await writeBlogPost(payload as BlogPostPayload)
    }
    return { success: true, slug: payload.slug }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update post'
    return { success: false, error: message }
  }
}

export async function deleteBlogPostAction(slug: string): Promise<DeleteBlogResult> {
  try {
    const slugParsed = slugSchema.safeParse(slug)
    if (!slugParsed.success) {
      return { success: false, error: 'Invalid slug' }
    }
    await deleteBlogPost(slug)
    return { success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to delete post'
    return { success: false, error: message }
  }
}

export async function getBlogPostsForAdmin() {
  return getAllPosts()
}

export async function updateBlogGroupAction(
  primarySlug: string,
  payload: BlogGroupFormPayload
): Promise<UpdateBlogGroupResult> {
  try {
    const slugParsed = slugSchema.safeParse(primarySlug)
    if (!slugParsed.success) {
      return { success: false, error: 'Invalid slug' }
    }
    const group = getBlogGroupByPrimarySlug(primarySlug)
    if (!group) {
      return { success: false, error: 'Group not found' }
    }

    const hasEnPayload = payload.en !== undefined && payload.en !== null
    const hasTrPayload = payload.tr !== undefined && payload.tr !== null
    const removeEn = payload.en === null
    const removeTr = payload.tr === null

    let enData: { slug: string; title: string; description: string; date: string; tags: string[]; locale: 'en'; alternateLocale?: 'tr'; alternateSlug?: string; content: string } | null = null
    let trData: { slug: string; title: string; description: string; date: string; tags: string[]; locale: 'tr'; alternateLocale?: 'en'; alternateSlug?: string; content: string } | null = null

    if (hasEnPayload) {
      const parsed = blogPostPayloadSchema.safeParse(payload.en)
      if (!parsed.success) {
        const message = parsed.error.errors.map((e) => e.message).join('; ')
        return { success: false, error: `EN: ${message}` }
      }
      const p = parsed.data
      if (p.locale !== 'en') return { success: false, error: 'EN payload must have locale en' }
      enData = {
        slug: p.slug,
        title: p.title,
        description: p.description,
        date: p.date,
        tags: p.tags,
        locale: 'en',
        content: p.content,
      }
    }
    if (hasTrPayload) {
      const parsed = blogPostPayloadSchema.safeParse(payload.tr)
      if (!parsed.success) {
        const message = parsed.error.errors.map((e) => e.message).join('; ')
        return { success: false, error: `TR: ${message}` }
      }
      const p = parsed.data
      if (p.locale !== 'tr') return { success: false, error: 'TR payload must have locale tr' }
      trData = {
        slug: p.slug,
        title: p.title,
        description: p.description,
        date: p.date,
        tags: p.tags,
        locale: 'tr',
        content: p.content,
      }
    }

    if (removeEn && group.en) {
      await deleteBlogPost(group.en.slug)
      if (group.tr) {
        const trPayload: BlogPostPayload = {
          slug: group.tr.slug,
          title: group.tr.title,
          description: group.tr.description,
          date: group.tr.date,
          tags: group.tr.tags,
          locale: 'tr',
          content: group.tr.content,
        }
        await writeBlogPost(trPayload)
      }
    }
    if (removeTr && group.tr) {
      await deleteBlogPost(group.tr.slug)
      if (group.en) {
        const enPayload: BlogPostPayload = {
          slug: group.en.slug,
          title: group.en.title,
          description: group.en.description,
          date: group.en.date,
          tags: group.en.tags,
          locale: 'en',
          content: group.en.content,
        }
        await writeBlogPost(enPayload)
      }
    }

    if (enData) {
      const trSlug = trData?.slug ?? (removeTr ? undefined : group.tr?.slug)
      const payloadEn = {
        slug: enData.slug,
        title: enData.title,
        description: enData.description,
        date: enData.date,
        tags: enData.tags,
        locale: 'en' as const,
        content: enData.content,
        ...(trSlug && { alternateLocale: 'tr' as const, alternateSlug: trSlug }),
      } as BlogPostPayload
      if (group.en && payloadEn.slug !== group.en.slug) {
        const conflict = getPostBySlug(payloadEn.slug)
        if (conflict) return { success: false, error: 'A post with the new EN slug already exists' }
        await writeBlogPost(payloadEn)
        await deleteBlogPost(group.en.slug)
      } else {
        await writeBlogPost(payloadEn)
      }
    }
    if (trData) {
      const enSlug = enData?.slug ?? (removeEn ? undefined : group.en?.slug)
      const payloadTr = {
        slug: trData.slug,
        title: trData.title,
        description: trData.description,
        date: trData.date,
        tags: trData.tags,
        locale: 'tr' as const,
        content: trData.content,
        ...(enSlug && { alternateLocale: 'en' as const, alternateSlug: enSlug }),
      } as BlogPostPayload
      if (group.tr && payloadTr.slug !== group.tr.slug) {
        const conflict = getPostBySlug(payloadTr.slug)
        if (conflict) return { success: false, error: 'A post with the new TR slug already exists' }
        await writeBlogPost(payloadTr)
        await deleteBlogPost(group.tr.slug)
      } else {
        await writeBlogPost(payloadTr)
      }
    }

    const newPrimarySlug = enData?.slug ?? trData?.slug ?? group.en?.slug ?? group.tr?.slug ?? primarySlug
    return { success: true, slug: newPrimarySlug }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update group'
    return { success: false, error: message }
  }
}

export async function deleteBlogGroupAction(primarySlug: string): Promise<DeleteBlogResult> {
  try {
    const slugParsed = slugSchema.safeParse(primarySlug)
    if (!slugParsed.success) {
      return { success: false, error: 'Invalid slug' }
    }
    const group = getBlogGroupByPrimarySlug(primarySlug)
    if (!group) {
      return { success: false, error: 'Group not found' }
    }
    if (group.en) {
      try {
        await deleteBlogPost(group.en.slug)
      } catch {
        // file may already be missing
      }
    }
    if (group.tr) {
      try {
        await deleteBlogPost(group.tr.slug)
      } catch {
        // file may already be missing
      }
    }
    return { success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to delete group'
    return { success: false, error: message }
  }
}
