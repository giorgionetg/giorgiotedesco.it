import type { ReactNode } from 'react';
import { ArrowDownRight, ArrowRight, Check, CircleAlert, Mail } from 'lucide-react';
import SmoothScrollLink from './SmoothScrollLink';

const checks = [
  'chiarisco l’offerta e il percorso che porta alla richiesta',
  'scrivo e sviluppo le pagine necessarie, senza passaggi tra fornitori',
  'configuro le azioni da misurare e preparo l’integrazione con il framework proprietario',
];

type WebsiteServiceLandingProps = {
  leadForm?: ReactNode;
  primaryHref: string;
};

export default function WebsiteServiceLanding({
  leadForm,
  primaryHref,
}: WebsiteServiceLandingProps) {
  return (
    <div lang="it" className="text-slate-900">
      <section id="siti-web-hero" className="relative overflow-hidden border-b border-slate-200 bg-white/70">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-ice-100 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-brand-orange/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 pb-20 pt-28 md:grid-cols-[1.15fr_.85fr] md:items-end md:px-10 md:pb-28">
          <div>
            <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-ice-300 bg-ice-50/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              Siti commerciali per PMI e studi professionali
            </p>
            <h1 className="max-w-4xl text-[2.7rem] font-bold leading-[1.04] tracking-tight text-slate-900 sm:text-5xl md:text-7xl">
              Un sito che presenta bene la tua offerta e rende più semplice la vendita.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:mt-8 sm:text-lg sm:leading-8 md:text-xl">
              Seguo direttamente messaggio, pagine, sviluppo e misurazione. Un solo progetto, dall’offerta alla richiesta del cliente.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
              <SmoothScrollLink id="siti-web-hero-cta" data-umami-event="siti-web-hero-cta" href={primaryHref} className="inline-flex items-center justify-center gap-3 rounded-xl bg-brand-blue px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-700">
                Analizziamo il sito attuale <ArrowRight size={18} />
              </SmoothScrollLink>
              <SmoothScrollLink href="#come-funziona" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-5 py-3.5 font-semibold text-slate-700 transition hover:border-brand-blue hover:text-brand-blue">
                Come funziona <ArrowDownRight size={18} />
              </SmoothScrollLink>
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-500 sm:mt-5">Mandami il sito e dimmi quale richiesta dovrebbe aiutarti a ricevere.</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-900/10 md:p-8">
            <div className="mb-12 flex items-center justify-between text-xs font-semibold uppercase tracking-[.16em] text-brand-blue">
              <span>Il punto da chiarire</span>
              <CircleAlert size={18} className="text-brand-orange" />
            </div>
            <p className="text-2xl font-semibold leading-tight tracking-tight text-slate-900 md:text-3xl">
              “Il sito è online. Ma non sappiamo quali richieste porta né cosa conviene migliorare.”
            </p>
            <div className="mt-10 border-t border-slate-200 pt-5 text-sm leading-6 text-slate-600">
              Definiamo prima cosa deve ottenere il sito. Poi costruiamo pagine e misurazione intorno a quell’obiettivo.
            </div>
          </div>
        </div>
      </section>

      <section id="come-funziona" className="bg-slate-900 text-white">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:grid-cols-[.8fr_1.2fr] md:px-10 md:py-28">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-orange">Un unico lavoro</p>
            <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-6xl">Offerta, sito e dati devono parlare tra loro.</h2>
          </div>
          <div>
            <p className="max-w-2xl text-xl leading-8 text-slate-300">Sto sviluppando una base tecnica proprietaria per collegare contenuti, azioni misurate e richieste. Le funzioni già utilizzabili e quelle ancora in evoluzione vengono indicate nella proposta.</p>
            <ul className="mt-10 space-y-5">
              {checks.map((check) => (
                <li key={check} className="flex gap-4 border-t border-slate-700 pt-5 text-lg leading-7 text-slate-100"><Check className="mt-1 shrink-0 text-brand-orange" size={20} />{check}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {leadForm ?? <section className="border-t border-ice-200 bg-ice-50 pb-28 md:pb-0">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 pt-14 md:flex-row md:items-end md:justify-between md:px-10 md:py-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-blue">Il prossimo passo</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">Vediamo se il sito attuale può vendere meglio.</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">Indicami cosa vendi, chi vuoi raggiungere e quali contatti ricevi oggi. Ti chiederò ciò che serve per valutare il progetto.</p>
          </div>
          <a id="siti-web-final-cta" data-umami-event="siti-web-final-cta" href={primaryHref} className="inline-flex shrink-0 items-center justify-center gap-3 rounded-xl bg-brand-blue px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-700"><Mail size={18} /> Richiedi l’analisi</a>
        </div>
      </section>}
    </div>
  );
}
