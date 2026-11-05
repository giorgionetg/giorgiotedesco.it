'use client';

import { useEffect, useState } from 'react';
import { readPreferences } from '@/app/lib/tracking-consent';

export default function ExternalEmbed(props: React.IframeHTMLAttributes<HTMLIFrameElement>) {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => { const timer = window.setTimeout(() => setAllowed(Boolean(readPreferences()?.external)), 0); return () => window.clearTimeout(timer); }, []);
  if (!allowed) return <div className="my-6 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700"><p>Questo contenuto è ospitato da un servizio esterno.</p><button type="button" onClick={() => window.dispatchEvent(new Event('privacy:open'))} className="mt-3 font-semibold text-brand-blue underline">Apri preferenze privacy</button></div>;
  return <iframe {...props} />;
}
