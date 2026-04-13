import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.omnitask.pl'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/zapytanie-ofertowe`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  // Dynamic blog pages - auto-updated when new articles are published
  let blogPages: MetadataRoute.Sitemap = []
  try {
    const articles = await Promise.race([
      prisma.article.findMany({
        where: { is_public: true },
        select: { slug: true, created_at: true },
        orderBy: { created_at: 'desc' },
      }),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Prisma Timeout')), 1500))
    ]) as any[]

    if (articles && articles.length > 0) {
      blogPages = articles.map((article) => ({
        url: `${baseUrl}/blog/${article.slug}`,
        lastModified: article.created_at,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }))
    }
  } catch (error) {
    console.error('Error reading blog posts for sitemap:', error)
  }

  return [...staticPages, ...blogPages]
}
