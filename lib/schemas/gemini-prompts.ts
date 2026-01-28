import { z } from 'zod'

const MAX_PROMPT_LENGTH = 10_000

export const geminiPromptsConfigSchema = z.object({
  promptEn: z
    .string()
    .min(1, 'İngilizce prompt gerekli')
    .max(MAX_PROMPT_LENGTH, `İngilizce prompt en fazla ${MAX_PROMPT_LENGTH} karakter olabilir`),
  promptTr: z
    .string()
    .min(1, 'Türkçe prompt gerekli')
    .max(MAX_PROMPT_LENGTH, `Türkçe prompt en fazla ${MAX_PROMPT_LENGTH} karakter olabilir`),
})

export type GeminiPromptsConfig = z.infer<typeof geminiPromptsConfigSchema>
