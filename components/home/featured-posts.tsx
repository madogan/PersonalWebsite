import Link from 'next/link'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { getAllPosts } from '@/lib/mdx'
import { cn } from '@/lib/utils'

export function FeaturedPosts() {
  const allPosts = getAllPosts()
  const featuredPosts = allPosts.slice(0, 2) // Get latest 2 posts

  if (featuredPosts.length === 0) {
    return null
  }

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Latest Blog Posts</h2>
              <p className="text-foreground/60">Recent thoughts and tutorials</p>
            </div>
            <Link
              href="/blog"
              className={cn(
                'hidden md:flex items-center gap-2 text-accent font-medium',
                'hover:text-accent-cyan transition-colors duration-200',
                'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-md'
              )}
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {featuredPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={cn(
                  'group glass-card p-6 md:p-8',
                  'transition-all duration-300 hover:scale-[1.02]',
                  'hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
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
                          'px-2 py-1 text-xs font-medium rounded-md',
                          'bg-accent/10 text-accent',
                          'border border-accent/20'
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-200">
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="text-foreground/70 line-clamp-2">{post.description}</p>

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
                  <div className="flex items-center gap-2 text-accent font-medium text-sm pt-2">
                    Read more
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile View All Link */}
          <div className="mt-8 md:hidden text-center">
            <Link
              href="/blog"
              className={cn(
                'inline-flex items-center gap-2 px-6 py-3',
                'bg-accent text-white rounded-lg font-medium',
                'transition-all duration-200 hover:bg-accent/90',
                'hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
                'shadow-lg hover:shadow-xl'
              )}
            >
              View All Posts
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

