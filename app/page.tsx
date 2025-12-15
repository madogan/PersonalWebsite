import { PersonalHero } from '@/components/home/personal-hero'
import { SummarySection } from '@/components/home/summary-section'
import { ExperienceSection } from '@/components/home/experience-section'
import { SkillsSection } from '@/components/home/skills-section'
import { LinksSection } from '@/components/home/links-section'

export default function Home() {
  return (
    <>
      <PersonalHero />
      <SummarySection />
      <ExperienceSection />
      <SkillsSection />
      <LinksSection />
    </>
  )
}

