export const aiSitterExperiment = {
  id: 'ai-sitter-validation',
  defaultVariant: 'A',
  variants: {
    A: {
      headline: 'Con l’AI puoi fare quasi tutto. Ma non puoi fare tutto tu.',
      description: 'Hai iniziato il sito da solo. E funziona. È proprio questo il punto: adesso puoi occuparti anche di menu, testi, mobile, form e pubblicazione.',
    },
    B: {
      headline: 'L’AI ti ha dato un altro lavoro.',
      description: 'Una pagina da sistemare, un dettaglio da controllare, una funzione che ancora non torna. A un certo punto qualcuno deve seguire il progetto fino in fondo.',
    },
  },
} as const;

export type AiSitterVariant = keyof typeof aiSitterExperiment.variants;

export type AiSitterLead = {
  projectType: string;
  tools: string[];
  completionState: string;
  desiredOutcome: string;
  description: string;
  projectUrl: string;
  email: string;
  name: string;
  consentService: boolean;
  consentMarketing: boolean;
};

export type AiSitterAttribution = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  referrer: string;
  landing_variant: AiSitterVariant;
};

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, string | number | boolean | undefined>) => void;
    };
    __pendingUmamiEvents?: Array<{
      event: string;
      data: Record<string, string | number | boolean | undefined>;
    }>;
  }
}

export function trackAiSitterEvent(
  event: string,
  data: Record<string, string | number | boolean | undefined> = {},
) {
  if (typeof window === 'undefined') return;
  if (window.umami) {
    window.umami.track(event, data);
    return;
  }
  window.__pendingUmamiEvents ??= [];
  window.__pendingUmamiEvents.push({ event, data });
}

export async function submitAiSitterLead(
  lead: AiSitterLead,
  attribution: AiSitterAttribution,
) {
  const pocketBaseUrl = process.env.NEXT_PUBLIC_POCKETBASE_URL?.replace(/\/$/, '');
  if (!pocketBaseUrl) throw new Error('PocketBase non configurato');

  const response = await fetch(`${pocketBaseUrl}/api/collections/ai_sitter_leads/records`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_type: 'ai-sitter',
      variant_id: attribution.landing_variant,
      landing_variant: attribution.landing_variant,
      project_type: lead.projectType,
      tools: lead.tools,
      completion_state: lead.completionState,
      desired_outcome: lead.desiredOutcome,
      description: lead.description,
      project_url: lead.projectUrl,
      email: lead.email,
      fullname: lead.name,
      consent_service: lead.consentService,
      consent_marketing: lead.consentMarketing,
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign,
      utm_content: attribution.utm_content,
      referrer: attribution.referrer,
      request_status: 'new',
      submitted_at: new Date().toISOString(),
    }),
  });

  if (!response.ok) throw new Error('Invio della richiesta non riuscito');
  return response.json();
}
