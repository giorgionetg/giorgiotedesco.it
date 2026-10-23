---
slug: un-agente-e-una-macchina-a-stati
title: Un agente è una macchina a stati
description: Parte I — Da LangGraph a XState, prima di chiamare il modello linguistico.
category: sullo-sviluppo-web
tags: ["devs", "llm", "agent", "LangGraph", "XState", "local-first", "Tradotto da Inglese"]
translationKey: an-agent-is-a-state-machine
image: /ai-images/chatgpt-20260601.png
datePublished: "2026-05-07T09:00:00+01:00"
dateModified: "2026-06-01T09:00:00+01:00"
---

# Un agente è una macchina a stati

**Parte I — Da LangGraph a XState, prima di chiamare il modello linguistico.**

Un approfondimento sullo sviluppo con agenti AI e LLM, da LangGraph a XState.

**In breve**: programmare agenti è costoso. Può costare quanto un ingegnere full-stack.

La mia natura di osservatore autodidatta della vita mi ripete sempre, quasi ogni giorno: devi capire.

## Gli ultimi mesi

Negli ultimi mesi, come ormai molti sviluppatori, ho provato diversi strumenti interessanti: Claude Code, Google Antigravity, Codex e Open Code. Ogni giorno cerchi di orientarti, come in un gioco ambientato in un labirinto, e capire quale percorso stanno seguendo gli sviluppatori.

Ho iniziato a farmi domande dopo aver osservato tanti sviluppatori usare strumenti di questo tipo: a volte fanno screenshot, copiano e incollano, condividono file IP attraverso il cloud. Se ogni dipendente condivide file IP e progetti, poco alla volta l'azienda si espone a un rischio.

**Una vera mitigazione consiste nel costruire agenti all'interno dell'azienda, usando modelli linguistici piccoli e framework.**

## Panoramica degli strumenti (local-first)

Per ora lasciamo da parte gli strumenti cloud: **se le chiavi non sono tue, i soldi non sono tuoi**. Possiamo parafrasarlo così: **se non lavori in locale, la proprietà intellettuale non è davvero tua**. E potremmo continuare a ripeterlo.

Con questo principio in mente, i seguenti strumenti e framework sono open source e si possono usare nei propri progetti:

