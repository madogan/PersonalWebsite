'use client'

import { useState } from 'react'
import Link from 'next/link'
import { deleteBlogGroupAction } from '@/lib/actions/blog'
import type { BlogGroup } from '@/lib/blog-groups'
import { Pencil, Trash2 } from 'lucide-react'

type Props = {
  groups: BlogGroup[]
}

export function BlogList({ groups: initialGroups }: Props) {
  const [groups, setGroups] = useState(initialGroups)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null)

  async function handleDelete(primarySlug: string) {
    if (!confirm(`Delete this blog (both locales if any)? This cannot be undone.`)) return
    setMessage(null)
    setDeletingSlug(primarySlug)
    const result = await deleteBlogGroupAction(primarySlug)
    setDeletingSlug(null)
    if (result.success) {
      setGroups((prev) => prev.filter((g) => g.primarySlug !== primarySlug))
      setMessage({ type: 'success', text: 'Blog deleted.' })
    } else {
      setMessage({ type: 'error', text: result.error })
    }
  }

  if (groups.length === 0) {
    return (
      <p className="text-foreground/70">
        No posts yet. <Link href="/admin/blogs/new" className="text-accent hover:underline">Create one</Link>.
      </p>
    )
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-notebook-divider">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="border-b border-notebook-divider bg-background/50">
            <tr>
              <th className="px-4 py-3 font-medium text-foreground">Title</th>
              <th className="px-4 py-3 font-medium text-foreground">EN slug</th>
              <th className="px-4 py-3 font-medium text-foreground">TR slug</th>
              <th className="px-4 py-3 font-medium text-foreground">Date</th>
              <th className="px-4 py-3 font-medium text-foreground">Tags</th>
              <th className="px-4 py-3 font-medium text-foreground text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-notebook-divider">
            {groups.map((group) => {
              const title = group.en?.title ?? group.tr?.title ?? '—'
              const date = group.en?.date ?? group.tr?.date ?? '—'
              const tags = [...(group.en?.tags ?? []), ...(group.tr?.tags ?? [])]
              const uniqueTags = Array.from(new Set(tags))
              return (
                <tr key={group.primarySlug} className="bg-background/30">
                  <td className="px-4 py-3 text-foreground">{title}</td>
                  <td className="px-4 py-3 font-mono text-foreground/80">
                    {group.en?.slug ?? '—'}
                  </td>
                  <td className="px-4 py-3 font-mono text-foreground/80">
                    {group.tr?.slug ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-foreground/80">{date}</td>
                  <td className="px-4 py-3 text-foreground/70">
                    {uniqueTags.slice(0, 3).join(', ')}
                    {uniqueTags.length > 3 ? ` +${uniqueTags.length - 3}` : ''}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/blogs/${group.primarySlug}/edit`}
                        className="inline-flex items-center gap-1 rounded border border-notebook-divider px-2 py-1 text-foreground hover:bg-foreground/5"
                      >
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(group.primarySlug)}
                        disabled={deletingSlug === group.primarySlug}
                        className="inline-flex items-center gap-1 rounded border border-red-200 px-2 py-1 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/50 disabled:opacity-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        {deletingSlug === group.primarySlug ? 'Deleting…' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {message && (
        <p
          className={
            message.type === 'success'
              ? 'text-sm text-green-600 dark:text-green-400'
              : 'text-sm text-red-600 dark:text-red-400'
          }
        >
          {message.text}
        </p>
      )}
    </div>
  )
}
