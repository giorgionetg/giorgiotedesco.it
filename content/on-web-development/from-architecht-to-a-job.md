---
slug: from-architecht-to-a-job
title: From Architecht to a Job
description: Beyond Web Scraping; Engineering an Intelligent, Privacy-First Pipeline for Targeted Job Hunting
category: on-web-development
tags: ["typescript", "supabase", "playwright", "ollama", "small LLM", "embedding LLM", "redis"]
image: patrick-fore-0_AX9pab940-unsplash.jpg
datePublished: "2026-02-01T09:00:00+08:00"
dateModified: "2026-02-01T09:00:00+08:00"
---

## Beyond Web Scraping: Engineering an Intelligent, Privacy-First Pipeline for Targeted Job Hunting

In today’s competitive tech market, the difference between a software engineer and a true problem solver lies in the ability to orchestrate diverse tools to create real-world value. I recently built an end-to-end system to optimize my job search—transitioning from raw institutional data to deep semantic analysis using local AI. By carefully selecting my stack and optimizing every request, I managed to run the entire data extraction and enrichment process for just €0.7.

## The Architecture: Async, Staged, and Resilient

Given the resource-heavy nature of browser rendering (Playwright) and AI inference (Ollama), I designed the system with an asynchronous pipeline divided into clear checkpoints. I adopted a "1 click, 1 check, let's go" philosophy: each stage saves its state to Supabase and waits for a manual green light before proceeding. This ensures data integrity and prevents resource exhaustion.

### 1. High-Precision Data Extraction with Playwright

The first step was extracting a targeted list of companies from the official "Registro delle Imprese."

**The Challenge**: Navigating institutional portals with complex authentication and protected sessions.

**The Approach**: I used Playwright combined with a Man-In-The-Middle (MITM) technique. By intercepting session tokens during a manual login, the script could operate with a valid identity without the overhead of automating brittle login flows.

**Result**: Thousands of verified VAT numbers and company names were indexed directly into Supabase.

### 2. Multi-Pass Enrichment via Brave Search

A VAT number is only the starting point. Leveraging Node.js's asynchronous capabilities, I orchestrated the Brave Search API for a two-pass discovery process:

* **Pass 1**: Finding the official Home Page URL for each entity.

* **Pass 2**: Specifically identifying "Career" or "Work with us" sections to skip unnecessary noise. All results were reconciled in real-time on Supabase, mapping each company to its specific online footprint.

### 3. Visual Understanding and Semantic Scoring with Ollama

This is where the pipeline moves from simple automation to "intelligent" discovery, utilizing local LLMs for privacy and cost-efficiency:

**Visual Evidence**: Playwright captures a high-resolution screenshot of each homepage.

**Ollama Vision**: A Vision model analyzes the image to categorize the company’s industry, perceived tech stack, and market positioning.

**Embedding & Scoring**: These descriptions are vectorized and compared against my CV using a local embedding model. Ollama then assigns a semantic "fit score" (1-100), highlighting the opportunities most aligned with my expertise.

### 4. The Human Element: Quality Over Automation

Despite the power of the pipeline, I deliberately chose not to automate the final application step.
The goal of this project wasn't to spam recruiters, but to find the perfect match. The system presents me with a curated, high-scoring shortlist; I then step in personally to write tailored messages and engage with the company’s mission. Automation handles the heavy lifting of research, allowing me to focus entirely on the human connection.

### Tech Stack at a Glance

* **Playwright & TypeScript**: Core automation and traffic interception.

* **Ollama**: Vision, Embedding, and local semantic scoring (Zero API costs).

* **Redis**: Efficient queue management for heavy asynchronous tasks.

* **Supabase**: Relational database for state management, checkpoints and vectors.

* **Docker**: Containerization for consistent AI and browser environments.

## Conclusion

Modern engineering is about building tools that filter complexity without sacrificing authenticity. This architecture demonstrates how a "Privacy-First" approach can solve complex data problems while keeping the human-in-the-loop for the decisions that truly matter.

***Are you a recruiter or tech lead looking for an engineer who knows how to hack complexity and scale processes with precision? Let’s connect on LinkedIn!***

**Meta Note**: *This article was drafted with AI assistance to ensure clarity, SEO optimization, and a professional tone, reflecting the same ***"Augmented Engineering"*** philosophy described in the project.*