import React from 'react';
import { getPostBySlug, getAllPosts } from '@/app/lib/markdown/posts';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogHeader from '@/app/components/googlestudioai/BlogHeader';
import SideBar from '@/app/components/googlestudioai/SideBar';

import BookingModal from "@/app/components/googlestudioai/BookingModal";
// 1. Generazione statica dei percorsi
export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post) => ({
        slug: post.slug, // Assicurati che questo sia un array se usi [...slug]
    }));
}

// 2. NUOVO: Generazione Metadati HTML (Title, Description, OpenGraph)
// Questo è ciò che appare nella tab del browser e nelle preview social
export async function generateMetadata(props: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
    const params = await props.params;
    const post = await getPostBySlug(params.slug);

    if (!post) return {};

    const title = `${post.title} | Giorgio Tedesco`;
    const description = post.excerpt || post.content.slice(0, 160).replace(/\n/g, ' ') + '...';
    const url = `https://www.giorgiotedesco.it/blog/${params.slug.join('/')}`;
    const images = post.coverImage ? [`https://www.giorgiotedesco.it${post.coverImage}`] : [];

    return {
        title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            type: 'article',
            publishedTime: post.datePublished || post.date,
            authors: ['Giorgio Tedesco'],
            images: images.map(img => ({ url: img })),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images,
            creator: '@giorgionetg', // Il tuo handle Twitter corretto
        },
    };
}

// 3. Componente Pagina
export default async function BlogPost(props: { params: Promise<{ slug: string[] }> }) {
    const params = await props.params;
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    // URL Stabile per l'ID univoco
    const pageUrl = `https://www.giorgiotedesco.it/blog/${params.slug.join('/')}`;

    // Schema LD strutturato per collegarsi alla tua identità "Architect"
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": pageUrl,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": pageUrl
        },
        "headline": post.title,
        "description": post.excerpt || post.content.slice(0, 160).replace(/["\n]/g, ' '),
        "image": post.coverImage ? [`https://www.giorgiotedesco.it${post.coverImage}`] : [],
        "datePublished": post.datePublished || post.date,
        "dateModified": post.date || post.datePublished,
        "inLanguage": "en-US", // CORRETTO: Lingua inglese
        "isAccessibleForFree": true,
        "author": {
            "@type": "Person",
            "@id": "https://www.giorgiotedesco.it", // COLLEGA alla Home Page (la fonte della tua autorità)
            "name": "Giorgio Tedesco",
            "url": "https://www.giorgiotedesco.it",
            "jobTitle": "Solution Architect & Tech Lead" // Coerenza con il nuovo Brand
        },
        "publisher": {
            "@type": "Organization",
            "name": "Giorgio Tedesco - Tech Consultancy",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.giorgiotedesco.it/images/logo.png" // Assicurati che esista
            }
        },
        "keywords": post.keywords || ["System Architecture", "Web Development"],
        "articleSection": post.category || "Tech Blog",
        "wordCount": post.content.split(/\s+/).length
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd)
                }}
            />
            <BlogHeader title={post.title} written={new Date(post.datePublished || post.date || '').toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })} category={post.category || 'Tech'} />
            <div className="container mx-auto px-6 py-12 max-w-7xl bg-white/95 backdrop-blur-sm mb-10 rounded-lg shadow-lg">
                <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
                    <main className="lg:col-span-12">
                        <article className="pprose prose-lg prose-slate prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-brand-blue max-w-none dark:prose-invert">

                            <div className="markdown-content">
                                <ReactMarkdown>{post.content}</ReactMarkdown>
                            </div>
                        </article>
                        <div className="mt-16 bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center gap-4">
                            <div className="avatar placeholder">
                                <div className="bg-brand-blue text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold"><img src="/images/giorgiotedesco-ai-clone.png" alt="Giorgio Tedesco" className="rounded-full w-16 h-16 object-cover"/></div>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Giorgio Tedesco</h4>
                                <p className="text-sm text-slate-600"><b>Solution Architect & Tech Lead</b>. Passionate about performance, DX, and clean code.</p>
                            </div>
                        </div>
                    </main>
                    {/*<SideBar />*/}
                </div>
            </div>
            {/*<BookingModal isOpen={false}  /> */}
        </>
    );
}