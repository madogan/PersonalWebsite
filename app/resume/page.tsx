import React from 'react'
import { getResumeData, getSkillCategoryTitle } from '@/lib/resume'
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
          <div className="relative p-6 md:p-8 rounded-xl overflow-hidden bg-accent/95 backdrop-blur-sm border border-accent shadow-xl">
            {/* Liquid animation background with gradient */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent via-accent-cyan to-accent-secondary"></div>
            </div>
            
            {/* Animated liquid blobs */}
            <div className="absolute inset-0 overflow-hidden">
              <div 
                className="absolute -top-20 -right-20 w-96 h-96 bg-accent-cyan rounded-full blur-3xl animate-liquid-float"
                style={{ animationDuration: '8s' }}
              ></div>
              <div 
                className="absolute top-1/2 -left-20 w-80 h-80 bg-accent-secondary rounded-full blur-3xl animate-liquid-float"
                style={{ animationDuration: '10s', animationDelay: '1.5s' }}
              ></div>
              <div 
                className="absolute -bottom-20 right-1/3 w-72 h-72 bg-accent rounded-full blur-3xl animate-liquid-float"
                style={{ animationDuration: '12s', animationDelay: '3s' }}
              ></div>
            </div>
            
            {/* Content with high contrast */}
            <div className="relative z-10">
              <p className="text-xs sm:text-sm md:text-base leading-6 md:leading-7 text-white font-medium drop-shadow-md whitespace-normal">
                {(() => {
                  const parts = resume.summary.split('Senior Site Reliability Engineer')
                  const highlightedText = (
                    <span className="relative font-bold px-2 py-1 rounded-md inline-block">
                      <span className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-md border border-white/30"></span>
                      <span 
                        className="relative bg-gradient-to-r from-[#00A8A8] via-[#00CED1] to-[#40E0D0] bg-clip-text text-transparent"
                        style={{
                          textShadow: '0 0 8px rgba(0, 206, 209, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3)',
                          WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.3)',
                        }}
                      >
                        Senior Site Reliability Engineer
                      </span>
                    </span>
                  )
                  
                  const elements: React.ReactNode[] = []
                  
                  // If text starts with the highlighted phrase, show it first
                  if (parts[0] === '') {
                    elements.push(
                      <React.Fragment key="highlight-start">
                        {highlightedText}
                      </React.Fragment>
                    )
                  }
                  
                  // Process all parts
                  parts.forEach((part, index) => {
                    // Add text part if it exists and is not empty
                    if (part.trim()) {
                      elements.push(<span key={`text-${index}`} className="text-white">{part}</span>)
                    }
                    
                    // Add highlighted phrase between parts (after current part, before next part)
                    // Only if there's a next part and current part is not empty
                    if (index < parts.length - 1 && part.trim()) {
                      elements.push(
                        <React.Fragment key={`highlight-${index}`}>
                          {highlightedText}
                        </React.Fragment>
                      )
                    }
                  })
                  
                  return elements
                })()}
              </p>
            </div>
          </div>
        </ResumeSection>

        {/* Core Skills */}
        {resume.coreSkills && (
          <ResumeSection title="Core Skills">
            {(() => {
              const skillEntries = Object.entries(resume.coreSkills)

              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
                  {skillEntries.map(([category, items], index) => {
                    // First 2 cards: span 3 columns each (3+3 = 6) - Row 1
                    // Last 3 cards: span 2 columns each (2+2+2 = 6) - Row 2
                    const colSpan = index < 2 
                      ? 'lg:col-span-3' 
                      : 'lg:col-span-2'
                    return (
                      <div
                        key={category}
                        className={`glass-card p-6 md:p-8 flex flex-col ${colSpan}`}
                      >
                        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4">
                          {getSkillCategoryTitle(category)}
                        </h3>
                        <ul className="list-disc list-inside space-y-2.5 text-foreground/90 ml-4 flex-1">
                          {items.map((item, index) => (
                            <li key={index} className="leading-7 text-sm md:text-base">{item}</li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              )
            })()}
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

