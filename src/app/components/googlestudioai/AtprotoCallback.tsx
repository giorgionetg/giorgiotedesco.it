'use client';

import { useEffect } from 'react';
import { initializeOAuth } from '@/app/lib/atproto-oauth';

export default function AtprotoCallback() {
  useEffect(() => {
    const parameters = new URLSearchParams(window.location.hash.slice(1));
    if (!parameters.has('state') || (!parameters.has('code') && !parameters.has('error'))) return;

    initializeOAuth()
      .then(() => window.location.replace('/login/'))
      .catch(() => window.location.replace('/login/?auth_error=1'));
  }, []);

  return null;
}
