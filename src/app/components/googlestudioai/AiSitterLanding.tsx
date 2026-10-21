'use client';

import { Check, Send } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import {
  aiSitterExperiment,
  AiSitterAttribution,
  AiSitterLead,
  AiSitterVariant,
  submitAiSitterLead,
  trackAiSitterEvent,
} from '@/app/lib/ai-sitter-config';

const tools = ['ChatGPT', 'Claude', 'Codex', 'Cursor', 'Lovable', 'Bolt', 'WordPress + AI', 'Altro'];

function readAttribution(variant: AiSitterVariant): AiSitterAttribution {
  const query = new URLSearchParams(window.location.search);
  const referrer = document.referrer;
  const referrerHost = (() => {
    try {
      return referrer ? new URL(referrer).hostname : '';
    } catch {
      return '';
    }
  })();
  const isInternal = referrerHost === window.location.hostname;
  const isLinkedIn = referrerHost.includes('linkedin.com');
  const isSearch = /google\.|bing\.|duckduckgo\.|search\.yahoo\./i.test(referrerHost);

  return {
    utm_source: query.get('utm_source') || (isInternal ? 'giorgiotedesco.it' : isLinkedIn ? 'linkedin' : isSearch ? referrerHost : referrerHost || 'direct'),
    utm_medium: query.get('utm_medium') || (isInternal ? 'article' : isLinkedIn ? 'social' : isSearch ? 'organic' : referrerHost ? 'referral' : 'direct'),
    utm_campaign: query.get('utm_campaign') || '',
    utm_content: query.get('utm_content') || '',
    referrer,
    landing_variant: variant,
  };
}

