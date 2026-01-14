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
  const IconComponent =
    typeof icon === 'boolean' ? (icon ? ArrowRight : undefined) : icon

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
    default:
      'bg-background border-notebook-divider text-foreground hover:bg-background/95 hover:border-accent/40',
    subtle:
      'bg-accent/10 border-accent/20 text-accent hover:bg-accent/20 hover:border-accent/40',
  }

  const baseClasses = cn(
    'relative inline-flex items-center gap-2 rounded-lg font-medium',
    'border',
    'transition-all duration-200',
    'hover:scale-[0.98] active:scale-[0.96]',
    'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
    'overflow-hidden',
    'shadow-paper-md',
    'hover:shadow-paper-lg active:shadow-paper-sm',
    sizeClasses[size],
    variantClasses[variant],
    className
  )

  const content = (
    <>
      {/* Paper texture overlay */}
      <div className="paper-texture pointer-events-none absolute inset-0 opacity-30" />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {IconComponent && (
          <IconComponent
            className={cn(
              iconSizes[size],
              'transition-transform duration-200',
              'group-hover:translate-x-1'
            )}
          />
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
    <button
      onClick={onClick}
      className={cn(baseClasses, 'group')}
      type="button"
    >
      {content}
    </button>
  )
}
