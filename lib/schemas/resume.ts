import { z } from 'zod'

const personalSchema = z.object({
  name: z.string().optional(),
  title: z.string().optional(),
  tagline: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  location: z.string().optional(),
  website: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
})

/**
 * Schema for partial resume updates (admin). All fields optional.
 */
export const partialResumeSchema = z.object({
  personal: personalSchema.optional(),
  summary: z.string().optional(),
  keyStrengths: z.array(z.string()).optional(),
  workWithMe: z.array(z.string()).optional(),
  coreSkills: z.record(z.string(), z.array(z.string())).optional(),
  experience: z
    .array(
      z.object({
        company: z.string(),
        position: z.string(),
        location: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        description: z.array(z.string()),
        note: z.string().optional(),
      })
    )
    .optional(),
  education: z
    .array(
      z.object({
        institution: z.string(),
        degree: z.string(),
        gpa: z.string().optional(),
        location: z.string(),
      })
    )
    .optional(),
  certifications: z
    .array(
      z.object({
        name: z.string(),
        version: z.string().optional(),
        issuer: z.string(),
        issueDate: z.string().nullable().optional(),
        expirationDate: z.string().nullable().optional(),
        credentialId: z.string().nullable().optional(),
        credentialUrl: z.string().nullable().optional(),
        skills: z.array(z.string()).optional(),
      })
    )
    .optional(),
  skills: z.record(z.string(), z.array(z.string())).optional(),
  aiMlopsExperience: z
    .object({
      title: z.string(),
      description: z.array(z.string()),
    })
    .optional(),
  caseStudy: z
    .object({
      title: z.string(),
      background: z.string(),
      technicalDetails: z.array(z.string()),
      approach: z.array(z.string()),
      result: z.array(z.string()),
    })
    .nullable()
    .optional(),
})

export type PartialResumeInput = z.infer<typeof partialResumeSchema>
