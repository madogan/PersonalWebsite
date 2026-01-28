import { z } from 'zod'

const slugSchema = z
  .string()
  .min(1, 'Slug is required')
  .max(200, 'Slug must be 200 characters or less')
  .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens')

export const blogPostPayloadSchema = z.object({
  slug: slugSchema,
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
  date: z.string().min(1, 'Date is required'),
  tags: z.array(z.string()),
  locale: z.enum(['en', 'tr']),
  alternateLocale: z.enum(['en', 'tr']).optional(),
  alternateSlug: z.string().optional(),
  content: z.string().min(0),
})

export type BlogPostPayloadInput = z.infer<typeof blogPostPayloadSchema>

export { slugSchema }
