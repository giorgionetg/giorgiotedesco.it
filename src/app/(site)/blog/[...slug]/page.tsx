import React from 'react';
import { getPostBySlug, getAllPosts } from '@/app/lib/markdown/posts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogHeader from '@/app/components/googlestudioai/BlogHeader';
import SideBar from '@/app/components/googlestudioai/SideBar';

import rehypeHighlight from 'rehype-highlight';
import { absoluteUrl, pageMetadata, postImage, siteIdentity } from '@/app/lib/seo';

type MarkdownRendererProps = {
  content: string;
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        pre({ children, ...props }) {
          return (
            <pre
              {...props}
              className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 shadow-lg"
            >
              {children}
            </pre>
          );
        },

        code({ className, children, ...props }) {
          const isBlockCode =
            className?.includes('language-') || className?.includes('hljs');

          if (isBlockCode) {
            return (
              <code
                {...props}
                className={`${className ?? ''} font-mono text-sm`}
              >
                {children}
              </code>
            );
          }

          return (
            <code
              {...props}
              className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-900"
            >
              {children}
            </code>
          );
        },

        a({ children, href, ...props }) {
          return (
            <a
              {...props}
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="font-medium text-brand-blue underline underline-offset-4"
            >
              {children}
            </a>
          );
        },

        table({ children, ...props }) {
          return (
            <div className="not-prose my-8 overflow-x-auto">
              <table
                {...props}
                className="w-full border-collapse rounded-lg text-left text-sm"
              >
                {children}
              </table>
            </div>
          );
        },

        th({ children, ...props }) {
          return (
            <th
              {...props}
              className="border border-slate-200 bg-slate-100 px-4 py-2 font-semibold text-slate-900"
            >
              {children}
            </th>
          );
        },

        td({ children, ...props }) {
          return (
            <td
              {...props}
              className="border border-slate-200 px-4 py-2 align-top text-slate-700"
            >
              {children}
            </td>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}


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
    const description = post.description || post.excerpt || post.content.slice(0, 160).replace(/\n/g, ' ') + '...';
    return pageMetadata({
        title,
        description,
        path: `/blog/${params.slug.join('/')}/`,
        type: 'article',
        image: postImage(post),
        publishedTime: post.datePublished || post.date,
    });
}

// 3. Componente Pagina
export default async function BlogPost(props: { params: Promise<{ slug: string[] }> }) {
    const params = await props.params;
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    // URL Stabile per l'ID univoco
    const pageUrl = absoluteUrl(`/blog/${params.slug.join('/')}/`);
    const image = postImage(post);

    // Schema LD strutturato per collegarsi alla tua identità "Architect"
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [{
            "@type": "BlogPosting",
            "@id": `${pageUrl}#blogposting`,
            "mainEntityOfPage": { "@id": pageUrl },
            "url": pageUrl,
            "headline": post.title,
            "description": post.description || post.excerpt || post.content.slice(0, 160).replace(/["\n]/g, ' '),
            ...(image ? { "image": [absoluteUrl(image)] } : {}),
            "datePublished": post.datePublished || post.date,
            "dateModified": post.dateModified || post.date || post.datePublished,
            "inLanguage": "en",
            "isAccessibleForFree": true,
            "author": { "@id": siteIdentity.personId },
            "publisher": { "@id": siteIdentity.personId },
            "keywords": post.keywords || post.tags,
            "articleSection": post.category || "Tech Blog",
            "wordCount": post.content.split(/\s+/).length
        }]
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
                    {/*<main className="lg:col-span-8 space-y-12">*/}
                    <main className="lg:col-span-12">
                        <article className="prose prose-lg prose-slate prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-brand-blue max-w-none dark:prose-invert">

                            <div className="markdown-content">
                                <MarkdownRenderer content={post.content} />
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
        </>
    );
}
