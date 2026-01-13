import { getResumeData } from '@/lib/resume'
import { MapPin, Linkedin, Github } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function PersonalHero() {
  const resume = getResumeData()
  const personal = resume.personal

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pb-12 md:pb-16 paper-texture">
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 md:space-y-6 lg:space-y-8 animate-fade-in text-center">
              {/* Name */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-tight">
                {personal.name}
              </h1>

              {/* Divider */}
              <div className="pencil-divider max-w-md mx-auto" />

              {/* Short Description */}
              <div className="space-y-4 text-base sm:text-lg md:text-xl text-foreground/70 leading-relaxed max-w-3xl mx-auto">
                {(() => {
                  const summary = resume.summary
                  // Split point: after "With a strong background in observability, incident response, and deep system analysis, I approach AI workloads from a production-first perspective—prioritizing predictability, debuggability, and scalability over experimentation."
                  const splitPoint = summary.indexOf('With a strong')
                  
                  const firstParagraph = summary.substring(0, splitPoint).trim()
                  const secondParagraph = summary.substring(splitPoint).trim()
                  
                  // Process first paragraph
                  const firstWords = firstParagraph.split(' ')
                  const firstFourWords = firstWords.slice(0, 4).join(' ')
                  const firstRemainingText = firstWords.slice(4).join(' ')
                  
                  return (
                    <>
                      {/* First Paragraph */}
                      <p className="text-justify md:text-center">
                        <span className="relative inline-block align-middle px-2 py-1 rounded-md bg-accent/10 border border-accent/20 text-accent font-medium animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                          {firstFourWords}
                        </span>
                        {firstRemainingText && ` ${firstRemainingText}`}
                      </p>
                      
                      {/* Second Paragraph */}
                      <p className="text-justify md:text-center">
                        {secondParagraph}
                      </p>
                    </>
                  )
                })()}
              </div>

              {/* Divider */}
              <div className="pencil-divider max-w-md mx-auto" />

              {/* Contact Info - All devices */}
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs sm:text-sm md:text-base pt-4 md:pt-6">
                <div className="flex items-center gap-2 md:gap-3 text-foreground/70">
                  <div className="h-8 w-8 md:h-9 md:w-9 flex items-center justify-center rounded-lg bg-foreground/5 border border-notebook-divider">
                    <MapPin className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  </div>
                  <span>{personal.location}</span>
                </div>

                {personal.linkedin && (
                  <Link
                    href={`https://${personal.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 md:gap-3 text-foreground/70 hover:text-accent transition-colors group"
                  >
                    <div className="h-8 w-8 md:h-9 md:w-9 flex items-center justify-center rounded-lg bg-foreground/5 border border-notebook-divider group-hover:bg-accent/10 group-hover:border-accent/30 transition-colors">
                      <Linkedin className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    </div>
                    <span className="hidden sm:inline">LinkedIn</span>
                  </Link>
                )}

                {personal.github && (
                  <Link
                    href={`https://${personal.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 md:gap-3 text-foreground/70 hover:text-accent transition-colors group"
                  >
                    <div className="h-8 w-8 md:h-9 md:w-9 flex items-center justify-center rounded-lg bg-foreground/5 border border-notebook-divider group-hover:bg-accent/10 group-hover:border-accent/30 transition-colors">
                      <Github className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    </div>
                    <span className="hidden sm:inline">GitHub</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
    </section>
  )
}