- **Mastra** [sito](https://mastra.ai/docs), un framework di alto livello simile a **n8n**.
- **LangGraph** [sito](https://www.langchain.com/langgraph), un framework più approfondito.
- **XState** [sito](https://stately.ai/docs), un framework di macchine a stati di livello più basso.

Negli anni è cambiato il modo in cui si sostiene l'open source: per mantenere un progetto, spesso bisogna vendere qualcosa. Gli strumenti che esaminiamo sono divisi in componenti e alcuni includono una parte cloud, come un SaaS a pagamento mensile o per utente. Il problema resta sempre lo stesso: non è local-first, quindi la proprietà intellettuale non è tua.

Alla fine dobbiamo comunque realizzare le nostre idee senza perdere la proprietà intellettuale. Per riuscirci dobbiamo lavorare come abbiamo sempre fatto: local-first.

## Che cos'è un agente e che cos'è un LLM?

Un Large Language Model non è il componente principale di un agente. Dopo aver lavorato con Hugging Face e Ollama, capisci che un LLM è un componente nuovo che dobbiamo imparare a usare. Senza capirlo, non possiamo controllarlo.

Un agente è prima di tutto una **macchina a stati**, con alcuni dati aggiuntivi. L'LLM e le chat sono input ed eventi della macchina a stati. Un LLM da solo non lavora e non pianifica: è un completatore avanzato.

Un LLM o un agente non risolve un problema senza l'intervento umano. Se l'input è generico, anche l'output lo sarà. Anni fa è stato fatto un esperimento con un gioco di ruolo e il machine learning. Si osservò che, più persone reali si avvicinavano alla vittoria, più la macchina migliorava, finché l'AI riusciva a vincere.

Un agente è quindi una macchina a stati: per questo includo XState nell'elenco. Ti mette in mano una macchina a stati completa. E LangGraph? È una macchina a stati strettamente collegata agli LLM, con molti componenti per creare agenti. Tutto qui.

> In questo momento sto lavorando su codice legacy pieno di anti-pattern. Nessun agente basato su un modello piccolo è ancora pronto a lavorarci.

Possiamo creare facilmente agenti deterministici di basso livello con XState, senza altri framework, ma dobbiamo costruire la pipeline che li fa funzionare.

Perché scegliere questa strada? Perché i modelli piccoli hanno bisogno di più vincoli, contesto umano e pianificazione. Tu sai che cosa vuoi e conosci l'architettura.

In un contesto comune possiamo usare agenti come:

- Claude Code;
- Antigravity;
- altri strumenti simili.

Sono strumenti all'avanguardia, basati su LLM con milioni di token di contesto. Ma quando dobbiamo lavorare con codice aziendale legacy, contenente proprietà intellettuale riservata, dobbiamo cambiare prospettiva: qui lavoriamo con modelli piccoli come Gemma4 o Qwen6.

In questo scenario, invece di seguire il ciclo **chat / analisi / pianificazione / esecuzione**, dobbiamo avere già in mente l'obiettivo principale: costruire il nostro agente personalizzato.

## Gestire i tipi

Prima di scrivere un comportamento, dobbiamo definire la forma delle informazioni che attraversano l'agente.

In un sistema agentico, i tipi non sono soltanto una caratteristica di TypeScript: sono confini architetturali. Un messaggio non è solo un messaggio di chat. Può essere un input umano, un'istruzione di sistema, una risposta dell'AI, il risultato di uno strumento o un artefatto prodotto durante l'esecuzione. L'agente non vive in una chat generica: vive dentro una memoria controllata.

La memoria minima è la cronologia dei messaggi. Poi servono `AgentState`, che rappresenta il contesto mantenuto dalla macchina, e `AgentEvent`, che descrive ciò che può accadere all'agente.

Questo è il primo vincolo importante: l'agente non agisce nel vuoto. Reagisce a eventi tipizzati all'interno di uno stato noto.

```ts
// libs.ts
// Tipi e prompt

export type Message = {
    type: "HUMAN" | "AI" | "SYSTEM" | "TOOLS" | "ARTIFACTS";
    value: string;
    attachement?: string
    tool?: string;
    time?: number;
}

export type MessageMemory = {
    fullMessageHistory: Message[],
}

export type AgentState = {
    chat: MessageMemory
}

export type AgentEvent =
  | { type: "message.add"; message: Message }
  | { type: "agent.invoke" };

export const systemPrompt = `You are a helpful assistant that write code in PSR-12, PHP 8.5 with the best practices in mind.`;
```

## L'agente principale

Ora possiamo trasformare questi tipi in un runtime reale.

La macchina è ancora piccola, ma contiene già l'idea centrale: quando arriva un evento `message.add`, l'agente aggiorna la memoria interna in modo deterministico. Non c'è ancora una chiamata a un LLM, ed è una scelta intenzionale.

Prima di aggiungere intelligenza, strumenti, pianificazione o generazione di codice, serve un modello di esecuzione stabile. La macchina a stati è lo scheletro. L'LLM diventerà solo uno degli attori del sistema, non il sistema intero.

È qui che XState diventa interessante: offre un livello deterministico a cui affiancare in futuro un componente non deterministico. Possiamo decidere quali eventi sono ammessi, come cambia lo stato e dove può andare l'agente.

```ts
import { setup, assign } from 'xstate';
import type { AgentState, AgentEvent } from "./libs";
import { systemPrompt } from './libs';

const machine = setup({
  types: {
    context: {} as AgentState,
    events: {} as AgentEvent,
  },
  actions: {
    addMessage: assign({
      chat: ({ context, event }) => {

        if (event.type !== "message.add") {
          return context.chat;
        }

        return {
          fullMessageHistory: [
            ...context.chat.fullMessageHistory,
            event.message,
          ],
        };
      },
    }),
  },
}).createMachine({
  context: {
    chat: {
      fullMessageHistory: [
        {
          type: "SYSTEM",
          value: systemPrompt,
          time: Date.now(),
        },
      ],
    }
  },
  on: {
    "message.add": { actions: 'addMessage' },
  },
});
```

## L'attore

La definizione di una macchina non è ancora in esecuzione. Descrive i comportamenti possibili, ma serve un attore per renderla attiva.

L'attore è l'istanza runtime dell'agente. Quando lo avviamo, viene creato il contesto iniziale. Quando inviamo un evento, la macchina lo valuta, esegue l'azione associata e produce un nuovo snapshot dello stato.

In questo esempio, inviare un messaggio umano non chiama ancora un LLM. Serve solo a dimostrare che l'agente ha una memoria, riceve eventi e si aggiorna correttamente. È l'unità minima utile prima di costruire un ciclo reale con chiamate al modello, esecuzione di strumenti e instradamento condizionale.

```ts
const agent = createActor(agentMachine);

agent.start();

agent.send({
  type: "message.add",
  message: {
    type: "HUMAN",
    value: "Could you help me refactor this file?",
    time: Date.now(),
  },
});

```

## Conclusione — Parte I

A questo punto non abbiamo ancora costruito un agente completo.

Ed è proprio questo il punto.

Prima di chiamare un LLM, aggiungere RAG, collegare strumenti o permettere al sistema di scrivere e rifattorizzare codice, serve già una struttura: messaggi, memoria, eventi, stato e un runtime deterministico.

Questo primo passo è piccolo, ma cambia il modo in cui guardiamo agli agenti.

Un agente non è un prompt.
Un agente non è una finestra di chat.
Un agente non è solo un LLM con strumenti.

Un agente è un sistema di esecuzione controllato, in cui l'LLM è soltanto un componente di un'architettura più ampia.

In questo contesto XState è interessante perché ci costringe a descrivere cosa può accadere, quando può accadere e come cambia lo stato interno. Dà una forma agli elementi dell'agente che non dovrebbero essere lasciati alla probabilità.

In questa prima parte abbiamo costruito solo lo scheletro: messaggi tipizzati, memoria interna, una macchina a stati e un attore in esecuzione.

Nella prossima parte voglio avvicinarmi a ciò che rende utili nella pratica framework come LangGraph: file, contesto esterno, RAG, guardrail, esecuzione degli strumenti e il momento in cui l'LLM entra finalmente nella macchina.

Perché la vera domanda non è soltanto come chiamare un modello.

La vera domanda è: quanta architettura serve intorno al modello prima di potersi fidare?
