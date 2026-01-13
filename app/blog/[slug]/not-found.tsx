import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="text-foreground/60 mb-8">
          The blog post you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
        >
          Back to Blog
        </Link>
      </div>
    </div>
  )
}

