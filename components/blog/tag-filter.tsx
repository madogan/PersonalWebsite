'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

type TagFilterProps = {
  tags: string[]
  selectedTags: string[]
  onTagToggle: (tag: string) => void
  onClear: () => void
}

export function TagFilter({ tags, selectedTags, onTagToggle, onClear }: TagFilterProps) {
  if (tags.length === 0) {
    return null
  }

  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-foreground/80">Filter by tags:</span>
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag)
          return (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={cn(
                'px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
                isSelected
                  ? 'bg-accent text-foreground hover:bg-accent/90'
                  : 'bg-background border border-notebook-divider text-foreground/80 hover:text-foreground hover:border-accent/50 shadow-paper-sm hover:shadow-paper-md'
              )}
            >
              {tag}
            </button>
          )
        })}
        {selectedTags.length > 0 && (
          <button
            onClick={onClear}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md',
              'bg-foreground/10 text-foreground/80 hover:bg-foreground/20',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2'
            )}
          >
            <X className="h-3.5 w-3.5" />
            Clear
          </button>
        )}
      </div>
    </div>
  )
}

