import type { Metadata, ResolvingMetadata } from 'next'
import { prisma } from '@/lib/prisma'
import { getPublicUrl } from '@/lib/gcs'

type Props = {
  params: Promise<{ slug: string }>
  children: React.ReactNode
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params

  try {
    const article = await prisma.article.findUnique({
      where: { slug, is_public: true },
    })

    if (!article) {
      return {
        title: 'Artykuł nie znaleziony | OmniTask',
      }
    }

    const defaultTitle = typeof article.title === 'object' && article.title ? ((article.title as any).pl || 'Blog') : 'Blog'
    const defaultDesc = typeof article.excerpt === 'object' && article.excerpt ? ((article.excerpt as any).pl || '') : ''

    const title = article.meta_title || defaultTitle
    const description = article.meta_description || defaultDesc
    
    // Process image for OpenGraph based on DB value and getPublicUrl helper
    let imageUrl = ''
    if (article.image) {
      imageUrl = article.image.startsWith('http') ? article.image : getPublicUrl(article.image)
    }

    const parentMeta = await parent
    const previousImages = parentMeta.openGraph?.images || []
    
    const ogImages = imageUrl 
        ? [{ url: imageUrl, alt: article.image_alt || title }, ...previousImages]
        : previousImages

    return {
      title: `${title} | OmniTask`,
      description: description,
      openGraph: {
        title: title,
        description: description,
        url: `https://www.omnitask.pl/blog/${slug}`,
        type: 'article',
        images: ogImages,
      },
      alternates: {
        canonical: `/blog/${slug}`,
      },
    }
  } catch (error) {
    return {
      title: 'Blog | OmniTask',
    }
  }
}

export default function ArticleLayout({ children }: Props) {
  return <>{children}</>
}
