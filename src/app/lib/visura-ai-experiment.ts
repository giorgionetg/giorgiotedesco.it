import heroExperiment from './visura-ai-hero-variants.json';

export type VisuraHeroVariant = (typeof heroExperiment.variants)[number];
export type VisuraExperimentEvent = 'hero_view' | 'hero_cta_click' | 'visura_start';

const visitorStorageKey = 'visura-ai.visitor-id';

export const canonicalVisuraHeroVariant = heroExperiment.variants.find(
  (variant) => variant.id === heroExperiment.canonical_variant_id,
) ?? heroExperiment.variants[0];

export function getVisuraHeroVariant(variantId: string) {
  return heroExperiment.variants.find((variant) => variant.id === variantId);
}

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getStableVisitorId() {
  if (typeof window === 'undefined') return null;

  const storedVisitorId = window.localStorage.getItem(visitorStorageKey);
  if (storedVisitorId) return storedVisitorId;

  const visitorId = createId();
  window.localStorage.setItem(visitorStorageKey, visitorId);
  return visitorId;
}

export function trackVisuraExperiment(eventName: VisuraExperimentEvent, variantId = canonicalVisuraHeroVariant.id) {
  const pocketBaseUrl = process.env.NEXT_PUBLIC_POCKETBASE_URL?.replace(/\/$/, '');
  if (!pocketBaseUrl || typeof window === 'undefined') return;

  const payload = JSON.stringify({
    experiment_id: heroExperiment.experiment_id,
    variant_id: variantId,
    visitor_id: getStableVisitorId(),
    event_name: eventName,
    service_type: 'visura-ai',
    occurred_at: new Date().toISOString(),
  });

  void fetch(`${pocketBaseUrl}/api/collections/visura_ai_events/records`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
    keepalive: true,
  }).catch(() => undefined);
}

export type VisuraAiRequest = {
  websiteAvailability: string;
  websiteUrl: string;
  interventionType: string;
  intendedOutcome: string;
  phoneNumber: string;
  privacyAccepted: boolean;
  marketingAccepted: boolean;
  discountCode: string;
};

export async function submitVisuraAiRequest(request: VisuraAiRequest, variantId = canonicalVisuraHeroVariant.id) {
  const pocketBaseUrl = process.env.NEXT_PUBLIC_POCKETBASE_URL?.replace(/\/$/, '');
  if (!pocketBaseUrl) throw new Error('PocketBase non configurato');

  const response = await fetch(`${pocketBaseUrl}/api/collections/visura_ai_requests/records`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_type: 'visura-ai',
      variant_id: variantId,
      website_availability: request.websiteAvailability,
      website_url: request.websiteUrl,
      intervention_type: request.interventionType,
      intended_outcome: request.intendedOutcome,
      phone_number: request.phoneNumber,
      consent_service: request.privacyAccepted,
      consent_marketing: request.marketingAccepted,
      discount_code: request.discountCode,
      request_status: 'new',
      submitted_at: new Date().toISOString(),
    }),
  });

  if (!response.ok) throw new Error('Invio della richiesta non riuscito');
  return response.json();
}
