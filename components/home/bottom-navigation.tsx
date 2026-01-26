'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Briefcase, Zap, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '#home', label: 'Home', icon: Home },
  { href: '#skills', label: 'Skills', icon: Zap },
  { href: '#experience', label: 'Experience', icon: Briefcase },
  { href: '#blogs', label: 'Blogs', icon: FileText },
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
        // Create a map of section ID to navItem index
        const sectionIdToNavIndex = new Map<string, number>()
        navItems.forEach((item, navIndex) => {
          const id = item.href.replace('#', '')
          sectionIdToNavIndex.set(id, navIndex)
        })

        // Get all sections in DOM order (not menu order)
        const allSections = navItems
          .map((item) => {
            const id = item.href.replace('#', '')
            const element = document.getElementById(id)
            return element ? { element, id } : null
          })
          .filter(Boolean) as Array<{ element: HTMLElement; id: string }>

        if (allSections.length === 0) {
          ticking = false
          return
        }

        // Sort sections by their actual DOM position (offsetTop)
        // This ensures we check sections in the order they appear on the page
        allSections.sort((a, b) => a.element.offsetTop - b.element.offsetTop)

        const scrollPosition = window.scrollY + window.innerHeight / 3
        let activeNavIndex = 0 // Default to Home

        // Find the active section by checking from bottom to top
        // This ensures we get the section the user is currently viewing
        for (let i = allSections.length - 1; i >= 0; i--) {
          const { element: section, id } = allSections[i]
          const sectionTop = section.offsetTop

          if (scrollPosition >= sectionTop - 100) {
            // Get the correct navIndex from the map using the section ID
            const navIndex = sectionIdToNavIndex.get(id)
            if (navIndex !== undefined) {
              activeNavIndex = navIndex
            }
            break
          }
        }

        setActiveIndex(activeNavIndex)
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
    <nav className="no-print no-pdf fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-4">
      <div className="notebook-panel paper-texture relative mx-4 flex w-full max-w-sm items-center gap-1 rounded-lg px-2 py-2 shadow-paper-lg md:w-fit md:max-w-none md:gap-2 md:px-4 md:py-3">
        {/* Sliding indicator */}
        <div
          className="absolute bottom-2 top-2 rounded-lg border border-notebook-divider bg-accent/20 transition-all duration-500 ease-out"
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
                const element = document.getElementById(
                  item.href.replace('#', '')
                )
                if (element) {
                  const offsetPosition =
                    element.getBoundingClientRect().top +
                    window.pageYOffset -
                    20

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                  })
                }
              }}
              className={cn(
                'relative z-10 flex items-center justify-center gap-1.5 md:gap-2',
                'rounded-lg p-2.5 transition-all duration-200 md:px-4 md:py-2.5',
                'flex-1 md:flex-none',
                isActive
                  ? 'text-accent'
                  : 'text-foreground/60 hover:text-foreground'
              )}
              aria-label={item.label}
            >
              <Icon
                className={cn(
                  'h-5 w-5 flex-shrink-0 transition-transform duration-200 md:h-5 md:w-5',
                  isActive && 'scale-110'
                )}
              />
              <span className="hidden whitespace-nowrap text-xs font-medium md:inline md:text-sm">
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
