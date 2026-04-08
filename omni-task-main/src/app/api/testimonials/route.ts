import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const testimonials = await Promise.race([
      prisma.testimonial.findMany({
        orderBy: { createdAt: 'desc' },
        take: 3
      }),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Prisma Timeout')), 1500))
    ]) as any

    return NextResponse.json({ testimonials })
  } catch (error) {
    console.error('Testimonials read error:', error)
    return NextResponse.json({ testimonials: [] }, { status: 200 })
  }
}
