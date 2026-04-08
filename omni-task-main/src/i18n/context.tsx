'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import pl from './translations/pl.json'
import en from './translations/en.json'
import ua from './translations/ua.json'

export type Locale = 'pl' | 'en' | 'ua'

type TranslationValue = string | { [key: string]: TranslationValue }
type Translations = typeof pl

const translationsMap: Record<Locale, Translations> = { pl, en, ua }

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

function getNestedValue(obj: Record<string, TranslationValue>, path: string): string {
  const keys = path.split('.')
  let current: TranslationValue = obj
  for (const key of keys) {
    if (typeof current === 'object' && current !== null && key in current) {
      current = (current as Record<string, TranslationValue>)[key]
    } else {
      return path
    }
  }
  return typeof current === 'string' ? current : path
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('pl')

  useEffect(() => {
    const saved = localStorage.getItem('omnitask-lang') as Locale | null
    if (saved && translationsMap[saved]) {
      setLocaleState(saved)
    }
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('omnitask-lang', newLocale)
    document.documentElement.lang = newLocale === 'ua' ? 'uk' : newLocale
  }, [])

  const t = useCallback(
    (key: string): string => {
      return getNestedValue(
        translationsMap[locale] as unknown as Record<string, TranslationValue>,
        key
      )
    },
    [locale]
  )

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider')
  }
  return context
}
