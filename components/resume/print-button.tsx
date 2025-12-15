'use client'

import { Download } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PrintButton() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <button
      onClick={handlePrint}
      className={cn(
        'flex items-center gap-3 text-foreground/70 hover:text-accent transition-colors group'
      )}
    >
      <div className="p-2 rounded-lg bg-foreground/5 group-hover:bg-accent/10 transition-colors">
        <Download className="h-4 w-4" />
      </div>
      <span className="truncate">Print Resume</span>
    </button>
  )
}

