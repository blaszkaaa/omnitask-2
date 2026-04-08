import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/i18n/context'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-body',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-heading',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'OmniTask – Automatyzacja RPA dla firm | Wdrożenia robotów',
    template: '%s | OmniTask',
  },
  description:
    'OmniTask to eksperci od automatyzacji procesów biznesowych RPA. Wdrażamy roboty, które eliminują powtarzalne zadania i redukują koszty operacyjne Twojej firmy.',
  keywords: [
    'OmniTask',
    'automatyzacja procesów',
    'robotyzacja procesów',
    'RPA',
    'robotic process automation',
    'automatyzacja workflow',
    'integracja systemów',
  ],
  metadataBase: new URL('https://www.omnitask.pl'),
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://www.omnitask.pl',
    siteName: 'OmniTask',
    title: 'OmniTask - Automatyzacja i robotyzacja procesów biznesowych',
    description:
      'Wdrażamy RPA, automatyzację workflow i AI. Redukujemy koszty operacyjne o 70% i przyspieszamy procesy 5x.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OmniTask - Automatyzacja i robotyzacja procesów',
    description:
      'Wdrażamy RPA, automatyzację workflow i AI. Redukujemy koszty operacyjne o 70%.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className={`${inter.variable} ${outfit.variable}`} data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'OmniTask',
              url: 'https://www.omnitask.pl',
              logo: 'https://www.omnitask.pl/Logo.png',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+48-600-000-000',
                contactType: 'customer service',
                availableLanguage: ['Polish', 'English', 'Ukrainian'],
              },
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'ul. Przykładowa 10',
                addressLocality: 'Warszawa',
                postalCode: '00-001',
                addressCountry: 'PL',
              },
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
