import Link from 'next/link';
import type { BlogPost } from '@/app/lib/types';

export default function BlogPostCard({ post, homepage = false }: { post: BlogPost; homepage?: boolean }) {
  const href = `/blog/${post.slug.join('/')}`;
  const date = post.datePublished || post.date;

  return (
    <article className="group relative min-h-[380px] overflow-hidden rounded-4xl shadow-xl border border-base-200 bg-base-200">
      <img
        src={post.image || '/ai-images/gemini-gt-placeholder.jpg'}
        alt={post.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/15" />

      <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 text-white">
        <div className="mb-5">
          {date && (
            <div className="mb-2 text-sm text-white/70">
              {new Date(date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>
          )}

          <h2 className={`text-2xl font-bold leading-tight ${homepage ? 'line-clamp-3 min-h-[5.625rem]' : ''}`}>
            <Link href={href} className="transition-colors hover:text-interaction-orange focus-visible:text-interaction-orange">
              {post.title}
            </Link>
          </h2>

          {!homepage && post.excerpt && (
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/80">
              {post.excerpt}
            </p>
          )}
        </div>

        <Link href={href} className="btn btn-primary w-full rounded-full text-sm font-bold transition-colors hover:border-interaction-orange hover:bg-interaction-orange hover:text-slate-950">
          Read More
        </Link>
      </div>
    </article>
  );
}
