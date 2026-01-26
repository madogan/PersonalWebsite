'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className={cn(
          'relative inline-flex h-10 w-10 items-center justify-center rounded-lg',
          'handwriting-border bg-background', /* Use handwriting border */
          'transition-all duration-200 hover:scale-[0.98] focus:outline-none active:scale-[0.96]',
          'focus:ring-2 focus:ring-accent focus:ring-offset-2',
          'shadow-paper-sm hover:shadow-paper-md'
        )}
        aria-label="Toggle theme"
      >
        <div className="h-5 w-5" />
      </button>
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'relative inline-flex h-10 w-10 items-center justify-center rounded-lg',
        'handwriting-border bg-background', /* Use handwriting border */
        'transition-all duration-200 hover:scale-[0.98] focus:outline-none active:scale-[0.96]',
        'focus:ring-2 focus:ring-accent focus:ring-offset-2',
        'shadow-paper-sm hover:shadow-paper-md active:shadow-paper-sm',
        'paper-texture group'
      )}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <Sun
        className={cn(
          'h-5 w-5 text-foreground transition-all duration-300',
          'absolute rotate-0 scale-100',
          isDark
            ? 'rotate-90 scale-0 opacity-0'
            : 'rotate-0 scale-100 opacity-100'
        )}
      />
      <Moon
        className={cn(
          'h-5 w-5 text-foreground transition-all duration-300',
          'absolute rotate-0 scale-100',
          isDark
            ? 'rotate-0 scale-100 opacity-100'
            : '-rotate-90 scale-0 opacity-0'
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
