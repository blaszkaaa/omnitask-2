'use client'

import Link from 'next/link'
import { useTranslation } from '@/i18n/context'
import LanguageSelector from './LanguageSelector'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/zapytanie-ofertowe', label: t('nav.quote') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/kontakt', label: t('nav.contact') },
  ]

  return (
    <header className={`navbar ${scrolled || mobileOpen ? 'navbar--scrolled' : ''}`} id="main-navbar">
      <div className="navbar__container">
        <Link href="/" className="navbar__logo" title="OmniTask - Strona główna">
          <img src={scrolled || mobileOpen ? "/Logo2.png" : "/Logo.png"} alt="OmniTask Logo" title="OmniTask Logo" className="navbar__logo-img" style={{ height: '42px', width: 'auto' }} />
        </Link>

        <nav className="navbar__nav" id="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`navbar__link ${pathname === link.href ? 'navbar__link--active' : ''}`}
              title={link.label}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="navbar__actions">
          <LanguageSelector />
          <button
            className="navbar__hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            id="mobile-menu-toggle"
          >
            <span className={`navbar__hamburger-line ${mobileOpen ? 'navbar__hamburger-line--open' : ''}`} />
            <span className={`navbar__hamburger-line ${mobileOpen ? 'navbar__hamburger-line--open' : ''}`} />
            <span className={`navbar__hamburger-line ${mobileOpen ? 'navbar__hamburger-line--open' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`} id="mobile-menu">
        <nav className="navbar__mobile-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`navbar__mobile-link ${pathname === link.href ? 'navbar__mobile-link--active' : ''}`}
              title={link.label}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
