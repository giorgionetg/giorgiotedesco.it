'use client';

import { useEffect } from 'react';

const localHosts = new Set(['localhost', '127.0.0.1', '::1', '[::1]']);

export default function UmamiAnalytics() {
  useEffect(() => {
    const hostname = window.location.hostname;
    const isLocalHost = localHosts.has(hostname) || hostname.endsWith('.localhost') || hostname.endsWith('.local');

    if (process.env.NODE_ENV !== 'production' || isLocalHost) return;

    const script = document.createElement('script');
    script.defer = true;
    script.src = 'https://get.giorgiotedesco.it/script.js';
    script.dataset.websiteId = '177a1a7f-6206-4656-9668-88f9f69eb853';
    script.addEventListener('load', () => {
      const queuedEvents = window.__pendingUmamiEvents ?? [];
      for (const queuedEvent of queuedEvents) {
        window.umami?.track(queuedEvent.event, queuedEvent.data);
      }
      delete window.__pendingUmamiEvents;
    }, { once: true });
    document.head.appendChild(script);

    return () => script.remove();
  }, []);

  return null;
}
