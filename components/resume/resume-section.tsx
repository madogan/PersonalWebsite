import { cn } from '@/lib/utils'

type ResumeSectionProps = {
  title: string
  children: React.ReactNode
  className?: string
}

export function ResumeSection({
  title,
  children,
  className,
}: ResumeSectionProps) {
  return (
    <section className={cn('mb-12', className)}>
      <h2 className="pencil-divider mb-6 border-b-2 border-notebook-divider pb-3 text-xl font-bold text-foreground sm:text-2xl md:text-3xl lg:text-4xl">
        {title}
      </h2>
      <div className="space-y-4 md:space-y-6">{children}</div>
    </section>
  )
}
