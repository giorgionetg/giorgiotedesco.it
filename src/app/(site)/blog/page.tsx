import Link from 'next/link';
import { getAllPosts } from '@/app/lib/markdown/posts';
import { Clock, Calendar, ArrowLeft, Linkedin, Twitter, Mail, ArrowRight, TrendingUp } from 'lucide-react';

import { BlogPost } from '@/app/lib/types';

const BlogHeader = () => {
    return (
        <div className="bg-white/90 backdrop-blur-sm border-b border-slate-100 py-16 pt-32">
            <div className="container mx-auto px-6 text-center max-w-7xl">
                <span className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-2 block">Engineering Insights</span>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Tech Blog</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Deep dives into engineering challenges, performance optimization, and software craftsmanship.
                </p>
            </div>
        </div>
    );
}

const SelectedPostHeader = ({ selectedPost }: { selectedPost: BlogPost }) => {
    return (
        <div className="mb-12">
            <div
                className="card lg:card-side bg-white shadow-xl border border-slate-100 overflow-hidden group cursor-pointer"
            >
                <figure className="lg:w-1/2 bg-slate-200 min-h-[300px] relative">
                    <img src="https://picsum.photos/seed/tech/800/600" alt="Featured" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 z-10 inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-brand-orange text-white text-sm font-bold shadow-md w-fit h-fit leading-none">Featured</div>
                </figure>
                <div className="card-body lg:w-1/2 justify-center p-8 md:p-12">
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                        <span className="text-brand-blue font-bold">Engineering</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(selectedPost.datePublished).toLocaleDateString()}</span>
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
    let selected = posts[0];
    posts = posts.slice(1);
    return (
        <>
            <BlogHeader />
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <SelectedPostHeader selectedPost={selected} />
                <h1 className="text-4xl text-center md:text-left font-bold mb-8">Latest Posts</h1>
                <div className="grid gap-6">
                    {posts.map((post) => (
                        <article key={post.slug.join('/')} className="card bg-base-100 shadow-xl border border-base-200">
                            <div className="card-body">
                                <h2 className="card-title text-2xl">
                                    <Link href={`/blog/${post.slug.join('/')}`} className="hover:text-primary transition-colors">
                                        {post.title}
                                    </Link>
                                </h2>
                                {post.date && (
                                    <div className="text-sm text-base-content/60">
                                        {new Date(post.date).toLocaleDateString()}
                                    </div>
                                )}
                                {post.excerpt && (
                                    <p className="text-base-content/80 mt-2">{post.excerpt}</p>
                                )}
                                <div className="card-actions justify-end mt-4">
                                    <Link href={`/blog/${post.slug.join('/')}`} className="btn btn-primary btn-sm">
                                        Leggi
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </>
    );
}
