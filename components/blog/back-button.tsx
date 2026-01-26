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
        'no-print fixed left-4 top-4 z-50',
        'inline-flex h-10 w-10 items-center justify-center rounded-lg',
        'border border-notebook-divider bg-background', /* Use clean border */
        'transition-all duration-200 hover:scale-[0.98] focus:outline-none active:scale-[0.96]',
        'focus:ring-2 focus:ring-accent focus:ring-offset-2',
        'shadow-paper-sm hover:shadow-paper-md',
        'group'
      )}
      aria-label="Go back"
      title="Go back"
    >
      <ArrowLeft
        className={cn('h-5 w-5 text-foreground transition-all duration-300')}
      />
      <span className="sr-only">Go back</span>
    </button>
  )
}
