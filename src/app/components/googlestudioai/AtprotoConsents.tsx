'use client';

import Link from 'next/link';
import { useEffect, useState, type FormEvent } from 'react';
import { findNewsletterConsent, submitNewsletterConsent } from '@/app/lib/newsletter-consents';

type AtprotoConsentsProps = { did: string; email?: string; username?: string };

export default function AtprotoConsents({ did, email, username }: AtprotoConsentsProps) {
  const [newsletter, setNewsletter] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [loadedKey, setLoadedKey] = useState<string>();
  const [loadError, setLoadError] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const [recordId, setRecordId] = useState<string>();
  const [message, setMessage] = useState('');
  const pocketBaseUrl = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'https://pb.giorgiotedesco.it';
  const loadKey = `${did}\n${email ?? ''}`;

  useEffect(() => {
    let active = true;
    if (!email) {
      Promise.resolve().then(() => { if (active) { setLoadedKey(loadKey); setLoadError(false); setHasSaved(false); setRecordId(undefined); setNewsletter(false); setMarketing(false); } });
      return () => { active = false; };
    }
    findNewsletterConsent(pocketBaseUrl, email).then((saved) => {
      if (!active) return;
      setNewsletter(saved?.newsletter ?? false);
      setMarketing(saved?.marketing ?? false);
      setStatus('idle');
      setHasSaved(saved?.hasConsent ?? false);
      setRecordId(saved?.id);
      setLoadError(false);
      setMessage('');
      setLoadedKey(loadKey);
    }).catch(() => {
      if (!active) return;
      setLoadError(true);
      setLoadedKey(loadKey);
    });
    return () => { active = false; };
  }, [did, email, loadKey, pocketBaseUrl]);

  async function saveChoices(nextNewsletter: boolean, nextMarketing: boolean) {
    if (status === 'sending') return;
    if (loadError) {
      setMessage('Impossibile recuperare le preferenze. Ricarica la pagina prima di riprovare.');
      return;
    }
    if (!email) {
      setMessage('Per salvare le preferenze occorre autorizzare l’accesso all’email.');
      return;
    }
    setMessage('');
    setStatus('sending');
    try {
      const savedId = await submitNewsletterConsent(pocketBaseUrl, { did, email, username, newsletter: nextNewsletter, marketing: nextMarketing }, fetch, recordId);
      setRecordId(savedId);
      setNewsletter(nextNewsletter);
      setMarketing(nextMarketing);
      setStatus('sent');
      setHasSaved(true);
    } catch {
      setStatus('error');
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void saveChoices(newsletter, marketing);
  }

  if (loadedKey !== loadKey) return <p role="status" className="text-slate-600">Caricamento preferenze…</p>;

  return <form onSubmit={submit} aria-labelledby="consents-title" className="max-w-xl">
    <h1 id="consents-title" className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Special thanks</h1>
    <p className="mt-6 text-lg leading-relaxed text-slate-600">
      {hasSaved ? 'Le tue preferenze sono state salvate. Puoi selezionare le opzioni che desideri.' : 'Il login è avvenuto, ma io ancora non ho ricevuto i dati che vuoi condividere con me. Per condividerli, spunta le caselle qui sotto.'}
    </p>
    <div className="mt-5 space-y-4">
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-slate-700">
        <input type="checkbox" checked={newsletter} disabled={status === 'sending'} onChange={(event) => { setNewsletter(event.target.checked); setStatus('idle'); setMessage(''); }} className="checkbox checkbox-sm mt-0.5 shrink-0 border-slate-400 [--chkbg:var(--color-brand-blue)] [--chkfg:white]" />
        <span>Autorizzo esplicitamente l’uso della mia email per ricevere la newsletter.</span>
      </label>
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-slate-700">
        <input type="checkbox" checked={marketing} disabled={status === 'sending'} onChange={(event) => { setMarketing(event.target.checked); setStatus('idle'); setMessage(''); }} className="checkbox checkbox-sm mt-0.5 shrink-0 border-slate-400 [--chkbg:var(--color-brand-blue)] [--chkfg:white]" />
        <span>Acconsento a ricevere comunicazioni pubblicitarie e di marketing, anche relative a codici sconto.</span>
      </label>
    </div>
    <p className="mt-5 text-xs leading-relaxed text-slate-500">
      Le scelte sono facoltative. Consulta l’<Link href="/privacy/" className="font-medium text-brand-blue underline underline-offset-2">informativa privacy</Link>.
    </p>
    <button type="submit" disabled={status === 'sending'} className="btn mt-5 w-full rounded-xl border-none bg-brand-blue font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">{status === 'sending' ? 'Invio in corso…' : 'Aggiorna le preferenze'}</button>
    <button type="button" disabled={status === 'sending'} onClick={() => { void saveChoices(false, false); }} className="btn mt-3 w-full rounded-xl border border-orange-600 bg-white font-semibold text-orange-700 hover:bg-orange-50">Revoca tutte le preferenze</button>
    <hr className="my-6 border-slate-200" />
    <button type="button" disabled aria-describedby="remove-account-unavailable" className="btn w-full cursor-not-allowed rounded-xl border-none bg-red-700 font-semibold text-white opacity-50">Rimuovi account completamente</button>
    <p id="remove-account-unavailable" className="mt-2 text-xs text-slate-500">Funzione non ancora disponibile.</p>
    {message && <p role="status" className="mt-3 text-sm text-orange-800">{message}</p>}
    {loadError && <p role="alert" className="mt-3 text-sm text-red-700">Non è stato possibile recuperare le preferenze. Ricarica la pagina e riprova.</p>}
    {!email && <p role="status" className="mt-2 text-xs text-slate-500">Per condividere la tua email, autorizzane prima l’accesso nel tuo account AT Protocol.</p>}
    {status === 'sent' && !message && <p role="status" className="mt-2 text-sm text-emerald-700">Preferenze inviate.</p>}
    {status === 'error' && <p role="alert" className="mt-2 text-sm text-red-700">Non è stato possibile confermare il salvataggio. Prima di riprovare, contattami per verificare se la richiesta è arrivata.</p>}
  </form>;
}
