import Link from 'next/link';
import { getAllPosts } from '@/app/lib/markdown/posts';
import { Calendar } from 'lucide-react';
import BlogPostCard from '@/app/components/googlestudioai/BlogPostCard';

import { BlogPost } from '@/app/lib/types';
import type { Metadata } from 'next';
import { pageMetadata } from '@/app/lib/seo';

export const metadata: Metadata = pageMetadata({
    title: 'Tech Blog | Giorgio Tedesco',
    description: 'Engineering notes from Giorgio Tedesco on software architecture, performance, infrastructure and modern web development.',
    path: '/blog/',
});

const BlogHeader = () => {
    return (
        <div className="bg-white/90 backdrop-blur-sm border-b border-slate-100 py-16 pt-32">
            <div className="container mx-auto px-6 text-center max-w-7xl">
                <span className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-2 block">Engineering Insights</span>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Tech Blog</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Deep dives into engineering challenges, performance optimization, and software craftsmanship.
                </p>
                <Link href="/it/blog/" className="mt-6 inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-brand-blue transition-colors hover:border-brand-blue hover:bg-blue-50">
                    Leggi il blog in italiano
                </Link>
            </div>
        </div>
    );
}

const SelectedPostHeader = ({ selectedPost }: { selectedPost: BlogPost }) => {
    return (
        <div className="mb-12">
            <div
                className="card lg:card-side bg-white shadow-xl border border-slate-100 overflow-hidden group cursor-pointer rounded-4xl"
            >
                <figure className="relative h-[260px] md:h-[340px] lg:h-auto lg:w-1/2 bg-slate-200 overflow-hidden">
                    <img
                        src={selectedPost.image || '/ai-images/gemini-gt-placeholder.jpg'}
                        alt={selectedPost.title}
                        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />

                    <div className="absolute top-4 left-4 z-10 inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-brand-orange text-white text-sm font-bold shadow-md w-fit h-fit leading-none">
                        Featured
                    </div>
                    </figure>
                <div className="card-body lg:w-1/2 justify-center p-8 md:p-12">
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                        <span className="text-brand-blue font-bold">Engineering</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(selectedPost.datePublished || selectedPost.date || '').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <h2 className="card-title text-3xl md:text-4xl font-bold text-slate-900 mb-4 group-hover:text-brand-blue transition-colors">
                        {selectedPost.title}
                    </h2>
                    <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                        {selectedPost.excerpt}
                    </p>
                    <div className="card-actions">
                        <Link href={`/blog/${selectedPost.slug.join('/')}`} className="btn btn-outline hover:bg-brand-blue hover:text-white hover:border-brand-blue">
                            Read Full Article
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default async function BlogIndex() {
    let posts = await getAllPosts();
    const selected = posts[0];
    posts = posts.slice(1);
    
    return (
        <>
            <BlogHeader />
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <SelectedPostHeader selectedPost={selected} />
                <h1 className="text-4xl text-center md:text-left font-bold mb-8">Latest Posts</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {posts.map((post) => (
                        <BlogPostCard key={post.slug.join('/')} post={post} />
                    ))}
                </div>
            </div>
        </>
    );
}
