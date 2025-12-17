import { getAllPosts, getAllTags } from '@/lib/mdx'
import { BlogListClient } from '@/components/blog/blog-list-client'
import { BackButton } from '@/components/blog/back-button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my latest blog posts about web development, programming, and more.',
}

export default function BlogPage() {
  const posts = getAllPosts()
  const allTags = getAllTags()

  return (
    <>
      <BackButton />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about web development and programming.
          </p>
        </div>

        {/* Blog List with Search and Filters */}
        <BlogListClient posts={posts} allTags={allTags} />
      </div>
    </div>
    </>
  )
}

