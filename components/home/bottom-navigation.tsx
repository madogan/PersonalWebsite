'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, FileText, Briefcase, Zap, Link as LinkIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '#home', label: 'Home', icon: Home },
  { href: '#summary', label: 'Summary', icon: FileText },
  { href: '#experience', label: 'Experience', icon: Briefcase },
  { href: '#skills', label: 'Skills', icon: Zap },
  { href: '#links', label: 'Links', icon: LinkIcon },
]

export function BottomNavigation() {
  const [activeIndex, setActiveIndex] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== '/') return

    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      
      ticking = true
      requestAnimationFrame(() => {
        const sections = navItems.map((item) => {
          const id = item.href.replace('#', '')
          return document.getElementById(id)
        }).filter(Boolean) as HTMLElement[]

        if (sections.length === 0) {
          ticking = false
          return
        }

        const scrollPosition = window.scrollY + window.innerHeight / 3

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i]
          const sectionTop = section.offsetTop
          const sectionHeight = section.offsetHeight

          if (scrollPosition >= sectionTop - 100) {
            setActiveIndex(i)
            break
          }
        }

        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  if (pathname !== '/') return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 no-print flex justify-center pb-4">
      <div className="glass-panel px-2 py-2 flex items-center gap-1 relative rounded-2xl shadow-2xl max-w-sm w-full mx-4">
        {/* Sliding indicator */}
        <div
          className="absolute top-2 bottom-2 bg-accent/20 rounded-lg transition-all duration-500 ease-out border border-accent/30"
          style={{
            left: `${activeIndex * (100 / navItems.length)}%`,
            width: `${100 / navItems.length}%`,
          }}
        />

        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = activeIndex === index

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById(item.href.replace('#', ''))
                if (element) {
                  const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 20

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                  })
                }
              }}
              className={cn(
                'relative z-10 flex items-center justify-center',
                'p-2.5 rounded-lg transition-all duration-200',
                'flex-1',
                isActive
                  ? 'text-accent'
                  : 'text-foreground/60 hover:text-foreground'
              )}
              aria-label={item.label}
            >
              <Icon className={cn('h-5 w-5 md:h-6 md:w-6 transition-transform duration-200', isActive && 'scale-110')} />
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

