---
slug: una-pipeline-ai-privacy-first-per-cercare-lavoro
title: Come ho progettato una pipeline AI privacy-first per cercare lavoro nell'estate 2024
description: "Oltre il web scraping: una pipeline intelligente e rispettosa della privacy per una ricerca di lavoro mirata."
category: sullo-sviluppo-web
tags: ["typescript", "supabase", "playwright", "ollama", "small LLM", "embedding LLM", "redis", "Tradotto da Inglese"]
translationKey: how-i-engineered-my-job-search-with-a-privacy-first-ai-pipeline-in-2024-summer
datePublished: "2026-02-01T09:00:00+08:00"
dateModified: "2026-02-01T09:00:00+08:00"
---

## Oltre il web scraping: una pipeline intelligente e privacy-first per una ricerca di lavoro mirata

Nel competitivo mercato tecnologico di oggi, la differenza tra un ingegnere software e una persona capace di risolvere davvero i problemi sta nel saper orchestrare strumenti diversi per creare valore concreto. Di recente ho costruito un sistema completo per ottimizzare la mia ricerca di lavoro: dai dati grezzi delle fonti istituzionali fino a un'analisi semantica approfondita con l'AI locale. Selezionando con attenzione lo stack e ottimizzando ogni richiesta, ho eseguito l'intero processo di estrazione e arricchimento dei dati con una spesa di appena 0,7 €.

## L'architettura: asincrona, a fasi e resiliente

Dato il peso del rendering nel browser (Playwright) e dell'inferenza AI (Ollama), ho progettato una pipeline asincrona divisa in checkpoint chiari. Ho adottato la filosofia «un clic, un controllo, si procede»: ogni fase salva il proprio stato in Supabase e attende un via libera manuale prima di continuare. Così proteggo l'integrità dei dati e limito il rischio di esaurire le risorse.

### 1. Estrazione precisa dei dati con Playwright

Il primo passo è stato estrarre un elenco mirato di aziende dal Registro delle Imprese ufficiale.

**La difficoltà:** navigare portali istituzionali con autenticazione complessa e sessioni protette.

**L'approccio:** ho combinato Playwright con una tecnica man-in-the-middle (MITM). Intercettando i token di sessione durante un accesso manuale, lo script poteva operare con un'identità valida senza dover automatizzare flussi di login fragili.

**Il risultato:** migliaia di numeri di partita IVA verificati e ragioni sociali sono stati indicizzati direttamente in Supabase.

### 2. Arricchimento in più passaggi con Brave Search

La partita IVA è solo il punto di partenza. Sfruttando le operazioni asincrone di Node.js, ho orchestrato l'API di Brave Search per una ricerca in due passaggi:

* **Passaggio 1:** trovare il sito ufficiale di ogni azienda.
* **Passaggio 2:** individuare le sezioni «Careers» o «Lavora con noi», eliminando i risultati superflui. I dati venivano riconciliati in tempo reale su Supabase, associando ogni azienda alla propria presenza online.

### 3. Analisi visiva e valutazione semantica con Ollama

È qui che la pipeline passa dalla semplice automazione a una ricerca «intelligente», grazie a LLM locali che tutelano la privacy e riducono i costi:

**Evidenze visive:** Playwright acquisisce uno screenshot ad alta risoluzione della homepage di ogni azienda.

**Ollama Vision:** un modello visivo analizza l'immagine per classificare il settore dell'azienda, lo stack tecnologico percepito e il posizionamento sul mercato.

**Embedding e valutazione:** le descrizioni vengono trasformate in vettori e confrontate con il mio CV usando un modello locale di embedding. Ollama assegna poi un punteggio semantico di compatibilità da 1 a 100, mettendo in evidenza le opportunità più vicine alle mie competenze.

### 4. Il fattore umano: qualità prima dell'automazione

Nonostante le capacità della pipeline, ho scelto di non automatizzare l'invio della candidatura.

L'obiettivo non era inviare spam ai recruiter, ma trovare l'opportunità giusta. Il sistema mi mostra una lista ristretta di aziende con i punteggi più alti; poi intervengo di persona, scrivo messaggi su misura e cerco di entrare in sintonia con la missione dell'azienda. L'automazione si occupa della parte più pesante della ricerca, così posso concentrarmi sul rapporto umano.

### Lo stack tecnologico in breve

* **Playwright e TypeScript:** automazione e intercettazione del traffico.
* **Ollama:** visione, embedding e valutazione semantica locale (senza costi API).
* **Redis:** gestione efficiente delle code per le attività asincrone più pesanti.
* **Supabase:** database relazionale per stato, checkpoint e vettori.
* **Docker:** containerizzazione per ambienti AI e browser riproducibili.

## Conclusione

L'ingegneria moderna consiste nel costruire strumenti che riducono la complessità senza sacrificare l'autenticità. Questa architettura mostra come un approccio «privacy-first» possa affrontare problemi complessi sui dati, mantenendo la persona al centro delle decisioni che contano davvero.

***Sei un recruiter o un tech lead e cerchi un ingegnere capace di affrontare la complessità e scalare i processi con precisione? Connettiamoci su LinkedIn!***

**Nota:** *Questo articolo è stato scritto con l'assistenza dell'AI per migliorarne la chiarezza, l'ottimizzazione SEO e il tono professionale, in linea con la filosofia di «ingegneria aumentata» descritta nel progetto.*
