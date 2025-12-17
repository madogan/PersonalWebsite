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
        className="text-accent hover:text-accent/80 underline transition-colors"
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
    <div className="glass-card p-4 sm:p-6 md:p-8 mb-4 md:mb-6 hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 md:mb-6">
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2">
            {position}
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-accent font-semibold mb-2">{company}</p>
          {/* Mobile: location and date together */}
          <div className="flex items-center gap-2 md:hidden">
            <span className="inline-block px-2 py-1 bg-foreground/5 rounded-md text-xs sm:text-sm text-foreground/70">
              {location}
            </span>
            <span className="inline-block px-2 py-1 bg-foreground/5 rounded-md text-xs sm:text-sm text-foreground/70">
              {startDate} - {endDate}
            </span>
          </div>
          {/* Desktop: location only */}
          <p className="hidden md:block text-xs sm:text-sm text-foreground/60">
            <span className="inline-block px-2 py-1 md:px-3 md:py-1 bg-foreground/5 rounded-md text-xs sm:text-sm text-foreground/70">
              {location}
            </span>
          </p>
        </div>
        {/* Desktop: date on the right */}
        <div className="hidden md:block text-xs sm:text-sm md:text-base font-semibold text-foreground/70 mt-2 md:mt-0 md:text-right md:ml-4">
          <span className="inline-block px-2 py-1 md:px-3 md:py-1 bg-foreground/5 rounded-md text-xs sm:text-sm">
            {startDate} - {endDate}
          </span>
        </div>
      </div>
      
      <ul className="list-disc list-inside space-y-2 md:space-y-3 text-foreground/90 ml-4">
        {description.map((item, index) => (
          <li key={index} className="leading-6 md:leading-7 text-xs sm:text-sm md:text-base">
            {parseLinks(item)}
          </li>
        ))}
      </ul>
      
      {note && (
        <div className="mt-4 md:mt-6 p-3 md:p-4 bg-accent/10 border-l-4 border-accent rounded-r-lg">
          <p className="text-xs sm:text-sm text-foreground/80 italic leading-5 md:leading-6">{parseLinks(note)}</p>
        </div>
      )}
    </div>
  )
}

