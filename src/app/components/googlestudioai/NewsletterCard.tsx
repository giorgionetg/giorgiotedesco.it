'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { submitNewsletterSignup } from '@/app/lib/newsletter-signup';

export default function NewsletterCard() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent || status === 'sending') return;
    setStatus('sending');
    try {
      await submitNewsletterSignup(
        process.env.NEXT_PUBLIC_POCKETBASE_URL || 'https://pb.giorgiotedesco.it',
        fullName,
        email,
      );
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return <article className="relative min-h-[380px] overflow-hidden rounded-4xl border border-base-200 bg-slate-900 shadow-xl">
    <img src="/ai-images/gemini-gt-placeholder.jpg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-25" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-slate-950/90 to-slate-900/75" />
    <div className="relative z-10 flex h-full flex-col p-6 text-white">
      <h2 className="text-2xl font-bold leading-tight">Join the newsletter</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-200">New articles, straight to your inbox.</p>
      {status === 'sent' ? <p role="status" className="mt-auto pt-8 text-base font-semibold leading-relaxed text-white">Thanks. Your subscription was saved.</p> :
        <form onSubmit={handleSubmit} className="mt-5 flex flex-1 flex-col gap-3">
          <label className="text-sm font-medium text-white" htmlFor="newsletter-full-name">Full name</label>
          <input id="newsletter-full-name" name="name" type="text" autoComplete="name" required maxLength={120} value={fullName} onChange={(event) => setFullName(event.target.value)} disabled={status === 'sending'} className="min-h-11 w-full rounded-lg border border-white/30 bg-white px-3 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" />
          <label className="text-sm font-medium text-white" htmlFor="newsletter-email">Email</label>
          <input id="newsletter-email" name="email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} disabled={status === 'sending'} className="min-h-11 w-full rounded-lg border border-white/30 bg-white px-3 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" />
          <label className="mt-1 flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-slate-100">
            <input type="checkbox" required checked={consent} onChange={(event) => setConsent(event.target.checked)} disabled={status === 'sending'} className="mt-1 h-4 w-4 shrink-0 accent-brand-blue" />
            <span>I agree to receive the newsletter and have read the <Link href="/privacy/" className="font-semibold text-white underline underline-offset-2 hover:text-blue-200">privacy notice</Link>.</span>
          </label>
          <button type="submit" disabled={status === 'sending'} className="btn btn-primary mt-auto w-full rounded-full text-sm font-bold transition-colors hover:border-interaction-orange hover:bg-interaction-orange hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-60">{status === 'sending' ? 'Sending…' : 'Subscribe'}</button>
          {status === 'error' && <p role="alert" className="text-sm leading-relaxed text-white">Could not confirm the subscription. Please check your details and try again.</p>}
        </form>}
    </div>
  </article>;
}
