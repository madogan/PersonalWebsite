'use client'

import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = 'Search posts...' }: SearchBarProps) {
  return (
    <div className="relative mb-8">
      <div className="relative shadow-[var(--shadow-accent-lg)] rounded-lg">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent z-10 pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'w-full pl-12 pr-12 py-3 rounded-lg relative',
            'bg-glass-bg backdrop-blur-md border-2 border-accent/30',
            'text-foreground placeholder:text-foreground/50',
            'focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent/60',
            'focus:shadow-[var(--shadow-accent-xl)]',
            'transition-all duration-200'
          )}
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-md hover:bg-foreground/10 transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-foreground/60" />
          </button>
        )}
      </div>
    </div>
  )
}

