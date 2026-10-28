'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Download, LogOut } from 'lucide-react';
import { initializeOAuth, type OAuthSession } from '@/app/lib/atproto-oauth';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<OAuthSession>();
  const [accountHandle, setAccountHandle] = useState<string>();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    let active = true;
    initializeOAuth().then((result) => {
      if (active) setSession(result?.session);
    }).catch(() => { /* The public navigation remains available without OAuth. */ });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!session) return;
    const controller = new AbortController();
    fetch(`https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${encodeURIComponent(session.did)}`, {
      signal: controller.signal,
    }).then((response) => response.ok ? response.json() as Promise<{ handle?: string }> : undefined)
      .then((profile) => setAccountHandle(profile?.handle))
      .catch(() => { /* Keep the DID fallback when the public profile is unavailable. */ });
    return () => controller.abort();
  }, [session]);

  async function signOut() {
    if (!session) return;
    setSignOutError('');
    setIsSigningOut(true);
    try {
      await session.signOut();
      window.location.assign('/login/');
    } catch {
      setSignOutError('Could not sign out. Please try again.');
      setIsSigningOut(false);
    }
  }

  useEffect(() => {
    document.documentElement.lang = pathname.startsWith('/it/') ? 'it' : 'en';
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const openMenu = () => setIsMobileMenuOpen(true);
    const toggleMenu = () => setIsMobileMenuOpen((isOpen) => !isOpen);
    window.addEventListener('open-mobile-menu', openMenu);
    window.addEventListener('toggle-mobile-menu', toggleMenu);
    return () => {
      window.removeEventListener('open-mobile-menu', openMenu);
      window.removeEventListener('toggle-mobile-menu', toggleMenu);
    };
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('mobile-menu-state', { detail: { isOpen: isMobileMenuOpen } }));
  }, [isMobileMenuOpen]);

  const blogHref = pathname.startsWith('/it/') ? '/it/blog/' : '/blog/';

  const navLinks = [
    { name: 'Home', href: '/' },
    // { name: 'Digital Garden', href: '/digital-garden' },
    { name: 'About Me', href: '/about-me/' },
    { name: 'Blog', href: blogHref },
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
              <span className={`font-bold text-slate-800 ${session ? 'hidden sm:inline' : ''}`}>GiorgioTedesco</span>
              {session && <span className="font-bold text-slate-800 sm:hidden">GT</span>}
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
            {session ? <div className="flex min-w-0 items-center gap-1 sm:gap-2">
              <Link href="/login/" title={accountHandle ? `@${accountHandle}` : session.did} className="max-w-[118px] truncate rounded-lg px-1 py-2 text-sm font-semibold text-brand-blue hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-brand-blue sm:max-w-[190px] md:max-w-[230px]">
                {accountHandle ? `@${accountHandle}` : session.did}
              </Link>
              <button type="button" onClick={signOut} disabled={isSigningOut} aria-label="Sign out" title="Sign out" className="btn btn-ghost btn-circle btn-sm text-slate-700 hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-brand-blue disabled:opacity-50">
                <LogOut size={19} aria-hidden="true" />
              </button>
            </div> : <>
              <Link href="/login/" className="btn hidden md:flex bg-brand-blue hover:bg-blue-700 text-white btn-sm md:btn-md font-bold shadow-lg shadow-blue-500/20 border-none">
                Sign in
              </Link>
              <Link href="/login/" className="btn btn-sm border-none bg-brand-blue font-bold text-white shadow-sm hover:bg-blue-700 md:hidden">
                Sign in
              </Link>
            </>}
            <button
              className="btn btn-ghost btn-circle md:hidden text-slate-900"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {signOutError && <p role="alert" className="absolute right-4 top-full rounded-md bg-white px-3 py-2 text-sm text-red-700 shadow-md">{signOutError}</p>}

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
              <a href="/download/giorgio-tedesco-resume.pdf" download className="btn btn-outline btn-lg btn-block"><Download size={20} /> Download CV</a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
