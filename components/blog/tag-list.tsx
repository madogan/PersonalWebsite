import { cn } from '@/lib/utils'

type TagListProps = {
  tags: string[]
  className?: string
}

export function TagList({ tags, className }: TagListProps) {
  if (!tags || tags.length === 0) {
    return null
  }

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {tags.map((tag) => (
        <span
          key={tag}
          className={cn(
            'rounded-md px-2 py-1 text-xs font-medium',
            'bg-accent/10 text-accent',
            'border border-accent/20', /* Use clean border with subtle accent */
            'transition-colors duration-200'
          )}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}
