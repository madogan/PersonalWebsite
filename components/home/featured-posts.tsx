import Link from 'next/link'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { getAllPosts } from '@/lib/mdx'
import { cn } from '@/lib/utils'
import { GlassyButton } from '@/components/ui/glassy-button'

export function FeaturedPosts() {
  const allPosts = getAllPosts()
  const featuredPosts = allPosts.slice(0, 2) // Get latest 2 posts

  if (featuredPosts.length === 0) {
    return null
  }

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="mb-3 text-3xl font-bold md:text-4xl">
                Latest Blog Posts
              </h2>
              <p className="text-foreground/60">
                Recent thoughts and tutorials
              </p>
            </div>
            <div className="hidden md:block">
              <GlassyButton href="/blog" variant="subtle" size="sm">
                View All
              </GlassyButton>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {featuredPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={cn(
                  'loose-leaf-card paper-texture group p-6 md:p-8',
                  'transition-all duration-300',
                  'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
                  'animate-slide-up'
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          'rounded-md px-2 py-1 text-xs font-medium',
                          'bg-accent/10 text-accent',
                          'border border-accent/20' /* Use clean border with subtle accent */
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground transition-colors duration-200 group-hover:text-accent md:text-2xl">
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="line-clamp-2 text-foreground/70">
                    {post.description}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-sm text-foreground/60">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      <span>{post.readingTime} min read</span>
                    </div>
                  </div>

                  {/* Read More Indicator */}
                  <div className="flex items-center gap-2 pt-2 text-sm font-medium text-accent">
                    Read more
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile View All Link */}
          <div className="mt-8 text-center md:hidden">
            <GlassyButton href="/blog" size="md">
              View All Posts
            </GlassyButton>
          </div>
        </div>
      </div>
    </section>
  )
}
