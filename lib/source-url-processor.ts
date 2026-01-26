/**
 * Source URL Content Processor
 * 
 * Provides functions to extract and process source URLs from MDX content,
 * replacing generic labels with actual titles.
 */

import type { SourceUrlMetadata } from './source-url-metadata'

export type SourceUrlMatch = {
  label: string
  url: string
  fullMatch: string
  isGeneric: boolean
  startIndex: number
  endIndex: number
}

/**
 * Generic labels that should be replaced with actual titles
 */
const GENERIC_LABELS = [
  'youtube video',
  'youtube videosu',
  'video',
  'videosu',
  'youtube',
  'link',
  'bağlantı',
  'kaynak',
  'source',
]

/**
 * Checks if a label is generic (should be replaced)
 * @param label - Label text to check
 * @returns true if label is generic
 */
function isGenericLabel(label: string): boolean {
  const normalizedLabel = label.toLowerCase().trim()
  return GENERIC_LABELS.some((generic) => normalizedLabel === generic)
}

/**
 * Extracts source URLs from MDX content
 * Matches patterns like:
 * - **Source**: [YouTube Video](url)
 * - **Kaynak**: [YouTube Videosu](url)
 * 
 * @param content - Raw MDX content string
 * @returns Array of source URL matches
 */
export function extractSourceUrls(content: string): SourceUrlMatch[] {
  const matches: SourceUrlMatch[] = []
  
  // Regex pattern to match: **Source**: or **Kaynak**: followed by markdown link
  // Pattern breakdown:
  // - (\*\*Source\*\*:|\*\*Kaynak\*\*:) - Matches "**Source**:" or "**Kaynak**:"
  // - \s* - Optional whitespace
  // - \[([^\]]+)\] - Matches markdown link text (label)
  // - \(([^)]+)\) - Matches markdown link URL
  const pattern = /(\*\*Source\*\*:|\*\*Kaynak\*\*:)\s*\[([^\]]+)\]\(([^)]+)\)/g
  
  let match
  while ((match = pattern.exec(content)) !== null) {
    const fullMatch = match[0]
    const label = match[2] // Link text (label)
    const url = match[3] // Link URL
    
    matches.push({
      label,
      url,
      fullMatch,
      isGeneric: isGenericLabel(label),
      startIndex: match.index,
      endIndex: match.index + fullMatch.length,
    })
  }
  
  return matches
}

/**
 * Escapes special markdown characters in title text
 * @param text - Text to escape
 * @returns Escaped text
 */
function escapeMarkdown(text: string): string {
  // Escape characters that have special meaning in markdown links
  // Only escape if they would break the markdown syntax
  return text
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
}

/**
 * Processes MDX content and replaces generic source labels with actual titles
 * 
 * @param content - Raw MDX content string
 * @param metadataMap - Map of URL to metadata (for batch processing efficiency)
 * @returns Processed content with actual titles
 */
export function processSourceUrls(
  content: string,
  metadataMap: Map<string, SourceUrlMetadata>
): string {
  const matches = extractSourceUrls(content)
  
  if (matches.length === 0) {
    return content
  }
  
  // Process matches in reverse order to preserve indices
  let processedContent = content
  
  for (let i = matches.length - 1; i >= 0; i--) {
    const match = matches[i]
    
    // Only replace if label is generic and we have metadata
    if (match.isGeneric) {
      const metadata = metadataMap.get(match.url)
      
      if (metadata && metadata.title) {
        // Escape title to prevent markdown syntax issues
        const escapedTitle = escapeMarkdown(metadata.title)
        
        // Replace the full match with new label
        const replacement = match.fullMatch.replace(
          `[${match.label}]`,
          `[${escapedTitle}]`
        )
        
        // Replace in content
        processedContent =
          processedContent.slice(0, match.startIndex) +
          replacement +
          processedContent.slice(match.endIndex)
      }
      // If no metadata found, keep original (don't replace)
    }
    // If label is not generic, keep original (already has proper title)
  }
  
  return processedContent
}
