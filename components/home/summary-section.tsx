import { getResumeData } from '@/lib/resume'
import { ResumeSection } from '@/components/resume/resume-section'

export function SummarySection() {
  const resume = getResumeData()

  return (
    <section id="summary" className="py-12 md:py-20 lg:py-32 pb-20 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <ResumeSection title="Professional Summary">
            <div className="glass-card p-4 sm:p-6 md:p-8">
              <p className="text-xs sm:text-sm md:text-base leading-6 md:leading-7 text-foreground/90">{resume.summary}</p>
            </div>
          </ResumeSection>
        </div>
      </div>
    </section>
  )
}

