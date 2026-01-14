import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold">Post Not Found</h1>
        <p className="mb-8 text-foreground/60">
          The blog post you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-white transition-colors hover:bg-accent/90"
        >
          Back to Blog
        </Link>
      </div>
    </div>
  )
}
