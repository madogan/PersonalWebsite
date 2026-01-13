import type { MDXComponents } from 'mdx/types'
import { cn } from '@/lib/utils'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ className, ...props }) => (
      <h1
        className={cn(
          'text-4xl md:text-5xl font-bold tracking-tight mt-8 mb-4',
          'text-foreground text-left',
          className
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          'text-3xl md:text-4xl font-bold tracking-tight mt-8 mb-4',
          'text-foreground border-b border-glass-border pb-2 text-left',
          className
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          'text-2xl md:text-3xl font-semibold tracking-tight mt-6 mb-3',
          'text-foreground text-left',
          className
        )}
        {...props}
      />
    ),
    h4: ({ className, ...props }) => (
      <h4
        className={cn(
          'text-xl md:text-2xl font-semibold mt-4 mb-2',
          'text-foreground text-left',
          className
        )}
        {...props}
      />
    ),
    p: ({ className, ...props }) => (
      <p
        className={cn(
          'text-base leading-7 mb-4 text-foreground/90',
          'text-left',
          className
        )}
        {...props}
      />
    ),
    a: ({ className, ...props }) => (
      <a
        className={cn(
          'text-accent hover:text-accent-cyan underline underline-offset-4',
          'transition-colors duration-200',
          className
        )}
        {...props}
      />
    ),
    ul: ({ className, ...props }) => (
      <ul
        className={cn(
          'list-disc list-outside mb-4 space-y-2 text-foreground/90',
          'pl-6',
          className
        )}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={cn(
          'list-decimal list-outside mb-4 space-y-2 text-foreground/90',
          'pl-6',
          className
        )}
        {...props}
      />
    ),
    li: ({ className, ...props }) => (
      <li className={cn('leading-7', className)} {...props} />
    ),
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          'border-l-4 border-accent pl-4 py-2 my-4',
          'bg-accent/5 rounded-r-md italic text-foreground/80',
          className
        )}
        {...props}
      />
    ),
    code: ({ className, ...props }) => (
      <code
        className={cn(
          'relative rounded bg-foreground/10 px-[0.3rem] py-[0.2rem]',
          'font-mono text-sm text-foreground',
          className
        )}
        {...props}
      />
    ),
    pre: ({ className, ...props }) => (
      <pre
        className={cn(
          'overflow-x-auto rounded-lg bg-foreground/5 p-4 mb-4',
          'border border-glass-border',
          className
        )}
        {...props}
      />
    ),
    hr: ({ className, ...props }) => (
      <hr
        className={cn(
          'my-8 border-t border-glass-border',
          className
        )}
        {...props}
      />
    ),
    img: ({ className, ...props }) => (
      <img
        className={cn('rounded-lg my-4', className)}
        {...props}
      />
    ),
    ...components,
  }
}

