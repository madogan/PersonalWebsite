import { GoogleGenAI } from '@google/genai'
import { getGeminiPrompts } from '@/lib/gemini-prompts'
import { blogDraftSchema, type BlogDraft } from '@/lib/schemas/blog'

const GEMINI_MODEL = 'gemini-2.0-flash'
const REQUEST_TIMEOUT_MS = 30_000
const MAX_TOPIC_LENGTH = 2000

export type GenerateBlogDraftParams = {
  locale: 'en' | 'tr' | 'both'
  topic?: string
  existingEn?: { title: string; description: string; content: string; tags: string[] }
  existingTr?: { title: string; description: string; content: string; tags: string[] }
}

export type GenerateBlogDraftResult =
  | { success: true; en?: BlogDraft; tr?: BlogDraft }
  | { success: false; error: string }

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

function buildPrompt(
  locale: 'en' | 'tr',
  topic: string,
  context?: string
): string {
  const prompts = getGeminiPrompts()
  const raw = locale === 'en' ? prompts.promptEn : prompts.promptTr
  let out = raw.replace(/\{\{topic\}\}/g, topic.slice(0, MAX_TOPIC_LENGTH))
  if (context !== undefined) {
    out = out.replace(/\{\{context\}\}/g, context)
  } else {
    out = out.replace(/\{\{context\}\}/g, '')
  }
  return out
}

function extractJsonFromText(text: string): string {
  const trimmed = text.trim()
  const codeBlockMatch = trimmed.match(/^```(?:json)?\s*([\s\S]*?)```\s*$/m)
  if (codeBlockMatch) {
    return codeBlockMatch[1].trim()
  }
  return trimmed
}

function parseDraftFromResponse(text: string): BlogDraft | null {
  try {
    const jsonStr = extractJsonFromText(text)
    const parsed = JSON.parse(jsonStr) as unknown
    const result = blogDraftSchema.safeParse(parsed)
    if (result.success) {
      return {
        ...result.data,
        date: result.data.date ?? todayISO(),
      }
    }
    return null
  } catch {
    return null
  }
}

async function generateOneDraft(
  ai: InstanceType<typeof GoogleGenAI>,
  locale: 'en' | 'tr',
  topic: string,
  context?: string
): Promise<BlogDraft | null> {
  const prompt = buildPrompt(locale, topic, context)
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    })
    clearTimeout(timeoutId)
    const text = (response as { text?: string })?.text ?? ''
    return parseDraftFromResponse(text)
  } catch (err) {
    clearTimeout(timeoutId)
    throw err
  }
}

/**
 * Generates blog draft(s) via Gemini. Server-only.
 * Uses GEMINI_API_KEY from process.env; returns error if missing.
 */
export async function generateBlogDraft(
  params: GenerateBlogDraftParams
): Promise<GenerateBlogDraftResult> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey?.trim()) {
    return { success: false, error: 'Gemini API anahtarı yapılandırılmamış.' }
  }

  const topic = (params.topic ?? '').trim().slice(0, MAX_TOPIC_LENGTH) || 'General technical blog post topic.'
  const { locale, existingEn, existingTr } = params

  const ai = new GoogleGenAI({ apiKey })

  try {
    if (locale === 'en' || locale === 'both') {
      const context =
        existingTr != null
          ? `Title: ${existingTr.title}\nDescription: ${existingTr.description}\nTags: ${existingTr.tags.join(', ')}\n\nContent:\n${existingTr.content}`
          : undefined
      const enDraft = await generateOneDraft(ai, 'en', topic, context)
      if (locale === 'en') {
        if (enDraft) {
          return { success: true, en: enDraft }
        }
        return { success: false, error: 'Üretilen içerik geçersiz; tekrar deneyin veya promptu düzenleyin.' }
      }
      if (locale === 'both') {
        const trDraft = await generateOneDraft(ai, 'tr', topic, undefined)
        return {
          success: true,
          en: enDraft ?? undefined,
          tr: trDraft ?? undefined,
        }
      }
    }

    if (locale === 'tr') {
      const context =
        existingEn != null
          ? `Title: ${existingEn.title}\nDescription: ${existingEn.description}\nTags: ${existingEn.tags.join(', ')}\n\nContent:\n${existingEn.content}`
          : undefined
      const trDraft = await generateOneDraft(ai, 'tr', topic, context)
      if (trDraft) {
        return { success: true, tr: trDraft }
      }
      return { success: false, error: 'Üretilen içerik geçersiz; tekrar deneyin veya promptu düzenleyin.' }
    }

    return { success: false, error: 'Geçersiz locale.' }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    if (message.includes('abort') || message.includes('timeout')) {
      return { success: false, error: 'İstek zaman aşımına uğradı.' }
    }
    if (message.includes('429') || message.includes('resource_exhausted')) {
      return { success: false, error: 'Çok fazla istek; lütfen kısa süre sonra tekrar deneyin.' }
    }
    return { success: false, error: message || 'Gemini isteği başarısız.' }
  }
}
