import React from 'react'
import { cn } from '@/lib/utils'

type ExperienceItemProps = {
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  description: string[]
  note?: string
}

// Function to parse markdown-style links [text](url) and convert to JSX
function parseLinks(text: string): React.ReactNode {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index))
    }

    // Add the link
    parts.push(
      <a
        key={match.index}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline transition-colors hover:text-accent/80"
      >
        {match[1]}
      </a>
    )

    lastIndex = match.index + match[0].length
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }

  return parts.length > 0 ? parts : text
}

export function ExperienceItem({
  company,
  position,
  location,
  startDate,
  endDate,
  description,
  note,
}: ExperienceItemProps) {
  return (
    <div className="loose-leaf-card paper-texture mb-6 p-6 md:p-8">
      <div className="mb-6 flex flex-col md:flex-row md:items-start md:justify-between">
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-bold text-foreground sm:text-xl md:text-2xl">
            {position}
          </h3>
          <p className="mb-2 text-base font-semibold text-accent sm:text-lg md:text-xl">
            {company}
          </p>
          {/* Mobile: location and date together */}
          <div className="flex items-center gap-2 md:hidden">
            <span
              className={cn(
                'm-0 rounded-none border-0 bg-transparent p-0',
                'text-xs text-foreground/70 sm:text-sm'
              )}
            >
              {location}
            </span>
            <span
              className={cn(
                'm-0 rounded-none border-0 bg-transparent p-0',
                'text-xs text-foreground/70 sm:text-sm'
              )}
            >
              {startDate} - {endDate}
            </span>
          </div>
          {/* Desktop: location only */}
          <p
            className={cn(
              'm-0 rounded-none border-0 bg-transparent p-0',
              'hidden text-xs text-foreground/70 sm:text-sm md:block'
            )}
          >
            {location}
          </p>
        </div>
        {/* Desktop: date on the right */}
        <div
          className={cn(
            'rounded-none border-0 bg-transparent p-0',
            'mt-2 hidden text-xs font-semibold text-foreground/70 sm:text-sm md:ml-4 md:mt-0 md:block md:text-right md:text-base'
          )}
        >
          {startDate} - {endDate}
        </div>
      </div>

      <ul className="ml-4 list-inside list-disc space-y-2 text-foreground/90 md:space-y-3">
        {description.map((item, index) => (
          <li
            key={index}
            className="text-xs leading-6 sm:text-sm md:text-base md:leading-7"
          >
            {parseLinks(item)}
          </li>
        ))}
      </ul>

      {note && (
        <div className="mt-4 rounded-r-lg handwriting-border-l handwriting-border-l-accent bg-accent/10 p-3 md:mt-6 md:p-4">
          <p className="text-xs italic leading-5 text-foreground/80 sm:text-sm md:leading-6">
            {parseLinks(note)}
          </p>
        </div>
      )}
    </div>
  )
}
