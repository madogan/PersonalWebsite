import { Navigation } from './navigation'
import { MobileMenu } from './mobile-menu'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Header() {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full',
        'notebook-panel handwriting-border-b', /* Use handwriting border for bottom border */
        'bg-background/95 backdrop-blur-sm',
        'paper-texture transition-all duration-300'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <Link
            href="/"
            className={cn(
              'text-xl font-bold tracking-tight',
              'text-foreground hover:text-accent',
              'transition-colors duration-200',
              'rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2'
            )}
          >
            Personal Website
          </Link>

          {/* Desktop Navigation */}
          <Navigation />

          {/* Right side: Theme Toggle + Mobile Menu */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
