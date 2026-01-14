'use client'

import Link from 'next/link'
import { Languages } from 'lucide-react'
import { cn } from '@/lib/utils'

type LanguageSwitcherProps = {
  currentLocale: 'en' | 'tr'
  alternateLocale?: 'en' | 'tr'
  alternateSlug?: string
  preferredLocale?: 'en' | 'tr'
  className?: string
}

export function LanguageSwitcher({
  currentLocale,
  alternateLocale,
  alternateSlug,
  preferredLocale,
  className,
}: LanguageSwitcherProps) {
  // Only render if alternate language exists
  if (!alternateLocale || !alternateSlug) {
    return null
  }

  // Determine display text based on alternate locale
  const displayText =
    alternateLocale === 'tr' ? 'Read in Turkish' : 'Türkçe oku'

  // Check if alternate locale matches preferred locale for visual emphasis
  const isPreferred = preferredLocale === alternateLocale

  return (
    <Link
      href={`/blog/${alternateSlug}`}
      className={cn(
        'flex items-center gap-2',
        'text-sm',
        isPreferred
          ? 'font-medium text-accent' // Emphasize preferred locale
          : 'text-foreground/60',
        'transition-colors duration-200 hover:text-foreground',
        'rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
        className
      )}
      aria-label={`Read this post in ${alternateLocale === 'tr' ? 'Turkish' : 'English'}`}
      title={`Read this post in ${alternateLocale === 'tr' ? 'Turkish' : 'English'}`}
    >
      <Languages className="h-5 w-5" />
      <span>{displayText}</span>
    </Link>
  )
}
