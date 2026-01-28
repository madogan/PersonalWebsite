'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBlogPostAction, updateBlogPostAction } from '@/lib/actions/blog'
import { generateBlogDraftAction } from '@/lib/actions/gemini'
import type { BlogPost } from '@/lib/mdx'

function slugFromTitle(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

type BlogPostFormData = {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  locale: 'en' | 'tr'
  alternateLocale: '' | 'en' | 'tr'
  alternateSlug: string
  content: string
}

type Props =
  | { mode: 'create'; initialData?: null }
  | { mode: 'edit'; initialData: BlogPost; oldSlug: string }

const inputClass =
  'w-full rounded-md border border-notebook-divider bg-background px-3 py-2 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent'
const labelClass = 'mb-1 block text-sm font-medium text-foreground'

function toFormData(post: BlogPost | null): BlogPostFormData {
  if (!post) {
    return {
      slug: '',
      title: '',
      description: '',
      date: '',
      tags: [],
      locale: 'en',
      alternateLocale: '',
      alternateSlug: '',
      content: '',
    }
  }
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags ?? [],
    locale: post.locale,
    alternateLocale: post.alternateLocale ?? '',
    alternateSlug: post.alternateSlug ?? '',
    content: post.content,
  }
}

function toPayload(form: BlogPostFormData) {
  return {
    slug: form.slug.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    title: form.title.trim(),
    description: form.description.trim(),
    date: form.date.trim(),
    tags: form.tags.filter(Boolean),
    locale: form.locale,
    alternateLocale: form.alternateLocale || undefined,
    alternateSlug: form.alternateSlug.trim() || undefined,
    content: form.content,
  }
}

export function BlogPostForm(props: Props) {
  const router = useRouter()
  const [form, setForm] = useState<BlogPostFormData>(() =>
    props.mode === 'edit' ? toFormData(props.initialData) : toFormData(null)
  )
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [saving, setSaving] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [geminiTopic, setGeminiTopic] = useState('')

  const isEdit = props.mode === 'edit'
  const oldSlug = isEdit ? props.oldSlug : ''

  function update<K extends keyof BlogPostFormData>(key: K, value: BlogPostFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleGenerateWithGemini() {
    setMessage(null)
    setGenerating(true)
    const result = await generateBlogDraftAction({
      locale: form.locale,
      topic: geminiTopic.trim() || undefined,
    })
    setGenerating(false)
    if (result.success) {
      const draft = form.locale === 'en' ? result.en : result.tr
      if (draft) {
        const date = draft.date ?? new Date().toISOString().slice(0, 10)
        setForm((prev) => ({
          ...prev,
          slug: prev.slug || slugFromTitle(draft.title) || prev.slug,
          title: draft.title,
          description: draft.description,
          date,
          tags: draft.tags,
          content: draft.content,
        }))
        setMessage({ type: 'success', text: 'Taslak oluşturuldu. İstediğiniz gibi düzenleyip kaydedin.' })
      } else {
        setMessage({ type: 'error', text: 'Taslak alınamadı.' })
      }
    } else {
      setMessage({ type: 'error', text: result.error })
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessage(null)
    setSaving(true)
    const payload = toPayload(form)
    if (isEdit) {
      const result = await updateBlogPostAction(oldSlug, payload)
      setSaving(false)
      if (result.success) {
        if (result.slug !== oldSlug) {
          router.replace(`/admin/blogs/${result.slug}/edit`)
        }
        setMessage({ type: 'success', text: 'Saved.' })
      } else {
        setMessage({ type: 'error', text: result.error })
      }
    } else {
      const result = await createBlogPostAction(payload)
      setSaving(false)
      if (result.success) {
        router.push(`/admin/blogs/${result.slug}/edit`)
      } else {
        setMessage({ type: 'error', text: result.error })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!isEdit && (
        <section className="rounded-lg border border-notebook-divider bg-background/50 p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Generate with Gemini</h2>
          <p className="mb-3 text-sm text-foreground/70">
            Konu veya taslak girin; seçili dilde (EN/TR) bir taslak oluşturulur.
          </p>
          <div className="mb-3">
            <label htmlFor="gemini-topic" className={labelClass}>
              Konu veya taslak
            </label>
            <textarea
              id="gemini-topic"
              value={geminiTopic}
              onChange={(e) => setGeminiTopic(e.target.value)}
              className={inputClass}
              rows={3}
              placeholder="e.g. Why observability matters for AI systems"
              disabled={generating}
            />
          </div>
          <button
            type="button"
            onClick={handleGenerateWithGemini}
            disabled={generating}
            className="rounded-md border border-notebook-divider px-4 py-2 text-sm font-medium text-foreground hover:bg-foreground/5 disabled:opacity-50"
          >
            {generating ? 'Oluşturuluyor…' : 'Taslak oluştur'}
          </button>
        </section>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Slug</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => update('slug', e.target.value)}
            className={inputClass}
            placeholder="my-post-slug"
            required
          />
          {isEdit && (
            <p className="mt-1 text-xs text-foreground/60">
              Changing the slug creates a new file and removes the old one.
            </p>
          )}
        </div>
        <div>
          <label className={labelClass}>Date</label>
          <input
            type="text"
            value={form.date}
            onChange={(e) => update('date', e.target.value)}
            className={inputClass}
            placeholder="YYYY-MM-DD"
            required
          />
        </div>
      </div>
      <div>
        <label className={labelClass}>Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => update('title', e.target.value)}
          className={inputClass}
          required
        />
      </div>
      <div>
        <label className={labelClass}>Description</label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          className={inputClass}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Locale</label>
          <select
            value={form.locale}
            onChange={(e) => update('locale', e.target.value as 'en' | 'tr')}
            className={inputClass}
          >
            <option value="en">en</option>
            <option value="tr">tr</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Alternate locale (optional)</label>
          <select
            value={form.alternateLocale}
            onChange={(e) => update('alternateLocale', e.target.value as '' | 'en' | 'tr')}
            className={inputClass}
          >
            <option value="">—</option>
            <option value="en">en</option>
            <option value="tr">tr</option>
          </select>
        </div>
      </div>
      <div>
        <label className={labelClass}>Alternate slug (optional)</label>
        <input
          type="text"
          value={form.alternateSlug}
          onChange={(e) => update('alternateSlug', e.target.value)}
          className={inputClass}
          placeholder="other-locale-post-slug"
        />
      </div>
      <div>
        <label className={labelClass}>Tags (one per line)</label>
        <textarea
          rows={4}
          value={form.tags.join('\n')}
          onChange={(e) =>
            update(
              'tags',
              e.target.value
                .split('\n')
                .map((s) => s.trim())
                .filter(Boolean)
            )
          }
          className={inputClass}
          placeholder="AI&#10;DevOps"
        />
      </div>
      <div>
        <label className={labelClass}>Content (Markdown / MDX)</label>
        <textarea
          rows={20}
          value={form.content}
          onChange={(e) => update('content', e.target.value)}
          className={`${inputClass} font-mono text-sm`}
          placeholder="# Heading&#10;&#10;Body..."
        />
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
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-accent px-4 py-2 font-medium text-background hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50"
        >
          {saving ? 'Saving…' : isEdit ? 'Save' : 'Create post'}
        </button>
        {isEdit && (
          <a
            href={`/blog/${form.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-notebook-divider px-4 py-2 text-sm text-foreground hover:bg-foreground/5"
          >
            View post
          </a>
        )}
      </div>
    </form>
  )
}
