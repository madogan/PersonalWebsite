'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navItems } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="hidden items-center gap-6 md:flex">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== '/' && pathname.startsWith(item.href))

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'relative px-3 py-2 text-sm font-medium transition-all duration-300',
              'rounded-md hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
              'border-b border-notebook-divider', /* Use clean border for underline */
              isActive && 'border-b border-accent', /* Accent color for active state */
              isActive
                ? 'text-accent'
                : 'text-foreground/80 hover:text-foreground'
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
