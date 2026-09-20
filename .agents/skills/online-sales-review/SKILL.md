---
name: online-sales-review
description: Review websites, landing pages, and conversion paths as parts of an online selling process. Use to diagnose how traffic intent, qualification, offer presentation, trust, objections, CTA, and follow-up help or obstruct a buying decision. Report evidence, strengths, gaps, hypotheses, and priorities; do not rewrite or modify the site unless explicitly asked.
metadata:
  short-description: Audit the website as a sales process
---

# Online Sales Review

Treat the website as an active part of selling, not as a brochure that precedes the real sales conversation. A visitor may arrive from search, advertising, referral, or an existing relationship with a need and a level of purchase intent already formed. Review whether the page recognises that intent and helps the visitor take the next reasonable decision.

This skill is diagnostic by default. Inspect and report. Do not rewrite copy, modify layouts, change files, invent offers, or apply recommendations unless the user explicitly authorises implementation.

For the underlying sales-to-web model, read [references/web-selling-model.md](references/web-selling-model.md).

## Establish the review context

Determine or mark as unknown:

```yaml
page_or_path:
traffic_source: organic_search | paid_search | social | referral | direct | mixed | unknown
likely_query_or_ad_promise:
visitor_intent:
visitor_awareness:
decision_stage:
offer:
desired_action:
next_human_or_automated_step:
available_evidence:
analytics_available:
```

Do not assume that every visitor is cold, needs basic education, or should immediately book a call. A visitor coming from a specific search or advertisement may already know the category, problem, price range, or type of supplier they want.

If the source, query, advertisement, offer, or desired action is unknown, state how that limits the diagnosis. Do not fill those gaps with a generic buyer persona.

## Choose the review scope

Use the narrowest scope that answers the request:

- **Entry-page review:** assess one page against a specific source and intent.
- **Path review:** assess the sequence from entry page to CTA, form, confirmation, contact, or sale.
- **Site-wide sales review:** assess how multiple pages serve different intents and decision stages.

Do not turn a page review into a full marketing strategy unless the user asks for it.

## Review the selling work performed by the page

Assess whether the page:

1. **Matches the entry promise.** The headline and first screen continue the query, advertisement, referral, or expectation that brought the visitor there.
2. **Creates recognition.** The visitor can identify their situation, desired result, or reason for looking without decoding generic marketing language.
3. **Qualifies both sides.** The page clarifies who the offer is for, what kind of need it addresses, relevant boundaries, and whether the professional is a plausible fit.
4. **Presents the offer.** The visitor can understand what is being sold, what is included, how it works, what changes for them, and what remains uncertain.
5. **Builds justified trust.** Claims are supported by relevant proof, responsibility, process, examples, terms, or limits rather than adjectives.
6. **Handles objections before contact.** The page addresses the concerns that reasonably block the next step, such as price, commitment, timing, risk, ownership, support, compatibility, or credibility.
7. **Asks for the right action.** The CTA matches the visitor's decision stage and states what happens next.
8. **Continues after the CTA.** Forms, confirmations, emails, calls, proposals, and follow-up preserve context and move the decision forward.

Do not require every page to perform all eight jobs. Judge the page by its role in the path. A search landing page, service page, case study, pricing page, and contact page have different responsibilities.

## Separate evidence from inference

Classify findings as:

- `observed`: directly visible in the page, path, analytics, advertisement, query, or supplied material;
- `supported_inference`: a conclusion reasonably derived from observed evidence;
- `hypothesis`: plausible but requiring analytics, interviews, search terms, campaign data, or testing;
- `unknown`: information required for a confident judgment but unavailable.

Never describe an unmeasured CTA, headline, section, or page as converting well or poorly. Static inspection can identify friction and missing selling work; it cannot prove conversion performance.

## Diagnose causes, not decoration

Look for commercial problems such as:

- mismatch between search or ad promise and landing-page message;
- a page that explains the professional but not the visitor's decision;
- a service category without a defined offer;
- benefits without mechanism or proof;
- proof unrelated to the visitor's actual risk;
- important objections deferred entirely to a call;
- CTA commitment that is too high or too vague for the current stage;
- pages that attract unqualified enquiries because scope and boundaries are absent;
- dead ends after forms, emails, downloads, or booking;
- competing pages or CTAs serving the same intent without a clear reason.

Do not equate more persuasion, more urgency, more sections, or more CTAs with better selling. Recommend only what helps the visitor make the next informed decision.

## Output contract

Lead with the commercial diagnosis, not a process log. Use this structure when applicable:

```yaml
review_context:
sales_job_of_page:
what_is_working:
commercial_blockers:
missing_selling_work:
objection_gaps:
qualification_quality:
offer_clarity:
trust_evidence:
cta_and_next_step:
hypotheses_to_verify:
priority_actions:
```

For each material finding include:

```yaml
finding:
status: observed | supported_inference | hypothesis | unknown
evidence:
effect_on_decision:
priority: now | next | later
recommended_direction:
```

Always report what the page is already doing correctly. Do not create a deficit-only audit. Preserve effective elements and distinguish them from areas that require evidence before changing.

Avoid universal numeric scores. Use a score only when the user requests one and the rubric is explicit. Do not fabricate conversion benchmarks, traffic quality, customer intent, or commercial outcomes.

## Boundaries with other work

This skill diagnoses the online selling process. It does not automatically write the replacement copy or redesign the interface.

After the diagnosis:

- use a commercial-copy skill only when the user asks to rewrite or create copy;
- use a design skill only when the user asks to change layout or interface;
- use analytics, advertising, SEO, CRM, or customer-research evidence when available before claiming performance;
- preserve the original page while testing variants when the user asks for comparison.

Stop after the audit when the user requested discovery only.
