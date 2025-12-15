'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { navItems } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className={cn(
          'p-2 rounded-md transition-colors duration-200',
          'hover:bg-foreground/10 focus:outline-none focus:ring-2 focus:ring-accent',
          'text-foreground'
        )}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={closeMenu}
            aria-hidden="true"
          />
          <div
            className={cn(
              'fixed top-0 right-0 h-full w-64 z-50',
              'glass-panel p-6 shadow-xl',
              'animate-slide-in-right'
            )}
          >
            <div className="flex flex-col gap-4 mt-12">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={cn(
                      'px-4 py-3 rounded-md text-base font-medium transition-all duration-200',
                      'hover:bg-foreground/10 focus:outline-none focus:ring-2 focus:ring-accent',
                      isActive
                        ? 'text-accent bg-accent/10'
                        : 'text-foreground/80 hover:text-foreground'
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

