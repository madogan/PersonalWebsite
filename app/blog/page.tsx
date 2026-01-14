import { getAllPosts, prioritizePostsByLocale } from '@/lib/mdx'
import { BlogListClient } from '@/components/blog/blog-list-client'
import { BackButton } from '@/components/blog/back-button'
import { detectUserLocale } from '@/lib/locale'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Read my latest blog posts about web development, programming, and more.',
}

export default async function BlogPage() {
  const allPosts = getAllPosts()
  const preferredLocale = await detectUserLocale()
  const posts = prioritizePostsByLocale(allPosts, preferredLocale)

  return (
    <>
      <BackButton />
      <div className="container mx-auto px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl">
              Blog
            </h1>
            <p className="mx-auto max-w-2xl font-sans text-lg text-foreground/80">
              Thoughts and insights about reliability, performance,
              observability and AI.
            </p>
            <div className="pencil-divider mx-auto mt-6 max-w-md" />
          </div>

          {/* Blog List with Search */}
          <BlogListClient posts={posts} />
        </div>
      </div>
    </>
  )
}
