import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog OmniTask – Automatyzacja, RPA i technologie dla biznesu',
  description:
    'Czytaj artykuły eksperckie o automatyzacji procesów, RPA, Power Automate i UiPath. Praktyczna wiedza dla firm chcących wdrożyć robotyzację.',
  openGraph: {
    title: 'Blog OmniTask',
    description: 'Bądź na bieżąco z automatyzacją procesów biznesowych. Artykuły o RPA i AI.',
    url: 'https://www.omnitask.pl/blog',
    type: 'website',
  },
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
