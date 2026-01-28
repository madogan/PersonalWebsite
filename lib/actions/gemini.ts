'use server'

import { writeGeminiPrompts, getDefaultGeminiPrompts } from '@/lib/gemini-prompts'
import type { GeminiPromptsConfig } from '@/lib/schemas/gemini-prompts'
import { geminiPromptsConfigSchema } from '@/lib/schemas/gemini-prompts'

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
