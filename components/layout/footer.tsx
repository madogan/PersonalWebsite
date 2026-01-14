import Link from 'next/link'
import { siteConfig, VERSION } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={cn(
        'pencil-divider border-t border-notebook-divider',
        'bg-background/95 backdrop-blur-sm',
        'no-pdf paper-texture mt-auto pb-20 md:pb-6'
      )}
    >
      <div className="container mx-auto px-4 py-6 sm:px-6 md:py-8 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-3 md:gap-4">
          <div className="text-center text-xs text-foreground/60 sm:text-sm md:text-left">
            All Rights Reserved © {currentYear}
          </div>

          <div className="text-center text-[10px] text-foreground/40">
            v{VERSION}
          </div>

          <div className="flex items-center justify-center gap-4 md:justify-end md:gap-6">
            {siteConfig.links.github && (
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'text-xs text-foreground/60 hover:text-accent sm:text-sm',
                  'transition-colors duration-200',
                  'rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2'
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
                  'text-xs text-foreground/60 hover:text-accent sm:text-sm',
                  'transition-colors duration-200',
                  'rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2'
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
