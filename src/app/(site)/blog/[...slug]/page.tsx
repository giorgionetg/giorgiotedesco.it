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
            <article className="prose lg:prose-xl mx-auto">
                {/*<h1 className="mb-2">{post.title}</h1>*/}
                {(post.datePublished || post.date) && (
                    <div className="text-sm text-base-content/60 mb-8">
                        {new Date(post.datePublished || post.date || '').toLocaleDateString()}
                    </div>
                )}
                <div className="markdown-content">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
            </article>
        </div>
    );
}
