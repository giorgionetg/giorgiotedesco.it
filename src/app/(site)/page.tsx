import type { Metadata } from 'next';
import HomePageClient from '@/app/components/googlestudioai/HomePageClient';
import BlogPostCard from '@/app/components/googlestudioai/BlogPostCard';
import NewsletterCard from '@/app/components/googlestudioai/NewsletterCard';
import { getAllPosts } from '@/app/lib/markdown/posts';
import { homeSchema } from '@/app/lib/schema';
import { pageMetadata, siteIdentity } from '@/app/lib/seo';

export const metadata: Metadata = pageMetadata({
    title: siteIdentity.title,
    description: siteIdentity.description,
    path: '/',
});

export default async function HomePage() {
    const latestPosts = (await getAllPosts('en')).slice(0, 2);

    return (<>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
        />
        <HomePageClient />
        <section className="py-16 md:py-24" aria-label="Recent blog articles">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {latestPosts.map((post) => (
                        <BlogPostCard key={post.slug.join('/')} post={post} homepage />
                    ))}
                    <NewsletterCard />
                </div>
            </div>
        </section>
    </>);
}
