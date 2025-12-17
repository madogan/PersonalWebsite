'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

export function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className={cn(
        'fixed top-4 left-4 z-50 no-print',
        'inline-flex h-10 w-10 items-center justify-center rounded-2xl',
        'bg-glass-bg backdrop-blur-md border border-glass-border',
        'transition-all duration-300 hover:scale-105 focus:outline-none',
        'focus:ring-2 focus:ring-accent focus:ring-offset-2',
        'group'
      )}
      aria-label="Go back"
      title="Go back"
    >
      <ArrowLeft
        className={cn(
          'h-5 w-5 text-foreground transition-all duration-300'
        )}
      />
      <span className="sr-only">Go back</span>
    </button>
  )
}

