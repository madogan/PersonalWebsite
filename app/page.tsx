import { PersonalHero } from '@/components/home/personal-hero'
import { SkillsSection } from '@/components/home/skills-section'
import { ExperienceSection } from '@/components/home/experience-section'
import { LatestBlogsSection } from '@/components/home/latest-blogs-section'

export default function Home() {
  return (
    <>
      <PersonalHero />
      <SkillsSection />
      <ExperienceSection />
      <LatestBlogsSection />
    </>
  )
}

