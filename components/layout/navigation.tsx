'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navItems } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center gap-6">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'relative px-3 py-2 text-sm font-medium transition-all duration-300',
              'hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-md',
              'border-b-2 border-transparent hover:border-notebook-divider',
              isActive 
                ? 'text-accent border-accent' 
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

