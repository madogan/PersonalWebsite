import { NextResponse } from 'next/server'

/**
 * Health check endpoint for Docker/Kubernetes monitoring
 * Returns 200 OK if the server is running
 */
export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
    { status: 200 }
  )
}
