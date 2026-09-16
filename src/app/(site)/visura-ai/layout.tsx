import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visura AI del sito | Giorgio Tedesco',
  description: 'Una diagnosi preliminare della presenza digitale per freelance e PMI: segnali pubblici, priorità e prossimi passi.',
};

export default function VisuraAiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
