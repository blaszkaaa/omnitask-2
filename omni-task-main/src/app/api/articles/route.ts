import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getPublicUrl } from '@/lib/gcs'

export async function GET() {
  try {
    const articles = await Promise.race([
      prisma.article.findMany({
        where: { is_public: true },
        orderBy: { created_at: 'desc' },
        select: {
          id: true,
          slug: true,
          title: true,
          excerpt: true,
          category: true,
          image: true,
          image_alt: true,
          image_title: true,
          created_at: true,
          date: true,
        },
      }),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Prisma Timeout')), 1500))
    ]) as any

    // Resolve image – if it's just a filename, build the full GCS URL
    const articlesWithUrls = articles.map((a: any) => ({
      ...a,
      image: a.image
        ? (a.image.startsWith('http') ? a.image : getPublicUrl(a.image))
        : null,
    }))

    return NextResponse.json({ articles: articlesWithUrls })
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json({ articles: [] })
  }
}
