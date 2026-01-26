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
      'Grafana Labs': '/grafana.svg',
      'DevOps Institute': '/devops-institute.png',
      'Riverbed Technology': '/riverbed.png',
    }
    return logoMap[issuer] || null
  }

  return (
    <section
      id="certifications"
      className="no-pdf py-8 pb-12 md:py-12 md:pb-16 lg:py-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mb-8">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">
              Certifications & Badges
            </h2>
            <p className="text-foreground/60">
              Professional certifications and learning achievements
            </p>
          </div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {certifications.map((cert, index) => {
              const issueDateFormatted = formatDate(cert.issueDate)
              const expirationDateFormatted = formatDate(cert.expirationDate)
              const expired = isExpired(cert.expirationDate)

              return (
                <div
                  key={index}
                  className={cn(
                    'loose-leaf-card paper-texture group p-6 md:p-8',
                    'transition-all duration-300',
                    'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
                    'animate-slide-up'
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="space-y-4">
                    {/* Logo and Title */}
                    <div className="flex items-start gap-3">
                      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg handwriting-border handwriting-border-accent bg-background">
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
                          <div className="flex h-full w-full items-center justify-center rounded-lg handwriting-border handwriting-border-accent bg-accent/10 p-2">
                            <Award className="h-6 w-6 text-accent" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 text-lg font-bold text-foreground transition-colors duration-200 group-hover:text-accent md:text-xl">
                          {cert.name}
                          {cert.version && (
                            <span className="ml-1 text-sm font-normal text-foreground/60">
                              {cert.version}
                            </span>
                          )}
                        </h3>
                        <div className="mt-1 flex items-center gap-1.5 text-sm text-foreground/60">
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
                    {expirationDateFormatted && !expired && (
                      <div className="flex items-center gap-1.5 text-sm text-foreground/60">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Expires: {expirationDateFormatted}</span>
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
                              'rounded-md px-2 py-1 text-xs font-medium',
                              'bg-accent/10 text-accent',
                              'handwriting-border handwriting-border-accent' /* Use handwriting border */
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
                            'transition-colors duration-200 hover:underline'
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
