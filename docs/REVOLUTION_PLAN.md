# Piano di lavoro — giorgiotedesco.it / feature-revolution

> Handoff strategico per un altro LLM o collaboratore. Aggiornato il 16 settembre 2026.
> Stato: piano, non implementazione né proposta contrattuale.

## Convenzioni

- **Decisione presa**: direzione concordata.
- **Evidenza**: osservata nella repository o sul sito pubblicato.
- **Ipotesi**: proposta da validare, non promessa.
- **Aperto**: scelta necessaria prima del lancio.

## 1. Direzione strategica

Giorgio Tedesco non deve diventare una web agency generalista. La direzione da
validare è un interlocutore diretto e senior per freelance e PMI che devono:

- capire perché sito, messaggio o acquisizione non stanno portando risultati;
- costruire una presenza essenziale più chiara;
- valutare mercato e concorrenti;
- prendere decisioni su legacy, integrazioni, architetture, sicurezza o sistemi
  digitali complessi.

Formula di lavoro da validare:

> Architettura, analisi e modernizzazione per chi deve capire cosa non sta
> funzionando prima di investire nella soluzione sbagliata.

Confini: niente siti vetrina indistinti, body rental senza responsabilità,
promesse su lead/ranking/fatturato senza dati, né automazione venduta come
consulenza senior.

### Pubblici

| Pubblico | Bisogno e tono | Esito possibile |
| --- | --- | --- |
| Freelance | Semplice: “Hai un sito ma non porta risultati?” | Visura AI, revisione, Landing Sprint, partnership |
| PMI | Problemi, risultati e decisioni | Market check, sito essenziale, consulenza/progetto |
| Sistemi complessi | Tecnico e senior | Consulenza senior o progetto delimitato |
| Freelance complementare | Rapporto fra pari | Partnership, non conversione forzata |

**Decisione presa**: mercato prioritario = freelance e PMI.

## 2. Stato osservato

- **Evidenza**: Next.js 16, React 19, TypeScript, static export e trailing
  slash (`package.json`, `next.config.ts`).
- **Evidenza**: route attive `/`, `/about-me/`, `/blog/` e sei post Markdown;
  sei bozze restano in `content/draft/`.
- **Evidenza**: homepage pubblicata “Senior Full-Stack Architect & Tech Lead”,
  CTA `Book a Call` e download CV.
- **Evidenza**: navigazione limitata a Home, About Me, Blog; nessuna pagina
  servizi, contatti, brief o casi pubblicata.
- **Evidenza**: Cal.com usa `giorgio-tedesco/30min` e chiede recruiter o
  rappresentante aziendale (`BookingModal.tsx`).
- **Evidenza**: nessun form lead, email o telefono rilevato nelle route attive.
- **Evidenza**: script analytics esterno nel layout; eventi, dashboard e dati
  non sono verificati.
- **Evidenza**: home con title, description e JSON-LD `Person`; fotografia
  HTML senza canonical/OG/Twitter. I post generano canonical, OG, Twitter e
  `BlogPosting` JSON-LD. Esiste `src/app/sitemap.ts`; nessun `robots.ts` o
  `public/robots.txt` rilevato.

Vincoli: Markdown come base editoriale, Cal.com già disponibile, nessun caso
studio pubblicabile, nessun accesso a Search Console, Analytics, CRM o baseline.

## 3. Architettura dell'offerta

### Visura AI

**Decisioni prese**:

- Prodotto di diagnosi, non consulenza strategica automatica.
- Output base: JSON grezzo automatico, basato su input e dati pubblici.
- Il cliente può accedere al JSON e autoanalizzarlo.
- La revisione umana non è inclusa né implicita e ha prezzo separato.
- PDF, dashboard o documento impaginato sono presentazioni future dello stesso
  dato: non bloccano il pilot JSON.

Input ipotizzati: URL, settore/offerta, obiettivo, pubblico e concorrenti
indicati. Può analizzare segnali pubblici: struttura, messaggio, CTA, metadata,
link e confronti documentabili. Non può inferire traffico, ranking reale,
conversioni, fatturato, CRM, campagne, Search Console o Analytics senza accesso.

Testo di confine:

> La Visura AI analizza segnali e dati pubblici disponibili. Non sostituisce
> una valutazione professionale e non include revisione umana.

### Revisione umana della Visura

Servizio a pagamento distinto: verifica evidenze, rimuove falsi positivi,
traduce il JSON in priorità contestuali e indica, se esiste, il prossimo passo.

**Dato operativo**: stima di lavoro umano = 50 euro netti/ora. È una soglia
interna, non il prezzo cliente; prezzo e margine devono coprire imposte,
strumenti AI, pagamenti, assistenza e rischio. La revisione deve avere tempo e
scope inclusi; oltre soglia si propone monte ore o progetto, non lavoro gratuito.

### Landing Sprint / sito essenziale

Direzione da validare: circa 1.500 euro per landing/sito essenziale, con
possibilità di tre rate mensili. Scope da fissare: una pagina, messaggio, CTA,
percorso e contenuti essenziali. Escludere integrazioni, e-commerce, advertising,
contenuti continuativi e funzioni non concordate.

