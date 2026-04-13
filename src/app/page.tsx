'use client'

import Link from 'next/link'
import { useTranslation } from '@/i18n/context'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const { t } = useTranslation()
  const [faqOpen, setFaqOpen] = useState<number | null>(null)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [testimonials, setTestimonials] = useState<Array<{ id?: string, text: string, author: string, role: string, company?: string, rating: number }>>([])

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => {
        if (data && data.testimonials) setTestimonials(data.testimonials)
      })
      .catch(console.error)
  }, [])

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index)
  }

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return

    setIsSubmitting(true)
    setNewsletterStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail })
      })

      const result = await response.json()

      if (response.ok) {
        setNewsletterStatus('success')
        setNewsletterEmail('')
      } else {
        setNewsletterStatus('error')
        setErrorMessage(result.error || 'Wystąpił błąd. Spróbuj ponownie później.')
      }
    } catch (error) {
      setNewsletterStatus('error')
      setErrorMessage('Wystąpił błąd serwera. Spróbuj ponownie później.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="hero" id="hero">
        <div className="hero__bg-pattern" />
        <div className="hero__geometric">
          <div className="hero__geometric-rect" />
          <div className="hero__geometric-rect" />
          <div className="hero__geometric-rect" />
        </div>
        {/* Animated gears */}
        <div className="hero__gears">
          <div className="hero__gear hero__gear--1">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="50" cy="50" r="20" />
              <path d="M50 5v15M50 80v15M5 50h15M80 50h15M18 18l10.6 10.6M71.4 71.4l10.6 10.6M18 82l10.6-10.6M71.4 28.6l10.6-10.6" />
            </svg>
          </div>
          <div className="hero__gear hero__gear--2">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="50" cy="50" r="15" />
              <path d="M50 10v12M50 78v12M10 50h12M78 50h12M22 22l8.5 8.5M69.5 69.5l8.5 8.5M22 78l8.5-8.5M69.5 30.5l8.5-8.5" />
            </svg>
          </div>
        </div>
        <div className="hero__container">
          <div className="hero__content animate-fade-in-up">
            <span className="hero__label">🤖 RPA & Automation</span>
            <h1 className="hero__title">
              {t('hero.title')}
            </h1>
            <p className="hero__subtitle">{t('hero.subtitle')}</p>
            <div className="hero__buttons">
              <Link
                href="/zapytanie-ofertowe"
                className="btn btn--primary btn--lg"
                title={t('hero.cta_primary')}
              >
                {t('hero.cta_primary')}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="#process"
                className="btn btn--outline btn--lg"
                title={t('hero.cta_secondary')}
              >
                {t('hero.cta_secondary')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CLIENT LOGOS ===== */}
      <section className="clients-bar" id="clients">
        <div className="section__container">
          <p className="clients-bar__label">{t('clients.title')}</p>
          <div className="clients-bar__track">
            <div className="clients-bar__logos">
              {['TechFin', 'LogiTrans', 'HRPro', 'DataFlow', 'SmartOps', 'CloudBase', 'ProSys', 'AutoNet'].map((name) => (
                <div key={name} className="clients-bar__logo" title={name}>
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section className="section section--alt" id="services">
        <div className="section__container">
          <div className="section__header">
            <h2>{t('services.title')}</h2>
            <p>{t('services.subtitle')}</p>
          </div>
          <div className="services-grid services-grid--6">
            <div className="service-card">
              <div className="service-card__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="2" />
                  <path d="M7 10l3 3 7-7" />
                </svg>
              </div>
              <h3>{t('services.service1.title')}</h3>
              <p>{t('services.service1.desc')}</p>
            </div>
            <div className="service-card">
              <div className="service-card__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <h3>{t('services.service2.title')}</h3>
              <p>{t('services.service2.desc')}</p>
            </div>
            <div className="service-card">
              <div className="service-card__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3>{t('services.service3.title')}</h3>
              <p>{t('services.service3.desc')}</p>
            </div>
            <div className="service-card">
              <div className="service-card__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                </svg>
              </div>
              <h3>{t('services.service4.title')}</h3>
              <p>{t('services.service4.desc')}</p>
            </div>
            <div className="service-card">
              <div className="service-card__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a4 4 0 014 4c0 1.95-1.4 3.58-3.25 3.93L12 22l-.75-12.07A4.001 4.001 0 0112 2z" />
                  <path d="M9 6.5a2.5 2.5 0 015 0" />
                </svg>
              </div>
              <h3>{t('services.service5.title')}</h3>
              <p>{t('services.service5.desc')}</p>
            </div>
            <div className="service-card">
              <div className="service-card__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <h3>{t('services.service6.title')}</h3>
              <p>{t('services.service6.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROCESS SECTION ===== */}
      <section className="section" id="process">
        <div className="section__container">
          <div className="section__header">
            <h2>{t('process.title')}</h2>
            <p>{t('process.subtitle')}</p>
          </div>
          <div className="process-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="process-step">
                <div className="process-step__number">{t(`process.step${i}.number`)}</div>
                <div className="process-step__connector" />
                <div className="process-content">
                  <h3>{t(`process.step${i}.title`)}</h3>
                  <p>{t(`process.step${i}.desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AI AGENTS FEATURE SECTION ===== */}
      <section className="section bg-agents" id="ai-agents">
        <div className="section__container">
          <div className="agents-layout">
            <div className="agents-info">
              <div className="hero__label">{t('ai_agents.title')}</div>
              <h2 className="agents-title">{t('ai_agents.subtitle')}</h2>
              <p className="agents-description">{t('ai_agents.tech_selection')}</p>
              
              <div className="agents-features">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="agent-feature-item">
                    <div className="agent-feature-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    </div>
                    <div>
                      <h4>{t(`ai_agents.feature${i}_title`)}</h4>
                      <p>{t(`ai_agents.feature${i}_desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="agents-visual">
              <div className="agents-orb">
                <div className="orb-core"></div>
                <div className="orb-ring ring-1"></div>
                <div className="orb-ring ring-2"></div>
                <div className="orb-ring ring-3"></div>
                <div className="orb-node node-1">AI</div>
                <div className="orb-node node-2">Agent</div>
                <div className="orb-node node-3">RPA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ROI SECTION ===== */}
      <section className="section section--dark" id="roi">
        <div className="section__container">
          <div className="section__header">
            <h2>{t('roi.title')}</h2>
            <p>{t('roi.subtitle')}</p>
          </div>
          <div className="stats-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="stat-card">
                <span className="stat-card__value">{t(`roi.stat${i}_value`)}</span>
                <span className="stat-card__label">{t(`roi.stat${i}_label`)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== USE CASES ===== */}
      <section className="section section--alt" id="cases">
        <div className="section__container">
          <div className="section__header">
            <h2>{t('cases.title')}</h2>
            <p>{t('cases.subtitle')}</p>
          </div>
          <div className="cases-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="case-card">
                <div className="case-card__badge">{t(`cases.case${i}.industry`)}</div>
                <h3>{t(`cases.case${i}.title`)}</h3>
                <p>{t(`cases.case${i}.desc`)}</p>
                <div className="case-card__result">
                  {t(`cases.case${i}.result`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TECHNOLOGIES ===== */}
      <section className="section" id="tech">
        <div className="section__container">
          <div className="section__header">
            <h2>{t('tech.title')}</h2>
            <p>{t('tech.subtitle')}</p>
          </div>
          <div className="tech-grid">
            {[
              { name: 'UiPath', icon: 'https://icon.horse/icon/uipath.com' },
              { name: 'Power Automate', icon: '/power-automate.svg' },
              { name: 'Python', icon: 'https://icon.horse/icon/python.org' },
              { name: 'Zapier', icon: 'https://icon.horse/icon/zapier.com' },
              { name: 'Make', icon: 'https://icon.horse/icon/make.com' },
              { name: 'Azure', icon: 'https://icon.horse/icon/azure.microsoft.com' },
              { name: 'Google Cloud', icon: 'https://icon.horse/icon/cloud.google.com' },
              { name: 'OpenAI', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg' },
            ].map((tech) => (
              <div key={tech.name} className="tech-card" title={tech.name}>
                <div className="tech-card__icon" style={{ background: '#fff', padding: '0.25rem' }}>
                  <img src={tech.icon} alt={`${tech.name} logo`} title={tech.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <span className="tech-card__name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section className="section section--alt" id="features">
        <div className="section__container">
          <div className="section__header">
            <h2>{t('why.title')}</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-card__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                </svg>
              </div>
              <div>
                <h3>{t('why.feature1.title')}</h3>
                <p>{t('why.feature1.desc')}</p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div>
                <h3>{t('why.feature2.title')}</h3>
                <p>{t('why.feature2.desc')}</p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="20" x2="12" y2="10" />
                  <line x1="18" y1="20" x2="18" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="16" />
                </svg>
              </div>
              <div>
                <h3>{t('why.feature3.title')}</h3>
                <p>{t('why.feature3.desc')}</p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <h3>{t('why.feature4.title')}</h3>
                <p>{t('why.feature4.desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section" id="testimonials">
        <div className="section__container">
          <div className="section__header">
            <h2>{t('testimonials.title')}</h2>
            <p>{t('testimonials.subtitle')}</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, idx) => (
              <div key={t.id || idx} className="testimonial-card">
                <div className="testimonial-card__stars">{"★".repeat(t.rating || 5)}</div>
                <blockquote className="testimonial-card__text">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">
                    {t.author ? t.author.charAt(0) : 'U'}
                  </div>
                  <div>
                    <strong>{t.author}</strong>
                    <span>{t.role}{t.company ? `, ${t.company}` : ''}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section section--alt" id="faq">
        <div className="section__container">
          <div className="section__header">
            <h2>{t('faq.title')}</h2>
            <p>{t('faq.subtitle')}</p>
          </div>
          <div className="faq-list">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className={`faq-item ${faqOpen === i ? 'faq-item--open' : ''}`}
              >
                <button
                  className="faq-item__question"
                  onClick={() => toggleFaq(i)}
                  id={`faq-toggle-${i}`}
                  aria-expanded={faqOpen === i}
                >
                  <span>{t(`faq.q${i}`)}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="faq-item__icon"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className="faq-item__answer">
                  <p>{t(`faq.a${i}`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA + NEWSLETTER ===== */}
      <section className="section section--dark cta-section" id="cta">
        <div className="cta-section__bg" />
        <div className="section__container" style={{ position: 'relative', zIndex: 1 }}>
          <h2>{t('cta.title')}</h2>
          <p>{t('cta.subtitle')}</p>
          <Link
            href="/zapytanie-ofertowe"
            className="btn btn--primary btn--lg"
            title={t('cta.button')}
          >
            {t('cta.button')}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          <div className="newsletter" id="newsletter">
            <h3>{t('newsletter.title')}</h3>
            <p>{t('newsletter.subtitle')}</p>
            {newsletterStatus === 'success' ? (
              <p className="newsletter__success">{t('newsletter.success')}</p>
            ) : (
              <form className="newsletter__form" onSubmit={handleNewsletter}>
                <div style={{ flex: 1, position: 'relative' }}>
                  <input
                    type="email"
                    placeholder={t('newsletter.placeholder')}
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="newsletter__input"
                    style={{ width: '100%', borderColor: newsletterStatus === 'error' ? 'var(--color-error)' : undefined }}
                    required
                    id="newsletter-email"
                    disabled={isSubmitting}
                  />
                  {newsletterStatus === 'error' && (
                    <div style={{ position: 'absolute', bottom: '-20px', left: 0, color: 'var(--color-error)', fontSize: '0.8rem' }}>
                      {errorMessage}
                    </div>
                  )}
                </div>
                <button type="submit" className="btn btn--primary" id="newsletter-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Zapisywanie...' : t('newsletter.button')}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* SEO Schema Markups */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'OmniTask',
            url: 'https://www.omnitask.pl',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://www.omnitask.pl/blog?q={search_term_string}',
              'query-input': 'required name=search_term_string'
            }
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({
              '@type': 'Question',
              name: t(`faq.q${i}`),
              acceptedAnswer: {
                '@type': 'Answer',
                text: t(`faq.a${i}`)
              }
            }))
          }),
        }}
      />
    </>
  )
}
