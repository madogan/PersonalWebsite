import { cn } from '@/lib/utils'

type ResumeSectionProps = {
  title: string
  children: React.ReactNode
  className?: string
}

export function ResumeSection({ title, children, className }: ResumeSectionProps) {
  return (
    <section className={cn('mb-12', className)}>
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-foreground border-b-2 border-notebook-divider pencil-divider pb-3">
        {title}
      </h2>
      <div className="space-y-4 md:space-y-6">{children}</div>
    </section>
  )
}

