import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPosts } from '@/app/lib/markdown/posts';
import { pageMetadata } from '@/app/lib/seo';
import { Calendar } from 'lucide-react';
import type { BlogPost } from '@/app/lib/types';

function FeaturedArticle({ post }: { post: BlogPost }) {
  const date = post.datePublished || post.date;
  const href = `/it/blog/${post.slug.join('/')}/`;

  return (
    <article className="mb-12 overflow-hidden rounded-4xl border border-slate-100 bg-white shadow-xl">
      <div className="grid lg:grid-cols-2">
        <Link href={href} className="group relative min-h-64 overflow-hidden bg-slate-200 lg:min-h-[360px]">
          <img src={post.image || '/ai-images/gemini-gt-placeholder.jpg'} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <span className="absolute left-4 top-4 rounded-full bg-brand-orange px-4 py-1.5 text-sm font-bold text-white shadow-md">In evidenza</span>
        </Link>
        <div className="flex flex-col justify-center p-8 md:p-12">
          <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
            <span className="font-bold text-brand-blue">{post.category || 'Articolo'}</span>
            {date && <><span>·</span><Calendar size={15} /><time dateTime={date}>{new Date(date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}</time></>}
          </div>
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl"><Link href={href} className="transition-colors hover:text-brand-blue">{post.title}</Link></h2>
          {(post.excerpt || post.description) && <p className="mb-6 text-lg leading-relaxed text-slate-600">{post.excerpt || post.description}</p>}
          <Link href={href} className="btn btn-outline w-fit hover:border-brand-blue hover:bg-brand-blue hover:text-white">Leggi l’articolo</Link>
        </div>
      </div>
    </article>
  );
}

function ArticleCard({ post }: { post: BlogPost }) {
  const date = post.datePublished || post.date;
  const href = `/it/blog/${post.slug.join('/')}/`;

  return (
    <article className="group relative min-h-[380px] overflow-hidden rounded-4xl border border-base-200 bg-base-200 shadow-xl">
      <img src={post.image || '/ai-images/gemini-gt-placeholder.jpg'} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/15" />
      <div className="relative z-10 flex min-h-[380px] flex-col justify-end p-6 text-white">
        <div className="mb-5">
          {date && <time className="mb-2 block text-sm text-white/70" dateTime={date}>{new Date(date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}</time>}
          <h3 className="text-2xl font-bold leading-tight"><Link href={href} className="hover:text-primary">{post.title}</Link></h3>
          {(post.excerpt || post.description) && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/80">{post.excerpt || post.description}</p>}
        </div>
        <Link href={href} className="btn btn-primary w-full rounded-full text-sm font-bold">Leggi l’articolo</Link>
      </div>
    </article>
  );
}

export const metadata: Metadata = pageMetadata({
  title: 'Blog | Giorgio Tedesco',
  description: 'Articoli e riflessioni su architettura software, sviluppo web e tecnologia.',
  path: '/it/blog/',
  locale: 'it_IT',
});

export default async function ItalianBlogIndex() {
  const posts = await getAllPosts('it');
  const [featured, ...latestPosts] = posts;

  return (
    <>
      <header className="border-b border-slate-100 bg-white/90 py-16 pt-32 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <span className="mb-2 block text-sm font-bold uppercase tracking-wider text-brand-orange">Appunti e approfondimenti</span>
          <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">Blog</h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">Idee ed esperienze su software, architettura e tecnologia.</p>
          <Link href="/blog/" className="mt-6 inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-brand-blue transition-colors hover:border-brand-blue hover:bg-blue-50">
            Read the blog in English
          </Link>
        </div>
      </header>
      <main className="container mx-auto max-w-4xl px-4 py-12">
        {featured ? (
          <>
            <FeaturedArticle post={featured} />
            {latestPosts.length > 0 && <>
              <h2 className="mb-8 text-center text-4xl font-bold md:text-left">Altri articoli</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {latestPosts.map((post) => <ArticleCard key={post.slug.join('/')} post={post} />)}
              </div>
            </>}
          </>
        ) : (
          <p className="py-16 text-center text-slate-600">I primi articoli in italiano arriveranno qui.</p>
        )}
      </main>
    </>
  );
}
