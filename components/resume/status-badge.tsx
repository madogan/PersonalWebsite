import { Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

type StatusBadgeProps = {
  text?: string
  variant?: 'available' | 'busy' | 'away'
}

export function StatusBadge({
  text = 'Open to work',
  variant = 'available',
}: StatusBadgeProps) {
  const colorClasses = {
    available: 'text-accent',
    busy: 'text-red-500',
    away: 'text-yellow-500',
  }

  return (
    <div className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80">
      <Circle className={cn('h-2 w-2 fill-current', colorClasses[variant])} />
      <span>{text}</span>
    </div>
  )
}
