'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { updateResumeAction } from '@/lib/actions/resume'
import { uploadCertificationImageAction } from '@/lib/actions/upload'
import type { ResumeData } from '@/lib/resume'
import { Plus, Trash2, Award, Upload } from 'lucide-react'

type CertificationItem = ResumeData['certifications'][number]

type Props = {
  initialData: Pick<ResumeData, 'certifications'>
}

const inputClass =
  'w-full rounded-md border border-notebook-divider bg-background px-3 py-2 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent'
const labelClass = 'mb-1 block text-sm font-medium text-foreground'

const CERT_LOGO_MAP: Record<string, string> = {
  'Grafana Labs': '/grafana.svg',
  'DevOps Institute': '/devops-institute.png',
  'Riverbed Technology': '/riverbed.png',
}

function getCertImageSrc(cert: CertificationItem): string | null {
  if (cert.imageUrl) return cert.imageUrl
  return CERT_LOGO_MAP[cert.issuer] ?? null
}

export function CertificationsForm({ initialData }: Props) {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [certifications, setCertifications] = useState<CertificationItem[]>(
    initialData.certifications ?? []
  )
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null)
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({})

  function addCertification() {
    setCertifications((prev) => [
      ...prev,
      {
        name: '',
        issuer: '',
        issueDate: null,
        expirationDate: null,
        credentialId: null,
        credentialUrl: null,
        imageUrl: null,
        skills: [],
      },
    ])
  }

  function removeCertification(index: number) {
    setCertifications((prev) => prev.filter((_, i) => i !== index))
  }

  function updateCertification(
    index: number,
    field: keyof CertificationItem,
    value: string | string[] | null | undefined
  ) {
    setCertifications((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessage(null)
    const result = await updateResumeAction({ certifications })
    if (result.success) {
      setMessage({ type: 'success', text: 'Saved.' })
    } else {
      setMessage({ type: 'error', text: result.error })
    }
  }

  async function handleUpload(index: number) {
    const input = fileInputRefs.current[index]
    const file = input?.files?.[0]
    if (!file) return
    setMessage(null)
    setUploadingIndex(index)
    const formData = new FormData()
    formData.set('file', file)
    formData.set('certIndex', String(index))
    const result = await uploadCertificationImageAction(formData)
    setUploadingIndex(null)
    if (result.success) {
      updateCertification(index, 'imageUrl', result.path)
      setMessage({ type: 'success', text: 'Image uploaded. Click Save to persist.' })
    } else {
      setMessage({ type: 'error', text: result.error })
    }
    if (input) input.value = ''
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground/70">
          Add, edit, or remove certifications. Issue/expiration dates in YYYY-MM format (e.g. 2025-11).
        </p>
        <button
          type="button"
          onClick={addCertification}
          className="inline-flex items-center gap-1 rounded-md border border-notebook-divider bg-background px-3 py-1.5 text-sm text-foreground hover:bg-foreground/5"
        >
          <Plus className="h-4 w-4" /> Add certification
        </button>
      </div>

      <div className="space-y-8">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="rounded-lg border border-notebook-divider bg-background/50 p-4"
          >
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={() => removeCertification(index)}
                className="inline-flex items-center gap-1 text-sm text-red-600 hover:underline dark:text-red-400"
              >
                <Trash2 className="h-4 w-4" /> Remove
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Name</label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => updateCertification(index, 'name', e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Version (optional)</label>
                <input
                  type="text"
                  value={cert.version ?? ''}
                  onChange={(e) =>
                    updateCertification(index, 'version', e.target.value || undefined)
                  }
                  className={inputClass}
                  placeholder="e.g. v1.1"
                />
              </div>
              <div>
                <label className={labelClass}>Issuer</label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Issue date (optional)</label>
                <input
                  type="text"
                  value={cert.issueDate ?? ''}
                  onChange={(e) =>
                    updateCertification(
                      index,
                      'issueDate',
                      e.target.value ? e.target.value : null
                    )
                  }
                  className={inputClass}
                  placeholder="YYYY-MM"
                />
              </div>
              <div>
                <label className={labelClass}>Expiration date (optional)</label>
                <input
                  type="text"
                  value={cert.expirationDate ?? ''}
                  onChange={(e) =>
                    updateCertification(
                      index,
                      'expirationDate',
                      e.target.value ? e.target.value : null
                    )
                  }
                  className={inputClass}
                  placeholder="YYYY-MM"
                />
              </div>
              <div>
                <label className={labelClass}>Credential ID (optional)</label>
                <input
                  type="text"
                  value={cert.credentialId ?? ''}
                  onChange={(e) =>
                    updateCertification(
                      index,
                      'credentialId',
                      e.target.value ? e.target.value : null
                    )
                  }
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Credential URL (optional)</label>
                <input
                  type="url"
                  value={cert.credentialUrl ?? ''}
                  onChange={(e) =>
                    updateCertification(
                      index,
                      'credentialUrl',
                      e.target.value ? e.target.value : null
                    )
                  }
                  className={inputClass}
                  placeholder="https://..."
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Certificate image (optional)</label>
                <div className="flex flex-wrap items-start gap-4">
                  <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-notebook-divider bg-background">
                    {(() => {
                      const src = getCertImageSrc(cert)
                      return src ? (
                        <Image
                          src={src}
                          alt={cert.issuer || 'Cert'}
                          width={80}
                          height={80}
                          className="object-contain p-1"
                          unoptimized={!src.startsWith('/')}
                        />
                      ) : (
                        <Award className="h-8 w-8 text-foreground/40" />
                      )
                    })()}
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      ref={(el) => {
                        fileInputRefs.current[index] = el
                      }}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={() => handleUpload(index)}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRefs.current[index]?.click()}
                      disabled={uploadingIndex === index}
                      className="inline-flex items-center gap-1.5 rounded-md border border-notebook-divider bg-background px-3 py-2 text-sm text-foreground hover:bg-foreground/5 disabled:opacity-50"
                    >
                      <Upload className="h-4 w-4" />
                      {uploadingIndex === index ? 'Uploading…' : 'Upload image'}
                    </button>
                    <button
                      type="button"
                      onClick={() => updateCertification(index, 'imageUrl', null)}
                      className="text-sm text-foreground/70 hover:text-foreground hover:underline"
                    >
                      Clear image
                    </button>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Skills (one per line, optional)</label>
                <textarea
                  rows={3}
                  value={(cert.skills ?? []).join('\n')}
                  onChange={(e) =>
                    updateCertification(
                      index,
                      'skills',
                      e.target.value
                        .split('\n')
                        .map((s) => s.trim())
                        .filter(Boolean)
                    )
                  }
                  className={inputClass}
                  placeholder="One skill per line"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

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
