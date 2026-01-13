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
          'p-2 rounded-lg transition-all duration-200',
          'hover:bg-foreground/10 hover:scale-[0.98] active:scale-[0.96]',
          'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
          'text-foreground border border-transparent hover:border-notebook-divider'
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
              'notebook-panel border-l border-notebook-divider p-6',
              'animate-slide-in-right',
              'shadow-paper-xl paper-texture'
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
                      'px-4 py-3 rounded-lg text-base font-medium transition-all duration-200',
                      'hover:bg-foreground/10 hover:scale-[0.98] active:scale-[0.96]',
                      'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
                      'border-l-2 border-transparent',
                      isActive
                        ? 'text-accent bg-accent/10 border-l-accent font-semibold'
                        : 'text-foreground/80 hover:text-foreground hover:border-l-notebook-divider'
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

