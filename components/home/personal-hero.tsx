import { getResumeData } from '@/lib/resume'
import { MapPin, Linkedin, Github } from 'lucide-react'
import Link from 'next/link'
import { ProfileImage } from '@/components/home/profile-image'
import { cn } from '@/lib/utils'

export function PersonalHero() {
  const resume = getResumeData()
  const personal = resume.personal

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pb-12 md:pb-16">
      {/* Background Gradient - Extended light from right to left */}
      <div 
        className="absolute inset-0" 
        style={{ 
          background: 'linear-gradient(to right, rgb(var(--color-background)) 0%, rgb(var(--color-background)) 30%, rgba(0, 206, 209, 0.2) 100%)'
        }}
      />
      <div 
        className="absolute inset-0 hidden dark:block" 
        style={{ 
          background: 'linear-gradient(to right, rgb(var(--color-background)) 0%, rgb(var(--color-background)) 30%, rgba(0, 206, 209, 0.3) 100%)'
        }}
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 lg:gap-12 items-center lg:items-center">
            {/* Left Side - Text Content */}
            <div className="space-y-4 md:space-y-6 lg:space-y-8 animate-fade-in text-center lg:text-left">
              {/* Name */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-tight">
                {personal.name}
              </h1>

              {/* Short Description */}
              <div className="space-y-4 text-base sm:text-lg md:text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto lg:mx-0">
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
                      <p className="text-justify">
                        <span className="relative inline-block align-middle px-2 rounded-lg overflow-hidden backdrop-blur-lg bg-accent/1 dark:bg-accent/20 dark:border-accent/40 shadow-xl animate-fade-in" style={{ paddingTop: '0.05em', paddingBottom: '0.05em', animationDelay: '0.3s', animationFillMode: 'both' }}>
                          {/* Liquid animation background with gradient */}
                          <span className="absolute inset-0 opacity-20">
                            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent via-accent-cyan to-accent-secondary"></span>
                          </span>
                          
                          {/* Animated liquid blobs */}
                          <span className="absolute inset-0 overflow-hidden">
                            <span 
                              className="absolute -top-10 -right-10 w-32 h-32 bg-accent-cyan rounded-full blur-2xl animate-liquid-float"
                              style={{ animationDuration: '8s' }}
                            ></span>
                            <span 
                              className="absolute top-1/2 -left-10 w-24 h-24 bg-accent-secondary rounded-full blur-2xl animate-liquid-float"
                              style={{ animationDuration: '10s', animationDelay: '1.5s' }}
                            ></span>
                            <span 
                              className="absolute -bottom-10 right-1/3 w-20 h-20 bg-accent rounded-full blur-2xl animate-liquid-float"
                              style={{ animationDuration: '12s', animationDelay: '3s' }}
                            ></span>
                          </span>
                          
                          {/* Text with primary accent color */}
                          <span className="relative z-10 text-accent font-medium drop-shadow-sm">
                            {firstFourWords}
                          </span>
                        </span>
                        {firstRemainingText && ` ${firstRemainingText}`}
                      </p>
                      
                      {/* Second Paragraph */}
                      <p className="text-justify">
                        {secondParagraph}
                      </p>
                    </>
                  )
                })()}
              </div>

              {/* Contact Info - Desktop only */}
              <div className="hidden lg:flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 text-xs sm:text-sm md:text-base">
                <div className="flex items-center gap-2 md:gap-3 text-foreground/70">
                  <div className="h-8 w-8 md:h-9 md:w-9 flex items-center justify-center rounded-2xl bg-foreground/5">
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
                    <div className="h-8 w-8 md:h-9 md:w-9 flex items-center justify-center rounded-2xl bg-foreground/5 group-hover:bg-accent/10 transition-colors">
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
                    <div className="h-8 w-8 md:h-9 md:w-9 flex items-center justify-center rounded-2xl bg-foreground/5 group-hover:bg-accent/10 transition-colors">
                      <Github className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    </div>
                    <span className="hidden sm:inline">GitHub</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Profile Photo - Mobile & Desktop */}
            <div className="relative flex flex-col items-center justify-center h-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] lg:items-center">
              <div className="relative w-full h-full flex items-center justify-center py-4 md:py-6 lg:py-0">
                {/* Profile Image Container */}
                <ProfileImage name={personal.name} title={personal.title} />
              </div>
              
              {/* Contact Info - Mobile only (under image) */}
              <div className="lg:hidden flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs sm:text-sm md:text-base mt-4">
                <div className="flex items-center gap-2 md:gap-3 text-foreground/70">
                  <div className="h-8 w-8 md:h-9 md:w-9 flex items-center justify-center rounded-2xl bg-foreground/5">
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
                    <div className="h-8 w-8 md:h-9 md:w-9 flex items-center justify-center rounded-2xl bg-foreground/5 group-hover:bg-accent/10 transition-colors">
                      <Linkedin className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    </div>
                  </Link>
                )}

                {personal.github && (
                  <Link
                    href={`https://${personal.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 md:gap-3 text-foreground/70 hover:text-accent transition-colors group"
                  >
                    <div className="h-8 w-8 md:h-9 md:w-9 flex items-center justify-center rounded-2xl bg-foreground/5 group-hover:bg-accent/10 transition-colors">
                      <Github className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

