'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { TagList } from '@/components/blog/tag-list'
import { SearchBar } from '@/components/blog/search-bar'
import { LocaleFilter } from '@/components/blog/locale-filter'
import { Pagination } from '@/components/blog/pagination'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { BlogPost } from '@/lib/mdx'

type BlogListClientProps = {
  posts: BlogPost[]
  postsPerPage?: number
}

const DEFAULT_POSTS_PER_PAGE = 9

export function BlogListClient({ posts: allPosts, postsPerPage = DEFAULT_POSTS_PER_PAGE }: BlogListClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [localeFilter, setLocaleFilter] = useState<'all' | 'en' | 'tr'>('all')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredPosts = useMemo(() => {
    let filtered = allPosts

    // Filter by locale
    if (localeFilter !== 'all') {
      filtered = filtered.filter((post) => post.locale === localeFilter)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    return filtered
  }, [allPosts, searchQuery, localeFilter])

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const posts = filteredPosts.slice(startIndex, endIndex)

  // Reset to page 1 when search or locale filter changes, or adjust if current page is out of bounds
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }
  }, [searchQuery, localeFilter, currentPage, totalPages])

  return (
    <>
      {/* Search and Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <LocaleFilter value={localeFilter} onChange={setLocaleFilter} />
      </div>

      {/* Blog Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={cn(
                'group loose-leaf-card p-6 md:p-8 paper-texture',
                'transition-all duration-300',
                'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
                'animate-slide-up'
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-4 relative">
                {/* Locale Badge */}
                <div className="absolute top-0 right-0">
                  <span
                    className={cn(
                      'px-2 py-1 text-xs font-medium rounded-md',
                      'bg-foreground/10 text-foreground/60',
                      'border border-foreground/20'
                    )}
                  >
                    {post.locale.toUpperCase()}
                  </span>
                </div>

                {/* Tags */}
                <TagList tags={post.tags.slice(0, 2)} />

                {/* Title */}
                <h2 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-200">
                  {post.title}
                </h2>

                {/* Description */}
                <p className="text-foreground/70 line-clamp-3">{post.description}</p>

                {/* Metadata */}
                <div className="flex items-center gap-4 text-sm text-foreground/60 pt-2">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>{post.readingTime} min</span>
                  </div>
                </div>

                {/* Read More */}
                <div className="flex items-center gap-2 text-accent font-medium text-sm pt-2">
                  Read more
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-foreground/60">
            {searchQuery || localeFilter !== 'all'
              ? 'No posts match your filters. Try adjusting your search query or language filter.'
              : 'No blog posts yet. Check back soon!'}
          </p>
        </div>
      )}

      {/* Pagination */}
      {posts.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  )
}

