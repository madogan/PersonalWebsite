import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogGroupByPrimarySlug } from '@/lib/blog-groups'
import { BlogGroupForm } from '@/components/admin/blog-group-form'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function AdminBlogEditPage({ params }: Props) {
  const { slug } = await params
  const group = getBlogGroupByPrimarySlug(slug)
  if (!group) {
    notFound()
  }
  const title = group.en?.title ?? group.tr?.title ?? slug
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
      <h1 className="mb-6 text-2xl font-bold text-foreground">Edit: {title}</h1>
      <BlogGroupForm group={group} primarySlug={slug} />
    </div>
  )
}
