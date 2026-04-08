import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt z OmniTask – Porozmawiajmy o automatyzacji Twojej firmy',
  description:
    'Skontaktuj się z zespołem OmniTask. Odpowiadamy na pytania dotyczące wdrożeń RPA, automatyzacji procesów i integracji systemów w Twojej firmie.',
  openGraph: {
    title: 'Kontakt - OmniTask',
    description: 'Skontaktuj się z nami. Pomożemy w automatyzacji i optymalizacji procesów Twojej firmy.',
    url: 'https://www.omnitask.pl/kontakt',
    type: 'website',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
