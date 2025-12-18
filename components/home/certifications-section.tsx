import { getResumeData } from '@/lib/resume'
import { cn } from '@/lib/utils'
import { Award, Calendar, ExternalLink, Building2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export function CertificationsSection() {
  const resume = getResumeData()
  const certifications = resume.certifications || []

  if (certifications.length === 0) {
    return null
  }

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return null
    const [year, month] = dateString.split('-')
    const date = new Date(parseInt(year), parseInt(month) - 1)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  const isExpired = (expirationDate: string | null | undefined): boolean => {
    if (!expirationDate) return false
    const [year, month] = expirationDate.split('-')
    const expDate = new Date(parseInt(year), parseInt(month) - 1)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return expDate < today
  }

  const getLogoPath = (issuer: string): string | null => {
    const logoMap: Record<string, string> = {
      'Grafana Labs': '/grafana.png',
      'DevOps Institute': '/devops-institute.png',
      'Riverbed Technology': '/riverbed.png',
    }
    return logoMap[issuer] || null
  }

  return (
    <section id="certifications" className="py-8 md:py-12 lg:py-16 pb-12 md:pb-16 no-pdf">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Certifications & Badges</h2>
            <p className="text-foreground/60">Professional certifications and learning achievements</p>
          </div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {certifications.map((cert, index) => {
              const issueDateFormatted = formatDate(cert.issueDate)
              const expirationDateFormatted = formatDate(cert.expirationDate)
              const expired = isExpired(cert.expirationDate)

              return (
                <div
                  key={index}
                  className={cn(
                    'group glass-card p-6 md:p-8',
                    'transition-all duration-300 hover:scale-[1.02]',
                    'hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
                    'animate-slide-up'
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="space-y-4">
                    {/* Logo and Title */}
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-background border border-accent/20 flex items-center justify-center overflow-hidden">
                        {getLogoPath(cert.issuer) ? (
                          <Image
                            src={getLogoPath(cert.issuer)!}
                            alt={cert.issuer}
                            width={64}
                            height={64}
                            className="object-contain p-2"
                            unoptimized={false}
                          />
                        ) : (
                          <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 w-full h-full flex items-center justify-center">
                            <Award className="h-6 w-6 text-accent" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-200 line-clamp-2">
                          {cert.name}
                          {cert.version && (
                            <span className="text-sm font-normal text-foreground/60 ml-1">
                              {cert.version}
                            </span>
                          )}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-1 text-sm text-foreground/60">
                          <Building2 className="h-3.5 w-3.5" />
                          <span className="line-clamp-1">{cert.issuer}</span>
                        </div>
                      </div>
                    </div>

                    {/* Issue Date */}
                    {issueDateFormatted && (
                      <div className="flex items-center gap-1.5 text-sm text-foreground/60">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Issued: {issueDateFormatted}</span>
                      </div>
                    )}

                    {/* Expiration Date */}
                    {expirationDateFormatted && (
                      <div className={cn(
                        'flex items-center gap-1.5 text-sm',
                        expired ? 'text-red-500' : 'text-foreground/60'
                      )}>
                        <Calendar className="h-3.5 w-3.5" />
                        <span>
                          {expired ? 'Expired: ' : 'Expires: '}
                          {expirationDateFormatted}
                        </span>
                      </div>
                    )}

                    {/* Credential ID */}
                    {cert.credentialId && (
                      <div className="text-xs text-foreground/50">
                        ID: {cert.credentialId}
                      </div>
                    )}

                    {/* Skills */}
                    {cert.skills && cert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {cert.skills.slice(0, 4).map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className={cn(
                              'px-2 py-1 text-xs font-medium rounded-md',
                              'bg-accent/10 text-accent',
                              'border border-accent/20'
                            )}
                          >
                            {skill}
                          </span>
                        ))}
                        {cert.skills.length > 4 && (
                          <span className="px-2 py-1 text-xs font-medium text-foreground/60">
                            +{cert.skills.length - 4} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Credential Link */}
                    {cert.credentialUrl && (
                      <div className="pt-2">
                        <Link
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            'inline-flex items-center gap-1.5 text-sm text-accent',
                            'hover:underline transition-colors duration-200'
                          )}
                        >
                          View Credential
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

