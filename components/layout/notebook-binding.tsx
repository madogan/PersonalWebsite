'use client'

import { cn } from '@/lib/utils'

export function NotebookBinding() {
  return (
    <div
      className={cn(
        'hidden lg:block fixed left-0 top-0 bottom-0 w-[7px] z-10',
        'bg-gradient-to-r from-notebook-binding via-notebook-binding/80 to-transparent',
        'border-r border-notebook-binding/30',
        'pointer-events-none',
        'shadow-[2px_0_4px_rgba(0,0,0,0.05)]'
      )}
      aria-hidden="true"
    />
  )
}
