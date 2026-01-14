'use client'

import { cn } from '@/lib/utils'

export function NotebookBinding() {
  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 top-0 z-10 hidden w-[7px] lg:block',
        'bg-gradient-to-r from-notebook-binding via-notebook-binding/80 to-transparent',
        'border-r border-notebook-binding/30',
        'pointer-events-none',
        'shadow-[2px_0_4px_rgba(0,0,0,0.05)]'
      )}
      aria-hidden="true"
    />
  )
}
