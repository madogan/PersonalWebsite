import { getResumeData } from '@/lib/resume'
import { ResumeSection } from '@/components/resume/resume-section'

export function SkillsSection() {
  const resume = getResumeData()

  if (!resume.coreSkills) return null

  return (
    <section id="skills" className="py-8 md:py-12 lg:py-16 pb-12 md:pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <ResumeSection title="Core Skills">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {Object.entries(resume.coreSkills).map(([category, items]) => (
                <div key={category} className="glass-card p-4 sm:p-6 md:p-8">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground mb-3 md:mb-4 capitalize">
                    {category === 'aiMlops' ? 'AI / MLOps Systems (Infrastructure-Level)' : category === 'reliability' ? 'Reliability & Observability' : category === 'cloud' ? 'Cloud & Infrastructure' : 'Programming & Automation'}
                  </h3>
                  <ul className="list-disc list-inside space-y-2 md:space-y-2.5 text-foreground/90 ml-4">
                    {items.map((item, index) => (
                      <li key={index} className="leading-6 md:leading-7 text-xs sm:text-sm md:text-base">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ResumeSection>
        </div>
      </div>
    </section>
  )
}

