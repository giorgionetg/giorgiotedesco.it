import type { Metadata } from 'next';
import { pageMetadata } from '@/app/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Visura AI del sito | Giorgio Tedesco',
  description: 'Una diagnosi preliminare del sito: messaggio, struttura, SEO visibile, punti di contatto e priorità da verificare.',
  path: '/it/servizi/visura-ai/',
  locale: 'it_IT',
});

export default function VisuraAiServiceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
