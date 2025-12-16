import Link from 'next/link'
import { ArrowRight, LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import React from 'react'

type GlassyButtonProps = {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  icon?: LucideIcon | boolean
  variant?: 'default' | 'subtle'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  animated?: boolean
}

export function GlassyButton({
  href,
  onClick,
  children,
  icon = true,
  variant = 'default',
  size = 'md',
  className,
  animated = true,
}: GlassyButtonProps) {
  const IconComponent = typeof icon === 'boolean' ? (icon ? ArrowRight : undefined) : icon

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const iconSizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  }

  const variantClasses = {
    default: 'bg-glass-bg border-glass-border text-foreground hover:bg-glass-bg/80 hover:border-accent/40',
    subtle: 'bg-accent/10 border-accent/20 text-accent hover:bg-accent/20 hover:border-accent/40',
  }

  const baseClasses = cn(
    'relative inline-flex items-center gap-2 rounded-xl font-medium',
    'backdrop-blur-lg border',
    'transition-all duration-300',
    'hover:scale-105',
    'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
    'overflow-hidden',
    '[box-shadow:var(--shadow-accent-lg)]',
    'hover:[box-shadow:var(--shadow-accent-xl)]',
    sizeClasses[size],
    variantClasses[variant],
    className
  )

  const content = (
    <>
      {/* Animated liquid blobs background */}
      {animated && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-10 -right-10 w-32 h-32 bg-accent-cyan rounded-full blur-2xl opacity-20 animate-liquid-float"
            style={{ animationDuration: '8s' }}
          />
          <div
            className="absolute top-1/2 -left-10 w-24 h-24 bg-accent-secondary rounded-full blur-2xl opacity-20 animate-liquid-float"
            style={{ animationDuration: '10s', animationDelay: '1.5s' }}
          />
          <div
            className="absolute -bottom-10 right-1/3 w-20 h-20 bg-accent rounded-full blur-2xl opacity-20 animate-liquid-float"
            style={{ animationDuration: '12s', animationDelay: '3s' }}
          />
        </div>
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {IconComponent && (
          <IconComponent className={cn(
            iconSizes[size],
            'transition-transform duration-200',
            'group-hover:translate-x-1'
          )} />
        )}
      </span>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={cn(baseClasses, 'group')}>
        {content}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={cn(baseClasses, 'group')} type="button">
      {content}
    </button>
  )
}

