import type { Metadata } from 'next';
import { ArrowDownRight, ArrowRight, Check, CircleAlert, Mail, Wrench } from 'lucide-react';
import { pageMetadata } from '@/app/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Sito web e comunicazione commerciale | Giorgio Tedesco',
  description:
    'Un unico referente per chiarire l’offerta, scrivere le pagine e realizzare un sito che renda semplice capire cosa vendi e come contattarti.',
  path: '/it/demo-page-02/',
  locale: 'it_IT',
  robots: { index: false, follow: false },
});

const questions = [
  'Hai già un’offerta valida, ma dal sito non si capisce subito perché sceglierla.',
  'Vuoi realizzare o rifare il sito e preferisci un unico referente per contenuti e sviluppo.',
  'Ricevi richieste poco pertinenti perché servizi, destinatari e prossimo passo restano generici.',
];

const checks = [
  'definizione dell’offerta e delle informazioni che il cliente deve trovare',
  'struttura e testi delle pagine, con inviti all’azione coerenti con il percorso di acquisto',
  'design e sviluppo del sito, con attività, materiali e pubblicazione definiti nella proposta',
];

export default function DemoPage02() {
  return (
    <div className="text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white/70">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-ice-100 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-brand-orange/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 pb-20 pt-28 md:grid-cols-[1.15fr_.85fr] md:items-end md:px-10 md:pb-28">
          <div>
            <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-ice-300 bg-ice-50/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              Siti web e comunicazione commerciale
            </p>
            <h1 className="max-w-4xl text-[2.7rem] font-bold leading-[1.04] tracking-tight text-slate-900 sm:text-5xl md:text-7xl">
              Un sito che presenta bene la tua offerta e rende più semplice la vendita.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:mt-8 sm:text-lg sm:leading-8 md:text-xl">
              Se cerchi qualcuno che segua sito e contenuti, lavoro direttamente con te su offerta, testi, design e sviluppo.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
              <a href="mailto:hello@giorgiotedesco.it?subject=Valutazione%20sito%20e%20comunicazione" className="inline-flex items-center justify-center gap-3 rounded-xl bg-brand-blue px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-700">
                Richiedi una prima valutazione <ArrowRight size={18} />
              </a>
              <a href="#come-funziona" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-5 py-3.5 font-semibold text-slate-700 transition hover:border-brand-blue hover:text-brand-blue">
                Vedi cosa comprende <ArrowDownRight size={18} />
              </a>
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-500 sm:mt-5">Mandami il sito attuale o descrivi il progetto. Ti farò le domande necessarie.</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-900/10 md:p-8">
            <div className="mb-12 flex items-center justify-between text-xs font-semibold uppercase tracking-[.16em] text-brand-blue">
              <span>Quando serve un unico referente</span>
              <CircleAlert size={18} className="text-brand-orange" />
            </div>
            <p className="text-2xl font-semibold leading-tight tracking-tight text-slate-900 md:text-3xl">
              “Devo rifare il sito, ma prima devo capire come presentare meglio quello che vendo.”
            </p>
            <div className="mt-10 border-t border-slate-200 pt-5 text-sm leading-6 text-slate-600">
              Non devi arrivare con testi e struttura già pronti. Li definiamo insieme, poi realizzo il sito che deve contenerli.
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl bg-white px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-blue">È il servizio giusto se</p>
            <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">Sito e messaggio devono essere progettati insieme.</h2>
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
            <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-orange">Cosa posso seguire</p>
            <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-6xl">Offerta, pagine e sviluppo nello stesso progetto.</h2>
          </div>
          <div>
            <p className="max-w-2xl text-xl leading-8 text-slate-300">Partiamo da cosa vendi, a chi e quale richiesta vuoi ricevere. Da lì definiamo il messaggio, le pagine necessarie e il sito da realizzare, senza separare la comunicazione dalla parte tecnica.</p>
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
          <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-blue">Prima di iniziare</p>
          <h2 className="mt-5 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">Sai cosa verrà fatto, cosa serve da te e quanto costa.</h2>
        </div>
        <div className="rounded-2xl border border-ice-200 bg-ice-50 p-7 md:p-9">
          <Wrench className="text-brand-blue" size={25} />
          <p className="mt-8 text-xl leading-8 text-slate-700">La proposta definisce obiettivo, pagine, attività incluse e materiali da preparare. Prezzo e tempi dipendono dal progetto e vengono indicati prima di iniziare.</p>
          <p className="mt-8 border-t border-ice-200 pt-5 text-sm leading-6 text-slate-600">Se il sito attuale può essere migliorato, non è necessario rifarlo. Se invece limita il progetto, ti spiego cosa cambierei e perché.</p>
        </div>
      </section>

      <section className="border-t border-ice-200 bg-ice-50 pb-28 md:pb-0">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 pt-14 md:flex-row md:items-end md:justify-between md:px-10 md:py-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-blue">Il prossimo passo</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">Mandami il sito attuale o descrivimi cosa devi mettere online.</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">Indicami cosa vendi, chi vuoi raggiungere, cosa hai già e quale richiesta vuoi ricevere. Ti rispondo con le domande necessarie per valutare il progetto e preparare una proposta.</p>
          </div>
          <a href="mailto:hello@giorgiotedesco.it?subject=Valutazione%20sito%20e%20comunicazione" className="inline-flex shrink-0 items-center justify-center gap-3 rounded-xl bg-brand-blue px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-700"><Mail size={18} /> Richiedi la valutazione</a>
        </div>
      </section>
    </div>
  );
}
