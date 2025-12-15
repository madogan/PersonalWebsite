import fs from 'fs'
import path from 'path'

const resumePath = path.join(process.cwd(), 'content/resume/resume.json')

export type ResumeData = {
  personal: {
    name: string
    title: string
    tagline: string
    email: string
    location: string
    website?: string
    linkedin?: string
    github?: string
  }
  summary: string
  keyStrengths: string[]
  workWithMe: string[]
  coreSkills?: {
    [key: string]: string[]
  }
  experience: Array<{
    company: string
    position: string
    location: string
    startDate: string
    endDate: string
    description: string[]
    note?: string
  }>
  education: Array<{
    institution: string
    degree: string
    gpa?: string
    location: string
  }>
  certifications: Array<{
    name: string
    version?: string
    issuer: string
  }>
  skills: {
    [key: string]: string[]
  }
  aiMlopsExperience?: {
    title: string
    description: string[]
  }
  caseStudy?: {
    title: string
    background: string
    technicalDetails: string[]
    approach: string[]
    result: string[]
  } | null
}

export function getResumeData(): ResumeData {
  try {
    const fileContents = fs.readFileSync(resumePath, 'utf8')
    return JSON.parse(fileContents) as ResumeData
  } catch (error) {
    throw new Error('Failed to load resume data')
  }
}

