'use client';

import { Mail, TrendingUp } from 'lucide-react';
import { useState } from 'react';


export default function SideBar() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openBooking = () => setIsModalOpen(true);

    return (<aside className="lg:col-span-4 space-y-12 h-fit lg:sticky lg:top-24">

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
            <button onClick={openBooking} className="btn bg-brand-blue border-none text-white hover:bg-blue-600 w-full font-bold relative z-10">
                Book a Call
            </button>
        </div>
        {/* Trending */}
        <div>
            <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <TrendingUp size={18} /> Trending Posts
            </h4>
            <ul className="space-y-4">
                {/*posts.filter(p => p.id !== selectedPost.id).slice(0, 3).map(p => (
                    <li key={p.id} className="group cursor-pointer" onClick={() => setSelectedPost(p)}>
                        <h5 className="font-bold text-slate-800 text-sm group-hover:text-brand-blue transition-colors leading-snug mb-1">
                            {p.title}
                        </h5>
                        <span className="text-xs text-slate-400">{p.readTime}</span>
                    </li>
                ))*/}
            </ul>
        </div>

    </aside>);
}