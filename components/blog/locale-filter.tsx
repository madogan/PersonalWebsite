'use client'

import { Languages } from 'lucide-react'
import { cn } from '@/lib/utils'

type LocaleFilterProps = {
  value: 'all' | 'en' | 'tr'
  onChange: (value: 'all' | 'en' | 'tr') => void
  className?: string
}

export function LocaleFilter({ value, onChange, className }: LocaleFilterProps) {
  return (
    <div className={cn('relative', className)}>
      <div className="relative">
        <Languages className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent z-10 pointer-events-none" />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as 'all' | 'en' | 'tr')}
          className={cn(
            'w-full pl-12 pr-10 py-3 rounded-lg appearance-none',
            'bg-background border-2 border-notebook-divider',
            'text-foreground font-sans',
            'focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent/60',
            'focus:shadow-[var(--shadow-xl)]',
            'transition-all duration-200',
            'shadow-paper-sm hover:shadow-paper-md',
            'cursor-pointer'
          )}
          aria-label="Filter posts by language"
        >
          <option value="all">All Languages</option>
          <option value="en">English</option>
          <option value="tr">Turkish</option>
        </select>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg
            className="h-4 w-4 text-foreground/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
