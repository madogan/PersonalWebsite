'use client'

import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/ui/theme-toggle'

/**
 * Renders the fixed theme toggle only on non-admin routes.
 * Admin layout has its own toggle in the header.
 */
export function ThemeTogglePlacement() {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) {
    return null
  }
  return (
    <div className="no-print fixed right-4 top-4 z-50">
      <ThemeToggle />
    </div>
  )
}
