'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { getOAuthClient, initializeOAuth, type OAuthSession } from '@/app/lib/atproto-oauth';
import AtprotoConsents from '@/app/components/googlestudioai/AtprotoConsents';
import { findNewsletterConsent } from '@/app/lib/newsletter-consents';

type PublicProfile = { handle?: string; displayName?: string; avatar?: string };
type AccountSession = { email?: string; emailConfirmed?: boolean };

export default function AtprotoLogin({ page = 'login' }: { page?: 'login' | 'account' | 'thanks' }) {
  const router = useRouter();
  const [handle, setHandle] = useState('');
  const [session, setSession] = useState<OAuthSession>();
  const [profile, setProfile] = useState<PublicProfile>();
  const [accountEmail, setAccountEmail] = useState<string>();
  const [emailStatus, setEmailStatus] = useState<'loading' | 'available' | 'unavailable'>('loading');
  const [status, setStatus] = useState<'loading' | 'ready' | 'connecting' | 'error'>('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    initializeOAuth().then((result) => {
      if (!active) return;
      setSession(result?.session);
      if (new URLSearchParams(window.location.search).has('auth_error')) {
        setError('Sign in was not completed. Please try again.');
      }
      setStatus('ready');
    }).catch(() => {
      if (!active) return;
      setError('Could not restore your session. Reload the page and try again.');
      setStatus('error');
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!session) return;
    const controller = new AbortController();
    fetch(`https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${encodeURIComponent(session.did)}`, {
      signal: controller.signal,
    }).then((response) => response.ok ? response.json() as Promise<PublicProfile> : undefined)
      .then((data) => setProfile(data))
      .catch(() => { /* The DID remains available without a Bluesky profile. */ });
    return () => controller.abort();
  }, [session]);

  useEffect(() => {
    if (status === 'loading' || status === 'error') return;
    if (!session) {
      if (page !== 'login') router.replace('/login/');
      return;
    }
    if (page !== 'login' || emailStatus === 'loading') return;
    if (!accountEmail) { router.replace('/thanks/'); return; }
    let active = true;
    findNewsletterConsent(process.env.NEXT_PUBLIC_POCKETBASE_URL || 'https://pb.giorgiotedesco.it', accountEmail)
      .then((record) => { if (active) router.replace(record ? '/account/' : '/thanks/'); })
      .catch(() => { if (active) setError('Could not check your preferences. Please reload the page and try again.'); });
    return () => { active = false; };
  }, [session, status, emailStatus, accountEmail, page, router]);

  useEffect(() => {
    if (!session) return;
    let active = true;
    session.fetchHandler('/xrpc/com.atproto.server.getSession')
      .then(async (response) => response.ok ? response.json() as Promise<AccountSession> : undefined)
      .then((account) => {
        if (!active) return;
        setAccountEmail(account?.email);
        setEmailStatus(account?.email ? 'available' : 'unavailable');
      })
      .catch(() => {
        if (active) setEmailStatus('unavailable');
      });
    return () => { active = false; };
  }, [session]);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const identifier = handle.trim().replace(/^@/, '');
    if (!identifier) return;
    setError('');
    setStatus('connecting');
    try {
      const client = await getOAuthClient();
      await client.signInRedirect(identifier);
    } catch {
      setError('Could not start sign in. Check your handle and try again.');
      setStatus('error');
    }
  }

  async function signOut() {
    if (!session) return;
    try {
      await session.signOut();
      window.location.assign('/login/');
    } catch {
      setError('Could not sign out. Please try again.');
      setStatus('error');
    }
  }

  async function requestEmailAccess() {
    if (!session) return;
    setError('');
    setStatus('connecting');
    try {
      const client = await getOAuthClient();
      await client.signInRedirect(session.did);
    } catch {
      setError('Could not request email access. Please try again.');
      setStatus('ready');
    }
  }

  if ((page !== 'login' && !session && status !== 'error') || (page === 'login' && session)) {
    return <p role="status" className="text-slate-600">{error || 'Checking your account…'}</p>;
  }

  return <>
    <div>
      <p className="mb-5 inline-flex rounded-full border border-blue-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue">AT Protocol</p>
      {session ? <AtprotoConsents did={session.did} email={accountEmail} username={profile?.handle} page={page === 'account' ? 'account' : 'thanks'} /> : <>
        <h1 className="max-w-xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Your identity, connected.</h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600">Sign in with your AT Protocol handle. Your account stays with your provider; this page shows your identity after authorization.</p>
      </>}
    </div>
    <section aria-labelledby="atproto-title" className="w-full rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-blue-900/5 sm:p-10">
        <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-brand-blue" aria-hidden="true">@</div>
        <h2 id="atproto-title" className="text-2xl font-semibold tracking-tight text-slate-900">{session ? 'Account' : 'Sign in'}</h2>
        <p className="mt-2 text-slate-600">{session ? 'Signed in with your AT Protocol account.' : 'Enter your AT Protocol handle to continue.'}</p>
        {status === 'loading' && <p className="mt-5 text-slate-600" role="status">Checking your session…</p>}
        {session ? <div className="mt-7 space-y-3">
          <p className="font-medium text-slate-900">{profile?.displayName || profile?.handle || 'Connected account'}</p>
          {profile?.handle && <p className="text-slate-600">@{profile.handle}</p>}
          <p className="break-all text-sm text-slate-600">DID: {session.did}</p>
          {emailStatus === 'loading' && <p className="text-sm text-slate-500" role="status">Checking email access…</p>}
          {emailStatus === 'available' && <p className="break-all text-sm text-slate-700">Email: <span className="font-medium">{accountEmail}</span></p>}
          {emailStatus === 'unavailable' && <div className="space-y-2">
            <p className="text-sm text-slate-600">Email access has not been granted for this session.</p>
            <button type="button" onClick={requestEmailAccess} disabled={status === 'connecting'} className="text-sm font-semibold text-brand-blue underline underline-offset-4 hover:text-blue-700 disabled:opacity-60">{status === 'connecting' ? 'Connecting…' : 'Allow email access'}</button>
          </div>}
          <button type="button" onClick={signOut} className="mt-3 rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-900 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue">Sign out</button>
        </div> : status !== 'loading' && <form onSubmit={signIn} className="mt-7 space-y-4">
          <label htmlFor="atproto-handle" className="block text-sm font-semibold text-slate-800">AT Protocol handle</label>
          <input id="atproto-handle" value={handle} onChange={(event) => setHandle(event.target.value)} placeholder="name.bsky.social" autoComplete="username" required className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20" />
          <button type="submit" disabled={status === 'connecting'} className="btn h-12 w-full rounded-xl border-none bg-brand-blue font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue disabled:opacity-60">{status === 'connecting' ? 'Connecting…' : 'Continue with AT Protocol'}</button>
        </form>}
        {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
        <p className="mt-8 border-t border-slate-100 pt-5 text-xs leading-relaxed text-slate-500">Your handle is sent to Bluesky to find your account provider. Authorization takes place with that provider.</p>
    </section>
  </>;
}
