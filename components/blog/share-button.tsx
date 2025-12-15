'use client'

import { Linkedin } from 'lucide-react'
import { cn } from '@/lib/utils'

type ShareButtonProps = {
  url: string
  title: string
  className?: string
}

export function ShareButton({ url, title, className }: ShareButtonProps) {
  const handleShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      onClick={handleShare}
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2',
        'bg-[#0077b5] text-white rounded-lg font-medium',
        'transition-all duration-200 hover:bg-[#006399]',
        'hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#0077b5] focus:ring-offset-2',
        'shadow-md hover:shadow-lg',
        className
      )}
      aria-label="Share on LinkedIn"
    >
      <Linkedin className="h-4 w-4" />
      Share on LinkedIn
    </button>
  )
}

