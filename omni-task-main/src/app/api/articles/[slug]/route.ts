import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getPublicUrl } from '@/lib/gcs'

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params

    const article = await Promise.race([
      prisma.article.findUnique({
        where: { slug, is_public: true },
      }),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Prisma Timeout')), 1500))
    ]) as any

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    // Resolve image – if it's just a filename, build the full GCS URL
    const resolvedArticle = {
      ...article,
      image: article.image
        ? (article.image.startsWith('http') ? article.image : getPublicUrl(article.image))
        : null,
    }

    return NextResponse.json({ article: resolvedArticle })
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
