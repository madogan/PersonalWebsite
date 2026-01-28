'use server'

import fs from 'fs'
import path from 'path'

const CERT_DIR = path.join(process.cwd(), 'public', 'images', 'certifications')
const MAX_FILE_BYTES = 2 * 1024 * 1024 // 2MB
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif', 'image/svg+xml']
const EXT_MAP: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
}

export type UploadCertImageResult =
  | { success: true; path: string }
  | { success: false; error: string }

export async function uploadCertificationImageAction(
  formData: FormData
): Promise<UploadCertImageResult> {
  try {
    const file = formData.get('file')
    const certIndexRaw = formData.get('certIndex')

    if (!file || !(file instanceof File)) {
      return { success: false, error: 'No file provided' }
    }

    const certIndex = typeof certIndexRaw === 'string' ? certIndexRaw : String(certIndexRaw ?? '0')
    if (!/^\d+$/.test(certIndex)) {
      return { success: false, error: 'Invalid cert index' }
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return { success: false, error: 'File must be an image (PNG, JPEG, WebP, GIF, SVG)' }
    }

    if (file.size > MAX_FILE_BYTES) {
      return { success: false, error: 'Image must be 2MB or smaller' }
    }

    const ext = EXT_MAP[file.type] ?? 'png'
    const filename = `cert-${certIndex}.${ext}`
    const dir = CERT_DIR
    const filepath = path.join(dir, filename)

    await fs.promises.mkdir(dir, { recursive: true })
    const buffer = Buffer.from(await file.arrayBuffer())
    await fs.promises.writeFile(filepath, buffer)

    const publicPath = `/images/certifications/${filename}`
    return { success: true, path: publicPath }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Upload failed'
    return { success: false, error: message }
  }
}
