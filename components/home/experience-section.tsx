import { getResumeData } from '@/lib/resume'
import { ResumeSection } from '@/components/resume/resume-section'
import { ExperienceItem } from '@/components/resume/experience-item'

export function ExperienceSection() {
  const resume = getResumeData()

  return (
    <section id="experience" className="py-12 md:py-20 lg:py-32 pb-20 md:pb-24">
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

