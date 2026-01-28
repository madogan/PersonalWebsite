'use client'

import ReactMarkdown from 'react-markdown'

type Props = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minHeight?: string
  disabled?: boolean
}

const inputClass =
  'w-full rounded-md border border-notebook-divider bg-background px-3 py-2 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent font-mono text-sm resize-y'

export function MarkdownEditor({
  value,
  onChange,
  placeholder = '# Heading\n\nBody...',
  minHeight = '14rem',
  disabled = false,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">Edit (Markdown)</label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClass}
          style={{ minHeight }}
          rows={14}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">Preview</label>
        <div
          className="prose prose-sm dark:prose-invert max-w-none rounded-md border border-notebook-divider bg-background p-4 overflow-auto"
          style={{ minHeight }}
        >
          {value.trim() ? (
            <ReactMarkdown>{value}</ReactMarkdown>
          ) : (
            <p className="text-foreground/50">Preview will appear here.</p>
          )}
        </div>
      </div>
    </div>
  )
}
