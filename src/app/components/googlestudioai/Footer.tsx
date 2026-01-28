'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import BookingModal from './BookingModal';

const Footer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          <div className="space-y-4">
            <div className="text-2xl tracking-tighter flex items-center">
              <span className="font-bold text-white">GiorgioTedesco</span>
              <span className="font-bold text-brand-blue">.it</span>
            </div>
            <p className="font-medium text-slate-100">Full-Stack Architect · Tech Lead</p>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Designing and leading scalable web platforms under real-world constraints.
            </p>
          </div>

          {/*<div className="flex flex-col gap-3">
            <h6 className="font-bold text-white uppercase tracking-wider text-xs mb-1">Services</h6>
            <span className="hover:text-brand-blue transition-colors w-fit cursor-default">Freelance Solutions</span>
            <span className="hover:text-brand-blue transition-colors w-fit cursor-default">SME & PMI Solutions</span>
            <span className="hover:text-brand-blue transition-colors w-fit cursor-default">Technical Consultancy</span>
          </div>

          <div className="flex flex-col gap-3">
            <h6 className="font-bold text-white uppercase tracking-wider text-xs mb-1">Explore</h6>
            <Link href="/" className="hover:text-brand-blue transition-colors w-fit">Home</Link>
            <Link href="/cases" className="hover:text-brand-blue transition-colors w-fit">Case Studies</Link>
            <Link href="/blog" className="hover:text-brand-blue transition-colors w-fit">Tech Blog</Link>
            <Link href="/garden" className="hover:text-brand-blue transition-colors w-fit">Digital Garden</Link>
          </div>*/}

          <div className="flex flex-col gap-4 lg:col-start-4">
            <h6 className="font-bold text-white uppercase tracking-wider text-xs mb-1">Connect</h6>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/giorgiotedesco" target="_blank" className="btn btn-circle btn-sm bg-slate-800 border-none text-slate-300 hover:bg-brand-blue hover:text-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn btn-circle btn-sm bg-slate-800 border-none text-slate-300 hover:bg-brand-blue hover:text-white transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Giorgio Tedesco. All rights reserved.</p>
        </div>
      </div>
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </footer>
  );
};

export default Footer;