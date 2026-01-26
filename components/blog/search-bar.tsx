'use client'

import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search posts...',
}: SearchBarProps) {
  return (
    <div className="relative mb-8">
      <div className="relative rounded-lg shadow-[var(--shadow-lg)]">
        <Search className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 transform text-accent" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'relative w-full rounded-lg py-3 pl-12 pr-12',
            'handwriting-border bg-background', /* Use handwriting border */
            'font-sans text-foreground placeholder:text-foreground/50',
            'focus:outline-none focus:ring-2 focus:ring-accent',
            'focus:shadow-[var(--shadow-xl)]',
            'transition-all duration-200',
            'shadow-paper-sm hover:shadow-paper-md'
          )}
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-md p-1 transition-colors hover:bg-foreground/10"
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-foreground/60" />
          </button>
        )}
      </div>
    </div>
  )
}
