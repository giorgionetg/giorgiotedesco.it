import type { Metadata } from 'next';
import DemoPage04 from '@/app/(site)/it/demo-page-04/page';
import VisuraKanban from '@/app/components/googlestudioai/VisuraKanban';
import { absoluteUrl, pageMetadata, siteIdentity } from '@/app/lib/seo';

const path = '/it/servizi/siti-web/';
const url = absoluteUrl(path);
const title = 'Siti web per PMI e studi professionali | Giorgio Tedesco';
const description =
  'Progetto offerta, contenuti, sviluppo e misurazione del sito per PMI e studi professionali, con un unico interlocutore dalla strategia alla pubblicazione.';

export const metadata: Metadata = {
  ...pageMetadata({ title, description, path, locale: 'it_IT' }),
  applicationName: siteIdentity.name,
  authors: [{ name: siteIdentity.name, url: absoluteUrl('/') }],
  creator: siteIdentity.name,
  publisher: siteIdentity.name,
  category: 'Sviluppo web e comunicazione commerciale',
  classification: 'Servizi professionali',
  keywords: [
    'siti web',
    'siti web per PMI',
    'siti web per studi professionali',
    'sviluppo siti web',
    'comunicazione commerciale',
    'misurazione conversioni sito',
  ],
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  other: { 'content-language': 'it' },
  twitter: { card: 'summary_large_image', title, description, creator: '@giorgionetg' },
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
      name: 'Progettazione di siti web',
      serviceType: 'Progettazione, contenuti, sviluppo e misurazione di siti web',
      description,
      provider: { '@id': siteIdentity.personId },
      audience: { '@type': 'BusinessAudience', audienceType: 'PMI e studi professionali' },
      mainEntityOfPage: { '@id': `${url}#webpage` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
        { '@type': 'ListItem', position: 2, name: 'Siti web', item: url },
      ],
    },
  ],
};

export default function WebsiteServicePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <DemoPage04
        primaryHref="#analisi-sito-web"
        leadForm={
          <VisuraKanban
            experimentId="siti-web-service-v1"
            idPrefix="siti-web"
            mode="website-service"
            sectionId="analisi-sito-web"
            serviceType="siti-web"
            variantId="siti-web-compact-v1"
          />
        }
      />
    </>
  );
}
