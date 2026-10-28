import type { BrowserOAuthClient } from '@atproto/oauth-client-browser';

export type OAuthSession = NonNullable<Awaited<ReturnType<BrowserOAuthClient['init']>>>['session'];

const clientId = 'https://giorgiotedesco.it/oauth-client-metadata.json';
const scope = 'atproto account:email';
let clientPromise: Promise<BrowserOAuthClient> | undefined;
let initializationPromise: Promise<Awaited<ReturnType<BrowserOAuthClient['init']>>> | undefined;

export function getOAuthClient() {
  clientPromise ??= import('@atproto/oauth-client-browser').then(({ BrowserOAuthClient }) => {
    const handleResolver = 'https://bsky.social/';
    if (['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname)) {
      const host = window.location.hostname === '[::1]' ? '[::1]' : '127.0.0.1';
      const port = window.location.port ? `:${window.location.port}` : '';
      const redirectUri = `http://${host}${port}/`;
      return BrowserOAuthClient.load({
        handleResolver,
        clientId: `http://localhost?redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`,
      });
    }
    return BrowserOAuthClient.load({ clientId, handleResolver });
  });
  return clientPromise;
}

export function initializeOAuth() {
  initializationPromise ??= getOAuthClient().then((client) => client.init()).catch((error) => {
    initializationPromise = undefined;
    throw error;
  });
  return initializationPromise;
}