export default function AiSitterLanding() {
  const [variant, setVariant] = useState<AiSitterVariant>(aiSitterExperiment.defaultVariant);
  const [attribution, setAttribution] = useState<AiSitterAttribution | null>(null);
  const [lead, setLead] = useState<AiSitterLead>({
    projectType: '',
    tools: [],
    completionState: '',
    desiredOutcome: '',
    description: '',
    projectUrl: '',
    email: '',
    name: '',
    consentService: false,
    consentMarketing: false,
  });
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const hasStarted = useRef(false);
  const copy = aiSitterExperiment.variants[variant];

  useEffect(() => {
    const queryVariant = new URLSearchParams(window.location.search).get('variant');
    const selectedVariant: AiSitterVariant = queryVariant === 'B' ? 'B' : 'A';
    setVariant(selectedVariant);
    const initialAttribution = readAttribution(selectedVariant);
    setAttribution(initialAttribution);
    trackAiSitterEvent('ai_sitter_view', { variant: selectedVariant });
  }, []);

  const updateLead = <K extends keyof AiSitterLead>(key: K, value: AiSitterLead[K]) => {
    setLead((current) => ({ ...current, [key]: value }));
  };

  const handleFormStart = () => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    trackAiSitterEvent('ai_sitter_form_start', { variant });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (!lead.tools.length) {
      setError('Seleziona almeno uno strumento, oppure indica “Altro” nella descrizione.');
      trackAiSitterEvent('ai_sitter_form_error', { variant, reason: 'tools_required' });
      return;
    }
    if (!attribution) return;

    const projectUrl = lead.projectUrl.trim();
    let normalizedUrl = '';
    if (projectUrl) {
      try {
        const parsedUrl = new URL(projectUrl.startsWith('http') ? projectUrl : `https://${projectUrl}`);
        if (!['http:', 'https:'].includes(parsedUrl.protocol)) throw new Error('Invalid protocol');
        normalizedUrl = parsedUrl.toString();
      } catch {
        setError('Controlla l’indirizzo del progetto: per esempio, esempio.it.');
        trackAiSitterEvent('ai_sitter_form_error', { variant, reason: 'invalid_project_url' });
        return;
      }
    }

    setSubmitting(true);
    const submittedLead = { ...lead, projectUrl: normalizedUrl };
    try {
      await submitAiSitterLead(submittedLead, attribution);
      setSent(true);
      trackAiSitterEvent('ai_sitter_form_submit', { variant, project_type: lead.projectType });
    } catch {
      setError('Non sono riuscito a inviare la richiesta. Riprova tra poco.');
      trackAiSitterEvent('ai_sitter_form_error', { variant, reason: 'submission_failed' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div lang="it" className="text-slate-900">
      <section className="border-b border-slate-200 bg-white/90 px-5 pb-16 pt-28 sm:px-8 sm:pb-24 sm:pt-32">
        <div className="mx-auto max-w-6xl">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue">AI Sitter <span className="text-slate-400">/ Giorgio Tedesco</span></p>
            <h1 className="mt-6 max-w-5xl text-4xl font-bold leading-[1.06] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">{copy.headline}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{copy.description}</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="max-w-lg">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-brand-orange">Una cosa alla volta</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Doveva essere una modifica veloce.</h2>
          </div>
          <div className="max-w-2xl space-y-4 text-lg leading-8 text-slate-600">
            <p>Il testo è a posto. Su mobile si rompe. Sistemi il menu; il form non invia. L’AI propone una correzione, poi un’altra. Ogni volta devi controllare cosa è cambiato e se il resto funziona ancora.</p>
            <p>La scheda resta aperta. La riprendi appena hai un momento.</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 px-5 py-20 text-white sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-orange-300">Una conseguenza</p>
          <h2 className="mt-5 max-w-5xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">L’AI non ti ha tolto il lavoro.<br /><span className="text-orange-300">Te ne ha dato un altro.</span></h2>
          <div className="mt-10 grid gap-8 border-t border-slate-700 pt-8 md:grid-cols-[1fr_1fr] md:gap-16">
            <p className="text-xl leading-8 text-slate-200">Qualcuno deve controllare quello che produce. Correggere quello che non torna. Decidere quando basta.</p>
            <p className="text-xl font-semibold leading-8 text-white">Quel qualcuno non devi essere per forza tu.</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-brand-orange">Non vendo prompt</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Gli agenti li sai già usare.</h2>
          </div>
          <div className="max-w-2xl space-y-4 text-lg leading-8 text-slate-600">
            <p>Il mio lavoro comincia quando ti accorgi che stai seguendo il lavoro dei tuoi agenti: controlli, correggi, riparti. E il progetto è ancora lì.</p>
            <p>Lavoro sul web da vent’anni. So distinguere un output convincente da qualcosa che puoi davvero mettere online.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue">Per ora, sul web</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Siti quasi finiti. Landing. Deploy che non partono.</h2>
          </div>
          <div className="max-w-2xl space-y-4 text-lg leading-8 text-slate-600">
            <p>Funzioni che “dovrebbero funzionare”. Repository cresciuti conversazione dopo conversazione.</p>
            <p>È il mio campo da vent’anni. So quando un risultato è pronto per essere messo online.</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div><p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-brand-orange">Come funziona</p><h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Lasciamoli lavorare.</h2></div>
          <div className="max-w-2xl space-y-4 text-lg leading-8 text-slate-600">
            <p>Tu mi mostri dove sei arrivato e dove vuoi arrivare. Io prendo in mano il progetto, lavoro con gli strumenti che servono e intervengo quando gli agenti non bastano.</p>
            <p>Quando torno da te non ho un altro prompt. <strong className="text-slate-900">Ho qualcosa da farti vedere.</strong></p>
          </div>
        </div>
      </section>

      <section id="ai-sitter-form" className="scroll-mt-24 border-t border-slate-200 bg-white px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue">AI Sitter / Giorgio Tedesco</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Fammi vedere cosa hai combinato.</h2>
            <p className="mt-4 leading-7 text-slate-600">Un link, un repository o due righe sul punto in cui ti sei fermato. Guardiamo da lì.</p>
            <p className="mt-5 text-sm leading-6 text-slate-500">Puoi inviare il link del progetto. Non inserire password, chiavi API o altri dati di accesso.</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            {sent ? (
              <div role="status" className="py-8">
                <Check size={28} className="text-brand-blue" aria-hidden="true" />
                <h3 className="mt-4 text-2xl font-bold text-slate-900">È arrivata. La guardo io.</h3>
                <p className="mt-3 leading-7 text-slate-600">Controllo quello che mi hai mandato e ti rispondo io.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} onFocusCapture={handleFormStart} className="space-y-6">
                <div>
                  <label htmlFor="ai-sitter-project-type" className="block text-sm font-semibold text-slate-800">Che cosa stavi cercando di fare?</label>
                  <select id="ai-sitter-project-type" required value={lead.projectType} onChange={(event) => updateLead('projectType', event.target.value)} className="select mt-2 w-full border-slate-300 bg-white text-slate-900">
                    <option value="" disabled>Seleziona un’opzione</option>
                    <option value="website">Sito web</option><option value="landing-page">Landing page</option><option value="application">Applicazione</option><option value="automation">Automazione</option><option value="other">Altro</option>
                  </select>
                </div>

                <fieldset>
                  <legend className="text-sm font-semibold text-slate-800">Con quali strumenti hai iniziato?</legend>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {tools.map((tool) => (
                      <label key={tool} className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
                        <input type="checkbox" checked={lead.tools.includes(tool)} onChange={(event) => updateLead('tools', event.target.checked ? [...lead.tools, tool] : lead.tools.filter((item) => item !== tool))} className="checkbox checkbox-sm border-slate-400 [--chkbg:var(--color-brand-blue)] [--chkfg:white]" />
                        {tool}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="ai-sitter-completion" className="block text-sm font-semibold text-slate-800">Quanto è completo secondo te?</label>
                  <select id="ai-sitter-completion" required value={lead.completionState} onChange={(event) => updateLead('completionState', event.target.value)} className="select mt-2 w-full border-slate-300 bg-white text-slate-900">
                    <option value="" disabled>Seleziona un’opzione</option>
                    <option value="just-started">Ho appena iniziato</option><option value="25">Circa 25%</option><option value="50">Circa 50%</option><option value="almost-finished">È quasi finito</option><option value="broken">Era finito, poi si è rotto</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="ai-sitter-outcome" className="block text-sm font-semibold text-slate-800">Che cosa vuoi ottenere?</label>
                  <select id="ai-sitter-outcome" required value={lead.desiredOutcome} onChange={(event) => updateLead('desiredOutcome', event.target.value)} className="select mt-2 w-full border-slate-300 bg-white text-slate-900">
                    <option value="" disabled>Seleziona un’opzione</option>
                    <option value="unblock">Sbloccarmi</option><option value="understand-gaps">Capire cosa manca</option><option value="finish-together">Finirlo insieme</option><option value="delegate-completion">Delegare il completamento</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="ai-sitter-description" className="block text-sm font-semibold text-slate-800">Dove si ferma il progetto?</label>
                  <textarea id="ai-sitter-description" required rows={4} value={lead.description} onChange={(event) => updateLead('description', event.target.value)} placeholder="Che cosa hai già fatto e cosa succede adesso?" className="textarea mt-2 min-h-32 w-full resize-y border-slate-300 bg-white text-slate-900 placeholder:text-slate-400" />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="ai-sitter-project-url" className="block text-sm font-semibold text-slate-800">URL del progetto <span className="font-normal text-slate-500">(facoltativo)</span></label>
                    <input id="ai-sitter-project-url" type="text" inputMode="url" value={lead.projectUrl} onChange={(event) => updateLead('projectUrl', event.target.value)} placeholder="esempio.it o URL del repository" className="input mt-2 w-full border-slate-300 bg-white text-slate-900 placeholder:text-slate-400" />
                  </div>
                  <div>
                    <label htmlFor="ai-sitter-name" className="block text-sm font-semibold text-slate-800">Nome <span className="font-normal text-slate-500">(facoltativo)</span></label>
                    <input id="ai-sitter-name" type="text" autoComplete="name" value={lead.name} onChange={(event) => updateLead('name', event.target.value)} className="input mt-2 w-full border-slate-300 bg-white text-slate-900" />
                  </div>
                </div>

                <div>
                  <label htmlFor="ai-sitter-email" className="block text-sm font-semibold text-slate-800">Email</label>
                  <input id="ai-sitter-email" type="email" required autoComplete="email" value={lead.email} onChange={(event) => updateLead('email', event.target.value)} placeholder="nome@azienda.it" className="input mt-2 w-full border-slate-300 bg-white text-slate-900 placeholder:text-slate-400" />
                </div>

                <div className="space-y-3 border-t border-slate-200 pt-5 text-sm leading-6 text-slate-600">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input type="checkbox" required checked={lead.consentService} onChange={(event) => updateLead('consentService', event.target.checked)} className="checkbox checkbox-sm mt-0.5 shrink-0 border-slate-400 [--chkbg:var(--color-brand-blue)] [--chkfg:white]" />
                    <span>Acconsento all’uso dei dati inseriti per valutare il progetto e rispondere alla mia richiesta.</span>
                  </label>
                  <label className="flex cursor-pointer items-start gap-3">
                    <input type="checkbox" checked={lead.consentMarketing} onChange={(event) => updateLead('consentMarketing', event.target.checked)} className="checkbox checkbox-sm mt-0.5 shrink-0 border-slate-400 [--chkbg:var(--color-brand-blue)] [--chkfg:white]" />
                    <span>Desidero ricevere anche aggiornamenti su servizi e iniziative. (Facoltativo)</span>
                  </label>
                </div>

                {error && <p role="alert" className="text-sm leading-6 text-red-700">{error}</p>}
                <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-brand-blue px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-wait disabled:bg-slate-400">
                  {submitting ? 'Invio in corso…' : 'Fammi vedere cosa ho fatto'} <Send size={17} aria-hidden="true" />
                </button>
                <p className="text-xs leading-5 text-slate-500">La richiesta non ti impegna ad affidarmi il completamento.</p>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
