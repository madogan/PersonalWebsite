import { getPostBySlug } from '@/lib/mdx'
import { siteConfig } from '@/lib/constants'

type JsonLdProps = {
  slug: string
}

export function JsonLd({ slug }: JsonLdProps) {
  const post = getPostBySlug(slug)
  if (!post) return null

  const url = `${siteConfig.url}/blog/${slug}`
  const imageUrl = `${siteConfig.url}/og-image.jpg` // You can customize this

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: imageUrl,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: siteConfig.author,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: post.tags.join(', '),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

