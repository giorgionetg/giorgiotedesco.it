import React from 'react';
import { getPostBySlug, getAllPosts } from '@/app/lib/markdown/posts';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

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
        <div className="container mx-auto px-4 py-12 max-w-3xl pt-32">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd)
                }}
            />
            <article className="prose lg:prose-xl mx-auto dark:prose-invert">
                {/* Aggiunto dark:prose-invert se usi tailwind typography col tema scuro */}

                <h1 className="mb-2 text-4xl font-bold tracking-tight">{post.title}</h1>

                {(post.datePublished || post.date) && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-8 flex items-center gap-2">
                        <time dateTime={post.datePublished || post.date}>
                            {new Date(post.datePublished || post.date || '').toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                        <span>•</span>
                        <span>{post.category || 'Tech'}</span>
                    </div>
                )}

                <div className="markdown-content">
                    {/* Consiglio: Per un blog tecnico, valuta l'uso di 'remark-gfm' per tabelle e 'rehype-highlight' per il codice */}
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
            </article>
        </div>
    );
}