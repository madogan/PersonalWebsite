import fs from 'fs'
import path from 'path'
import { geminiPromptsConfigSchema, type GeminiPromptsConfig } from '@/lib/schemas/gemini-prompts'

const configDir = path.join(process.cwd(), 'content/config')
const promptsPath = path.join(configDir, 'gemini-prompts.json')

const DEFAULT_PROMPT_EN =
  'You are a technical blog author. Given a topic or outline, write a blog post in English. Respond with a single JSON object (no markdown wrapper) with exactly these keys: "title" (string), "description" (string, 1-2 sentences for SEO), "tags" (array of strings, 3-6 technical tags), "content" (string, markdown body with headings and paragraphs). Use {{topic}} for the user\'s topic. If {{context}} is provided, use it as reference or source material. Write in a clear, professional tone suitable for a personal tech blog.'

const DEFAULT_PROMPT_TR =
  'Teknik bir blog yazarısınız. Verilen bir konu veya taslak üzerine Türkçe bir blog yazısı yazın. Yanıtınızı tek bir JSON nesnesi olarak verin (markdown sarmalayıcı kullanmayın), tam olarak şu anahtarlarla: "title" (string), "description" (string, SEO için 1-2 cümle), "tags" (string dizisi, 3-6 teknik etiket), "content" (string, başlıklar ve paragraflarla markdown gövde). Kullanıcının konusu için {{topic}} kullanın. {{context}} verilmişse referans veya kaynak olarak kullanın. Kişisel bir teknik blog için net ve profesyonel bir üslup kullanın.'

const DEFAULT_CONFIG: GeminiPromptsConfig = {
  promptEn: DEFAULT_PROMPT_EN,
  promptTr: DEFAULT_PROMPT_TR,
}

/**
 * Reads Gemini prompts config from content/config/gemini-prompts.json.
 * If the file is missing or invalid, returns in-code defaults (does not auto-write).
 */
export function getGeminiPrompts(): GeminiPromptsConfig {
  try {
    const fileContents = fs.readFileSync(promptsPath, 'utf8')
    const parsed = JSON.parse(fileContents) as unknown
    const result = geminiPromptsConfigSchema.safeParse(parsed)
    if (result.success) {
      return result.data
    }
  } catch {
    // file missing or invalid JSON — use defaults
  }
  return { ...DEFAULT_CONFIG }
}

/**
 * Writes Gemini prompts config atomically (temp file + rename). Server-only.
 * Ensures content/config/ exists before write.
 */
export async function writeGeminiPrompts(data: GeminiPromptsConfig): Promise<void> {
  await fs.promises.mkdir(configDir, { recursive: true })
  const tmpPath = path.join(configDir, `gemini-prompts.json.${Date.now()}.tmp`)
  await fs.promises.writeFile(tmpPath, JSON.stringify(data, null, 2), 'utf8')
  await fs.promises.rename(tmpPath, promptsPath)
}

/** In-code defaults for "Reset to defaults" in admin UI. */
export function getDefaultGeminiPrompts(): GeminiPromptsConfig {
  return { ...DEFAULT_CONFIG }
}
