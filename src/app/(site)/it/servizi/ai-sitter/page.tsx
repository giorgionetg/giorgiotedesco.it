import type { Metadata } from 'next';
import AiSitterLanding from '@/app/components/googlestudioai/AiSitterLanding';
import { absoluteUrl, pageMetadata, siteIdentity } from '@/app/lib/seo';

const path = '/it/servizi/ai-sitter/';
const url = absoluteUrl(path);
const title = 'Hai iniziato un sito con l’AI e non riesci a finirlo? | AI Sitter';
const description = 'Hai iniziato il sito della tua attività con ChatGPT, Claude, Cursor, Lovable o un altro strumento AI? Esamino il lavoro già fatto e ti dico cosa serve per completarlo.';

export const metadata: Metadata = {
  ...pageMetadata({ title, description, path, locale: 'it_IT' }),
  applicationName: siteIdentity.name,
  authors: [{ name: siteIdentity.name, url: absoluteUrl('/') }],
  creator: siteIdentity.name,
  publisher: siteIdentity.name,
  category: 'Assistenza per progetti web iniziati con strumenti AI',
  keywords: ['finire sito creato con AI', 'assistenza progetto web AI', 'completare sito con ChatGPT', 'recuperare progetto web', 'AI Sitter'],
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: title,
      description,
      inLanguage: 'it-IT',
      isPartOf: { '@id': siteIdentity.websiteId },
      about: { '@id': `${url}#service` },
      mainEntity: { '@id': `${url}#service` },
      breadcrumb: { '@id': `${url}#breadcrumb` },
      author: { '@id': siteIdentity.personId },
    },
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      url,
      name: 'AI Sitter',
      serviceType: 'Completamento e recupero di progetti web iniziati con strumenti AI',
      description,
      provider: { '@id': siteIdentity.personId },
      audience: { '@type': 'BusinessAudience', audienceType: 'Professionisti e imprenditori' },
      mainEntityOfPage: { '@id': `${url}#webpage` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
        { '@type': 'ListItem', position: 2, name: 'AI Sitter', item: url },
      ],
    },
  ],
};

export default function AiSitterServicePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <AiSitterLanding />
    </>
  );
}
