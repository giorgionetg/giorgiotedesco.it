import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug, getPostLanguageAlternates, getLegacyPostRoutes } from '@/app/lib/markdown/posts';
import { absoluteUrl, pageMetadata, postImage, siteIdentity, siteUrl } from '@/app/lib/seo';
import BlogHeader from '@/app/components/googlestudioai/BlogHeader';
import { MarkdownRenderer } from '@/app/components/googlestudioai/MarkdownRenderer';
import SideBar from '@/app/components/googlestudioai/SideBar';

export async function generateStaticParams() {
  const posts = await getAllPosts('it');
  return [...posts.map((post) => ({ slug: post.slug })), ...getLegacyPostRoutes('it').map((route) => ({ slug: [...route.from] }))];
}

async function findPost(slug: string[]) {
  return getPostBySlug(slug, 'it');
}

export async function generateMetadata(props: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await findPost(slug);
  if (!post) return {};
  const languages = await getPostLanguageAlternates(post, 'it');

  const metadata = pageMetadata({
    title: `${post.title} | Giorgio Tedesco`,
    description: post.description || post.excerpt || post.content.slice(0, 160).replace(/\n/g, ' ') + '…',
    path: `/it/blog/${post.slug.join('/')}/`,
    type: 'article',
    locale: 'it_IT',
    languages,
    image: postImage(post),
    publishedTime: post.datePublished || post.date,
  });
  return slug.join('/') === post.slug.join('/') ? metadata : { ...metadata, robots: { index: false, follow: true } };
}

export default async function ItalianBlogPost(props: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await props.params;
  const post = await findPost(slug);
  if (!post) notFound();

  if (slug.join('/') !== post.slug.join('/')) {
    const target = `/it/blog/${post.slug.join('/')}/`;
    return <>
      <meta httpEquiv="refresh" content={`0;url=${target}`} />
      <main className="container mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Articolo spostato</h1>
        <p className="mt-4 text-slate-600"><a className="text-brand-blue underline" href={target}>Vai al nuovo indirizzo</a>.</p>
      </main>
    </>;
  }

  const pageUrl = absoluteUrl(`/it/blog/${slug.join('/')}/`);
  const image = postImage(post);
  const publishedTime = post.datePublished || post.date;
  const modifiedTime = post.dateModified && (!publishedTime || new Date(post.dateModified) >= new Date(publishedTime))
    ? post.dateModified
    : publishedTime;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${pageUrl}#blogposting`,
        mainEntityOfPage: { '@id': pageUrl },
        url: pageUrl,
        headline: post.title,
        description: post.description || post.excerpt || post.content.slice(0, 160).replace(/["\n]/g, ' '),
        ...(image ? { image: [absoluteUrl(image)] } : {}),
        ...(publishedTime ? { datePublished: publishedTime } : {}),
        ...(modifiedTime ? { dateModified: modifiedTime } : {}),
        inLanguage: 'it',
        isAccessibleForFree: true,
        author: { '@id': siteIdentity.personId },
        publisher: { '@id': `${siteUrl}/#organization` },
        keywords: post.keywords || post.tags,
        articleSection: post.category || 'Blog',
        wordCount: post.content.split(/\s+/).length,
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
      },
      {
        '@type': 'Person',
        '@id': siteIdentity.personId,
        name: siteIdentity.name,
        url: `${siteUrl}/`,
        image: siteIdentity.personImage,
        sameAs: siteIdentity.sameAs,
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: siteIdentity.name,
        url: `${siteUrl}/`,
        logo: { '@type': 'ImageObject', url: siteIdentity.personImage },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: absoluteUrl('/it/blog/') },
          { '@type': 'ListItem', position: 3, name: post.title, item: pageUrl },
        ],
      },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    <BlogHeader title={post.title} written={new Date(post.datePublished || post.date || '').toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' })} category={post.category || 'Articolo'} />
    <div lang="it" className="container mx-auto mb-10 max-w-7xl px-6">
      <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12">
        <main className="min-w-0 rounded-lg bg-white/95 px-6 py-10 shadow-lg backdrop-blur-sm sm:px-10 sm:py-12 lg:px-12">
          <article className="prose prose-lg prose-slate mx-auto max-w-4xl prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-brand-blue dark:prose-invert">
            <MarkdownRenderer content={post.content} />
          </article>
          <div className="mx-auto mt-16 flex max-w-4xl items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-6">
            <img src="/images/giorgiotedesco-ai-clone.png" alt="Giorgio Tedesco" className="h-16 w-16 rounded-full object-cover" />
            <div><h2 className="font-bold text-slate-900">Giorgio Tedesco</h2><p className="text-sm text-slate-600">Solution Architect &amp; Tech Lead.</p></div>
          </div>
        </main>
        <SideBar />
      </div>
    </div>
  </>;
}
