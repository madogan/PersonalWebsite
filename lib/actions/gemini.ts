'use server'

import { writeGeminiPrompts, getDefaultGeminiPrompts } from '@/lib/gemini-prompts'
import { generateBlogDraft } from '@/lib/gemini-generate'
import type { GeminiPromptsConfig } from '@/lib/schemas/gemini-prompts'
import {
  geminiPromptsConfigSchema,
  generateBlogDraftInputSchema,
} from '@/lib/schemas/gemini-prompts'
import type { GenerateBlogDraftResult } from '@/lib/gemini-generate'

export type UpdateGeminiPromptsResult = { success: true } | { success: false; error: string }
export type GetDefaultGeminiPromptsResult =
  | { success: true; prompts: GeminiPromptsConfig }
  | { success: false; error: string }

const updatePayloadSchema = geminiPromptsConfigSchema

/**
 * Returns in-code default prompts for "Reset to defaults" in admin UI.
 */
export async function getDefaultGeminiPromptsAction(): Promise<GetDefaultGeminiPromptsResult> {
  try {
    const prompts = getDefaultGeminiPrompts()
    return { success: true, prompts }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Varsayılan promptlar yüklenemedi'
    return { success: false, error: message }
  }
}

/**
 * Updates Gemini prompts config. Validates with Zod and writes atomically.
 * Use Turkish error messages per project rules.
 */
export async function updateGeminiPromptsAction(payload: {
  promptEn: string
  promptTr: string
}): Promise<UpdateGeminiPromptsResult> {
  try {
    const parsed = updatePayloadSchema.safeParse(payload)
    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join('; ')
      return { success: false, error: message }
    }
    await writeGeminiPrompts(parsed.data)
    return { success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Promptlar kaydedilemedi'
    return { success: false, error: message }
  }
}

/**
 * Generates blog draft(s) via Gemini. Validates input with Zod; calls generateBlogDraft.
 * Server-only; never exposes API key or raw model output.
 */
export async function generateBlogDraftAction(input: unknown): Promise<GenerateBlogDraftResult> {
  try {
    const parsed = generateBlogDraftInputSchema.safeParse(input)
    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join('; ')
      return { success: false, error: message }
    }
    return await generateBlogDraft(parsed.data)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Taslak oluşturulamadı'
    return { success: false, error: message }
  }
}
