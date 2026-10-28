import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy | Giorgio Tedesco',
  description: 'Informativa privacy di GiorgioTedesco.it.',
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return <div className="container mx-auto max-w-3xl px-6 pb-24 pt-36">
    <h1 className="text-4xl font-bold tracking-tight text-slate-900">Informativa privacy</h1>
    <p className="mt-6 text-lg leading-relaxed text-slate-600">L’informativa privacy è in preparazione.</p>
  </div>;
}
