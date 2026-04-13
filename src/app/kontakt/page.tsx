'use client'

import { useState } from 'react'
import { useTranslation } from '@/i18n/context'

export default function ContactPage() {
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        ;(e.target as HTMLFormElement).reset()
      } else {
        setSubmitStatus('error')
        setErrorMessage(result.error || t('quote.error'))
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(t('quote.error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="page-header">
        <div className="page-header__bg" />
        <h1>{t('contact.title')}</h1>
        <p>{t('contact.subtitle')}</p>
      </div>

      <div className="contact-page">
        <div className="section__container">
          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-info">
              {/* Social Media */}
              <div className="contact-info__item">
                <div className="contact-info__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.41" y2="17.49" stroke="currentColor" strokeWidth="2" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <div className="contact-info__text">
                  <h3>Obserwuj nas</h3>
                  <div className="contact-info__socials" style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    <a href="https://www.facebook.com/profile.php?id=61574333642391" target="_blank" rel="noopener noreferrer" title="Facebook">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a href="https://www.linkedin.com/company/omni-task" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                    <a href="https://www.instagram.com/omnitask.pl/" target="_blank" rel="noopener noreferrer" title="Instagram">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="contact-info__item">
                <div className="contact-info__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div className="contact-info__text">
                  <h3>{t('contact.phone_label')}</h3>
                  <p>
                    <a href={`tel:${t('contact.phone')}`} title={t('contact.phone_label')}>
                      {t('contact.phone')}
                    </a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="contact-info__item">
                <div className="contact-info__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="contact-info__text">
                  <h3>{t('contact.email_label')}</h3>
                  <p>
                    <a href={`mailto:${t('contact.email')}`} title={t('contact.email_label')}>
                      {t('contact.email')}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-card">
              <h2>Wyślij wiadomość</h2>
              {submitStatus === 'success' ? (
                <div style={{ padding: '2rem', textAlign: 'center', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)', borderRadius: 'var(--radius-md)' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ margin: '0 auto 1rem' }}>
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <h3 style={{ margin: 0, color: 'inherit', fontSize: '1.1rem', lineHeight: '1.4' }}>{t('quote.success')}</h3>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  {submitStatus === 'error' && (
                    <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-error)', borderRadius: 'var(--radius-sm)' }}>
                      {errorMessage}
                    </div>
                  )}
                  <div className="form-group">
                    <label htmlFor="name">Imię i nazwisko</label>
                    <input type="text" id="name" name="name" required placeholder={t('quote.name_placeholder')} disabled={isSubmitting} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Adres e-mail</label>
                    <input type="email" id="email" name="email" required placeholder={t('quote.email_placeholder')} disabled={isSubmitting} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Temat</label>
                    <input type="text" id="subject" name="subject" required disabled={isSubmitting} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Treść wiadomości</label>
                    <textarea id="message" name="message" rows={5} required placeholder={t('quote.message_placeholder')} disabled={isSubmitting} />
                  </div>
                  <button type="submit" className="btn btn--primary btn--lg" style={{ width: '100%' }} disabled={isSubmitting}>
                    {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Kontakt - OmniTask',
            description: t('contact.subtitle'),
            url: 'https://www.omnitask.pl/kontakt',
            mainEntity: {
              '@type': 'Organization',
              name: 'OmniTask',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+48721719238',
                email: 'kontakt@omnitask.pl',
                contactType: 'customer service',
                availableLanguage: ['Polish', 'English', 'Ukrainian']
              }
            }
          })
        }}
      />
    </>
  )
}
