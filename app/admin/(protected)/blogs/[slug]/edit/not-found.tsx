import Link from 'next/link'

export default function AdminBlogEditNotFound() {
  return (
    <div className="py-8">
      <h2 className="mb-2 text-xl font-bold text-foreground">Post not found</h2>
      <p className="mb-4 text-foreground/70">
        The blog post you’re looking for doesn’t exist or was deleted.
      </p>
      <Link
        href="/admin/blogs"
        className="text-accent hover:underline"
      >
        ← Back to Blogs
      </Link>
    </div>
  )
}
