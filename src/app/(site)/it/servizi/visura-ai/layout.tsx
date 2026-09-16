import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visura AI del sito | Giorgio Tedesco',
  description: 'Una diagnosi preliminare del sito: messaggio, struttura, SEO visibile, punti di contatto e priorità da verificare.',
  alternates: {
    canonical: 'https://www.giorgiotedesco.it/it/servizi/visura-ai/',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function VisuraAiServiceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
