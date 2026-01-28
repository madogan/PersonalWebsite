'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  updateGeminiPromptsAction,
  getDefaultGeminiPromptsAction,
} from '@/lib/actions/gemini'
import type { GeminiPromptsConfig } from '@/lib/schemas/gemini-prompts'

type Props = {
  initialPrompts: GeminiPromptsConfig
}

const labelClass = 'mb-1 block text-sm font-medium text-foreground'
const textareaClass =
  'w-full rounded-md border border-notebook-divider bg-background px-3 py-2 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent min-h-[200px] font-mono text-sm'

export function GeminiPromptsForm({ initialPrompts }: Props) {
  const router = useRouter()
  const [promptEn, setPromptEn] = useState(initialPrompts.promptEn)
  const [promptTr, setPromptTr] = useState(initialPrompts.promptTr)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [saving, setSaving] = useState(false)

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessage(null)
    setSaving(true)
    const result = await updateGeminiPromptsAction({ promptEn, promptTr })
    setSaving(false)
    if (result.success) {
      setMessage({ type: 'success', text: 'Promptlar kaydedildi.' })
      router.refresh()
    } else {
      setMessage({ type: 'error', text: result.error })
    }
  }

  async function handleResetDefaults() {
    setMessage(null)
    const result = await getDefaultGeminiPromptsAction()
    if (result.success) {
      setPromptEn(result.prompts.promptEn)
      setPromptTr(result.prompts.promptTr)
    } else {
      setMessage({ type: 'error', text: result.error })
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
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

      <div>
        <label htmlFor="promptEn" className={labelClass}>
          İngilizce prompt (EN)
        </label>
        <textarea
          id="promptEn"
          value={promptEn}
          onChange={(e) => setPromptEn(e.target.value)}
          className={textareaClass}
          rows={12}
          placeholder="You are a technical blog author..."
        />
      </div>

      <div>
        <label htmlFor="promptTr" className={labelClass}>
          Türkçe prompt (TR)
        </label>
        <textarea
          id="promptTr"
          value={promptTr}
          onChange={(e) => setPromptTr(e.target.value)}
          className={textareaClass}
          rows={12}
          placeholder="Teknik bir blog yazarısınız..."
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md border border-notebook-divider bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-foreground/5 disabled:opacity-50"
        >
          {saving ? 'Kaydediliyor…' : 'Kaydet'}
        </button>
        <button
          type="button"
          onClick={handleResetDefaults}
          className="rounded-md border border-notebook-divider px-4 py-2 text-sm font-medium text-foreground hover:bg-foreground/5"
        >
          Varsayılana dön
        </button>
      </div>
    </form>
  )
}
