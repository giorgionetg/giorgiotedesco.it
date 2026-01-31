'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Download } from 'lucide-react';
import BookingModal from './BookingModal';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openBooking = () => setIsModalOpen(true);

  const navLinks = [
    { name: 'Home', href: '/' },
    // { name: 'Digital Garden', href: '/digital-garden' },
    { name: 'About Me', href: '/about-me' },
    { name: 'Blog', href: '/blog' },
    // { name: 'Case Studies', href: '/cases' },
  ];


  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || pathname !== '/' ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
          }`}
      >
        <div className="navbar container mx-auto px-4 max-w-7xl">
          <div className="navbar-start">
            <Link href="/" className="text-2xl tracking-tighter text-slate-900 hover:opacity-80 transition-opacity flex items-center group">
              <span className="font-bold text-slate-800">GiorgioTedesco</span>
              <span className="font-bold text-brand-blue group-hover:underline decoration-2 underline-offset-4">.it</span>
            </Link>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-2 text-slate-600">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`font-medium hover:text-brand-blue hover:bg-ice-50 ${pathname === link.href ? 'text-brand-blue font-bold bg-blue-50' : ''}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="navbar-end gap-3">
            <button className="hidden md:flex btn btn-ghost btn-sm text-slate-600 hover:text-brand-blue">
              <a href="/download/giorgio-tedesco-resume.pdf" target="_blank" download className="flex items-center gap-2">
                <Download size={18} />
                <span className="hidden lg:inline">CV</span>
              </a>
            </button>
            <button
              onClick={openBooking}
              className="hidden md:flex btn bg-brand-blue hover:bg-blue-700 text-white btn-sm md:btn-md font-bold shadow-lg shadow-blue-500/20 border-none"
            >
              Book a Call
            </button>
            <button
              className="btn btn-ghost btn-circle md:hidden text-slate-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 p-4 shadow-xl h-screen overflow-y-auto">
            <ul className="menu w-full gap-2 text-slate-600 text-lg">
              {navLinks.map((link) => (
                <li key={link.href}><Link href={link.href} onClick={() => setIsMobileMenuOpen(false)}>{link.name}</Link></li>
              ))}
            </ul>
            <div className="divider my-4"></div>
            <div className="flex flex-col gap-4">
              <button className="btn btn-outline btn-lg btn-block"><Download size={20} /> Download CV</button>
              <button
                onClick={() => { setIsMobileMenuOpen(false); openBooking(); }}
                className="btn bg-brand-blue hover:bg-blue-700 border-none btn-lg btn-block text-white font-bold"
              >
                Book a Call
              </button>
            </div>
          </div>
        )}
      </nav>
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;