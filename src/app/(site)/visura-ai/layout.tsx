import type { Metadata } from 'next';
import { pageMetadata } from '@/app/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Visura AI del sito | Giorgio Tedesco',
  description: 'Una diagnosi preliminare della presenza digitale per freelance e PMI: segnali pubblici, priorità e prossimi passi.',
  path: '/it/servizi/visura-ai/',
  locale: 'it_IT',
});

export default function VisuraAiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
