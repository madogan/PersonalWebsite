import { getResumeData } from '@/lib/resume'
import { MapPin, Linkedin, Github } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function PersonalHero() {
  const resume = getResumeData()
  const personal = resume.personal

  return (
    <section
      id="home"
      className="paper-texture relative flex min-h-screen items-center justify-center overflow-hidden pb-12 md:pb-16"
    >
      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="animate-fade-in space-y-4 text-center md:space-y-6 lg:space-y-8">
            {/* Name */}
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              {personal.name}
            </h1>

            {/* Divider */}
            <div className="pencil-divider mx-auto max-w-md" />

            {/* Short Description */}
            <div className="mx-auto max-w-3xl space-y-4 text-base leading-relaxed text-foreground/70 sm:text-lg md:text-xl">
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
                      <span
                        className="animate-fade-in font-medium text-accent"
                        style={{
                          animationDelay: '0.3s',
                          animationFillMode: 'both',
                        }}
                      >
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
            <div className="pencil-divider mx-auto max-w-md" />

            {/* Contact Info - All devices */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-xs sm:text-sm md:gap-6 md:pt-6 md:text-base">
              <div className="flex items-center gap-2 text-foreground/70 md:gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-notebook-divider bg-foreground/5 md:h-9 md:w-9">
                  <MapPin className="h-3.5 w-3.5 md:h-4 md:w-4" />
                </div>
                <span>{personal.location}</span>
              </div>

              {personal.linkedin && (
                <Link
                  href={`https://${personal.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-foreground/70 transition-colors hover:text-accent md:gap-3"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-notebook-divider bg-foreground/5 transition-colors group-hover:border-accent/30 group-hover:bg-accent/10 md:h-9 md:w-9">
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
                  className="group flex items-center gap-2 text-foreground/70 transition-colors hover:text-accent md:gap-3"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-notebook-divider bg-foreground/5 transition-colors group-hover:border-accent/30 group-hover:bg-accent/10 md:h-9 md:w-9">
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
