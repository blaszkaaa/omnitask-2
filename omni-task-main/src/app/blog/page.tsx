'use client'

import Link from 'next/link'
import { useTranslation } from '@/i18n/context'
import { useEffect, useState } from 'react'

interface Article {
  id: number
  slug: string
  title: Record<string, string>
  excerpt: Record<string, string>
  category: Record<string, string>
  image: string | null
  image_alt: string | null
  image_title: string | null
  date: string | null
  created_at: string
}

export default function BlogPage() {
  const { t, locale } = useTranslation()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const getTitle = (article: Article) => {
    if (!article.title) return ''
    return article.title[locale] || article.title.pl || ''
  }

  const getDescription = (article: Article) => {
    if (!article.excerpt) return ''
    return article.excerpt[locale] || article.excerpt.pl || ''
  }

  const getCategory = (article: Article) => {
    if (!article.category) return ''
    return article.category[locale] || article.category.pl || ''
  }

  return (
    <>
      <div className="page-header">
        <div className="page-header__bg" />
        <h1>{t('blog.title')}</h1>
        <p>{t('blog.subtitle')}</p>
      </div>

      <div className="blog-page">
        <div className="section__container">
          {loading ? (
            <div className="loading-spinner">
              <div className="loading-spinner__circle" />
            </div>
          ) : articles.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <p>{t('blog.no_articles')}</p>
            </div>
          ) : (
            <div className="blog-grid">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="blog-card"
                  title={getTitle(article)}
                >
                  <div className="blog-card__image">
                    {article.image ? (
                      <img
                        src={article.image}
                        alt={article.image_alt || getTitle(article)}
                        title={article.image_title || getTitle(article)}
                        loading="lazy"
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #1a2f5a, #2a4a8a)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'rgba(255,255,255,0.3)',
                        fontSize: '3rem',
                      }}>
                        ◆
                      </div>
                    )}
                  </div>
                  <div className="blog-card__body">
                    {getCategory(article) && (
                      <span className="blog-card__category" style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-primary)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
                        {getCategory(article)}
                      </span>
                    )}
                    <p className="blog-card__date">
                      {t('blog.published')} {new Date(article.date || article.created_at).toLocaleDateString(
                        locale === 'ua' ? 'uk-UA' : locale === 'en' ? 'en-US' : 'pl-PL'
                      )}
                    </p>
                    <h3 className="blog-card__title">{getTitle(article)}</h3>
                    <p className="blog-card__excerpt">{getDescription(article)}</p>
                    <span className="blog-card__link">
                      {t('blog.read_more')}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
