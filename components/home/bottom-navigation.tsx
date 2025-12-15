'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, FileText, Briefcase, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '#home', label: 'Home', icon: Home },
  { href: '#summary', label: 'Summary', icon: FileText },
  { href: '#experience', label: 'Experience', icon: Briefcase },
  { href: '#skills', label: 'Skills', icon: Zap },
]

export function BottomNavigation() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const pathname = usePathname()
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])

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

  // Update indicator position when active index changes
  useEffect(() => {
    const updateIndicator = () => {
      const activeItem = itemRefs.current[activeIndex]
      const container = activeItem?.parentElement
      
      if (activeItem && container) {
        const containerRect = container.getBoundingClientRect()
        const itemRect = activeItem.getBoundingClientRect()
        
        setIndicatorStyle({
          left: itemRect.left - containerRect.left,
          width: itemRect.width,
        })
      }
    }

    // Update on active index change and window resize
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      updateIndicator()
      // Also update after a small delay to catch any layout shifts
      setTimeout(updateIndicator, 50)
    })
    
    window.addEventListener('resize', updateIndicator)
    
    return () => {
      window.removeEventListener('resize', updateIndicator)
    }
  }, [activeIndex])

  if (pathname !== '/') return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 no-print flex justify-center pb-4">
      <div className="glass-panel px-2 py-2 md:px-4 md:py-3 flex items-center gap-1 md:gap-2 relative rounded-2xl shadow-2xl w-full max-w-sm md:w-fit md:max-w-none mx-4">
        {/* Sliding indicator */}
        <div
          className="absolute top-2 bottom-2 bg-accent/20 rounded-lg transition-all duration-500 ease-out border border-accent/30"
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
          }}
        />

        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = activeIndex === index

          return (
            <Link
              key={item.href}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
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
                'relative z-10 flex items-center justify-center gap-1.5 md:gap-2',
                'p-2.5 md:px-4 md:py-2.5 rounded-lg transition-all duration-200',
                'flex-1 md:flex-none',
                isActive
                  ? 'text-accent'
                  : 'text-foreground/60 hover:text-foreground'
              )}
              aria-label={item.label}
            >
              <Icon className={cn('h-5 w-5 md:h-5 md:w-5 transition-transform duration-200 flex-shrink-0', isActive && 'scale-110')} />
              <span className="hidden md:inline text-xs md:text-sm font-medium whitespace-nowrap">
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

