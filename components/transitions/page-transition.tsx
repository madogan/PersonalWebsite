'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

type PageTransitionProps = {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)

  useEffect(() => {
    setIsTransitioning(true)
    
    const timer = setTimeout(() => {
      setDisplayChildren(children)
      setIsTransitioning(false)
    }, 150) // Half of transition duration

    return () => clearTimeout(timer)
  }, [pathname, children])

  return (
    <div
      className={cn(
        'transition-opacity duration-300 ease-in-out',
        isTransitioning ? 'opacity-0' : 'opacity-100'
      )}
    >
      {displayChildren}
    </div>
  )
}
