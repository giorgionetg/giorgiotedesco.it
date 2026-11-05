export const CONSENT_KEY = 'privacy.preferences.v1';
export const PENDING_SERVICE_CLICKS_KEY = 'blog.service-clicks.pending.v1';
export type Preferences = { analytics: boolean; external: boolean; savedAt: number };
const SIX_MONTHS = 183 * 24 * 60 * 60 * 1000;

export function readPreferences(): Preferences | null {
  if (typeof window === 'undefined') return null;
  try {
    const value = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null');
    if (!value || typeof value.analytics !== 'boolean' || typeof value.external !== 'boolean' || typeof value.savedAt !== 'number' || Date.now() - value.savedAt >= SIX_MONTHS || value.savedAt > Date.now()) return null;
    return value;
  } catch { return null; }
}
