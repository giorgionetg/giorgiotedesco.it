import React, { useState } from 'react';
import { BlogPost } from '@/app/lib/types';
import { Clock, Calendar, ArrowLeft, Linkedin, Twitter, Mail, ArrowRight, TrendingUp } from 'lucide-react';

const posts: BlogPost[] = [
   {
      id: '1',
      title: 'Scalable Frontend Architecture for Enterprise',
      excerpt: 'How to structure large-scale React applications using domain-driven design principles to maintain velocity as the team grows.',
      date: 'Oct 12, 2023',
      category: 'Engineering',
      readTime: '8 min read'
   },
   {
      id: '2',
      title: 'Optimizing Web Vitals: A Case Study',
      excerpt: 'We reduced LCP by 40% and improved CLS to 0.01. Here is the technical breakdown of the strategies we employed.',
      date: 'Sep 28, 2023',
      category: 'Performance',
      readTime: '12 min read'
   },
   {
      id: '3',
      title: 'Effective Remote Communication for Dev Teams',
      excerpt: 'Soft skills matter. Strategies for async communication that keep international teams aligned and productive.',
      date: 'Aug 15, 2023',
      category: 'Leadership',
      readTime: '5 min read'
   },
   {
      id: '4',
      title: 'From Monolith to Micro-Frontends',
      excerpt: 'A retrospective on breaking down a 5-year-old monolith. The good, the bad, and the ugly of module federation.',
      date: 'Jul 02, 2023',
      category: 'Architecture',
      readTime: '15 min read'
   }
];

