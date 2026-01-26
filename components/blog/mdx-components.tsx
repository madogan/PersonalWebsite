import type { MDXComponents } from 'mdx/types'
import { cn } from '@/lib/utils'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ className, ...props }) => (
      <h1
        className={cn(
          'mb-4 mt-8 text-4xl font-bold tracking-tight md:text-5xl',
          'text-left font-serif text-foreground',
          className
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          'mb-4 mt-8 text-3xl font-bold tracking-tight md:text-4xl',
          'text-left font-serif text-foreground',
          className
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          'mb-3 mt-6 text-2xl font-semibold tracking-tight md:text-3xl',
          'text-left font-serif text-foreground',
          className
        )}
        {...props}
      />
    ),
    h4: ({ className, ...props }) => (
      <h4
        className={cn(
          'mb-2 mt-4 text-xl font-semibold md:text-2xl',
          'text-left font-serif text-foreground',
          className
        )}
        {...props}
      />
    ),
    p: ({ className, ...props }) => (
      <p
        className={cn(
          'mb-4 text-base leading-7 text-foreground/90',
          'text-left font-sans',
          className
        )}
        {...props}
      />
    ),
    a: ({ className, ...props }) => (
      <a
        className={cn(
          'text-accent-cyan underline decoration-accent-cyan underline-offset-4 hover:text-accent-cyan/80',
          'transition-colors duration-200',
          'font-medium',
          className
        )}
        {...props}
      />
    ),
    ul: ({ className, ...props }) => (
      <ul
        className={cn(
          'mb-4 list-outside list-disc space-y-2 text-foreground/90',
          'pl-6',
          className
        )}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={cn(
          'mb-4 list-outside list-decimal space-y-2 text-foreground/90',
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
          'my-4 border-l border-notebook-divider py-2 pl-4',
          'rounded-r-md bg-accent/5 italic text-foreground/80',
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
          'mb-4 overflow-x-auto rounded-lg bg-foreground/5 p-4',
          'border border-notebook-divider font-mono',
          className
        )}
        {...props}
      />
    ),
    hr: ({ className, ...props }) => (
      <hr className={cn('pencil-divider my-8', className)} {...props} />
    ),
    img: ({ className, ...props }) => (
      <img className={cn('my-4 rounded-lg', className)} {...props} />
    ),
    ...components,
  }
}
