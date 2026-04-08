'use client'

import { useTranslation } from '@/i18n/context'
import { useState, FormEvent } from 'react'
import type { Metadata } from 'next'

export default function QuoteRequestPage() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = (formData: FormData): boolean => {
    const newErrors: Record<string, string> = {}
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string

    if (!name?.trim()) newErrors.name = t('quote.required')
    if (!email?.trim()) {
      newErrors.email = t('quote.required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t('quote.invalid_email')
    }
    if (!message?.trim()) newErrors.message = t('quote.required')

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    if (!validate(formData)) return

    setStatus('loading')

    try {
      const res = await fetch('/api/quote-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          company: formData.get('company'),
          message: formData.get('message'),
        }),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <div className="page-header">
        <div className="page-header__bg" />
        <h1>{t('quote.title')}</h1>
        <p>{t('quote.subtitle')}</p>
      </div>

      <div className="quote-page">
        <div className="section__container">
          <div className="quote-form-wrapper">
            {status === 'success' ? (
              <div className="form-success" id="quote-success">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ margin: '0 auto 1rem', display: 'block', color: '#10b981' }}>
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                {t('quote.success')}
              </div>
            ) : (
              <form className="quote-form" onSubmit={handleSubmit} id="quote-form" noValidate>
                {status === 'error' && (
                  <div className="form-general-error">{t('quote.error')}</div>
                )}
                <div className="form-row">
                  <div className={`form-group ${errors.name ? 'form-group--error' : ''}`}>
                    <label htmlFor="quote-name">{t('quote.name')} *</label>
                    <input
                      type="text"
                      id="quote-name"
                      name="name"
                      placeholder={t('quote.name_placeholder')}
                      required
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>
                  <div className={`form-group ${errors.email ? 'form-group--error' : ''}`}>
                    <label htmlFor="quote-email">{t('quote.email')} *</label>
                    <input
                      type="email"
                      id="quote-email"
                      name="email"
                      placeholder={t('quote.email_placeholder')}
                      required
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="quote-phone">{t('quote.phone')}</label>
                    <input
                      type="tel"
                      id="quote-phone"
                      name="phone"
                      placeholder={t('quote.phone_placeholder')}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="quote-company">{t('quote.company')}</label>
                    <input
                      type="text"
                      id="quote-company"
                      name="company"
                      placeholder={t('quote.company_placeholder')}
                    />
                  </div>
                </div>
                <div className={`form-group ${errors.message ? 'form-group--error' : ''}`}>
                  <label htmlFor="quote-message">{t('quote.message')} *</label>
                  <textarea
                    id="quote-message"
                    name="message"
                    placeholder={t('quote.message_placeholder')}
                    required
                  />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>
                <button
                  type="submit"
                  className="btn btn--primary btn--lg"
                  disabled={status === 'loading'}
                  id="quote-submit"
                >
                  {status === 'loading' ? (
                    <span className="loading-spinner__circle" style={{ width: 20, height: 20, borderWidth: 2 }} />
                  ) : (
                    <>
                      {t('quote.submit')}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
