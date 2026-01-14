import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function HeroSection() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Hero Content with Notebook Aesthetic */}
          <div className="loose-leaf-card paper-texture animate-fade-in space-y-6 p-8 text-center md:p-12">
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              <span className="text-accent">Welcome</span>
              <br />
              <span className="text-foreground">to My Personal Website</span>
            </h1>

            <p className="mx-auto max-w-2xl animate-slide-up text-lg text-foreground/80 md:text-xl">
              I&apos;m a developer passionate about creating beautiful,
              functional, and accessible web experiences. Explore my blog posts
              and learn more about my work.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex animate-slide-up flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/blog"
                className={cn(
                  'group inline-flex items-center gap-2 px-6 py-3',
                  'rounded-lg bg-accent font-medium text-white',
                  'transition-all duration-200 hover:bg-accent/90',
                  'hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
                  'shadow-lg hover:shadow-xl'
                )}
              >
                Read My Blog
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
