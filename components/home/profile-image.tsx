'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

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

  // Determine which image to use based on theme
  const isDark = resolvedTheme === 'dark'
  const imageSrc = isDark ? '/images/profile_dark.png' : '/images/profile_light.png'

  return (
    <div className="relative z-10 flex items-center justify-center h-full w-full">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Square glassmorphism container - image aligned to bottom, spacing on top */}
        <div className="relative w-full">
          {/* Glassy square container with same radius as menu (rounded-2xl) */}
          <div className="relative w-full rounded-2xl backdrop-blur-lg bg-glass-bg border border-glass-border shadow-xl">
            {/* Container with top padding and image at bottom */}
            <div className="relative w-full pt-[8%] flex flex-col">
              {/* Image with same border radius as menu (rounded-2xl) - aligned to bottom */}
              <div className="relative w-full flex items-end justify-center">
                <Image
                  src={imageSrc}
                  alt={`${name} - ${title}`}
                  width={2400}
                  height={3000}
                  className="object-contain w-full h-full max-h-[80vh] lg:max-h-none rounded-2xl transition-opacity duration-300"
                  priority
                  quality={100}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

