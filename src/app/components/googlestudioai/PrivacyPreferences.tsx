'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CONSENT_KEY, PENDING_SERVICE_CLICKS_KEY, readPreferences } from '@/app/lib/tracking-consent';

export default function PrivacyPreferences() {
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [external, setExternal] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const current = readPreferences();
    const timer = window.setTimeout(() => {
      setAnalytics(current?.analytics ?? false);
      setExternal(current?.external ?? false);
      setOpen(!current);
    }, 0);
    const show = () => { const saved = readPreferences(); setAnalytics(saved?.analytics ?? false); setExternal(saved?.external ?? false); setOpen(true); };
    window.addEventListener('privacy:open', show);
    return () => { window.clearTimeout(timer); window.removeEventListener('privacy:open', show); };
  }, []);

  function save(nextAnalytics: boolean, nextExternal: boolean) {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: nextAnalytics, external: nextExternal, savedAt: Date.now() }));
      if (!nextAnalytics) {
        localStorage.removeItem('visura-ai.visitor-id');
        try { sessionStorage.removeItem(PENDING_SERVICE_CLICKS_KEY); } catch { /* Storage may be unavailable. */ }
      }
      window.location.reload();
    } catch { setError(true); }
  }

  if (!open) return null;
  return <section aria-labelledby="privacy-preferences-title" className="fixed inset-0 z-[100] overflow-y-auto bg-brand-ice px-6 py-8 text-slate-900 sm:py-12">
    <div className="mx-auto flex min-h-full max-w-3xl flex-col">
    <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-6">
      <span className="text-lg font-bold tracking-tight">GiorgioTedesco<span className="text-brand-blue">.it</span></span>
      <button type="button" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue">Chiudi e continua</button>
    </div>
    <div className="my-auto py-12 sm:py-16">
    <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-blue">Privacy e preferenze</p>
    <h2 id="privacy-preferences-title" className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Le tue preferenze privacy</h2>
    <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700">I dati necessari al funzionamento del sito restano attivi. Puoi scegliere se consentire statistiche e contenuti esterni. <Link href="/it/privacy/" onClick={() => setOpen(false)} className="text-brand-blue underline underline-offset-4">Leggi l’informativa privacy</Link>.</p>
    <div className="mt-8 grid gap-3 text-sm sm:grid-cols-2">
      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white p-5"><input type="checkbox" checked={analytics} onChange={e => setAnalytics(e.target.checked)} className="mt-1 h-4 w-4 accent-brand-blue" /><span><strong className="text-base">Statistiche e misurazione</strong><br /><span className="mt-1 block leading-6 text-slate-600">Umami e misurazione degli esperimenti.</span></span></label>
      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white p-5"><input type="checkbox" checked={external} onChange={e => setExternal(e.target.checked)} className="mt-1 h-4 w-4 accent-brand-blue" /><span><strong className="text-base">Contenuti esterni</strong><br /><span className="mt-1 block leading-6 text-slate-600">Cal.com, YouTube e SuperSplat.</span></span></label>
    </div>
    <div className="mt-5 flex flex-wrap gap-2">
      <button type="button" onClick={() => save(false, false)} className="rounded-lg border border-slate-400 px-4 py-2 text-sm font-semibold">Rifiuta facoltativi</button>
      <button type="button" onClick={() => save(analytics, external)} className="rounded-lg border border-slate-400 px-4 py-2 text-sm font-semibold">Salva scelta</button>
      <button type="button" onClick={() => save(true, true)} className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white">Accetta tutti</button>
    </div>
    {error && <p role="alert" className="mt-3 text-sm text-red-700">Impossibile salvare la scelta nel browser. Controlla le impostazioni di archiviazione.</p>}
    </div>
    </div>
  </section>;
}
