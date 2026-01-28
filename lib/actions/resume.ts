'use server'

import { getResumeData, writeResumeData } from '@/lib/resume'
import type { ResumeData } from '@/lib/resume'
import { partialResumeSchema, type PartialResumeInput } from '@/lib/schemas/resume'

function deepMerge<T extends Record<string, unknown>>(
  target: T,
  source: Partial<T>
): T {
  const result = { ...target }
  for (const key of Object.keys(source) as (keyof T)[]) {
    const sourceVal = source[key]
    if (sourceVal === undefined) continue
    const targetVal = result[key]
    if (
      typeof sourceVal === 'object' &&
      sourceVal !== null &&
      !Array.isArray(sourceVal) &&
      typeof targetVal === 'object' &&
      targetVal !== null &&
      !Array.isArray(targetVal)
    ) {
      ;(result as Record<string, unknown>)[key as string] = deepMerge(
        targetVal as Record<string, unknown>,
        sourceVal as Record<string, unknown>
      )
    } else {
      ;(result as Record<string, unknown>)[key as string] = sourceVal
    }
  }
  return result
}

export type UpdateResumeResult = { success: true } | { success: false; error: string }

export async function updateResumeAction(
  input: PartialResumeInput
): Promise<UpdateResumeResult> {
  try {
    const parsed = partialResumeSchema.safeParse(input)
    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join('; ')
      return { success: false, error: message }
    }
    const existing = getResumeData()
    const merged = deepMerge(existing as Record<string, unknown>, parsed.data as Record<string, unknown>) as ResumeData
    await writeResumeData(merged)
    return { success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update resume'
    return { success: false, error: message }
  }
}
