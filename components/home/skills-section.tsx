import { getResumeData, getSkillCategoryTitle } from '@/lib/resume'
import { ResumeSection } from '@/components/resume/resume-section'

export function SkillsSection() {
  const resume = getResumeData()

  if (!resume.coreSkills) return null

  const skillEntries = Object.entries(resume.coreSkills)

  return (
    <section id="skills" className="py-8 pb-12 md:py-12 md:pb-16 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <ResumeSection title="Core Skills">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-6">
              {skillEntries.map(([category, items], index) => {
                // First 2 cards: span 3 columns each (3+3 = 6) - Row 1
                // Last 3 cards: span 2 columns each (2+2+2 = 6) - Row 2
                const colSpan = index < 2 ? 'lg:col-span-3' : 'lg:col-span-2'
                return (
                  <div
                    key={category}
                    className={`loose-leaf-card flex flex-col p-6 md:p-8 ${colSpan} paper-texture`}
                  >
                    <h3 className="mb-4 text-base font-semibold text-foreground sm:text-lg md:text-xl">
                      {getSkillCategoryTitle(category)}
                    </h3>
                    <ul className="ml-4 flex-1 list-inside list-disc space-y-2 text-foreground/90 md:space-y-2.5">
                      {items.map((item, index) => (
                        <li
                          key={index}
                          className="text-xs leading-6 sm:text-sm md:text-base md:leading-7"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </ResumeSection>
        </div>
      </div>
    </section>
  )
}
