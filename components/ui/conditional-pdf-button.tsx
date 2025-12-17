'use client'

import { usePathname } from 'next/navigation'
import { PdfDownloadButton } from './pdf-download-button'

export function ConditionalPdfButton() {
  const pathname = usePathname()
  
  // Hide PDF button on blog detail pages
  if (pathname?.startsWith('/blog/') && pathname !== '/blog') {
    return null
  }

  return (
    <div className="fixed top-4 left-4 z-50 no-print">
      <PdfDownloadButton />
    </div>
  )
}

