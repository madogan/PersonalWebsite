import { getResumeData } from '@/lib/resume'
import { ResumeSection } from '@/components/resume/resume-section'
import { ExperienceItem } from '@/components/resume/experience-item'

export function ExperienceSection() {
  const resume = getResumeData()

  return (
    <section id="experience" className="py-8 md:py-12 lg:py-16 pb-12 md:pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
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

