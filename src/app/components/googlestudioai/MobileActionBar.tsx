'use client';

import { Menu, MessageCircle, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type MobileActionBarProps = {
  contactEmail?: string;
  phoneNumber?: string;
};

export default function MobileActionBar({ contactEmail, phoneNumber }: MobileActionBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const syncMenuState = (event: Event) => {
      setIsMenuOpen((event as CustomEvent<{ isOpen: boolean }>).detail.isOpen);
    };
    window.addEventListener('mobile-menu-state', syncMenuState);
    return () => window.removeEventListener('mobile-menu-state', syncMenuState);
  }, []);

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] md:hidden">
      <nav aria-label="Azioni rapide" className="mx-auto flex max-w-md items-center justify-around rounded-full border border-brand-blue bg-gradient-to-r from-brand-blue to-cyan-500 px-2 py-2 text-white shadow-lg">
        {contactEmail ? (
          <a href={`mailto:${contactEmail}`} className="flex min-w-0 flex-1 flex-col items-center gap-1 py-2 text-xs font-semibold text-white hover:text-white/80">
            <MessageCircle size={20} aria-hidden="true" /><span>Scrivi</span>
          </a>
        ) : (
          <button type="button" disabled aria-label="Email di contatto non ancora configurata" className="flex min-w-0 flex-1 flex-col items-center gap-1 py-2 text-xs font-semibold text-white/50">
            <MessageCircle size={20} aria-hidden="true" /><span>Scrivi</span>
          </button>
        )}
        <div className="h-8 w-px bg-white/30" aria-hidden="true" />
        <div className="flex min-w-0 flex-1 items-center justify-center">
          {phoneNumber ? (
            <a href={`tel:${phoneNumber.replace(/[^+\d]/g, '')}`} aria-label="Chiama Giorgio" className="flex flex-col items-center gap-1 py-2 text-xs font-semibold text-white hover:text-white/80">
              <Phone size={20} aria-hidden="true" /><span>Chiama</span>
            </a>
          ) : (
            <button type="button" disabled aria-label="Numero di telefono non ancora configurato" className="flex flex-col items-center gap-1 py-2 text-xs font-semibold text-white/50">
              <Phone size={20} aria-hidden="true" /><span>Telefono</span>
            </button>
          )}
        </div>
        <div className="h-8 w-px bg-white/30" aria-hidden="true" />
        <button type="button" onClick={() => window.dispatchEvent(new Event('toggle-mobile-menu'))} aria-label={isMenuOpen ? 'Chiudi il menu principale' : 'Apri il menu principale'} className="flex min-w-0 flex-1 flex-col items-center gap-1 py-2 text-xs font-semibold text-white hover:text-white/80">
          {isMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}<span>Menu</span>
        </button>
      </nav>
    </div>
  );
}
