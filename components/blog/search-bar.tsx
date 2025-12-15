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
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-foreground/40" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'w-full pl-12 pr-12 py-3 rounded-lg',
            'bg-glass-bg backdrop-blur-md border border-glass-border',
            'text-foreground placeholder:text-foreground/40',
            'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
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