const Blog: React.FC = () => {
   const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

   const singlePostContent = `
    <p class="lead text-xl text-slate-600">Scaling a frontend codebase isn't just about folder structure; it's about boundaries, ownership, and decoupling.</p>

    <h3>The Monolith Trap</h3>
    <p>When starting a React project, we usually dump everything into <code>/components</code>. This works for a while. But as the app grows to 50+ screens and 200+ components, this flat structure becomes a nightmare.</p>

    <h3>Domain-Driven Design (DDD) in Frontend</h3>
    <p>We can borrow concepts from backend architecture. By grouping features into "Domains", we create natural boundaries.</p>
    
    <pre><code class="language-bash">
    src/
      features/
        auth/
          components/
          hooks/
          api.ts
        dashboard/
          components/
          routes.ts
    </code></pre>

    <p>This "colocation" principle ensures that deleting a feature is as simple as deleting a folder. No more hunting for orphaned CSS files or utility functions.</p>

    <h3>Shared Kernels (UI Library)</h3>
    <p>Anything that is truly generic (Buttons, Modals, Cards) moves to a <code>/design-system</code> folder or a separate package. These components should know nothing about your business logic.</p>

    <h3>Final Thoughts</h3>
    <p>Architecture is about trade-offs. This structure introduces some file nesting overhead, but the payoff in maintainability for large teams is immense.</p>
  `;

   if (selectedPost) {
      return (
         <div className="bg-white/95 min-h-screen animate-in fade-in duration-300">
            {/* Navigation / Progress Bar (Simulated) */}
            <div className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-100">
               <div className="h-1 w-full bg-slate-100">
                  <div className="h-full bg-brand-blue w-1/3"></div>
               </div>
               <div className="container mx-auto px-6 h-14 flex items-center justify-between max-w-7xl">
                  <button
                     onClick={() => setSelectedPost(null)}
                     className="flex items-center gap-2 text-slate-500 hover:text-brand-blue transition-colors font-medium text-sm"
                  >
                     <ArrowLeft size={16} /> All Articles
                  </button>
                  <div className="text-sm font-bold text-slate-800 truncate max-w-[200px] hidden md:block">
                     {selectedPost.title}
                  </div>
                  <div className="flex gap-2">
                     <button className="btn btn-ghost btn-xs btn-square text-slate-400 hover:text-blue-500"><Twitter size={16} /></button>
                     <button className="btn btn-ghost btn-xs btn-square text-slate-400 hover:text-blue-700"><Linkedin size={16} /></button>
                  </div>
               </div>
            </div>

            {/* Article Header */}
            <header className="bg-ice-50 py-16 border-b border-slate-100">
               <div className="container mx-auto px-6 max-w-4xl text-center">
                  <div className="flex items-center justify-center gap-3 text-sm text-slate-500 mb-6 font-medium uppercase tracking-wide">
                     <span className="text-brand-blue">{selectedPost.category}</span>
                     <span>•</span>
                     <span>{selectedPost.readTime}</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                     {selectedPost.title}
                  </h1>
                  <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
                     <Calendar size={16} /> Posted on {selectedPost.date}
                  </div>
               </div>
            </header>

            <div className="container mx-auto px-6 py-12 max-w-7xl">
               <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto">

                  {/* Content Column */}
                  <main className="lg:col-span-8">
                     <div className="prose prose-lg prose-slate prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-brand-blue max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: singlePostContent }} />
                     </div>

                     {/* Author Box */}
                     <div className="mt-16 bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center gap-4">
                        <div className="avatar placeholder">
                           <div className="bg-brand-blue text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold">GT</div>
                        </div>
                        <div>
                           <h4 className="font-bold text-slate-900">Giorgio Tedesco</h4>
                           <p className="text-sm text-slate-600">Senior Software Engineer & Frontend Architect. Passionate about performance, DX, and clean code.</p>
                        </div>
                     </div>
                  </main>

                  {/* Sidebar */}
                  <aside className="lg:col-span-4 space-y-12 h-fit lg:sticky lg:top-24">

                     {/* Newsletter */}
                     <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <div className="w-12 h-12 bg-blue-100 text-brand-blue rounded-full flex items-center justify-center mb-4">
                           <Mail size={24} />
                        </div>
                        <h3 className="font-bold text-xl text-slate-900 mb-2">Join the newsletter</h3>
                        <p className="text-slate-600 text-sm mb-4">Get the latest insights on frontend engineering delivered to your inbox.</p>
                        <div className="flex flex-col gap-2">
                           <input type="email" placeholder="Your email" className="input input-sm input-bordered w-full" />
                           <button className="btn btn-sm bg-brand-blue border-none text-white hover:bg-blue-700">Subscribe</button>
                        </div>
                     </div>

                     {/* Hire Me CTA */}
                     <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                        <h3 className="font-bold text-xl mb-2 relative z-10">Hiring?</h3>
                        <p className="text-slate-300 text-sm mb-6 relative z-10">I am available for contract work and senior engineering roles.</p>
                        <button className="btn bg-brand-blue border-none text-white hover:bg-blue-600 w-full font-bold relative z-10">
                           Book a Call
                        </button>
                     </div>

                     {/* Trending */}
                     <div>
                        <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                           <TrendingUp size={18} /> Trending Posts
                        </h4>
                        <ul className="space-y-4">
                           {posts.filter(p => p.id !== selectedPost.id).slice(0, 3).map(p => (
                              <li key={p.id} className="group cursor-pointer" onClick={() => setSelectedPost(p)}>
                                 <h5 className="font-bold text-slate-800 text-sm group-hover:text-brand-blue transition-colors leading-snug mb-1">
                                    {p.title}
                                 </h5>
                                 <span className="text-xs text-slate-400">{p.readTime}</span>
                              </li>
                           ))}
                        </ul>
                     </div>

                  </aside>
               </div>
            </div>
         </div>
      );
   }

   // LIST VIEW
   return (
      <div className="bg-transparent min-h-screen">
         {/* Blog Header */}
         <div className="bg-white/90 backdrop-blur-sm border-b border-slate-100 py-16">
            <div className="container mx-auto px-6 text-center max-w-7xl">
               <span className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-2 block">Engineering Insights</span>
               <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Tech Blog</h1>
               <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Deep dives into engineering challenges, performance optimization, and software craftsmanship.
               </p>
            </div>
         </div>

         <div className="container mx-auto px-6 py-12 max-w-7xl">

            {/* Featured Post */}
            <div className="mb-12">
               <div
                  onClick={() => setSelectedPost(posts[0])} // Just assuming first is featured for simulation
                  className="card lg:card-side bg-white shadow-xl border border-slate-100 overflow-hidden group cursor-pointer"
               >
                  <figure className="lg:w-1/2 bg-slate-200 min-h-[300px] relative">
                     <img src="https://picsum.photos/seed/tech/800/600" alt="Featured" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                     <div className="absolute top-4 left-4 badge bg-brand-orange text-white border-none p-3 font-bold">Featured</div>
                  </figure>
                  <div className="card-body lg:w-1/2 justify-center p-8 md:p-12">
                     <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                        <span className="text-brand-blue font-bold">Engineering</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Calendar size={14} /> Oct 20, 2023</span>
                     </div>
                     <h2 className="card-title text-3xl md:text-4xl font-bold text-slate-900 mb-4 group-hover:text-brand-blue transition-colors">
                        The Future of React Rendering
                     </h2>
                     <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                        An in-depth look at how Server Actions and partial hydration are changing the way we build dynamic web applications in 2024.
                     </p>
                     <div className="card-actions">
                        <button className="btn btn-outline hover:bg-brand-blue hover:text-white hover:border-brand-blue">Read Full Article</button>
                     </div>
                  </div>
               </div>
            </div>

            {/* Recent Posts List */}
            <h3 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">Recent Articles</h3>
            <div className="grid gap-6">
               {posts.map((post) => (
                  <article
                     key={post.id}
                     onClick={() => setSelectedPost(post)}
                     className="card md:card-side bg-white shadow-sm hover:shadow-lg border border-slate-100 transition-all cursor-pointer group"
                  >
                     <div className="card-body">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400 mb-2 uppercase tracking-wide font-medium">
                           <span className="text-brand-blue">{post.category}</span>
                           <span>•</span>
                           <span>{post.date}</span>
                           <span>•</span>
                           <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                        </div>
                        <h3 className="card-title text-xl md:text-2xl mb-2 text-slate-800 group-hover:text-brand-blue transition-colors">
                           {post.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                           {post.excerpt}
                        </p>
                     </div>
                     <div className="p-6 hidden md:flex items-center justify-center border-l border-slate-50">
                        <div className="btn btn-ghost btn-circle text-slate-300 group-hover:text-brand-blue group-hover:bg-blue-50 transition-all">
                           <ArrowRight />
                        </div>
                     </div>
                  </article>
               ))}
            </div>

            <div className="mt-16 bg-brand-blue/5 rounded-2xl p-12 text-center border border-brand-blue/10 bg-white/50 backdrop-blur-sm">
               <h4 className="text-2xl font-bold text-slate-900 mb-4">Stay updated</h4>
               <p className="text-slate-600 mb-6 max-w-xl mx-auto">Get the latest engineering insights delivered straight to your inbox. No spam, just code.</p>
               <div className="flex max-w-md mx-auto gap-2">
                  <input type="email" placeholder="email@example.com" className="input input-bordered w-full bg-white" />
                  <button className="btn bg-brand-blue text-white hover:bg-blue-700 border-none">Subscribe</button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Blog;