import assert from 'node:assert/strict';
import test from 'node:test';
import { CONSENT_TEXT_VERSION, findNewsletterConsent, submitNewsletterConsent } from '../src/app/lib/newsletter-consents.ts';

const baseChoice = { email: 'test@example.invalid', did: 'did:plc:abcdefghijklmnopqrstuvwx', username: 'example.test' };

for (const [newsletter, marketing] of [[true, false], [false, true], [true, true], [false, false]]) {
  test(`records separate choices: newsletter=${newsletter}, marketing=${marketing}`, async () => {
    let sent;
    const request = async (url, init) => {
      assert.equal(url, 'https://pb.example.invalid/api/collections/newsletter_subscribers/records');
      sent = JSON.parse(init.body);
      return new Response(JSON.stringify({ ...sent, id: 'abcdefghijklmno' }), { status: 200 });
    };
    await submitNewsletterConsent('https://pb.example.invalid/', { ...baseChoice, newsletter, marketing }, request);
    assert.equal(sent.consent_newsletter, newsletter);
    assert.equal(sent.consent_marketing, marketing);
    assert.equal(sent.consent_text_version, CONSENT_TEXT_VERSION);
  });
}

test('does not confirm success when PocketBase drops the new fields', async () => {
  await assert.rejects(submitNewsletterConsent('https://pb.example.invalid', { ...baseChoice, newsletter: true, marketing: false }, async () => new Response(JSON.stringify({ email: baseChoice.email }), { status: 200 })));
});

test('updates the same record with PATCH and does not fall back to creating one', async () => {
  const request = async (url, init) => {
    assert.equal(url, 'https://pb.example.invalid/api/collections/newsletter_subscribers/records/abcdefghijklmno');
    assert.equal(init.method, 'PATCH');
    return Response.json({ ...JSON.parse(init.body), id: 'abcdefghijklmno' });
  };
  assert.equal(await submitNewsletterConsent('https://pb.example.invalid', { ...baseChoice, newsletter: false, marketing: false }, request, 'abcdefghijklmno'), 'abcdefghijklmno');
  let calls = 0;
  await assert.rejects(submitNewsletterConsent('https://pb.example.invalid', { ...baseChoice, newsletter: false, marketing: false }, async () => { calls++; return new Response('', { status: 403 }); }, 'abcdefghijklmno'));
  assert.equal(calls, 1);
});

test('finds choices by email and rejects duplicate records', async () => {
  const record = { id: 'abcdefghijklmno', email: baseChoice.email, consent_newsletter: true, consent_marketing: false, consent_text_version: CONSENT_TEXT_VERSION };
  const request = async (url) => { assert.equal(url.searchParams.get('email'), baseChoice.email); return Response.json({ items: [record] }); };
  assert.deepEqual(await findNewsletterConsent('https://pb.example.invalid', baseChoice.email, request), { id: record.id, newsletter: true, marketing: false, hasConsent: true });
  await assert.rejects(findNewsletterConsent('https://pb.example.invalid', baseChoice.email, async () => Response.json({ items: [record, record] })));
});
