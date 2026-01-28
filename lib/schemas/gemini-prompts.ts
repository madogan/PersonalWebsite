import { z } from 'zod'

const MAX_PROMPT_LENGTH = 10_000
const MAX_TOPIC_LENGTH = 2000

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

const existingContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
})

export const generateBlogDraftInputSchema = z.object({
  locale: z.enum(['en', 'tr', 'both']),
  topic: z.string().max(MAX_TOPIC_LENGTH, `Konu en fazla ${MAX_TOPIC_LENGTH} karakter olabilir`).optional(),
  existingEn: existingContentSchema.optional(),
  existingTr: existingContentSchema.optional(),
})

export type GenerateBlogDraftInput = z.infer<typeof generateBlogDraftInputSchema>
