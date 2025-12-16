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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {skillCategories.map(([category, items]) => (
        <div key={category} className="glass-card p-6 md:p-8 hover:scale-[1.02] transition-transform duration-300">
          <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4">
            {getSkillCategoryTitle(category)}
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {items.map((skill, index) => (
              <span
                key={index}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-lg',
                  'bg-accent/10 text-accent',
                  'border border-accent/20',
                  'hover:bg-accent/20 hover:border-accent/40 transition-colors'
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

