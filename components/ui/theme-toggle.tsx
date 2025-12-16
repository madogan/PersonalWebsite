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
          'relative inline-flex h-10 w-10 items-center justify-center rounded-2xl',
          'bg-glass-bg backdrop-blur-md border border-glass-border',
          'transition-all duration-200 hover:scale-105 focus:outline-none',
          'focus:ring-2 focus:ring-accent focus:ring-offset-2'
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
        'relative inline-flex h-10 w-10 items-center justify-center rounded-2xl',
        'bg-glass-bg backdrop-blur-md border border-glass-border',
        'transition-all duration-300 hover:scale-105 focus:outline-none',
        'focus:ring-2 focus:ring-accent focus:ring-offset-2',
        'group'
      )}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <Sun
        className={cn(
          'h-5 w-5 text-foreground transition-all duration-300',
          'absolute rotate-0 scale-100',
          isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        )}
      />
      <Moon
        className={cn(
          'h-5 w-5 text-foreground transition-all duration-300',
          'absolute rotate-0 scale-100',
          isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}

