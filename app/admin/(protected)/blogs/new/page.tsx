import Link from 'next/link'
import { BlogPostForm } from '@/components/admin/blog-post-form'

export default function AdminBlogNewPage() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link
          href="/admin/blogs"
          className="text-sm text-foreground/70 hover:text-foreground"
        >
          ← Blogs
        </Link>
      </div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">New post</h1>
      <BlogPostForm mode="create" />
    </div>
  )
}
