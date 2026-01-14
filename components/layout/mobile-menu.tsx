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
          'rounded-lg p-2 transition-all duration-200',
          'hover:scale-[0.98] hover:bg-foreground/10 active:scale-[0.96]',
          'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
          'border border-transparent text-foreground hover:border-notebook-divider'
        )}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            onClick={closeMenu}
            aria-hidden="true"
          />
          <div
            className={cn(
              'fixed right-0 top-0 z-50 h-full w-64',
              'notebook-panel border-l border-notebook-divider p-6',
              'animate-slide-in-right',
              'paper-texture shadow-paper-xl'
            )}
          >
            <div className="mt-12 flex flex-col gap-4">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href))

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={cn(
                      'rounded-lg px-4 py-3 text-base font-medium transition-all duration-200',
                      'hover:scale-[0.98] hover:bg-foreground/10 active:scale-[0.96]',
                      'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
                      'border-l-2 border-transparent',
                      isActive
                        ? 'border-l-accent bg-accent/10 font-semibold text-accent'
                        : 'text-foreground/80 hover:border-l-notebook-divider hover:text-foreground'
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
