'use client'

import { Download } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import type { ResumeData } from '@/lib/resume'

// Helper function to get skill category title
function getSkillCategoryTitle(category: string): string {
  const titleMap: Record<string, string> = {
    reliabilityAndSre: 'Reliability & SRE',
    cloudAndPlatform: 'Cloud & Platform',
    aiMlopsInfrastructure: 'AI / MLOps Infrastructure',
    observabilityAndTelemetry: 'Observability & Telemetry',
    automationAndEngineering: 'Programming & Automation',
    aiMlops: 'AI / MLOps Systems (Infrastructure-Level)',
    reliability: 'Reliability & Observability',
    cloud: 'Cloud & Infrastructure',
  }
  
  return titleMap[category] || 'Programming & Automation'
}

export function PdfDownloadButton() {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleDownloadPDF = async () => {
    setIsGenerating(true)
    try {
      // Dynamically import to avoid SSR issues
      const jsPDF = (await import('jspdf')).default
      
      // Fetch resume data from API
      const response = await fetch('/api/resume')
      if (!response.ok) {
        throw new Error('Failed to fetch resume data')
      }
      const resume: ResumeData = await response.json()

      // Create PDF with standard formatting
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = 210
      const pageHeight = 297
      const margin = 15
      const maxWidth = pageWidth - (margin * 2)
      let yPos = margin
      const lineHeight = 7
      const sectionSpacing = 8
      
      // Helper function to add text with wrapping
      const addText = (text: string, fontSize: number, isBold = false, color: number[] = [0, 0, 0]) => {
        pdf.setFontSize(fontSize)
        pdf.setFont('helvetica', isBold ? 'bold' : 'normal')
        pdf.setTextColor(color[0], color[1], color[2])
        
        const lines = pdf.splitTextToSize(text, maxWidth)
        lines.forEach((line: string) => {
          if (yPos + lineHeight > pageHeight - margin) {
            pdf.addPage()
            yPos = margin
          }
          pdf.text(line, margin, yPos)
          yPos += lineHeight
        })
      }
      
      // Helper function to add section title
      const addSectionTitle = (title: string) => {
        yPos += sectionSpacing
        if (yPos + lineHeight * 2 > pageHeight - margin) {
          pdf.addPage()
          yPos = margin
        }
        addText(title, 16, true, [0, 206, 209])
        yPos += 3
      }
      
      // Header
      addText(resume.personal.name, 24, true, [0, 0, 0])
      yPos += 2
      addText(resume.personal.title, 12, false, [100, 100, 100])
      yPos += 4
      
      // Contact Information
      const contactInfo = [
        resume.personal.email,
        resume.personal.location,
        resume.personal.linkedin && `LinkedIn: ${resume.personal.linkedin}`,
        resume.personal.github && `GitHub: ${resume.personal.github}`,
      ].filter(Boolean).join(' | ')
      
      addText(contactInfo, 9, false, [80, 80, 80])
      yPos += sectionSpacing
      
      // Professional Summary
      addSectionTitle('Professional Summary')
      addText(resume.summary, 10, false, [0, 0, 0])
      yPos += sectionSpacing
      
      // Core Skills
      if (resume.coreSkills && Object.keys(resume.coreSkills).length > 0) {
        addSectionTitle('Core Skills')
        Object.entries(resume.coreSkills).forEach(([category, items]) => {
          const categoryTitle = getSkillCategoryTitle(category)
          addText(categoryTitle, 11, true, [0, 0, 0])
          yPos += 2
          items.forEach((item) => {
            addText(`• ${item}`, 9, false, [50, 50, 50])
            yPos += 1
          })
          yPos += 2
        })
        yPos += sectionSpacing
      }
      
      // Professional Experience
      addSectionTitle('Professional Experience')
      resume.experience.forEach((exp) => {
        // Company and Position
        addText(`${exp.position}`, 12, true, [0, 0, 0])
        yPos += 2
        addText(`${exp.company} | ${exp.location} | ${exp.startDate} - ${exp.endDate}`, 10, false, [100, 100, 100])
        yPos += 3
        
        // Description
        exp.description.forEach((desc) => {
          // Remove markdown links for PDF
          const cleanDesc = desc.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
          addText(`• ${cleanDesc}`, 9, false, [50, 50, 50])
          yPos += 1
        })
        
        if (exp.note) {
          const cleanNote = exp.note.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
          yPos += 2
          addText(`Note: ${cleanNote}`, 9, true, [0, 0, 0])
        }
        
        yPos += sectionSpacing
      })
      
      // Education
      if (resume.education && resume.education.length > 0) {
        addSectionTitle('Education')
        resume.education.forEach((edu) => {
          addText(edu.degree, 11, true, [0, 0, 0])
          yPos += 2
          addText(`${edu.institution} | ${edu.location}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}`, 10, false, [100, 100, 100])
          yPos += sectionSpacing
        })
      }
      
      // Certifications
      if (resume.certifications && resume.certifications.length > 0) {
        addSectionTitle('Certifications')
        resume.certifications.forEach((cert) => {
          addText(cert.name, 10, true, [0, 0, 0])
          yPos += 2
          addText(`${cert.issuer}${cert.version ? ` | ${cert.version}` : ''}`, 9, false, [100, 100, 100])
          yPos += sectionSpacing
        })
      }
      
      // AI/MLOps Experience
      if (resume.aiMlopsExperience) {
        addSectionTitle(resume.aiMlopsExperience.title)
        resume.aiMlopsExperience.description.forEach((item) => {
          addText(`• ${item}`, 9, false, [50, 50, 50])
          yPos += 1
        })
      }

      // Download PDF
      const fileName = `resume-${new Date().toISOString().split('T')[0]}.pdf`
      pdf.save(fileName)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <button
      onClick={handleDownloadPDF}
      disabled={isGenerating}
      className={cn(
        'relative inline-flex h-10 w-10 items-center justify-center rounded-2xl',
        'bg-glass-bg backdrop-blur-md border border-glass-border',
        'transition-all duration-300 hover:scale-105 focus:outline-none',
        'focus:ring-2 focus:ring-accent focus:ring-offset-2',
        'group no-pdf-button',
        isGenerating && 'opacity-50 cursor-not-allowed'
      )}
      aria-label="Download as PDF"
      title="Download resume as PDF"
    >
      <Download
        className={cn(
          'h-5 w-5 text-foreground transition-all duration-300',
          isGenerating && 'animate-spin'
        )}
      />
      <span className="sr-only">Download as PDF</span>
    </button>
  )
}

