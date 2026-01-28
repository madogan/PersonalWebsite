/**
 * Pure utility for resume skill category display labels.
 * Safe to import from client components (no Node.js deps).
 */
const titleMap: Record<string, string> = {
  reliabilityAndSre: 'Reliability & SRE',
  cloudAndPlatform: 'Cloud & Platform',
  aiMlopsInfrastructure: 'AI / MLOps Infrastructure',
  observabilityAndTelemetry: 'Observability & Telemetry',
  automationAndEngineering: 'Programming & Automation',
  // Legacy mappings for backward compatibility
  aiMlops: 'AI / MLOps Systems (Infrastructure-Level)',
  reliability: 'Reliability & Observability',
  cloud: 'Cloud & Infrastructure',
}

export function getSkillCategoryTitle(category: string): string {
  return titleMap[category] || 'Programming & Automation'
}

/** Display name for a category key; formats unknown keys (e.g. "myNewCategory" → "My New Category"). */
export function getCategoryDisplayName(key: string): string {
  if (titleMap[key]) return titleMap[key]
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .replace(/[-_]/g, ' ')
    .trim()
}
