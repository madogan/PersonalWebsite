import { getResumeData } from '@/lib/resume'
import { CertificationsForm } from '@/components/admin/certifications-form'

export default function AdminCertificationsPage() {
  const resume = getResumeData()
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Certifications</h1>
      <CertificationsForm
        initialData={{
          certifications: resume.certifications ?? [],
        }}
      />
    </div>
  )
}
