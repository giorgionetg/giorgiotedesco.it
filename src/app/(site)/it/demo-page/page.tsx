import type { Metadata } from 'next';
import { ArrowDownRight, ArrowRight, Check, CircleAlert, Mail, Wrench } from 'lucide-react';
import { pageMetadata } from '@/app/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Audit tecnico per prodotti web | Giorgio Tedesco',
  description:
    'Un audit tecnico per ridurre il costo delle modifiche e decidere dove investire sul tuo prodotto web.',
  path: '/it/demo-page/',
  locale: 'it_IT',
  robots: { index: false, follow: false },
});

const questions = [
  'Una correzione prevista in poche ore finisce per coinvolgere frontend, backend e infrastruttura.',
  'Il team rimanda alcune richieste perché nessuno riesce a prevedere l’impatto della modifica.',
  'State discutendo un nuovo sviluppo senza sapere quanto dell’attuale prodotto può essere recuperato.',
];

const checks = [
  'dove il team perde tempo ogni volta che modifica o corregge il prodotto',
  'quali dipendenze possono essere eliminate, isolate o lasciate come sono',
  'quali interventi affrontare per primi e quali dati servono per stimarli',
];

export default function DemoPage() {
  return (
    <div className="text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white/70">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-ice-100 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-brand-orange/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 pb-20 pt-28 md:grid-cols-[1.15fr_.85fr] md:items-end md:px-10 md:pb-28">
          <div>
            <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-ice-300 bg-ice-50/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              Audit tecnico per software e prodotti web
            </p>
            <h1 className="max-w-4xl text-[2.7rem] font-bold leading-[1.04] tracking-tight text-slate-900 sm:text-5xl md:text-7xl">
              Riduci tempi e costi delle modifiche al tuo prodotto web.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:mt-8 sm:text-lg sm:leading-8 md:text-xl">
              Analizzo codice, dipendenze e rilascio. Ricevi un piano con le priorità tecniche per decidere i prossimi investimenti.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
              <a href="mailto:hello@giorgiotedesco.it?subject=Audit%20tecnico%20prodotto%20web" className="inline-flex items-center justify-center gap-3 rounded-xl bg-brand-blue px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-700">
                Richiedi l’audit tecnico <ArrowRight size={18} />
              </a>
              <a href="#come-funziona" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-5 py-3.5 font-semibold text-slate-700 transition hover:border-brand-blue hover:text-brand-blue">
                Vedi cosa ricevi <ArrowDownRight size={18} />
              </a>
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-500 sm:mt-5">Nel primo confronto valutiamo prodotto, problema e materiale disponibile.</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-900/10 md:p-8">
            <div className="mb-12 flex items-center justify-between text-xs font-semibold uppercase tracking-[.16em] text-brand-blue">
              <span>Il costo che si ripete</span>
              <CircleAlert size={18} className="text-brand-orange" />
            </div>
            <p className="text-2xl font-semibold leading-tight tracking-tight text-slate-900 md:text-3xl">
              “Una modifica che sembrava semplice ha coinvolto tre persone e bloccato il rilascio per giorni.”
            </p>
            <div className="mt-10 border-t border-slate-200 pt-5 text-sm leading-6 text-slate-600">
              L’audit individua dove si accumula il lavoro e quali interventi possono ridurre quel costo nelle modifiche successive.
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl bg-white px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-blue">Quando richiederlo</p>
            <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">L’audit serve quando il costo delle modifiche non è più prevedibile.</h2>
          </div>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {questions.map((question) => (
              <p key={question} className="py-6 text-xl leading-8 text-slate-600 md:text-2xl">{question}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="come-funziona" className="bg-slate-900 text-white">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:grid-cols-[.8fr_1.2fr] md:px-10 md:py-28">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-orange">Cosa analizzo</p>
            <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-6xl">Seguo le modifiche che costano di più e individuo cosa rallenta il team.</h2>
          </div>
          <div>
            <p className="max-w-2xl text-xl leading-8 text-slate-300">Parto dai casi segnalati da chi lavora sul prodotto. Verifico codice, API, autenticazione, infrastruttura e passaggi di responsabilità per capire quali problemi si ripresentano a ogni rilascio.</p>
            <ul className="mt-10 space-y-5">
              {checks.map((check) => (
                <li key={check} className="flex gap-4 border-t border-slate-700 pt-5 text-lg leading-7 text-slate-100"><Check className="mt-1 shrink-0 text-brand-orange" size={20} />{check}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-14 bg-white px-6 py-20 md:grid-cols-[1.1fr_.9fr] md:px-10 md:py-28">
        <div>
          <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-blue">Il risultato dell’audit</p>
          <h2 className="mt-5 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">Un piano tecnico che puoi trasformare in attività, stime e preventivi.</h2>
        </div>
        <div className="rounded-2xl border border-ice-200 bg-ice-50 p-7 md:p-9">
          <Wrench className="text-brand-blue" size={25} />
          <p className="mt-8 text-xl leading-8 text-slate-700">Per ogni intervento trovi il problema operativo a cui risponde, le parti coinvolte, le dipendenze e le verifiche necessarie prima della stima.</p>
          <p className="mt-8 border-t border-ice-200 pt-5 text-sm leading-6 text-slate-600">Le priorità ti aiutano a decidere cosa finanziare subito, cosa programmare e cosa lasciare invariato.</p>
        </div>
      </section>

      <section className="border-t border-ice-200 bg-ice-50 pb-28 md:pb-0">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 pt-14 md:flex-row md:items-end md:justify-between md:px-10 md:py-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-blue">Il prossimo passo</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">Dimmi quale modifica continua a costarti più del previsto.</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">Scrivimi cosa volevate ottenere, quante persone sono state coinvolte e quanto lavoro ha richiesto. Ti confermo se l’audit è il passo adatto.</p>
          </div>
          <a href="mailto:hello@giorgiotedesco.it?subject=Audit%20tecnico%20prodotto%20web" className="inline-flex shrink-0 items-center justify-center gap-3 rounded-xl bg-brand-blue px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-700"><Mail size={18} /> Richiedi l’audit</a>
        </div>
      </section>
    </div>
  );
}
