import { getResumeData } from '@/lib/resume'
import { Mail, MapPin, Linkedin, Github } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export function PersonalHero() {
  const resume = getResumeData()
  const personal = resume.personal

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pb-20 md:pb-24">
      {/* Background Gradient - Similar to image */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background to-accent/20 dark:to-accent/30" />
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="space-y-6 md:space-y-8 animate-fade-in text-center lg:text-left">
              {/* Role Badge */}
              <div>
                <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-accent/20 text-accent font-bold rounded-full text-xs md:text-sm border border-accent/30">
                  {personal.title.split('–')[0].trim()}
                </span>
              </div>

              {/* Name */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-tight">
                {personal.name}
              </h1>

              {/* Title */}
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-foreground/80 font-medium">
                {personal.title.includes('–') ? personal.title.split('–')[1].trim() : personal.title}
              </p>

              {/* Short Description */}
              <p className="text-base sm:text-lg md:text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {resume.summary.split('.')[0]}. Specialized in observability, incident response, and reliability engineering for distributed systems.
              </p>

              {/* Contact Info */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 text-xs sm:text-sm md:text-base">
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-2 md:gap-3 text-foreground/70 hover:text-accent transition-colors group"
                >
                  <div className="p-1.5 md:p-2 rounded-lg bg-foreground/5 group-hover:bg-accent/10 transition-colors">
                    <Mail className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  </div>
                  <span className="truncate max-w-[200px] sm:max-w-none">{personal.email}</span>
                </a>

                <div className="flex items-center gap-2 md:gap-3 text-foreground/70">
                  <div className="p-1.5 md:p-2 rounded-lg bg-foreground/5">
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
                    <div className="p-1.5 md:p-2 rounded-lg bg-foreground/5 group-hover:bg-accent/10 transition-colors">
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
                    <div className="p-1.5 md:p-2 rounded-lg bg-foreground/5 group-hover:bg-accent/10 transition-colors">
                      <Github className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    </div>
                    <span className="hidden sm:inline">GitHub</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Profile Photo - Mobile & Desktop */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg flex items-center justify-center py-8 lg:py-0">
                {/* Gradient Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent-cyan/10 to-transparent rounded-full blur-3xl scale-150" />
                
                {/* Profile Image Container */}
                <div className="relative z-10 flex items-center justify-center">
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px]">
                    {/* Dramatic lighting overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 rounded-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-full" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full" />
                    
                    {/* Profile Image */}
                    <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl">
                      <Image
                        src="/images/profile.jpg"
                        alt={`${personal.name} - ${personal.title}`}
                        fill
                        className="object-cover object-center"
                        priority
                        sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, (max-width: 1024px) 384px, 400px"
                        style={{
                          filter: 'contrast(1.1) brightness(0.95)',
                        }}
                      />
                    </div>
                    
                    {/* Accent border glow */}
                    <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-gradient-to-br from-accent/30 via-accent-cyan/20 to-transparent rounded-full blur-xl opacity-50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

