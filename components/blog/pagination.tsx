'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage > 3) {
        pages.push('...')
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('...')
      }

      // Always show last page
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
      // Scroll to top of blog list
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
      // Scroll to top of blog list
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page)
      // Scroll to top of blog list
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <nav
      className="mt-12 flex items-center justify-center gap-2"
      aria-label="Blog pagination"
    >
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={cn(
          'notebook-panel rounded-lg px-4 py-2',
          'transition-all duration-200',
          'flex items-center gap-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'hover:scale-[0.98] hover:border-accent/30 hover:bg-accent/10 active:scale-[0.96]',
          'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
          'shadow-paper-sm hover:shadow-paper-md',
          currentPage === 1
            ? 'text-foreground/40'
            : 'text-foreground hover:text-accent'
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 py-2 text-foreground/40"
              >
                ...
              </span>
            )
          }

          const pageNum = page as number
          const isActive = pageNum === currentPage

          return (
            <button
              key={pageNum}
              onClick={() => handlePageClick(pageNum)}
              className={cn(
                'notebook-panel min-w-[2.5rem] rounded-lg px-4 py-2',
                'transition-all duration-200',
                'font-medium',
                'hover:scale-[0.98] hover:border-accent/30 hover:bg-accent/10 active:scale-[0.96]',
                'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
                'shadow-paper-sm hover:shadow-paper-md',
                isActive
                  ? 'border-accent/40 bg-accent/20 text-accent shadow-paper-md'
                  : 'text-foreground hover:text-accent'
              )}
              aria-label={`Go to page ${pageNum}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNum}
            </button>
          )
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={cn(
          'notebook-panel rounded-lg px-4 py-2',
          'transition-all duration-200',
          'flex items-center gap-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'hover:scale-[0.98] hover:border-accent/30 hover:bg-accent/10 active:scale-[0.96]',
          'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
          'shadow-paper-sm hover:shadow-paper-md',
          currentPage === totalPages
            ? 'text-foreground/40'
            : 'text-foreground hover:text-accent'
        )}
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  )
}
