export const CONSENT_TEXT_VERSION = 'atproto-consents-2026-10-28-v1';

export type NewsletterConsent = {
  email: string;
  did: string;
  username?: string;
  newsletter: boolean;
  marketing: boolean;
};

export async function findNewsletterConsent(baseUrl: string, email: string, request: typeof fetch = fetch): Promise<{ id: string; newsletter: boolean; marketing: boolean; hasConsent: boolean } | null> {
  const url = new URL(`${baseUrl.replace(/\/$/, '')}/api/collections/newsletter_subscribers/records`);
  url.searchParams.set('email', email);
  url.searchParams.set('perPage', '2');
  url.searchParams.set('fields', 'id,email,consent_newsletter,consent_marketing,consent_text_version');
  const response = await request(url);
  if (!response.ok) throw new Error('Unable to retrieve preferences');
  const result: unknown = await response.json();
  if (!result || typeof result !== 'object' || !Array.isArray((result as { items?: unknown }).items)) throw new Error('Invalid preference response');
  const items = (result as { items: unknown[] }).items;
  if (items.length > 1) throw new Error('Multiple records found for email');
  if (!items.length) return null;
  const record = items[0] as Record<string, unknown>;
  if (!record || typeof record.id !== 'string' || !/^[a-z0-9]{15}$/.test(record.id) || typeof record.email !== 'string' || record.email.toLowerCase() !== email.toLowerCase() || typeof record.consent_newsletter !== 'boolean' || typeof record.consent_marketing !== 'boolean' || typeof record.consent_text_version !== 'string') throw new Error('Invalid preference record');
  return { id: record.id, newsletter: record.consent_newsletter, marketing: record.consent_marketing, hasConsent: !!record.consent_text_version };
}

export async function submitNewsletterConsent(baseUrl: string, choice: NewsletterConsent, request: typeof fetch = fetch, recordId?: string): Promise<string> {
  if (!baseUrl || !choice.email || !choice.did) {
    throw new Error('Missing consent information');
  }

  const payload = {
    email: choice.email,
    username: choice.username || '',
    atproto_did: choice.did,
    consent_newsletter: choice.newsletter,
    consent_marketing: choice.marketing,
    consent_text_version: CONSENT_TEXT_VERSION,
  };
  if (recordId && !/^[a-z0-9]{15}$/.test(recordId)) throw new Error('Invalid record id');
  const response = await request(`${baseUrl.replace(/\/$/, '')}/api/collections/newsletter_subscribers/records${recordId ? `/${recordId}` : ''}`, {
    method: recordId ? 'PATCH' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Submission failed');

  const record: unknown = await response.json();
  if (!record || typeof record !== 'object') throw new Error('Submission could not be confirmed');
  const saved = record as Record<string, unknown>;
  if (typeof saved.id !== 'string' || !/^[a-z0-9]{15}$/.test(saved.id) || (recordId && saved.id !== recordId) ||
      typeof saved.email !== 'string' || saved.email.toLowerCase() !== payload.email.toLowerCase() ||
      saved.atproto_did !== payload.atproto_did || saved.consent_text_version !== payload.consent_text_version ||
      saved.consent_newsletter !== payload.consent_newsletter || saved.consent_marketing !== payload.consent_marketing) {
    throw new Error('Submission could not be confirmed');
  }
  return saved.id;
}
