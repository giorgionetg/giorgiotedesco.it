# Esperimento hero Visura AI

Le dieci varianti vivono in `src/app/lib/visura-ai-hero-variants.json`. Ogni oggetto contiene l'intero messaggio hero: eyebrow, H1, descrizione, CTA e microcopy. Non sono ammessi fallback da varianti diverse.

## SEO

La variante `canonical_variant_id` è sempre l'HTML prerenderizzato, il titolo e la description della route canonica `/it/servizi/visura-ai/`. La route principale non esegue alcuna randomizzazione client-side: crawler e utenti vedono la stessa variante canonica. Ogni altra variante vive soltanto nella propria URL statica. Non si adotta user-agent targeting.

Le anteprime statiche sono disponibili in `/it/servizi/visura-ai/<id>/`. Hanno `noindex, nofollow` e canonical verso la route principale; non entrano nella sitemap. Quando l'esperimento termina, la variante vincente diventa la canonica nel JSON e le altre vengono rimosse.

## Eventi PocketBase

Configurare `NEXT_PUBLIC_POCKETBASE_URL`. Il client invia `POST /api/collections/visura_ai_events/records` con `experiment_id`, `variant_id`, `visitor_id`, `event_name`, `service_type` e `occurred_at`. `service_type` accetta `visura-ai` e `siti-web`; gli ID di esperimento e variante distinguono ulteriormente i funnel.

La collection `visura_ai_events` deve consentire soltanto la creazione pubblica, validare `event_name` (`hero_view`, `hero_cta_click`, `visura_start`) e non esporre regole list/view pubbliche.

Alla conferma il form invia anche `POST /api/collections/visura_ai_requests/records`. La collection deve avere almeno: `service_type`, `variant_id`, `website_availability`, `website_url`, `intervention_type`, `intended_outcome`, `fullname`, `no_site_context`, `phone_number`, `consent_service`, `consent_marketing`, `discount_code`, `request_status` e `submitted_at`.

Il client invia sempre `request_status: "new"`: il campo puo quindi essere Required nella collection. Impostare `discount_code` come campo testo Required e Unique; il valore e un UUID generato solo dopo l'accettazione del consenso e prima della creazione del record. PocketBase assegna inoltre il proprio `id` univoco a ogni record.

La collection deve consentire solo create pubblico, con validazione lato PocketBase e senza regole list/view/update/delete pubbliche. `service_type` accetta `visura-ai` e `siti-web`. `fullname` deve essere Required. `website_url` puo essere vuoto solo se `website_availability` e `no-site`; `no_site_context` non deve essere Required lato PocketBase, ma la UI lo richiede quando `website_availability` e `no-site`. `consent_service` deve essere true per creare una richiesta. `consent_marketing` non deve essere Required, perche `false` e una scelta valida.

## Verifica prima della pubblicazione

1. In locale impostare `NEXT_PUBLIC_POCKETBASE_URL` in `.env` o `.env.local`; il file non va versionato. `.env.example` documenta il nome della variabile. Prima di pubblicare, creare in GitHub Actions la repository variable `NEXT_PUBLIC_POCKETBASE_URL`: il workflow interrompe la build con un errore esplicito se manca.
2. Controllare che le collection `visura_ai_requests` e `visura_ai_events` consentano Create pubblico e non espongano List/View al pubblico.
3. Inviare una richiesta di prova con consenso di servizio attivo e controllare che il record riporti `variant_id`, `request_status: new` e `discount_code`.
4. Verificare che un URL variante (`/it/servizi/visura-ai/<id>/`) salvi lo stesso `<id>` sia nella richiesta sia negli eventi. La route principale salva `visura-ai`.
