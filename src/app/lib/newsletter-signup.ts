export const NEWSLETTER_SIGNUP_CONSENT_VERSION = 'homepage-newsletter-2026-11-05-v1';

export async function submitNewsletterSignup(
  baseUrl: string,
  fullName: string,
  email: string,
  request: typeof fetch = fetch,
): Promise<void> {
  const normalizedName = fullName.trim().replace(/\s+/g, ' ');
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    throw new Error('Enter a valid name and email address.');
  }

  const response = await request(`${baseUrl.replace(/\/$/, '')}/api/collections/newsletter_subscribers/records`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: normalizedName,
      email: normalizedEmail,
      consent_newsletter: true,
      consent_marketing: false,
      consent_text_version: NEWSLETTER_SIGNUP_CONSENT_VERSION,
    }),
  });
  if (!response.ok) throw new Error('Signup could not be confirmed.');

  const saved: unknown = await response.json();
  if (!saved || typeof saved !== 'object') throw new Error('Signup could not be confirmed.');
  const record = saved as Record<string, unknown>;
  if (typeof record.id !== 'string' || !/^[a-z0-9]{15}$/.test(record.id) ||
      record.email !== normalizedEmail || record.username !== normalizedName ||
      record.consent_newsletter !== true || record.consent_marketing !== false ||
      record.consent_text_version !== NEWSLETTER_SIGNUP_CONSENT_VERSION) {
    throw new Error('Signup could not be confirmed.');
  }
}
