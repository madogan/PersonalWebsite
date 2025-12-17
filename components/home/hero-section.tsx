import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Content with Glassmorphism */}
          <div className="glass-card p-8 md:p-12 text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-accent to-accent-cyan bg-clip-text text-transparent">
                Welcome
              </span>
              <br />
              <span className="text-foreground">to My Personal Website</span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto animate-slide-up">
              I'm a developer passionate about creating beautiful, functional, and accessible web experiences.
              Explore my blog posts and learn more about my work.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 animate-slide-up">
              <Link
                href="/blog"
                className={cn(
                  'group inline-flex items-center gap-2 px-6 py-3',
                  'bg-accent text-white rounded-lg font-medium',
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

