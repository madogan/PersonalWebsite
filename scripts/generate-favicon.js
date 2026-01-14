/**
 * Script to generate favicon.ico from profile.jpg
 *
 * This script requires sharp to be installed:
 * npm install --save-dev sharp
 *
 * For ICO generation, it uses a safer approach with jimp (if available)
 * or falls back to PNG which modern browsers support.
 *
 * Usage: node scripts/generate-favicon.js
 */

const fs = require('fs')
const path = require('path')

async function generateFavicon() {
  try {
    // Check if sharp is available
    let sharp
    try {
      sharp = require('sharp')
    } catch (error) {
      console.error('Error: sharp is not installed.')
      console.error(
        'Please install it by running: npm install --save-dev sharp'
      )
      process.exit(1)
    }

    const profileImagePath = path.join(
      process.cwd(),
      'public',
      'images',
      'profile.jpg'
    )
    const faviconPath = path.join(process.cwd(), 'app', 'favicon.ico')
    const faviconPngPath = path.join(process.cwd(), 'app', 'icon.png')

    // Check if profile image exists
    if (!fs.existsSync(profileImagePath)) {
      console.error(`Error: Profile image not found at ${profileImagePath}`)
      console.error('Please ensure profile.jpg exists in public/images/')
      process.exit(1)
    }

    console.log('Generating favicon from profile.jpg...')

    // Generate multiple sizes for better compatibility
    const sizes = [16, 32, 48]
    const pngBuffers = []

    for (const size of sizes) {
      const buffer = await sharp(profileImagePath)
        .resize(size, size, {
          fit: 'cover',
          position: 'center',
        })
        .toFormat('png')
        .toBuffer()
      pngBuffers.push(buffer)
    }

    // Generate PNG favicon for app directory (Next.js 15 uses app/icon.png)
    await sharp(profileImagePath)
      .resize(32, 32, {
        fit: 'cover',
        position: 'center',
      })
      .ensureAlpha() // Ensure RGBA format
      .toFormat('png')
      .toFile(faviconPngPath)

    console.log(`✓ Created icon.png in app/ directory: ${faviconPngPath}`)

    // Generate ICO file - Next.js 15 requires proper ICO format
    // We'll use the PNG data but ensure it's in RGBA format
    try {
      // Generate a proper 32x32 PNG in RGBA format for ICO
      const icoPngBuffer = await sharp(profileImagePath)
        .resize(32, 32, {
          fit: 'cover',
          position: 'center',
        })
        .ensureAlpha() // Ensure RGBA format
        .toFormat('png')
        .toBuffer()

      // Create proper ICO file structure
      // ICO Header (6 bytes)
      const icoHeader = Buffer.alloc(6)
      icoHeader.writeUInt16LE(0, 0) // Reserved (must be 0)
      icoHeader.writeUInt16LE(1, 2) // Type (1 = ICO)
      icoHeader.writeUInt16LE(1, 4) // Number of images

      // ICO Directory Entry (16 bytes)
      const icoDir = Buffer.alloc(16)
      icoDir.writeUInt8(32, 0) // Width (32px, 0 means 256px)
      icoDir.writeUInt8(32, 1) // Height (32px, 0 means 256px)
      icoDir.writeUInt8(0, 2) // Color palette (0 = no palette)
      icoDir.writeUInt8(0, 3) // Reserved
      icoDir.writeUInt16LE(1, 4) // Color planes
      icoDir.writeUInt16LE(32, 6) // Bits per pixel (32 for RGBA)
      icoDir.writeUInt32LE(icoPngBuffer.length, 8) // Image data size
      icoDir.writeUInt32LE(22, 12) // Offset to image data (6 + 16 = 22)

      // For ICO format, we need to embed PNG data
      // Modern ICO format can contain PNG data directly
      const icoFile = Buffer.concat([icoHeader, icoDir, icoPngBuffer])

      // Only write to app directory (Next.js 15 convention)
      fs.writeFileSync(faviconPath, icoFile)

      console.log(`✓ Created favicon.ico in app/ directory: ${faviconPath}`)
      console.log(
        'ℹ Note: Next.js 15 uses app/favicon.ico (public/favicon.ico is not needed)'
      )
    } catch (icoError) {
      console.warn('⚠ Could not generate ICO format:', icoError.message)
      console.log(
        'ℹ PNG favicons have been created and work in all modern browsers.'
      )
    }

    console.log('\n✓ Favicon generation complete!')
  } catch (error) {
    console.error('Error generating favicon:', error)
    process.exit(1)
  }
}

generateFavicon()