Rate future 3/6/9/12 mesi: non progettare ora. Servono provider autorizzato,
offerte e testi aggiornati, margine verificato e revisione legale/commerciale.

### Market check, consulenza senior, partnership

- **Market check**: ipotesi per PMI su mercato, competitor, proposta e priorità;
  AI/LLM assistono ma non sono “sistemi proprietari” se non verificati.
- **Consulenza senior**: legacy, architetture, sicurezza, API, integrazioni e
  sistemi complessi; scope o monte ore prepagato, mai disponibilità illimitata.
- **Partnership**: freelance con capacità, competenza o clienti complementari.

## 4. Routing lead

| Situazione | Percorso | Evitare |
| --- | --- | --- |
| Problema confuso, URL disponibile | Visura AI grezza | Consulenza gratuita illimitata |
| Vuole conferma del JSON | Revisione umana acquistabile | Revisione inclusa per implicito |
| Landing/messaggio chiaro | Landing Sprint | “Fai tutto” senza scope |
| Mercato o competitor incerti | Market check | Promesse su dati assenti |
| Legacy/API/sicurezza/piattaforma | Consulenza senior | Sprint standard inadeguato |
| Freelance complementare | Partnership | Conversione forzata |
| Budget/obiettivo/scope assenti | Nurture o rifiuto educato | Preventivo inventato |

## 5. Funnel e misurazione

**Freelance**: contenuto/referral → Visura AI → JSON → autoanalisi o revisione
→ Landing Sprint, monte ore o partnership.

**PMI**: contenuto/referral → pagina problema/market check → richiesta → call
→ market check, Landing Sprint o proposta senior.

**Sistemi complessi**: referral/contenuto tecnico → pagina consulenza → brief →
call qualificazione → proposta delimitata.

Eventi minimi, senza target iniziali:

`visita → click CTA → richiesta avviata → acquisto Visura AI o call prenotata → call svolta → lead qualificato → proposta → incarico acquisito`

| Offerta | Lead qualificato |
| --- | --- |
| Visura AI | URL, obiettivo e consenso ai confini presenti |
| Landing Sprint | Obiettivo, decisore, perimetro/budget e contenuti minimi |
| Senior | Problema reale, stakeholder, contesto tecnico e possibilità di decisione |
| Partnership | Complementarità, responsabilità e canale definiti |

## 6. Architettura futura del sito

Ordine senza implementazione:

1. Home commerciale: percorso aziende/freelance distinto da recruiter/CV.
2. Pagina Visura AI: JSON automatico, limiti e CTA revisione separata.
3. Pagine Landing Sprint, market check e consulenza senior.
4. Pagina come lavoro e contatti/brief.
5. Casi studio, soltanto quando autorizzati.
6. Hub editoriale: modernizzazione, legacy, architettura, presenza digitale e
   decisioni tecniche.
7. Percorso recruiter/CV separato dal funnel commerciale.

I contenuti tecnici esistenti su self-hosting, agenti e sistemi possono essere
collegati a problemi aziendali, senza keyword stuffing.

## 7. Pilot e capacità

### Primo caso scontato

Ipotesi: sconto fino al 50% soltanto se costi diretti coperti, margine positivo,
scope scritto, nessun risultato promesso, autorizzazione esplicita a pubblicare
il caso e cliente collaborativo. Scegliere un progetto con problema leggibile e
narrazione verificabile, non applicare sconti indiscriminati.

### Visura AI controllata

- partire dal JSON grezzo;
- dichiarare dati pubblici e assenza di revisione inclusa;
- misurare tempi AI, tempi umani, supporto e percorso successivo;
- non raccogliere dati privati non necessari;
- sospendere/modificare il pilot se il supporto supera il margine.

**Decisione presa**: massimo 2–3 lavori importanti/mese; fino a 10 solo con
flusso AI automatizzato e revisione umana. Il funnel deve qualificare, non
creare custom work illimitato a basso margine.

## 8. Privacy, pagamenti e decisioni aperte

Prima di automatizzare dati: definire dati/finalità, base giuridica, privacy e
cookie, retention, servizi coinvolti, cancellazione, responsabilità e provider
di pagamento. Dati Search Console, Analytics, CRM, vendite e conversioni
richiedono accesso autorizzato e scope separato.

### Decisioni ancora aperte

1. Prezzo e condizioni della Visura AI grezza.
2. Prezzo, tempo, output e acquisto della revisione umana.
3. Scope, prezzo e capacità finale del Landing Sprint.
4. Costo reale e margine minimo per percorso.
5. Cliente e criteri del primo caso scontato.
6. Provider pagamento/rateizzazione e verifica legale.
7. Privacy, retention e strumenti effettivamente usati.
8. Analytics, eventi e baseline.
9. Presentazione futura del JSON: PDF, dashboard o altro.

## Prossimo passo consigliato

Prima di grafica o copy, definire un solo pilot: Visura AI grezza con input,
schema JSON, confini, prezzo e percorso verso revisione umana. Poi progettare
la pagina che la presenta.
