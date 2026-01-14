import { headers } from 'next/headers'

/**
 * Detects user's preferred locale from browser Accept-Language header
 * @returns 'tr' if Turkish is detected, 'en' otherwise (default)
 */
export async function detectUserLocale(): Promise<'en' | 'tr'> {
  try {
    const headersList = await headers()
    const acceptLanguage = headersList.get('accept-language') || ''

    // Parse Accept-Language header to detect Turkish
    // Accept-Language format: "en-US,en;q=0.9,tr;q=0.8" or "tr-TR,tr;q=0.9"
    const lowercased = acceptLanguage.toLowerCase()

    // Check if Turkish locale is present (tr, tr-TR, tr_TR, etc.)
    if (lowercased.includes('tr')) {
      return 'tr'
    }

    // Default to English
    return 'en'
  } catch (error) {
    // If headers() fails (e.g., in static generation), default to English
    return 'en'
  }
}
