import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import { TagList } from '@/components/blog/tag-list'
import { ShareButton } from '@/components/blog/share-button'
import { LanguageSwitcher } from '@/components/blog/language-switcher'
import { RelatedPosts } from '@/components/blog/related-posts'
import { JsonLd } from '@/components/blog/json-ld'
import { BackButton } from '@/components/blog/back-button'
import { Calendar, Clock } from 'lucide-react'
import { MDXContent } from '@/components/blog/mdx-content'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/constants'
import { detectUserLocale } from '@/lib/locale'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const url = `${siteConfig.url}/blog/${slug}`

  // Build alternates for hreflang (only if bilingual post)
  const alternates: Metadata['alternates'] = {}
  if (post.alternateLocale && post.alternateSlug) {
    alternates.languages = {
      [post.locale]: `${siteConfig.url}/blog/${slug}`,
      [post.alternateLocale]: `${siteConfig.url}/blog/${post.alternateSlug}`,
    }
  }

  return {
    title: post.title,
    description: post.description,
    alternates,
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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const url = `${siteConfig.url}/blog/${slug}`
  const preferredLocale = await detectUserLocale()

  // Translation map for reading time
  const readingTimeText = {
    en: 'min read',
    tr: 'dakika okuma',
  }

  return (
    <>
      <JsonLd slug={slug} />
      <BackButton />
      <article 
        lang={post.locale === 'tr' ? 'tr' : 'en'}
        className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-12 md:pb-20"
      >
        <div className="max-w-4xl mx-auto">
        {/* Post Header */}
        <header className="mb-8 md:mb-12">
          <TagList tags={post.tags} className="mb-4" />
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
            {post.title}
          </h1>

          <p className="text-xl md:text-2xl text-foreground/80 mb-6 font-sans">
            {post.description}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-foreground/60 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString(
                  post.locale === 'tr' ? 'tr-TR' : 'en-US',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                )}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{post.readingTime} {readingTimeText[post.locale]}</span>
            </div>
            <ShareButton url={url} title={post.title} />
            <LanguageSwitcher
              currentLocale={post.locale}
              alternateLocale={post.alternateLocale}
              alternateSlug={post.alternateSlug}
              preferredLocale={preferredLocale}
            />
          </div>

          {/* Divider */}
          <hr className="pencil-divider" />
        </header>

        {/* Post Content */}
        <div
          className={cn(
            'prose prose-lg max-w-none paper-texture',
            'text-justify md:text-left',
            'prose-headings:text-foreground prose-headings:text-left prose-headings:font-serif',
            'prose-p:text-foreground/90 prose-p:text-justify md:prose-p:text-left prose-p:font-sans',
            'prose-a:text-accent prose-a:no-underline hover:prose-a:underline',
            'prose-strong:text-foreground',
            'prose-code:text-foreground prose-code:bg-foreground/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-mono',
            'prose-pre:bg-foreground/5 prose-pre:border prose-pre:border-notebook-divider',
            'prose-blockquote:border-accent prose-blockquote:bg-accent/5',
            'prose-img:rounded-lg',
            'prose-hr:border-notebook-divider prose-hr:pencil-divider',
            'dark:prose-invert'
          )}
        >
          <MDXContent content={post.content} />
        </div>

        {/* Related Posts */}
        <RelatedPosts currentSlug={slug} />
        </div>
      </article>
    </>
  )
}

