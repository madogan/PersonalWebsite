'use client'

import { useState } from 'react'
import { updateResumeAction } from '@/lib/actions/resume'
import { getCategoryDisplayName } from '@/lib/skill-category-titles'
import type { ResumeData } from '@/lib/resume'
import { Plus, Trash2 } from 'lucide-react'

type ExperienceItem = ResumeData['experience'][number]
type EducationItem = ResumeData['education'][number]

type Props = {
  initialData: Pick<ResumeData, 'experience' | 'education' | 'coreSkills'>
}

const inputClass =
  'w-full rounded-md border border-notebook-divider bg-background px-3 py-2 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent'
const labelClass = 'mb-1 block text-sm font-medium text-foreground'

export function ResumeSectionForm({ initialData }: Props) {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [experience, setExperience] = useState<ExperienceItem[]>(initialData.experience ?? [])
  const [education, setEducation] = useState<EducationItem[]>(initialData.education ?? [])
  const [coreSkills, setCoreSkills] = useState<Record<string, string[]>>(
    initialData.coreSkills ?? {}
  )
  const [newCategoryKey, setNewCategoryKey] = useState('')
  const [newCategoryBullets, setNewCategoryBullets] = useState('')

  function addExperience() {
    setExperience((prev) => [
      ...prev,
      {
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        description: [''],
      },
    ])
  }

  function removeExperience(index: number) {
    setExperience((prev) => prev.filter((_, i) => i !== index))
  }

  function updateExperience(index: number, field: keyof ExperienceItem, value: string | string[]) {
    setExperience((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  function updateExperienceDescription(index: number, descIndex: number, value: string) {
    setExperience((prev) => {
      const next = [...prev]
      const desc = [...(next[index].description ?? [])]
      desc[descIndex] = value
      next[index] = { ...next[index], description: desc }
      return next
    })
  }

  function addExperienceDescriptionLine(index: number) {
    setExperience((prev) => {
      const next = [...prev]
      const desc = [...(next[index].description ?? []), '']
      next[index] = { ...next[index], description: desc }
      return next
    })
  }

  function removeExperienceDescriptionLine(expIndex: number, descIndex: number) {
    setExperience((prev) => {
      const next = [...prev]
      const desc = (next[expIndex].description ?? []).filter((_, i) => i !== descIndex)
      next[expIndex] = { ...next[expIndex], description: desc.length ? desc : [''] }
      return next
    })
  }

  function addEducation() {
    setEducation((prev) => [
      ...prev,
      { institution: '', degree: '', location: '', gpa: '' },
    ])
  }

  function removeEducation(index: number) {
    setEducation((prev) => prev.filter((_, i) => i !== index))
  }

  function updateEducation(index: number, field: keyof EducationItem, value: string) {
    setEducation((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  function addCoreSkillCategory() {
    const raw = newCategoryKey.trim()
    if (!raw) return
    const key = raw
      .split(/\s+/)
      .map((word, i) =>
        i === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join('')
    const bullets = newCategoryBullets
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
    setCoreSkills((prev) => ({ ...prev, [key]: bullets }))
    setNewCategoryKey('')
    setNewCategoryBullets('')
  }

  function removeCoreSkillCategory(key: string) {
    setCoreSkills((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessage(null)
    const experienceClean = experience
      .map((exp) => ({
        ...exp,
        description: (exp.description ?? []).filter((s) => s.trim() !== ''),
      }))
      .filter((exp) => exp.company.trim() || exp.position.trim())
    const result = await updateResumeAction({
      experience: experienceClean,
      education,
      coreSkills,
    })
    if (result.success) {
      setMessage({ type: 'success', text: 'Saved.' })
    } else {
      setMessage({ type: 'error', text: result.error })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Experience */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Professional Experience</h2>
          <button
            type="button"
            onClick={addExperience}
            className="inline-flex items-center gap-1 rounded-md border border-notebook-divider bg-background px-3 py-1.5 text-sm text-foreground hover:bg-foreground/5"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
        <div className="space-y-8">
          {experience.map((exp, index) => (
            <div
              key={index}
              className="rounded-lg border border-notebook-divider bg-background/50 p-4"
            >
              <div className="mb-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="inline-flex items-center gap-1 text-sm text-red-600 hover:underline dark:text-red-400"
                >
                  <Trash2 className="h-4 w-4" /> Remove
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(index, 'company', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Position</label>
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) => updateExperience(index, 'position', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Location</label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => updateExperience(index, 'location', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Start Date</label>
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                    className={inputClass}
                    placeholder="e.g. Jan 2022"
                  />
                </div>
                <div>
                  <label className={labelClass}>End Date</label>
                  <input
                    type="text"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                    className={inputClass}
                    placeholder="e.g. Present"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className={labelClass}>Description (one bullet per line)</label>
                <div className="space-y-2">
                  {(exp.description ?? ['']).map((line, lineIndex) => (
                    <div key={lineIndex} className="flex gap-2">
                      <input
                        type="text"
                        value={line}
                        onChange={(e) =>
                          updateExperienceDescription(index, lineIndex, e.target.value)
                        }
                        className={inputClass}
                      />
                      <button
                        type="button"
                        onClick={() => removeExperienceDescriptionLine(index, lineIndex)}
                        className="shrink-0 rounded p-2 text-foreground/60 hover:bg-foreground/10 hover:text-foreground"
                        aria-label="Remove line"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addExperienceDescriptionLine(index)}
                    className="text-sm text-accent hover:underline"
                  >
                    + Add bullet
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <label className={labelClass}>Note (optional)</label>
                <input
                  type="text"
                  value={exp.note ?? ''}
                  onChange={(e) => updateExperience(index, 'note', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Education</h2>
          <button
            type="button"
            onClick={addEducation}
            className="inline-flex items-center gap-1 rounded-md border border-notebook-divider bg-background px-3 py-1.5 text-sm text-foreground hover:bg-foreground/5"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className="flex flex-wrap items-start gap-4 rounded-lg border border-notebook-divider bg-background/50 p-4"
            >
              <div className="grid flex-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Institution</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Degree</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Location</label>
                  <input
                    type="text"
                    value={edu.location}
                    onChange={(e) => updateEducation(index, 'location', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>GPA (optional)</label>
                  <input
                    type="text"
                    value={edu.gpa ?? ''}
                    onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="inline-flex items-center gap-1 text-sm text-red-600 hover:underline dark:text-red-400"
              >
                <Trash2 className="h-4 w-4" /> Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Core Skills */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Core Skills</h2>
        </div>
        <p className="mb-4 text-sm text-foreground/70">
          Edit bullet points for each category (one line per bullet). Add or remove categories below.
        </p>
        <div className="space-y-6">
          {Object.keys(coreSkills).map((key) => (
            <div
              key={key}
              className="flex flex-col gap-3 rounded-lg border border-notebook-divider bg-background/50 p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <label className={labelClass}>{getCategoryDisplayName(key)}</label>
                <span className="text-xs text-foreground/50">key: {key}</span>
                <button
                  type="button"
                  onClick={() => removeCoreSkillCategory(key)}
                  className="shrink-0 inline-flex items-center gap-1 text-sm text-red-600 hover:underline dark:text-red-400"
                >
                  <Trash2 className="h-4 w-4" /> Remove category
                </button>
              </div>
              <textarea
                rows={5}
                value={(coreSkills[key] ?? []).join('\n')}
                onChange={(e) =>
                  setCoreSkills((prev) => ({
                    ...prev,
                    [key]: e.target.value
                      .split('\n')
                      .map((s) => s.trim())
                      .filter((s) => s !== ''),
                  }))
                }
                className={inputClass}
                placeholder="One bullet per line"
              />
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-lg border border-dashed border-notebook-divider bg-background/30 p-4">
          <h3 className="mb-3 text-sm font-medium text-foreground">Add category</h3>
          <div className="space-y-3">
            <div>
              <label className={labelClass}>Category key (camelCase, e.g. securityAndCompliance)</label>
              <input
                type="text"
                value={newCategoryKey}
                onChange={(e) => setNewCategoryKey(e.target.value)}
                className={inputClass}
                placeholder="e.g. securityAndCompliance"
              />
            </div>
            <div>
              <label className={labelClass}>Bullets (one per line)</label>
              <textarea
                rows={4}
                value={newCategoryBullets}
                onChange={(e) => setNewCategoryBullets(e.target.value)}
                className={inputClass}
                placeholder="One bullet per line"
              />
            </div>
            <button
              type="button"
              onClick={addCoreSkillCategory}
              className="inline-flex items-center gap-1 rounded-md border border-notebook-divider bg-background px-3 py-1.5 text-sm text-foreground hover:bg-foreground/5"
            >
              <Plus className="h-4 w-4" /> Add category
            </button>
          </div>
        </div>
      </section>

      {message && (
        <p
          className={
            message.type === 'success'
              ? 'text-sm text-green-600 dark:text-green-400'
              : 'text-sm text-red-600 dark:text-red-400'
          }
        >
          {message.text}
        </p>
      )}
      <button
        type="submit"
        className="rounded-md bg-accent px-4 py-2 font-medium text-background hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      >
        Save
      </button>
    </form>
  )
}
