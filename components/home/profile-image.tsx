'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type ProfileImageProps = {
  name: string
  title: string
}

export function ProfileImage({ name, title }: ProfileImageProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Use light image by default until mounted to avoid flash
  const imageSrc = mounted && resolvedTheme === 'dark' 
    ? '/images/profile_dark.jpg' 
    : '/images/profile_light.jpg'

  return (
    <div className="relative z-10 flex items-center justify-center">
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px]">
        {/* Dramatic lighting overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 rounded-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full" />
        
        {/* Profile Image */}
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl">
          <Image
            key={resolvedTheme} // Force re-render on theme change
            src={imageSrc}
            alt={`${name} - ${title}`}
            fill
            className={cn(
              'object-cover object-center transition-opacity duration-500',
              mounted ? 'opacity-100' : 'opacity-0'
            )}
            priority
            sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, (max-width: 1024px) 384px, 400px"
            style={{
              filter: 'contrast(1.1) brightness(0.95)',
            }}
          />
        </div>
        
        {/* Accent border glow */}
        <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-gradient-to-br from-accent/30 via-accent-cyan/20 to-transparent rounded-full blur-xl opacity-50" />
      </div>
    </div>
  )
}

