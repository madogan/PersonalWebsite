import { Mail, MapPin, Linkedin, Github, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { PrintButton } from './print-button'
import { cn } from '@/lib/utils'
import type { ResumeData } from '@/lib/resume'

type ResumeHeaderProps = {
  personal: ResumeData['personal']
}

export function ResumeHeader({ personal }: ResumeHeaderProps) {
  return (
    <div className="relative mb-16">
      {/* Main Header Content */}
      <div className="glass-card p-8 md:p-12 relative overflow-hidden">
        {/* Background Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-cyan/5 pointer-events-none" />
        
        <div className="relative z-10">
          {/* Role Badge */}
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-accent/20 text-accent font-semibold rounded-full text-sm md:text-base border border-accent/30">
              {personal.title.split('–')[0].trim()}
            </span>
          </div>

          {/* Name */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-foreground tracking-tight">
            {personal.name}
          </h1>

          {/* Title */}
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 font-medium">
            {personal.title.includes('–') ? personal.title.split('–')[1].trim() : personal.title}
          </p>

          {/* Contact Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-3 text-foreground/70 hover:text-accent transition-colors group"
            >
              <div className="p-2 rounded-lg bg-foreground/5 group-hover:bg-accent/10 transition-colors">
                <Mail className="h-4 w-4" />
              </div>
              <span className="truncate">{personal.email}</span>
            </a>

            <div className="flex items-center gap-3 text-foreground/70">
              <div className="p-2 rounded-lg bg-foreground/5">
                <MapPin className="h-4 w-4" />
              </div>
              <span>{personal.location}</span>
            </div>

            {personal.linkedin && (
              <Link
                href={`https://${personal.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground/70 hover:text-accent transition-colors group"
              >
                <div className="p-2 rounded-lg bg-foreground/5 group-hover:bg-accent/10 transition-colors">
                  <Linkedin className="h-4 w-4" />
                </div>
                <span className="truncate">LinkedIn</span>
              </Link>
            )}

            {personal.github && (
              <Link
                href={`https://${personal.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground/70 hover:text-accent transition-colors group"
              >
                <div className="p-2 rounded-lg bg-foreground/5 group-hover:bg-accent/10 transition-colors">
                  <Github className="h-4 w-4" />
                </div>
                <span className="truncate">GitHub</span>
              </Link>
            )}

            <div className="no-print">
              <PrintButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

