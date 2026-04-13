import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zapytanie ofertowe – Automatyzacja RPA | OmniTask',
  description:
    'Skontaktuj się z nami i otrzymaj bezpłatną wycenę wdrożenia automatyzacji RPA. Opisz swój proces, a my zaproponujemy optymalne rozwiązanie.',
  openGraph: {
    title: 'Bezpłatna Wycena Czasu i Kosztów - OmniTask',
    description: 'Zamów bezpłatną analizę swojego procesu. Pokażemy, ile oszczędzisz roboczogodzin dzięki RPA.',
    url: 'https://www.omnitask.pl/zapytanie-ofertowe',
    type: 'website',
  },
  alternates: {
    canonical: '/zapytanie-ofertowe',
  },
}

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
