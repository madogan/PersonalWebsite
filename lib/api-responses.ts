/**
 * API response helpers for route handlers.
 * Use only in API routes or server code; do not import from client components.
 */

import { NextResponse } from 'next/server'
import type { ZodError } from 'zod'

/**
 * Returns a 400 response with joined Zod validation messages.
 * Use when schema.safeParse(body) fails in an API route.
 *
 * @example
 * const parsed = schema.safeParse(await request.json())
 * if (!parsed.success) return badRequestFromZod(parsed.error)
 */
export function badRequestFromZod(zodError: ZodError): NextResponse {
  const message = zodError.issues.map((issue) => issue.message).join('; ')
  return NextResponse.json({ error: message }, { status: 400 })
}

const DEFAULT_SERVER_ERROR_MESSAGE = 'An unexpected error occurred.'

/**
 * Returns a 500 response with a generic message.
 * Use for unexpected errors in API routes; do not expose stack or sensitive data.
 *
 * @example
 * try {
 *   // ...
 * } catch (err) {
 *   return serverErrorResponse()
 * }
 */
export function serverErrorResponse(
  message: string = DEFAULT_SERVER_ERROR_MESSAGE
): NextResponse {
  return NextResponse.json({ error: message }, { status: 500 })
}
