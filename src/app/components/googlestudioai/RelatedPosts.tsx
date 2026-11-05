import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Post } from '@/app/lib/types';

export default function RelatedPosts({ posts, locale }: { posts: Post[]; locale: 'en' | 'it' }) {
  if (!posts.length) return null;

  return <aside aria-labelledby="related-posts-title" className="w-full min-w-0 space-y-4 lg:sticky lg:top-24">
    <div className="mb-5">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-orange">{locale === 'en' ? 'Keep reading' : 'Continua a leggere'}</p>
      <h2 id="related-posts-title" className="mt-2 text-xl font-bold tracking-tight text-slate-900">{locale === 'en' ? 'Related articles' : 'Articoli collegati'}</h2>
    </div>
    {posts.map((post) => {
      const href = `${locale === 'it' ? '/it' : ''}/blog/${post.slug.join('/')}/`;
      const date = post.datePublished || post.date;
      return <Link key={href} href={href} className="group block w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-blue/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue">
        <div className="flex items-start justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{post.category?.replaceAll('-', ' ') || (locale === 'en' ? 'Blog' : 'Articolo')}</span>
          <ArrowUpRight size={18} className="shrink-0 text-slate-400 transition group-hover:text-brand-blue" aria-hidden="true" />
        </div>
        <h3 className="mt-3 text-lg font-bold leading-snug text-slate-900 group-hover:text-brand-blue">{post.title}</h3>
        {date && <time dateTime={date} className="mt-3 block text-xs text-slate-500">{new Date(date).toLocaleDateString(locale === 'it' ? 'it-IT' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</time>}
      </Link>;
    })}
  </aside>;
}
