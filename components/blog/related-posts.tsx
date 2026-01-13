import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getAllPosts, getPostBySlug, prioritizePostsByLocale } from '@/lib/mdx'
import { TagList } from '@/components/blog/tag-list'
import { detectUserLocale } from '@/lib/locale'
import { cn } from '@/lib/utils'

type RelatedPostsProps = {
  currentSlug: string
  maxPosts?: number
}

export async function RelatedPosts({ currentSlug, maxPosts = 3 }: RelatedPostsProps) {
  const currentPost = getPostBySlug(currentSlug)
  if (!currentPost) return null

  const preferredLocale = await detectUserLocale()
  const allPosts = getAllPosts()
  
  // Find related posts by matching tags
  const relatedPostsWithTags = allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const commonTags = post.tags.filter((tag) => currentPost.tags.includes(tag))
      return { post, commonTags: commonTags.length }
    })
    .filter(({ commonTags }) => commonTags > 0)
    .sort((a, b) => b.commonTags - a.commonTags)
    .map(({ post }) => post)

  // Prioritize by locale
  const prioritizedRelated = prioritizePostsByLocale(relatedPostsWithTags, preferredLocale)
  
  // Take top posts after prioritization
  let relatedPosts = prioritizedRelated.slice(0, maxPosts)

  // If not enough related posts by tags, fill with recent posts (also prioritized)
  if (relatedPosts.length < maxPosts) {
    const recentPosts = allPosts
      .filter((post) => post.slug !== currentSlug && !relatedPosts.find((rp) => rp.slug === post.slug))
    const prioritizedRecent = prioritizePostsByLocale(recentPosts, preferredLocale)
    relatedPosts.push(...prioritizedRecent.slice(0, maxPosts - relatedPosts.length))
  }

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <section className="mt-16 pt-12 border-t border-glass-border">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={cn(
              'group glass-card p-6',
              'transition-all duration-300 hover:scale-[1.02]',
              'hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
              'animate-slide-up'
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="space-y-3">
              <TagList tags={post.tags.slice(0, 2)} />
              <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors duration-200">
                {post.title}
              </h3>
              <p className="text-sm text-foreground/70 line-clamp-2">{post.description}</p>
              <div className="flex items-center gap-2 text-accent font-medium text-sm pt-2">
                Read more
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

