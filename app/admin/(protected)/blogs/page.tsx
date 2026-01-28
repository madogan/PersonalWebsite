import Link from 'next/link'
import { getBlogGroups } from '@/lib/blog-groups'
import { BlogList } from '@/components/admin/blog-list'
import { Plus } from 'lucide-react'

export default function AdminBlogsPage() {
  const groups = getBlogGroups()
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Blogs</h1>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-1 rounded-md border border-notebook-divider bg-background px-3 py-1.5 text-sm text-foreground hover:bg-foreground/5"
        >
          <Plus className="h-4 w-4" /> New post
        </Link>
      </div>
      <BlogList groups={groups} />
    </div>
  )
}
