import { getResumeData } from '@/lib/resume'
import { ResumeSection } from '@/components/resume/resume-section'
import { ExperienceItem } from '@/components/resume/experience-item'
import { ResumeHeader } from '@/components/resume/resume-header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Professional resume and experience of Muhammed Ali Doğan, Senior Site Reliability Engineer',
}

export default function ResumePage() {
  const resume = getResumeData()

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-5xl mx-auto">
        {/* Enhanced Header with Status Badge */}
        <ResumeHeader personal={resume.personal} />

        {/* Professional Summary */}
        <ResumeSection title="Professional Summary">
          <div className="glass-card p-6 md:p-8">
            <p className="text-base md:text-lg leading-8 text-foreground/90">{resume.summary}</p>
          </div>
        </ResumeSection>

        {/* Core Skills */}
        {resume.coreSkills && (
          <ResumeSection title="Core Skills">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(resume.coreSkills).map(([category, items]) => (
                <div key={category} className="glass-card p-6 md:p-8">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4 capitalize">
                    {category === 'aiMlops' ? 'AI / MLOps Systems (Infrastructure-Level)' : category === 'reliability' ? 'Reliability & Observability' : category === 'cloud' ? 'Cloud & Infrastructure' : 'Programming & Automation'}
                  </h3>
                  <ul className="list-disc list-inside space-y-2.5 text-foreground/90 ml-4">
                    {items.map((item, index) => (
                      <li key={index} className="leading-7 text-sm md:text-base">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {/* Professional Experience */}
        <ResumeSection title="Professional Experience">
          {resume.experience.map((exp, index) => (
            <ExperienceItem key={index} {...exp} />
          ))}
        </ResumeSection>

        {/* Education */}
        <ResumeSection title="Education">
          {resume.education.map((edu, index) => (
            <div key={index} className="glass-card p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">{edu.degree}</h3>
              <p className="text-lg md:text-xl text-accent font-semibold mb-3">{edu.institution}</p>
              <div className="flex items-center gap-4 text-sm md:text-base text-foreground/60">
                <span>{edu.location}</span>
                {edu.gpa && (
                  <span className="px-3 py-1 bg-foreground/5 rounded-md font-medium">
                    GPA: {edu.gpa}
                  </span>
                )}
              </div>
            </div>
          ))}
        </ResumeSection>

        {/* Certifications */}
        <ResumeSection title="Certifications">
          {resume.certifications.map((cert, index) => (
            <div key={index} className="glass-card p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">{cert.name}</h3>
              {cert.version && (
                <p className="text-sm md:text-base text-foreground/60 mb-1">{cert.version}</p>
              )}
              <p className="text-sm md:text-base text-foreground/60">{cert.issuer}</p>
            </div>
          ))}
        </ResumeSection>

        {/* AI / MLOps Experience */}
        {resume.aiMlopsExperience && (
          <ResumeSection title={resume.aiMlopsExperience.title}>
            <div className="glass-card p-6 md:p-8">
              <ul className="list-disc list-inside space-y-3 text-foreground/90 ml-4">
                {resume.aiMlopsExperience.description.map((item, index) => (
                  <li key={index} className="leading-7 text-base md:text-lg">{item}</li>
                ))}
              </ul>
            </div>
          </ResumeSection>
        )}
      </div>
    </div>
  )
}

