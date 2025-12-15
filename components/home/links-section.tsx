import { getResumeData } from '@/lib/resume'
import { ResumeSection } from '@/components/resume/resume-section'
import { Linkedin, Github, ExternalLink, Mail } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function LinksSection() {
  const resume = getResumeData()
  const personal = resume.personal

  const links = [
    { href: `mailto:${personal.email}`, label: 'Email', icon: Mail, external: false },
    { href: personal.linkedin ? `https://${personal.linkedin}` : null, label: 'LinkedIn', icon: Linkedin, external: true },
    { href: personal.github ? `https://${personal.github}` : null, label: 'GitHub', icon: Github, external: true },
    { href: personal.website || null, label: 'Website', icon: ExternalLink, external: true },
  ].filter((link): link is typeof link & { href: string } => link.href !== null)

  return (
    <section id="links" className="py-12 md:py-20 lg:py-32 pb-20 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <ResumeSection title="Links">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {links.map((link) => {
                const Icon = link.icon
                const Component = link.external ? Link : 'a'
                const props = link.external
                  ? { href: link.href, target: '_blank', rel: 'noopener noreferrer' }
                  : { href: link.href }

                return (
                  <Component
                    key={link.label}
                    {...props}
                    className={cn(
                      'glass-card p-4 md:p-6 flex flex-col items-center justify-center gap-2 md:gap-3',
                      'hover:scale-105 transition-all duration-300',
                      'hover:shadow-xl hover:border-accent/40',
                      'group'
                    )}
                  >
                    <div className="p-3 md:p-4 rounded-xl bg-foreground/5 group-hover:bg-accent/10 transition-colors">
                      <Icon className="h-5 w-5 md:h-6 md:w-6 text-foreground/70 group-hover:text-accent transition-colors" />
                    </div>
                    <span className="font-medium text-xs sm:text-sm md:text-base text-foreground/80 group-hover:text-accent transition-colors text-center">
                      {link.label}
                    </span>
                  </Component>
                )
              })}
            </div>
          </ResumeSection>
        </div>
      </div>
    </section>
  )
}

