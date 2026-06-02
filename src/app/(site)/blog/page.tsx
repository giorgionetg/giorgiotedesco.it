import Link from 'next/link';
import { getAllPosts } from '@/app/lib/markdown/posts';
import { Clock, Calendar, ArrowLeft, Linkedin, Twitter, Mail, ArrowRight, TrendingUp } from 'lucide-react';

import { BlogPost } from '@/app/lib/types';

const BlogHeader = () => {
    return (
        <div className="bg-white/90 backdrop-blur-sm border-b border-slate-100 py-16 pt-32">
            <div className="container mx-auto px-6 text-center max-w-7xl">
                <span className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-2 block">Engineering Insights</span>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Tech Blog</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Deep dives into engineering challenges, performance optimization, and software craftsmanship.
                </p>
            </div>
        </div>
    );
}

const CardArticle = ({ post }: { post: BlogPost }) => {
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

      <div className="relative z-10 flex min-h-[380px] flex-col justify-end p-6 text-white">
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

          <h2 className="text-2xl font-bold leading-tight">
            <Link href={href} className="hover:text-primary transition-colors">
              {post.title}
            </Link>
          </h2>

          {post.excerpt && (
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/80">
              {post.excerpt}
            </p>
          )}
        </div>

        <Link href={href} className="btn btn-primary w-full rounded-full text-sm font-bold hover:bg-primary-focus transition-colors">
          Read More
        </Link>
      </div>
    </article>
  );
};

const SelectedPostHeader = ({ selectedPost }: { selectedPost: BlogPost }) => {
    return (
        <div className="mb-12">
            <div
                className="card lg:card-side bg-white shadow-xl border border-slate-100 overflow-hidden group cursor-pointer rounded-4xl"
            >
                <figure className="relative h-[260px] md:h-[340px] lg:h-auto lg:w-1/2 bg-slate-200 overflow-hidden">
                    <img
                        src={selectedPost.image || '/ai-images/gemini-gt-placeholder.jpg'}
                        alt={selectedPost.title}
                        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />

                    <div className="absolute top-4 left-4 z-10 inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-brand-orange text-white text-sm font-bold shadow-md w-fit h-fit leading-none">
                        Featured
                    </div>
                    </figure>
                <div className="card-body lg:w-1/2 justify-center p-8 md:p-12">
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                        <span className="text-brand-blue font-bold">Engineering</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(selectedPost.datePublished || selectedPost.date || '').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <h2 className="card-title text-3xl md:text-4xl font-bold text-slate-900 mb-4 group-hover:text-brand-blue transition-colors">
                        {selectedPost.title}
                    </h2>
                    <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                        {selectedPost.excerpt}
                    </p>
                    <div className="card-actions">
                        <Link href={`/blog/${selectedPost.slug.join('/')}`} className="btn btn-outline hover:bg-brand-blue hover:text-white hover:border-brand-blue">
                            Read Full Article
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default async function BlogIndex() {
    let posts = await getAllPosts();
    let selected = posts[0];
    posts = posts.slice(1);
    
    return (
        <>
            <BlogHeader />
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <SelectedPostHeader selectedPost={selected} />
                <h1 className="text-4xl text-center md:text-left font-bold mb-8">Latest Posts</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {posts.map((post) => (
                        <CardArticle key={post.slug.join('/')} post={post} />
                    ))}
                </div>
            </div>
        </>
    );
}
