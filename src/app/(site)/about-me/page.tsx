import type { Metadata } from 'next';
import AboutMeClient from '@/app/components/googlestudioai/AboutMeClient';
import { pageMetadata } from '@/app/lib/seo';

export const metadata: Metadata = pageMetadata({
    title: 'About Giorgio Tedesco | Solution Architect & Tech Lead',
    description: 'Learn about Giorgio Tedesco, a Senior Solution Architect and Tech Lead focused on scalable, secure software systems and modern engineering practices.',
    path: '/about-me/',
});


export default function AboutMe() {
    return <AboutMeClient />;
}
