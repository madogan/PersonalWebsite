'use client'

import { useState } from 'react'
import { updateResumeAction } from '@/lib/actions/resume'
import type { ResumeData } from '@/lib/resume'

type Props = {
  initialData: Pick<ResumeData, 'personal' | 'summary'>
}

export function HeroSummaryForm({ initialData }: Props) {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [personal, setPersonal] = useState(initialData.personal)
  const [summary, setSummary] = useState(initialData.summary)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessage(null)
    const result = await updateResumeAction({
      personal: {
        name: personal.name,
        title: personal.title,
        tagline: personal.tagline ?? '',
        email: personal.email,
        location: personal.location,
        website: personal.website ?? '',
        linkedin: personal.linkedin ?? '',
        github: personal.github ?? '',
      },
      summary,
    })
    if (result.success) {
      setMessage({ type: 'success', text: 'Saved.' })
    } else {
      setMessage({ type: 'error', text: result.error })
    }
  }

  const inputClass =
    'w-full rounded-md border border-notebook-divider bg-background px-3 py-2 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent'
  const labelClass = 'mb-1 block text-sm font-medium text-foreground'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            type="text"
            value={personal.name}
            onChange={(e) => setPersonal((p) => ({ ...p, name: e.target.value }))}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="title" className={labelClass}>
            Title
          </label>
          <input
            id="title"
            type="text"
            value={personal.title}
            onChange={(e) => setPersonal((p) => ({ ...p, title: e.target.value }))}
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="tagline" className={labelClass}>
          Tagline
        </label>
        <input
          id="tagline"
          type="text"
          value={personal.tagline ?? ''}
          onChange={(e) => setPersonal((p) => ({ ...p, tagline: e.target.value }))}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          type="email"
          value={personal.email}
          onChange={(e) => setPersonal((p) => ({ ...p, email: e.target.value }))}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="location" className={labelClass}>
          Location
        </label>
        <input
          id="location"
          type="text"
          value={personal.location}
          onChange={(e) => setPersonal((p) => ({ ...p, location: e.target.value }))}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="website" className={labelClass}>
          Website
        </label>
        <input
          id="website"
          type="text"
          value={personal.website ?? ''}
          onChange={(e) => setPersonal((p) => ({ ...p, website: e.target.value }))}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="linkedin" className={labelClass}>
          LinkedIn
        </label>
        <input
          id="linkedin"
          type="text"
          value={personal.linkedin ?? ''}
          onChange={(e) => setPersonal((p) => ({ ...p, linkedin: e.target.value }))}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="github" className={labelClass}>
          GitHub
        </label>
        <input
          id="github"
          type="text"
          value={personal.github ?? ''}
          onChange={(e) => setPersonal((p) => ({ ...p, github: e.target.value }))}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="summary" className={labelClass}>
          Summary
        </label>
        <textarea
          id="summary"
          rows={8}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className={inputClass}
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
      <button
        type="submit"
        className="rounded-md bg-accent px-4 py-2 font-medium text-background hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      >
        Save
      </button>
    </form>
  )
}
