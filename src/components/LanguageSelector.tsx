'use client'

import { useTranslation, Locale } from '@/i18n/context'
import { useState, useRef, useEffect } from 'react'

const localeLabels: Record<string, { flag: string; label: string }> = {
  pl: { flag: '🇵🇱', label: 'PL' },
  en: { flag: '🇬🇧', label: 'EN' },
}

export default function LanguageSelector() {
  const { locale, setLocale } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="lang-selector" ref={ref}>
      <button
        className="lang-selector__toggle"
        onClick={() => setOpen(!open)}
        aria-label="Select language"
        id="language-selector-toggle"
      >
        <span className="lang-selector__label">{locale.toUpperCase()}</span>
        <svg
          className={`lang-selector__chevron ${open ? 'lang-selector__chevron--open' : ''}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="lang-selector__dropdown">
          {(Object.keys(localeLabels) as Locale[]).map((loc) => (
            <button
              key={loc}
              className={`lang-selector__option ${loc === locale ? 'lang-selector__option--active' : ''}`}
              onClick={() => {
                setLocale(loc)
                setOpen(false)
              }}
              id={`language-option-${loc}`}
            >
              <span>{loc.toUpperCase()}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
