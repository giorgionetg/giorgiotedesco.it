import type { Metadata } from 'next';
import HomePageClient from '@/app/components/googlestudioai/HomePageClient';
import myschema from '@/app/lib/schema.json';
import { pageMetadata, siteIdentity } from '@/app/lib/seo';

export const metadata: Metadata = pageMetadata({
    title: siteIdentity.title,
    description: siteIdentity.description,
    path: '/',
});

export default function HomePage() {
    return (<>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(myschema) }}
        />
        <HomePageClient />
    </>);
}
