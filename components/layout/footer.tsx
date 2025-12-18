import Link from 'next/link'
import { siteConfig, VERSION } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={cn(
        'border-t border-glass-border',
        'bg-glass-bg/50 backdrop-blur-md',
        'mt-auto pb-20 md:pb-6 no-pdf'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3 md:gap-4">
          <div className="text-xs sm:text-sm text-foreground/60 text-center md:text-left">
            All Rights Reserved © {currentYear}
          </div>
          
          <div className="text-[10px] text-foreground/40 text-center">
            v{VERSION}
          </div>
          
          <div className="flex items-center justify-center md:justify-end gap-4 md:gap-6">
            {siteConfig.links.github && (
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'text-xs sm:text-sm text-foreground/60 hover:text-accent',
                  'transition-colors duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-md'
                )}
              >
                GitHub
              </Link>
            )}
            {siteConfig.links.linkedin && (
              <Link
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'text-xs sm:text-sm text-foreground/60 hover:text-accent',
                  'transition-colors duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-md'
                )}
              >
                LinkedIn
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}

