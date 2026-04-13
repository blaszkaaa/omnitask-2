'use client'

import { useTranslation } from '@/i18n/context'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface Article {
  id: number
  slug: string
  title: Record<string, string>
  excerpt: Record<string, string>
  content: Record<string, string>
  category: Record<string, string>
  image: string | null
  image_alt: string | null
  image_title: string | null
  schema_markup: string | null
  meta_title: string | null
  meta_description: string | null
  date: string | null
  created_at: string
}

export default function BlogArticlePage() {
  const { t, locale } = useTranslation()
  const params = useParams()
  const slug = params.slug as string
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    fetch(`/api/articles/${slug}`)
      .then((res) => {
        if (!res.ok) {
          setNotFound(true)
          setLoading(false)
          return null
        }
        return res.json()
      })
      .then((data) => {
        if (data?.article) {
          setArticle(data.article)
        }
        setLoading(false)
      })
      .catch(() => {
        setNotFound(true)
        setLoading(false)
      })
  }, [slug, locale])

  // EFFECT for dynamically setting title on links
  useEffect(() => {
    if (article && !loading && !notFound) {
      const links = document.querySelectorAll('.article-page__content a')
      links.forEach((link) => {
        if (!link.getAttribute('title')) {
          link.setAttribute('title', link.textContent || '')
        }
      })
    }
  }, [article, loading, notFound])

  if (loading) {
    return (
      <>
        <div className="page-header">
          <div className="page-header__bg" />
          <h1>{t('blog.title')}</h1>
        </div>
        <div className="article-page">
          <div className="loading-spinner">
            <div className="loading-spinner__circle" />
          </div>
        </div>
      </>
    )
  }

  if (notFound || !article) {
    return (
      <>
        <div className="page-header">
          <div className="page-header__bg" />
          <h1>{t('blog.title')}</h1>
        </div>
        <div className="article-page">
          <div className="article-page__container">
            <div className="empty-state">
              <p>Article not found</p>
              <Link href="/blog" className="btn btn--primary" style={{ marginTop: '1rem' }}>
                ← {t('blog.title')}
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  }

  const title = article.title ? (article.title[locale] || article.title.pl || '') : ''
  const content = article.content ? (article.content[locale] || article.content.pl || '') : ''

  return (
    <>
      <div className="page-header">
        <div className="page-header__bg" />
        <h1>{title}</h1>
        <p className="article-page__date">
          {t('blog.published')} {new Date(article.date || article.created_at).toLocaleDateString(
            locale === 'ua' ? 'uk-UA' : locale === 'en' ? 'en-US' : 'pl-PL'
          )}
        </p>
      </div>

      <div className="article-page">
        <div className="article-page__container">
          {article.image && (
            <div className="article-page__image">
              <img
                src={article.image}
                alt={article.image_alt || title}
                title={article.image_title || title}
              />
            </div>
          )}
          <div
            className="article-page__content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
            <Link href="/blog" className="btn btn--dark" title={t('blog.title')}>
              ← {t('blog.title')}
            </Link>
          </div>
        </div>
      </div>

      {/* Article Schema */}
      {article.schema_markup ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: article.schema_markup }}
        />
      ) : (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: title,
              datePublished: article.date || article.created_at,
              image: article.image || undefined,
              author: {
                '@type': 'Organization',
                name: 'OmniTask',
              },
              publisher: {
                '@type': 'Organization',
                name: 'OmniTask',
                url: 'https://www.omnitask.pl',
              },
            }),
          }}
        />
      )}
    </>
  )
}
