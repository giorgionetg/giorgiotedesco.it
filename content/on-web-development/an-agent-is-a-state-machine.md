---
slug: an-agent-is-a-state-machine
title: "An Agent Is a State Machine"
description: "Part I — From LangGraph to XState, before calling the LLM."
category: on-web-development
tags: ["devs", "llm", "agent", "LangGraph", "XState", "local-first"]
image: patrick-fore-0_AX9pab940-unsplash.jpg
datePublished: "2026-05-07T09:00:00+01:00"
dateModified: "2026-06-01T09:00:00+01:00"
---

# The new ABC of AI

A deep dive into developing trhough Agent AI and LLM, from LangGraph to XState.

**TLDR**: Agent Programming it's very expensive. It cost like a fullstack engineer.

*My nature of self thaught observer of life, says me always, almost every day: You should understand.*

## Last months
In the last months, as almost every developer already did, I tried different cool tools (Claude Code, Google Antigravity, Codex, Open Code).
Every day loops you try to figure out, like in a orientering environment game, the flow/route that all developers are going on.

I made some questions around my space after observed almost all developers are using this kind of tools (some time screenshooting, copy and pase, sharing IP files through the cloud). It means drop by drop if all employees shares IP file and projects, your business is at risk.

**The real mitigation of this risky behaviour it's building agent inside the business through small LLM and frameworks**.

## An Overview of Tools (local-first)

At this time we have cloud tools (but we skip): **not your key, not your money**. We may translate: **not local-first, not your IP**. And we could continue in a loop.

With this principle in mind, the next tools and framework are completely open source and you can use in any project you want:

- **Mastra** [website](https://mastra.ai/docs), very high level framework like **n8n**.
- **LangGraph** [website](https://www.langchain.com/langgraph), more deep framework.
- **XState** [website](https://stately.ai/docs), very low level, it's a Machine State framework.

The standard of open source has changed across these years, to maintainig the project it self needs to sell to survive. Any tools we look are splitted and some parts of every projects has a cloud part (like a SaaS, paying per months or per user). The problem is always: not local-first, not your IP.

At the end, we need still to code our idea without losing IP. To make this happen we need to work as always: local-first.

## What is an Agent and what is an LLM?

A Large Language Model is not the main component of an Agent. After working and looking inside Hugging Face and Ollama you understand that a LLM is a new component we need to understand to work with. Without Understanding you don't have any control.

An Agent, it is a **State Machine** first with some extra datas in it. LLM and chats are inputs and events in a State Machine. An LLM alone doesn't work, doesn't plan, it's just advanced completer.

A LLM or an Agent doesn't solve any problem without a human input. If the input is generic, the output is generic. Some years ago there was an experiment with a RPG game and Machine Learning. What discovered was that: more real human go through the winning, more Machine go high until the AI win.

Anyway an Agent is a State Machine that's why I include on the list XState. It brings a full State Machine on your hands.
And what is LangGraph? It's a State Machine with a close connection with LLM and a lot of components for Agent. That's all.

| *I'm currently working in some legacy antipattern code. No one Agent with small LLM is ready to work with.*

It means we can create low level deterministic agent easily working only with XState without other frameworks, but we need to build up our pipeline to work.
Why we are going to this route? Because small LLM needs more guardrails and human context and planning. You know what you want, you know the architecture.

In a real common context you can use an Agent like:

- Claude Code
- Antigravity
- others

Those are avant-garde LLM with millions of contex. While if we need to work with legacy business client code with IP and owner property: we need to change *POV* in our context because we are working here with small LLM like Gemma4 or Qwen6.

In this scenario, instead to **chat**/**analyzing**/**plan** and **execute**, we need to work with the main goal/idea already in mind: building our custom agent.

## Managing Types
Before writing any behavior, we need to define the shape of the information that moves inside the agent.

In an agentic system, types are not only a TypeScript feature. They are architectural boundaries. A Message is not just a chat message: it can be a human input, a system instruction, an AI response, a tool result or an artifact produced during the execution. The agent does not live in a generic chatbox; it lives inside a controlled memory.

The first minimal memory is the message history. Then we need an AgentState, which represents the context carried by the machine, and an AgentEvent, which describes what can happen to the agent.

This is the first important constraint: the agent does not act in free space. It reacts to typed events over a known state.

```ts
// libs.ts
// Types & Prompts

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

## Core Agent
Now we can transform these types into a real runtime.

The machine is still very small, but it already contains the core idea: when a message.add event arrives, the agent updates its internal memory in a deterministic way. There is no LLM call here yet, and this is intentional.

Before adding intelligence, tools, planning or code generation, we need a stable execution model. The state machine is the skeleton. The LLM will become only one actor inside this system, not the whole system itself.

This is where XState becomes interesting: it gives us a low-level deterministic layer around a future non-deterministic component. We can decide what events are allowed, how the state changes, and where the agent can go next.

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

## Actor
A machine definition is not running by itself. It describes the possible behavior, but it needs an actor to become alive.

The actor is the runtime instance of the agent. When we start it, the initial context is created. When we send an event, the machine evaluates it, executes the related action and produces a new snapshot of the state.

In this example, sending a human message does not call an LLM yet. It only proves that our agent has a memory, receives events and updates itself correctly. This is the smallest useful unit before building a real agent loop with model calls, tool execution and conditional routing.

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

## Conclusion — Part I

At this point we have not built a full agent yet.

And this is exactly the point.

Before calling an LLM, before adding RAG, before connecting tools, before letting the system write or refactor code, we already need a structure: messages, memory, events, state and a deterministic runtime.

This first step is small, but it changes the way we look at agents.

An agent is not a prompt.
An agent is not a chat window.
An agent is not only an LLM with tools.

An agent is a controlled execution system where the LLM is only one component inside a larger architecture.

This is why XState is interesting in this context. It forces us to describe what can happen, when it can happen, and how the internal state changes. It gives shape to the parts of the agent that should not be left to probability.

In this first part we only built the skeleton: typed messages, internal memory, a state machine and a running actor.

In the next part I want to move closer to what makes frameworks like LangGraph useful in real-world agent development: files, external context, RAG, guardrails, tool execution and the moment where the LLM finally enters the machine.

Because the real question is not only how to call a model.

The real question is: how much architecture do we need around the model before we can trust it?
