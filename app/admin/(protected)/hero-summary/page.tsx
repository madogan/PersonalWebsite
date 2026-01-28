import { getResumeData } from '@/lib/resume'
import { HeroSummaryForm } from '@/components/admin/hero-summary-form'

export default function AdminHeroSummaryPage() {
  const resume = getResumeData()
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">
        Hero & Summary
      </h1>
      <HeroSummaryForm
        initialData={{
          personal: resume.personal,
          summary: resume.summary,
        }}
      />
    </div>
  )
}
