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
        'flex items-center gap-2',
        'text-sm text-foreground/60',
        'transition-colors duration-200 hover:text-foreground',
        'rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
        className
      )}
      aria-label="Share on LinkedIn"
      title="Share on LinkedIn"
    >
      <Linkedin className="h-5 w-5" />
      <span>Share</span>
    </button>
  )
}
