import React from 'react';
import { getPostBySlug, getAllPosts } from '@/app/lib/markdown/posts';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}


export default async function BlogPost(props: { params: Promise<{ slug: string[] }> }) {
    const params = await props.params;
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl pt-32">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "@id": `https://giorgiotedesco.it/blog/${post.slug.join('/')}#blogposting`,
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": `https://giorgiotedesco.it/blog/${post.slug.join('/')}`
                        },
                        "headline": post.title,
                        "description": post.excerpt || post.content.slice(0, 160).replace(/\n/g, ' '),
                        "image": post.coverImage ? [`https://giorgiotedesco.it${post.coverImage}`] : [],
                        "datePublished": post.datePublished || post.date,
                        "dateModified": post.date || post.datePublished,
                        "inLanguage": "it-IT",
                        "isAccessibleForFree": true,
                        "author": {
                            "@type": "Person",
                            "@id": "https://giorgiotedesco.it/#person",
                            "name": "Giorgio Tedesco"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "@id": "https://giorgiotedesco.it/#organization",
                            "name": "Giorgio Tedesco",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://giorgiotedesco.it/images/logo.png",
                                "width": 512,
                                "height": 512
                            }
                        },
                        "keywords": post.keywords || [],
                        "articleSection": post.category || "General",
                        "wordCount": post.content.split(/\s+/).length
                    })
                }}
            />
            <article className="prose lg:prose-xl mx-auto">
                <h1 className="mb-2">{post.title}</h1>
                {(post.datePublished || post.date) && (
                    <div className="text-sm text-base-content/60 mb-8">
                        {new Date(post.datePublished || post.date || '').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                )}
                <div className="markdown-content">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
            </article>
        </div>
    );
}
