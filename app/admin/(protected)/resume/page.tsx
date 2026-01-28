import { getResumeData } from '@/lib/resume'
import { ResumeSectionForm } from '@/components/admin/resume-section-form'

export default function AdminResumePage() {
  const resume = getResumeData()
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Resume</h1>
      <ResumeSectionForm
        initialData={{
          experience: resume.experience,
          education: resume.education,
          coreSkills: resume.coreSkills ?? {},
        }}
      />
    </div>
  )
}
