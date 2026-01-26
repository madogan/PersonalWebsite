import { cn } from '@/lib/utils'
import { getSkillCategoryTitle } from '@/lib/resume'

type SkillsGridProps = {
  skills: {
    [key: string]: string[]
  }
}

export function SkillsGrid({ skills }: SkillsGridProps) {
  const skillCategories = Object.entries(skills)

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {skillCategories.map(([category, items]) => (
        <div
          key={category}
          className="loose-leaf-card paper-texture p-6 md:p-8"
        >
          <h3 className="mb-4 text-lg font-semibold text-foreground md:text-xl">
            {getSkillCategoryTitle(category)}
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {items.map((skill, index) => (
              <span
                key={index}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-sm font-medium',
                  'bg-accent/10 text-accent',
                  'handwriting-border handwriting-border-accent', /* Use handwriting border */
                  'transition-colors hover:bg-accent/20'
                )}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
