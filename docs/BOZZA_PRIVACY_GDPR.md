# Privacy e GDPR: appunti per l’informativa

Bozza di lavoro, non pronta per la pubblicazione. Le informazioni sotto distinguono quanto indicato dal titolare o rilevato nel codice dai punti ancora da verificare.

## Titolare e contatto

- Titolare: configurato tramite `NEXT_PUBLIC_PRIVACY_CONTROLLER_NAME`.
- Email per le richieste privacy: configurata tramite `NEXT_PUBLIC_PRIVACY_EMAIL`.
- Indirizzo della sede: conservato nella configurazione locale, non incluso nella pagina; verificare eventuali obblighi specifici di pubblicazione.

I valori sono pubblici e vengono incorporati durante la build statica. Configurarli anche nelle variabili dell'ambiente GitHub Pages e ricostruire il sito dopo ogni modifica.

## Infrastruttura indicata

- `giorgiotedesco.it` è pubblicato tramite GitHub Pages; la repository è https://github.com/giorgionetg/giorgiotedesco.it.
- PocketBase su `pb.giorgiotedesco.it`, usato per i dati dei moduli e delle funzionalità collegate, è ospitato su Hetzner.
- Gli altri servizi indicati usano Hetzner, salvo Umami e il cloud privato di `dex-id.it`.
- Umami su `get.giorgiotedesco.it` e DigitalOcean.
- `dex-id.it` su Hetzner e cloud privato.
- Germania: ubicazione indicata dal titolare per l'infrastruttura; verificare a quali server e backup si riferisce esattamente.
- Il cloud privato di `dex-id.it` comprende un computer nell'homelab del titolare; verificare ubicazione fisica e ruolo rispetto al server Hetzner.
- Conservazione: il titolare indica che i dati sono conservati per almeno tre anni su copie locali nell'homelab. Da precisare quali dati sono inclusi, il periodo massimo o i criteri di cancellazione, la rotazione delle copie e i tempi separati dei dati sui servizi attivi.
- Richieste commerciali senza seguito: il titolare ha scelto 12 mesi dall'ultimo contatto come regola da adottare. Non è stata verificata né implementata una procedura periodica o automatica di cancellazione, inclusa la gestione delle copie locali.

Da chiarire: ubicazione dei server e dei backup, ruolo di ciascun fornitore, eventuali accessi o trasferimenti fuori dallo Spazio economico europeo e relative garanzie. La sede del provider non è sufficiente a stabilire dove vengano trattati i dati.

## Trattamenti da verificare

- **Navigazione e sicurezza:** dati contenuti nei log, finalità, base giuridica e durata di conservazione effettiva.
- **Statistiche:** il sito carica in produzione lo script Umami da `get.giorgiotedesco.it` e invia anche eventi relativi alle interazioni. Verificare configurazione, dati raccolti, durata, eventuali identificatori e applicabilità delle regole su cookie e altri strumenti di tracciamento.
- **Conservazione Umami:** il titolare ha scelto 12 mesi. Attualmente non è pianificata una cancellazione automatica: bisogna verificare come applicare e controllare effettivamente il limite, anche nelle copie di backup, prima di descriverlo come operativo.
- **Esperimenti Visura AI:** il codice crea e conserva nel `localStorage` del browser la chiave `visura-ai.visitor-id`, senza scadenza impostata dal codice, e invia l'identificativo, la variante e gli eventi alla collection PocketBase `visura_ai_events`. Verificare tempi di conservazione sul server, finalità e presupposti per l'uso dell'identificativo; il consenso agli strumenti di tracciamento va valutato anche per questo flusso.
- **Richieste di contatto e servizi:** dati effettivamente raccolti dai moduli, destinatari, finalità, basi giuridiche e tempi di conservazione; individuare i fornitori coinvolti, incluso PocketBase dove utilizzato.
- **Accesso AT Protocol:** il codice permette l'accesso tramite un provider AT Protocol e richiede informazioni di profilo a `public.api.bsky.app`. Verificare i flussi, i fornitori e le rispettive informative, inclusa la relazione con `dex-id.it`.
- **Newsletter e comunicazioni commerciali:** il codice prevede preferenze separate e facoltative. Documentare destinatari, servizi di invio, conservazione e modalità di revoca prima dell'utilizzo effettivo.
- **Contenuti esterni:** alcune pagine possono caricare contenuti di YouTube o altri servizi; verificare quando vengono caricati, i dati comunicati e la necessità di consenso.

## Informazioni necessarie per la pagina

- Ambito dell'informativa: siti, sottodomini e servizi coperti; eventuali informative separate.
- Per ogni trattamento: categorie di dati, finalità, base giuridica, destinatari, periodo di conservazione o criteri per determinarlo, natura obbligatoria o facoltativa del conferimento e relative conseguenze.
- Eventuali trasferimenti verso paesi terzi e garanzie applicabili; eventuali processi decisionali automatizzati rilevanti.
- Modalità per esercitare i diritti previsti dal GDPR e proporre reclamo al Garante; modalità di revoca del consenso quando utilizzato.
- Responsabili del trattamento e accordi applicabili, se presenti.

## Verifica tecnica prioritaria

Il documento `docs/ATPROTO_NEWSLETTER_CONSENTS.md` segnala che, secondo la ricognizione del 28 ottobre 2026, le regole pubbliche della collection delle preferenze consentivano a chi conosceva un indirizzo email di leggere e modificare il relativo record. Lo stato attuale va verificato e il problema risolto prima di affidarsi al flusso per dati reali.

Riferimenti normativi: [articoli 13 e seguenti del GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj/?locale=it) e [FAQ del Garante su cookie e altri strumenti di tracciamento](https://www.garanteprivacy.it/faq/cookie).
