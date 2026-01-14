import { getResumeData } from '@/lib/resume'
import { ResumeSection } from '@/components/resume/resume-section'

export function SummarySection() {
  const resume = getResumeData()

  return (
    <section id="summary" className="py-12 pb-20 md:py-20 md:pb-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <ResumeSection title="Professional Summary">
            <div className="loose-leaf-card paper-texture p-6 md:p-8">
              <p className="text-xs leading-6 text-foreground/90 sm:text-sm md:text-base md:leading-7">
                {resume.summary}
              </p>
            </div>
          </ResumeSection>
        </div>
      </div>
    </section>
  )
}
