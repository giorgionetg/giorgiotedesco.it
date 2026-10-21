# AI Sitter — MVP commerciale

## Pagina e posizionamento

- Landing italiana: `/it/servizi/ai-sitter/`.
- La pagina è una presentazione editoriale del servizio, non una piattaforma SaaS. È impostata `noindex` e non è inserita nella sitemap; il traffico iniziale arriva dall’articolo e da link social/campagna.
- Il primo segmento è chi ha iniziato un sito, una landing o un progetto web con strumenti AI e non riesce a completarlo.
- Tesi della variante A: «Con l’AI puoi fare quasi tutto. Ma non puoi fare tutto tu.» La variante B è «L’AI ti ha dato un altro lavoro.»
- Variante A/B configurabile in `src/app/lib/ai-sitter-config.ts`. Per la variante B aggiungere `?variant=B`; A è il valore predefinito. Non è un sistema di test randomizzato: la variante va distribuita manualmente e confrontata in Umami.
- La pagina racconta il contesto e porta a un solo form di contatto. Non mostra offerte a pacchetto o prezzi.

## Ipotesi di prezzo da validare — non approvate e non pubbliche

Questi importi sono ipotesi per l’esperimento commerciale. Non inserirli nella landing, nei preventivi o in comunicazioni ai clienti finché non vengono approvati.

| Offerta | Ipotesi da testare | Perimetro iniziale |
| --- | ---: | --- |
| Intervento su un blocco | €190–290 | Ipotesi interna per diagnosi e intervento circoscritto |
| Completamento progetto | €490–690 | Ipotesi interna per presa in carico e completamento concordato |
| Supporto continuativo | €800–1.500/mese | Possibile evoluzione futura; non promuovere nell’MVP |

Il prezzo del singolo progetto va concordato dopo aver visto il materiale e definito il perimetro. Non sono ancora stati validati willingness-to-pay, costi di delivery, margine o durata.

## Lead e attribution

Il form non chiede il telefono. Raccoglie:

- `email` obbligatoria e `fullname` facoltativa;
- `project_type`, `tools`, `completion_state`, `desired_outcome`, `description`;
- `project_url` facoltativo;
- `consent_service` obbligatorio e `consent_marketing` facoltativo;
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `referrer` e `landing_variant`;
- `service_type: ai-sitter`, `variant_id`, `landing_variant`, `request_status: new`, `submitted_at`.

Gli UTM presenti nell’URL vengono mantenuti. Se mancano, il form ricava una sorgente iniziale dal referrer (per esempio articolo interno, LinkedIn, motore di ricerca o accesso diretto). Gli articoli di Paolo usano `utm_source=giorgiotedesco.it`, `utm_medium=article`, `utm_campaign=ai-sitter-validation` e `utm_content=paolo-27-agenti`.

## PocketBase: prerequisito di attivazione invio lead

Il client invia i lead a `POST /api/collections/ai_sitter_leads/records` usando l’istanza PocketBase già configurata da `NEXT_PUBLIC_POCKETBASE_URL`. Questa collection non è verificata né creata da questo repository. Prima di considerare il funnel operativo:

1. Creare `ai_sitter_leads` nella stessa istanza PocketBase, se non esiste.
2. Aggiungere i campi del payload sopra. `tools` deve accettare più valori; `email` deve essere obbligatorio; `fullname` e `project_url` devono essere facoltativi.
3. Limitare le regole pubbliche a `create`; non consentire `list`, `view`, `update` o `delete` pubblici. Validare lato PocketBase che `consent_service` sia true e che `service_type` sia `ai-sitter`.
4. Verificare CORS per il dominio di produzione e inviare un lead di prova; controllare il record nel pannello autenticato, senza rendere pubbliche le regole di lettura.
5. Lasciare configurata `NEXT_PUBLIC_POCKETBASE_URL` nell’ambiente locale e nell’environment GitHub Pages `github-pages`, come già richiesto dal workflow.

La pagina può essere esplorata in locale senza PocketBase, ma l’invio del form restituisce un errore finché endpoint e collection non sono pronti. Non inviare dati di clienti reali prima di avere verificato la collection e l’informativa privacy da mostrare agli utenti. Il form attuale non punta a una pagina privacy perché nel worktree non ne è stata trovata una.

## Eventi Umami

Umami viene caricato soltanto in produzione su un host non locale. Il codice invia questi eventi con `variant` e, dove utile, `offer` o `placement`:

- `ai_sitter_view`
- `ai_sitter_cta_click`
- `ai_sitter_form_start`
- `ai_sitter_form_submit` (solo invio riuscito)
- `ai_sitter_form_error`
- `ai_sitter_article_click`

Per leggere il funnel, confrontare gli eventi per `variant` in Umami. Il tasso lead usa `ai_sitter_form_submit / ai_sitter_view`; gli errori e gli abbandoni si leggono con `ai_sitter_form_start` e `ai_sitter_form_error`.

## Copy e limiti

Headline e descrizioni A/B sono centralizzate in `src/app/lib/ai-sitter-config.ts`; il testo narrativo e il form sono in `AiSitterLanding.tsx`. I prezzi restano soltanto in questa documentazione finché non approvati. Non aggiungere testimonianze, percentuali di risparmio, tempi garantiti o promesse di completamento universale senza evidenza.
