'use client';

import Link from 'next/link';
import { PENDING_SERVICE_CLICKS_KEY, readPreferences } from '@/app/lib/tracking-consent';
import type { ServiceId } from '@/app/lib/types';
import type { ReactNode } from 'react';

type TrackedServiceLinkProps = {
  href: string;
  service: ServiceId;
  article: string;
  locale: 'en' | 'it';
  selection: 'article' | 'default';
  children: ReactNode;
};

export default function TrackedServiceLink({ href, service, article, locale, selection, children }: TrackedServiceLinkProps) {
  function trackClick() {
    if (process.env.NODE_ENV !== 'production' || !readPreferences()?.analytics) return;
    const data = { article, service, locale, selection };
    if (window.umami) {
      window.umami.track('blog_service_click', data);
    } else {
      try {
        const saved: unknown = JSON.parse(sessionStorage.getItem(PENDING_SERVICE_CLICKS_KEY) || '[]');
        const pending = Array.isArray(saved) ? saved : [];
        sessionStorage.setItem(PENDING_SERVICE_CLICKS_KEY, JSON.stringify([...pending.slice(-19), data]));
      } catch {
        // A blocked session store must not prevent navigation to the service.
      }
    }
  }

  return <Link
    href={href}
    hrefLang="it"
    onClick={trackClick}
    className="group block w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-blue/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
  >{children}</Link>;
}
