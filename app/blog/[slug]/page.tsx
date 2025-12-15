import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import { TagList } from '@/components/blog/tag-list'
import { ShareButton } from '@/components/blog/share-button'
import { RelatedPosts } from '@/components/blog/related-posts'
import { JsonLd } from '@/components/blog/json-ld'
import { Calendar, Clock } from 'lucide-react'
import { MDXContent } from '@/components/blog/mdx-content'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/constants'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const url = `${siteConfig.url}/blog/${params.slug}`

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: siteConfig.name,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const url = `${siteConfig.url}/blog/${params.slug}`

  return (
    <>
      <JsonLd slug={params.slug} />
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
        {/* Post Header */}
        <header className="mb-8 md:mb-12">
          <TagList tags={post.tags} className="mb-4" />
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {post.title}
          </h1>

          <p className="text-xl md:text-2xl text-foreground/80 mb-6">
            {post.description}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-foreground/60 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>

          {/* Share Button */}
          <div className="mb-8">
            <ShareButton url={url} title={post.title} />
          </div>

          {/* Divider */}
          <hr className="border-t border-glass-border" />
        </header>

        {/* Post Content */}
        <div
          className={cn(
            'prose prose-lg max-w-none',
            'prose-headings:text-foreground',
            'prose-p:text-foreground/90',
            'prose-a:text-accent prose-a:no-underline hover:prose-a:underline',
            'prose-strong:text-foreground',
            'prose-code:text-foreground prose-code:bg-foreground/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded',
            'prose-pre:bg-foreground/5 prose-pre:border prose-pre:border-glass-border',
            'prose-blockquote:border-accent prose-blockquote:bg-accent/5',
            'prose-img:rounded-lg',
            'dark:prose-invert'
          )}
        >
          <MDXContent content={post.content} />
        </div>

        {/* Related Posts */}
        <RelatedPosts currentSlug={params.slug} />
        </div>
      </article>
    </>
  )
}

