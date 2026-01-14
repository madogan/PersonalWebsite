import { getResumeData } from '@/lib/resume'
import { ResumeSection } from '@/components/resume/resume-section'
import { ExperienceItem } from '@/components/resume/experience-item'

export function ExperienceSection() {
  const resume = getResumeData()

  return (
    <section id="experience" className="py-8 pb-12 md:py-12 md:pb-16 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <ResumeSection title="Professional Experience">
            {resume.experience.map((exp, index) => (
              <ExperienceItem key={index} {...exp} />
            ))}
          </ResumeSection>
        </div>
      </div>
    </section>
  )
}
