---
slug: come-e-fatto-questo-sito
title: Come è fatto questo sito
description: Una breve guida per scoprire cosa c'è dietro questo sito.
category: sullo-sviluppo-web
tags: ["frontend", "backend", "JavaScript", "CSS", "HTML", "Tradotto da Inglese"]
translationKey: how-this-website-is-made
datePublished: "2023-09-14T09:00:00+08:00"
dateModified: "2020-12-22T09:00:00+08:00"
---

## In breve

Per seguire questa piccola storia dovrò entrare in alcuni argomenti, ma cercherò di mantenerla semplice. Per prima cosa distinguiamo due concetti:

- frontend;
- backend.

Di solito le tecnologie sono diverse, anche se nell'ultimo decennio molte cose sono cambiate.

### Frontend

Che cosa significa **frontend**? È il codice che viene eseguito sul tuo dispositivo, nel browser: costruisce l'interfaccia grafica, gestisce le validazioni e organizza i contenuti nella pagina che stai visitando. In questo sito ci sono, per esempio, il codice della barra di navigazione, quello che gestisce il parallasse e mostra l'immagine principale sotto la barra, e infine il contenuto che stai leggendo.

Le tecnologie principali sono:

- HTML (HyperText Markup Language);
- CSS (Cascading Style Sheets);
- JavaScript (non è Java e non è Flash).

### Backend

Il **backend** comprende invece le tecnologie che lavorano in background ed eseguono operazioni sul server. Prendiamo il classico modulo di contatto: dal frontend compili email, nome e messaggio, poi invii i dati al server. Sul server un programma li salva e manda un'email all'amministratore.

Tra le tecnologie usate per il backend ci sono:

- PHP;
- Java;
- Go;
- Python;
- anche JavaScript;
- e molte altre.

Questo codice non è visibile nel browser: gira su un computer sempre online che ospita il sito. I siti più semplici, per esempio quelli di piccole aziende, spesso condividono un unico server con migliaia di altri siti.

Perché non parlare del progetto open source più famoso, WordPress? Nel 2020 lo consideravo un modo ormai datato di costruire siti. Il problema di WordPress, secondo la mia esperienza, è la sicurezza e la gestione corretta dell'installazione. Nel frattempo sono nate molte tecnologie web interessanti e oggi un modo sicuro di realizzare un sito è mantenerlo **statico**.

### Questo sito

Questo sito è realizzato con JavaScript, Node.js, React e Next.js, oltre ad altri framework e librerie frontend.
