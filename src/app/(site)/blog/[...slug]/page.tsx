import { getPostBySlug, getAllPosts, getPostLanguageAlternates, getLegacyPostRoutes } from '@/app/lib/markdown/posts';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogHeader from '@/app/components/googlestudioai/BlogHeader';
import { MarkdownRenderer } from '@/app/components/googlestudioai/MarkdownRenderer';
import SideBar from '@/app/components/googlestudioai/SideBar';
import { absoluteUrl, pageMetadata, postImage, siteIdentity, siteUrl } from '@/app/lib/seo';


// 1. Generazione statica dei percorsi
export async function generateStaticParams() {
    const posts = await getAllPosts();
    return [...posts.map((post) => ({
        slug: post.slug, // Assicurati che questo sia un array se usi [...slug]
    })), ...getLegacyPostRoutes('en').map((route) => ({ slug: [...route.from] }))];
}

// 2. NUOVO: Generazione Metadati HTML (Title, Description, OpenGraph)
// Questo è ciò che appare nella tab del browser e nelle preview social
export async function generateMetadata(props: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
    const params = await props.params;
    const result = await getPostBySlug(params.slug);

    if (!result) return {};
    const { post, requestedSlug } = result;

    const title = `${post.title} | Giorgio Tedesco`;
    const description = post.description || post.excerpt || post.content.slice(0, 160).replace(/\n/g, ' ') + '...';
    const languages = await getPostLanguageAlternates(post, 'en');
    const metadata = pageMetadata({
        title,
        description,
        path: `/blog/${post.slug.join('/')}/`,
        type: 'article',
        languages,
        image: postImage(post),
        publishedTime: post.datePublished || post.date,
    });
    return requestedSlug.join('/') === post.slug.join('/') ? metadata : { ...metadata, robots: { index: false, follow: true } };
}

// 3. Componente Pagina
export default async function BlogPost(props: { params: Promise<{ slug: string[] }> }) {
    const params = await props.params;
    const result = await getPostBySlug(params.slug);

    if (!result) {
        notFound();
    }
    const { post, requestedSlug } = result;

    if (requestedSlug.join('/') !== post.slug.join('/')) {
        const target = `/blog/${post.slug.join('/')}/`;
        return <>
            <meta httpEquiv="refresh" content={`0;url=${target}`} />
            <main className="container mx-auto max-w-3xl px-6 py-24 text-center">
                <h1 className="text-2xl font-bold text-slate-900">Articolo spostato</h1>
                <p className="mt-4 text-slate-600"><a className="text-brand-blue underline" href={target}>Vai al nuovo indirizzo</a>.</p>
            </main>
        </>;
    }

    // URL Stabile per l'ID univoco
    const pageUrl = absoluteUrl(`/blog/${post.slug.join('/')}/`);
    const image = postImage(post);

    // Schema LD strutturato per collegarsi alla tua identità "Architect"
    const publishedTime = post.datePublished || post.date;
    const modifiedTime = post.dateModified && (!publishedTime || new Date(post.dateModified) >= new Date(publishedTime))
        ? post.dateModified
        : publishedTime;
    const blogUrl = absoluteUrl('/blog/');
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
            ...(publishedTime ? { "datePublished": publishedTime } : {}),
            ...(modifiedTime ? { "dateModified": modifiedTime } : {}),
            "inLanguage": "en",
            "isAccessibleForFree": true,
            "author": { "@id": siteIdentity.personId },
            "publisher": { "@id": `${siteUrl}/#organization` },
            "keywords": post.keywords || post.tags,
            "articleSection": post.category || "Tech Blog",
            "wordCount": post.content.split(/\s+/).length,
            "breadcrumb": { "@id": `${pageUrl}#breadcrumb` }
        }, {
            "@type": "Person",
            "@id": siteIdentity.personId,
            "name": siteIdentity.name,
            "url": `${siteUrl}/`,
            "image": siteIdentity.personImage,
            "sameAs": siteIdentity.sameAs
        }, {
            "@type": "Organization",
            "@id": `${siteUrl}/#organization`,
            "name": siteIdentity.name,
            "url": `${siteUrl}/`,
            "logo": { "@type": "ImageObject", "url": siteIdentity.personImage }
        }, {
            "@type": "BreadcrumbList",
            "@id": `${pageUrl}#breadcrumb`,
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": absoluteUrl('/') },
                { "@type": "ListItem", "position": 2, "name": "Blog", "item": blogUrl },
                { "@type": "ListItem", "position": 3, "name": post.title, "item": pageUrl }
            ]
        }]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
                }}
            />
            <BlogHeader title={post.title} written={new Date(post.datePublished || post.date || '').toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })} category={post.category || 'Tech'} />
            <div className="container mx-auto mb-10 max-w-7xl px-6">
                <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12">
                    <main className="min-w-0 rounded-lg bg-white/95 px-6 py-10 shadow-lg backdrop-blur-sm sm:px-10 sm:py-12 lg:px-12">
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
                    <SideBar />
                </div>
            </div>
        </>
    );
}
