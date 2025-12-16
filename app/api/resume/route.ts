import { NextResponse } from 'next/server'
import { getResumeData } from '@/lib/resume'

export async function GET() {
  try {
    const resume = getResumeData()
    return NextResponse.json(resume)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load resume data' },
      { status: 500 }
    )
  }
}

