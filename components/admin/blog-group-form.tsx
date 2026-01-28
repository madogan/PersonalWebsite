'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateBlogGroupAction } from '@/lib/actions/blog'
import { generateBlogDraftAction } from '@/lib/actions/gemini'
import type { BlogGroup } from '@/lib/blog-groups'
import type { BlogPost } from '@/lib/mdx'
import { MarkdownEditor } from '@/components/admin/markdown-editor'

type LocaleFormData = {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  content: string
}

const emptyLocaleForm = (): LocaleFormData => ({
  slug: '',
  title: '',
  description: '',
  date: '',
  tags: [],
  content: '',
})

function fromPost(post: BlogPost): LocaleFormData {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags ?? [],
    content: post.content,
  }
}

function normalizeSlug(s: string) {
  return s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

type Props = {
  group: BlogGroup
  primarySlug: string
}

const inputClass =
  'w-full rounded-md border border-notebook-divider bg-background px-3 py-2 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent'
const labelClass = 'mb-1 block text-sm font-medium text-foreground'

export function BlogGroupForm({ group, primarySlug }: Props) {
  const router = useRouter()
  const [enForm, setEnForm] = useState<LocaleFormData>(() =>
    group.en ? fromPost(group.en) : emptyLocaleForm()
  )
  const [trForm, setTrForm] = useState<LocaleFormData>(() =>
    group.tr ? fromPost(group.tr) : emptyLocaleForm()
  )
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [saving, setSaving] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [geminiTopic, setGeminiTopic] = useState('')
  const [removeEn, setRemoveEn] = useState(false)
  const [removeTr, setRemoveTr] = useState(false)

  function updateEn<K extends keyof LocaleFormData>(key: K, value: LocaleFormData[K]) {
    setEnForm((prev) => ({ ...prev, [key]: value }))
  }
  function updateTr<K extends keyof LocaleFormData>(key: K, value: LocaleFormData[K]) {
    setTrForm((prev) => ({ ...prev, [key]: value }))
  }

  const defaultDate = () => new Date().toISOString().slice(0, 10)

  function applyDraftToEn(draft: { title: string; description: string; date?: string; tags: string[]; content: string }) {
    setEnForm((prev) => ({
      ...prev,
      slug: prev.slug || normalizeSlug(draft.title) || prev.slug,
      title: draft.title,
      description: draft.description,
      date: draft.date ?? defaultDate(),
      tags: draft.tags,
      content: draft.content,
    }))
  }

  function applyDraftToTr(draft: { title: string; description: string; date?: string; tags: string[]; content: string }) {
    setTrForm((prev) => ({
      ...prev,
      slug: prev.slug || normalizeSlug(draft.title) || prev.slug,
      title: draft.title,
      description: draft.description,
      date: draft.date ?? defaultDate(),
      tags: draft.tags,
      content: draft.content,
    }))
  }

  async function handleGenerateWithGemini(locale: 'en' | 'tr' | 'both') {
    setMessage(null)
    setGenerating(true)
    const topic = geminiTopic.trim() || undefined
    const existingEn =
      group.en || enForm.title || enForm.content
        ? { title: enForm.title, description: enForm.description, content: enForm.content, tags: enForm.tags }
        : undefined
    const existingTr =
      group.tr || trForm.title || trForm.content
        ? { title: trForm.title, description: trForm.description, content: trForm.content, tags: trForm.tags }
        : undefined
    const result = await generateBlogDraftAction({
      locale,
      topic,
      existingEn: existingEn?.title || existingEn?.content ? existingEn : undefined,
      existingTr: existingTr?.title || existingTr?.content ? existingTr : undefined,
    })
    setGenerating(false)
    if (result.success) {
      if (result.en) applyDraftToEn(result.en)
      if (result.tr) applyDraftToTr(result.tr)
      setMessage({ type: 'success', text: 'Taslak(lar) oluşturuldu. İstediğiniz gibi düzenleyip kaydedin.' })
    } else {
      setMessage({ type: 'error', text: result.error })
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessage(null)
    setSaving(true)

    const payload: { en?: unknown; tr?: unknown } = {}

    if (removeEn) {
      payload.en = null
    } else if (group.en || enForm.slug.trim() || enForm.title.trim() || enForm.content.trim()) {
      const slug = normalizeSlug(enForm.slug) || (group.en?.slug ?? '')
      const title = (enForm.title.trim() || group.en?.title) ?? ''
      const date = (enForm.date.trim() || group.en?.date) ?? ''
      if (slug && title && date) {
        payload.en = {
          slug,
          title,
          description: (enForm.description.trim() || group.en?.description) ?? '',
          date,
          tags: enForm.tags.filter(Boolean).length ? enForm.tags.filter(Boolean) : (group.en?.tags ?? []),
          locale: 'en',
          content: (enForm.content || group.en?.content) ?? '',
        }
      }
    }

    if (removeTr) {
      payload.tr = null
    } else if (group.tr || trForm.slug.trim() || trForm.title.trim() || trForm.content.trim()) {
      const slug = normalizeSlug(trForm.slug) || (group.tr?.slug ?? '')
      const title = (trForm.title.trim() || group.tr?.title) ?? ''
      const date = (trForm.date.trim() || group.tr?.date) ?? ''
      if (slug && title && date) {
        payload.tr = {
          slug,
          title,
          description: (trForm.description.trim() || group.tr?.description) ?? '',
          date,
          tags: trForm.tags.filter(Boolean).length ? trForm.tags.filter(Boolean) : (group.tr?.tags ?? []),
          locale: 'tr',
          content: (trForm.content || group.tr?.content) ?? '',
        }
      }
    }

    const result = await updateBlogGroupAction(primarySlug, payload)
    setSaving(false)
    if (result.success) {
      if (result.slug !== primarySlug) {
        router.replace(`/admin/blogs/${result.slug}/edit`)
      } else {
        setMessage({ type: 'success', text: 'Saved.' })
        setRemoveEn(false)
        setRemoveTr(false)
      }
    } else {
      setMessage({ type: 'error', text: result.error })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <section className="rounded-lg border border-notebook-divider bg-background/50 p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Generate with Gemini</h2>
        <p className="mb-3 text-sm text-foreground/70">
          Konu veya taslak girin; seçtiğiniz dil(ler)de taslak oluşturulur. Mevcut içerik (varsa) diğer dil için referans olarak kullanılabilir.
        </p>
        <div className="mb-4">
          <label htmlFor="gemini-topic-edit" className={labelClass}>
            Konu veya taslak
          </label>
          <textarea
            id="gemini-topic-edit"
            value={geminiTopic}
            onChange={(e) => setGeminiTopic(e.target.value)}
            className={inputClass}
            rows={2}
            placeholder="e.g. Why observability matters for AI systems"
            disabled={generating}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleGenerateWithGemini('en')}
            disabled={generating}
            className="rounded-md border border-notebook-divider px-3 py-1.5 text-sm font-medium text-foreground hover:bg-foreground/5 disabled:opacity-50"
          >
            {generating ? '…' : 'EN taslak'}
          </button>
          <button
            type="button"
            onClick={() => handleGenerateWithGemini('tr')}
            disabled={generating}
            className="rounded-md border border-notebook-divider px-3 py-1.5 text-sm font-medium text-foreground hover:bg-foreground/5 disabled:opacity-50"
          >
            {generating ? '…' : 'TR taslak'}
          </button>
          <button
            type="button"
            onClick={() => handleGenerateWithGemini('both')}
            disabled={generating}
            className="rounded-md border border-notebook-divider px-3 py-1.5 text-sm font-medium text-foreground hover:bg-foreground/5 disabled:opacity-50"
          >
            {generating ? '…' : 'Her iki dil'}
          </button>
        </div>
      </section>
      {/* English panel */}
      <section className="rounded-lg border border-notebook-divider bg-background/50 p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          {group.en ? 'English' : 'Add English version'}
        </h2>
        {group.en && (
          <label className="mb-4 flex items-center gap-2">
            <input
              type="checkbox"
              checked={removeEn}
              onChange={(e) => setRemoveEn(e.target.checked)}
              className="rounded border-notebook-divider"
            />
            <span className="text-sm text-red-600 dark:text-red-400">Remove English version</span>
          </label>
        )}
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Slug</label>
              <input
                type="text"
                value={enForm.slug}
                onChange={(e) => updateEn('slug', e.target.value)}
                className={inputClass}
                placeholder="my-post-slug"
              />
            </div>
            <div>
              <label className={labelClass}>Date</label>
              <input
                type="text"
                value={enForm.date}
                onChange={(e) => updateEn('date', e.target.value)}
                className={inputClass}
                placeholder="YYYY-MM-DD"
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              value={enForm.title}
              onChange={(e) => updateEn('title', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              rows={3}
              value={enForm.description}
              onChange={(e) => updateEn('description', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Tags (one per line)</label>
            <textarea
              rows={3}
              value={enForm.tags.join('\n')}
              onChange={(e) =>
                updateEn(
                  'tags',
                  e.target.value
                    .split('\n')
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Content (Markdown / MDX)</label>
            <MarkdownEditor
              value={enForm.content}
              onChange={(v) => updateEn('content', v)}
              placeholder="# Heading&#10;&#10;Body..."
              minHeight="14rem"
            />
          </div>
        </div>
      </section>

      {/* Turkish panel */}
      <section className="rounded-lg border border-notebook-divider bg-background/50 p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          {group.tr ? 'Türkçe' : 'Add Turkish version'}
        </h2>
        {group.tr && (
          <label className="mb-4 flex items-center gap-2">
            <input
              type="checkbox"
              checked={removeTr}
              onChange={(e) => setRemoveTr(e.target.checked)}
              className="rounded border-notebook-divider"
            />
            <span className="text-sm text-red-600 dark:text-red-400">Remove Turkish version</span>
          </label>
        )}
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Slug</label>
              <input
                type="text"
                value={trForm.slug}
                onChange={(e) => updateTr('slug', e.target.value)}
                className={inputClass}
                placeholder="yazi-slug"
              />
            </div>
            <div>
              <label className={labelClass}>Date</label>
              <input
                type="text"
                value={trForm.date}
                onChange={(e) => updateTr('date', e.target.value)}
                className={inputClass}
                placeholder="YYYY-MM-DD"
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              value={trForm.title}
              onChange={(e) => updateTr('title', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              rows={3}
              value={trForm.description}
              onChange={(e) => updateTr('description', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Tags (one per line)</label>
            <textarea
              rows={3}
              value={trForm.tags.join('\n')}
              onChange={(e) =>
                updateTr(
                  'tags',
                  e.target.value
                    .split('\n')
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Content (Markdown / MDX)</label>
            <MarkdownEditor
              value={trForm.content}
              onChange={(v) => updateTr('content', v)}
              placeholder="# Başlık&#10;&#10;İçerik..."
              minHeight="14rem"
            />
          </div>
        </div>
      </section>

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
          {saving ? 'Saving…' : 'Save'}
        </button>
        {(group.en || group.tr) && (
          <a
            href={`/blog/${group.primarySlug}`}
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
