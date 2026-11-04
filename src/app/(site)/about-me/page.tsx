import type { Metadata } from 'next';
import AboutMeClient from '@/app/components/googlestudioai/AboutMeClient';
import { pageMetadata } from '@/app/lib/seo';
import { siteRole } from '@/app/lib/site-role';

export const metadata: Metadata = pageMetadata({
    title: `About Giorgio Tedesco | ${siteRole}`,
    description: `Learn about Giorgio Tedesco, a ${siteRole} focused on scalable, secure software systems and modern engineering practices.`,
    path: '/about-me/',
});


export default function AboutMe() {
    return <AboutMeClient />;
}
