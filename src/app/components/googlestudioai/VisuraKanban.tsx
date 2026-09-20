'use client';

import { Check, Copy, Phone, Send, Smartphone, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import QRCode from 'qrcode';
import { FormEvent, useEffect, useState } from 'react';
import { submitVisuraAiRequest, trackVisuraExperiment } from '@/app/lib/visura-ai-experiment';

type Step = 1 | 2 | 3;

const panelClass = 'w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8';

type VisuraKanbanProps = {
  experimentId?: string;
  idPrefix?: string;
  mode?: 'visura' | 'website-service';
  sectionId?: string;
  serviceType?: string;
  variantId?: string;
};

export default function VisuraKanban({
  experimentId,
  idPrefix = 'visura-ai',
  mode = 'visura',
  sectionId = 'avvia-visura',
  serviceType = 'visura-ai',
  variantId,
}: VisuraKanbanProps) {
  const [step, setStep] = useState<Step>(1);
  const [websiteAvailability, setWebsiteAvailability] = useState('has-site');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [interventionType, setInterventionType] = useState('Valutare prima di investire');
  const [intendedOutcome, setIntendedOutcome] = useState('');
  const [fullName, setFullName] = useState('');
  const [noSiteContext, setNoSiteContext] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [urlError, setUrlError] = useState('');
  const [contactError, setContactError] = useState('');
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [isCodeCopied, setIsCodeCopied] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(false);
  const [isRequestConfirmed, setIsRequestConfirmed] = useState(false);
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const [requestError, setRequestError] = useState('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const isWebsiteService = mode === 'website-service';
  const fieldId = (name: string) => `${idPrefix}-${name}`;

  useEffect(() => {
    if (isWebsiteService || !discountCode || !isRequestConfirmed) return;

    void QRCode.toDataURL(discountCode, {
      width: 512,
      margin: 1,
      color: { dark: '#2563eb', light: '#ffffff' },
    }).then(setQrCodeDataUrl);
  }, [discountCode, isRequestConfirmed, isWebsiteService]);

  const submitWebsite = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (websiteAvailability !== 'has-site') {
      setUrlError('Seleziona come vuoi iniziare.');
      return;
    }
    if (!interventionType) {
      setUrlError('Seleziona il tipo di intervento che stai valutando.');
      return;
    }

    try {
      const url = new URL(websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`);
      if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Unsupported protocol');
      setUrlError('');
      setStep(2);
    } catch {
      setUrlError('Inserisci un indirizzo valido, ad esempio esempio.it.');
    }
  };

  const selectWebsiteAvailability = (value: string) => {
    setWebsiteAvailability(value);
    setUrlError('');
    if (value === 'no-site') setStep(2);
  };

  const copyDiscountCode = async () => {
    if (!discountCode) return;
    await navigator.clipboard?.writeText(discountCode);
    setIsCodeCopied(true);
  };

  const submitPhone = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!fullName.trim()) {
      setContactError('Inserisci nome e cognome.');
      return;
    }
    if (websiteAvailability === 'no-site' && !noSiteContext.trim()) {
      setContactError('Racconta brevemente la tua attività e cosa vorresti realizzare.');
      return;
    }
    if (phoneNumber.replace(/\D/g, '').length < 8) {
      setContactError('Inserisci un numero di cellulare valido.');
      return;
    }
    setContactError('');
    setStep(3);
  };

  const confirmRequest = async () => {
    if (!privacyAccepted) return;
    const generatedDiscountCode = crypto.randomUUID();
    setIsSubmittingRequest(true);
    setRequestError('');

    try {
      await submitVisuraAiRequest({
        websiteAvailability,
        websiteUrl,
        interventionType,
        intendedOutcome,
        fullName,
        noSiteContext,
        phoneNumber,
        privacyAccepted,
        marketingAccepted,
        discountCode: generatedDiscountCode,
      }, variantId, { experimentId, serviceType });
      setDiscountCode(generatedDiscountCode);
      setIsRequestConfirmed(true);
      trackVisuraExperiment('visura_start', variantId, { experimentId, serviceType });
    } catch {
      setRequestError('Non è stato possibile inviare la richiesta. Riprova tra poco.');
    } finally {
      setIsSubmittingRequest(false);
    }
  };

  return (
    <section id={sectionId} data-experiment-id={experimentId} data-service-type={serviceType} data-variant-id={variantId} tabIndex={-1} className="scroll-mt-24 overflow-x-hidden border-y border-slate-200 bg-transparent py-12 outline-none sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="w-full lg:max-w-2xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-slate-500">{isWebsiteService ? 'Valuta il sito attuale' : 'Avvia una diagnosi preliminare'}</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{isWebsiteService ? 'Partiamo dal sito e dall’obiettivo commerciale.' : 'Un passaggio alla volta, con le informazioni che servono.'}</h2>
        </div>

        <div className="mt-8 grid w-full min-w-0 gap-4 md:mt-10 md:grid-cols-4">
          <motion.article layout transition={{ type: 'spring', stiffness: 280, damping: 30 }} className={`${panelClass} ${step === 1 ? 'md:col-span-3 md:row-span-2' : 'md:col-span-1'}`}>
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="font-mono text-xs font-medium tracking-[0.16em] text-brand-blue">01</p>
                <h3 className="mt-3 text-xl font-bold text-slate-900">Indica il sito</h3>
              </div>
              {step > 1 && <Check size={20} className="text-brand-blue" aria-label="Scelta iniziale completata" />}
            </div>

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.form key="website-form" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} onSubmit={submitWebsite} className="mt-6">
                  <label htmlFor={fieldId('website-availability')} className="block text-sm font-medium text-slate-800">Come vuoi iniziare?</label>
                  <select id={fieldId('website-availability')} value={websiteAvailability} onChange={(event) => selectWebsiteAvailability(event.target.value)} className="select mt-2 w-full border-slate-300 bg-white text-slate-900 focus:border-brand-blue focus:outline-none">
                    <option value="" disabled>Seleziona un’opzione</option>
                    <option value="has-site">Inserisci un sito internet</option>
                    <option value="no-site">Non ho un sito internet</option>
                  </select>

                  {websiteAvailability === 'has-site' && <div className="mt-5">
                    <label htmlFor={fieldId('url')} className="sr-only">Indirizzo del sito</label>
                    <div className={`flex items-center rounded-xl border bg-white p-1.5 ${urlError ? 'border-red-500' : 'border-slate-300 focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-blue-100'}`}>
                      <input id={fieldId('url')} type="text" inputMode="url" autoComplete="url" value={websiteUrl} onChange={(event) => setWebsiteUrl(event.target.value)} placeholder="esempio.it" className="min-w-0 flex-1 bg-transparent px-3 py-2 text-lg text-slate-900 outline-none placeholder:text-slate-400" />
                      <button type="submit" aria-label="Avvia la diagnosi" className="btn btn-square border-none bg-brand-blue text-white hover:bg-blue-700">
                        <Send size={18} />
                      </button>
                    </div>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:items-stretch">
                      <div>
                        <label htmlFor={fieldId('intervention-type')} className="block text-sm font-medium text-slate-800">Intervento che stai valutando</label>
                        <select id={fieldId('intervention-type')} value={interventionType} onChange={(event) => setInterventionType(event.target.value)} className="select mt-2 w-full border-slate-300 bg-white text-slate-900 focus:border-brand-blue focus:outline-none">
                          <option value="" disabled>Seleziona un’opzione</option>
                          <option value="Rendere più chiara l’offerta">Rendere più chiara l’offerta</option>
                          <option value="Migliorare sito o landing">Migliorare sito o landing</option>
                          <option value="Capire la visibilità SEO">Capire la visibilità SEO</option>
                          <option value="Valutare prima di investire">Valutare prima di investire</option>
                        </select>
                        <p className="mt-4 text-sm leading-relaxed text-slate-600">Partiamo dalle pagine e dai segnali che sono già pubblici.</p>
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor={fieldId('intended-outcome')} className="block text-sm font-medium text-slate-800">Cosa speri di ottenere? <span className="font-normal text-slate-500">(facoltativo)</span></label>
                        <textarea id={fieldId('intended-outcome')} value={intendedOutcome} onChange={(event) => setIntendedOutcome(event.target.value)} placeholder="Più richieste, messaggio più chiaro…" rows={4} className="textarea mt-2 min-h-32 w-full flex-1 resize-y border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-brand-blue focus:outline-none" />
                      </div>
                    </div>
                  </div>}
                  {urlError && <p className="mt-2 text-sm text-red-700">{urlError}</p>}
                </motion.form>
              ) : (
                <motion.div key="website-done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 space-y-2 text-sm leading-relaxed text-slate-600">
                  <p className="break-all">{websiteAvailability === 'no-site' ? 'Nessun sito indicato' : websiteUrl}</p>
                  {interventionType && <p>{interventionType}</p>}
                  {intendedOutcome && <p>{intendedOutcome}</p>}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>

          <motion.article layout transition={{ type: 'spring', stiffness: 280, damping: 30 }} className={`${panelClass} ${step === 1 ? 'md:col-start-4 md:row-start-1' : step === 2 ? 'md:col-span-2' : 'md:col-start-1 md:row-start-2'} ${step < 2 ? 'opacity-60' : ''}`}>
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="font-mono text-xs font-medium tracking-[0.16em] text-brand-blue">02</p>
                <h3 className="mt-3 text-xl font-bold text-slate-900">Avvia la diagnosi</h3>
              </div>
              {step > 2 ? <Check size={20} className="text-brand-blue" aria-label="Diagnosi avviata" /> : <Sparkles size={20} className="text-slate-400" aria-hidden="true" />}
            </div>

            <AnimatePresence mode="wait">
              {step === 2 ? (
                <motion.form key="phone-form" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} onSubmit={submitPhone} className="mt-6 max-w-xl">
                  <p className="leading-relaxed text-slate-600">{isWebsiteService ? 'Lascia i tuoi riferimenti: userò queste informazioni per inquadrare il sito, l’offerta e la richiesta che vuoi ricevere.' : 'La diagnosi preliminare è avviata. Lascia i tuoi riferimenti: ti ricontatterò via call per inquadrare i segnali emersi e il contesto della tua impresa.'}</p>
                  <label htmlFor={fieldId('fullname')} className="mt-6 block font-medium text-slate-800">Nome e cognome</label>
                  <input id={fieldId('fullname')} type="text" autoComplete="name" required value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Mario Rossi" className="input mt-3 w-full border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-brand-blue focus:outline-none" />
                  {websiteAvailability === 'no-site' && <div className="mt-5">
                    <label htmlFor={fieldId('no-site-context')} className="block font-medium text-slate-800">Raccontami brevemente cosa fai e cosa vorresti realizzare</label>
                    <textarea id={fieldId('no-site-context')} required value={noSiteContext} onChange={(event) => setNoSiteContext(event.target.value)} rows={4} placeholder="Settore, attività, obiettivo o esigenza iniziale…" className="textarea mt-3 min-h-32 w-full resize-y border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-brand-blue focus:outline-none" />
                  </div>}
                  <label htmlFor={fieldId('phone')} className="mt-5 block font-medium text-slate-800">Numero di cellulare</label>
                  <div className={`mt-3 flex items-center rounded-xl border bg-white p-1.5 ${contactError ? 'border-red-500' : 'border-slate-300 focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-blue-100'}`}>
                    <Phone size={18} className="ml-3 text-slate-500" aria-hidden="true" />
                    <input id={fieldId('phone')} type="tel" inputMode="tel" autoComplete="tel" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} placeholder="333 123 4567" className="min-w-0 flex-1 bg-transparent px-3 py-2 text-lg text-slate-900 outline-none placeholder:text-slate-400" />
                    <button type="submit" className="btn border-none bg-brand-blue px-5 font-bold text-white hover:bg-blue-700">Continua</button>
                  </div>
                  {contactError && <p className="mt-2 text-sm text-red-700">{contactError}</p>}
                </motion.form>
              ) : step > 2 ? (
                <motion.p key="phone-done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 text-sm text-slate-600">Numero inserito. In attesa della conferma finale.</motion.p>
              ) : (
                <motion.p key="phone-waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 text-sm leading-relaxed text-slate-500">Si attiva dopo l’invio del sito.</motion.p>
              )}
            </AnimatePresence>
          </motion.article>

          <motion.article layout transition={{ type: 'spring', stiffness: 280, damping: 30 }} className={`${panelClass} ${step === 1 ? 'md:col-start-4 md:row-start-2' : step === 2 ? 'md:col-span-1' : 'md:col-start-2 md:row-span-2 md:col-span-3'} ${step < 2 ? 'opacity-60' : ''}`}>
            <div>
              <p className="font-mono text-xs font-medium tracking-[0.16em] text-brand-blue">03</p>
              <h3 className="mt-3 text-xl font-bold text-slate-900">{isRequestConfirmed ? 'Grazie. Riceverai un aggiornamento entro 72 ore dalla conferma.' : isWebsiteService ? 'Conferma la richiesta' : 'Conferma per avviare la diagnosi'}</h3>
            </div>
            <AnimatePresence mode="wait">
              {step === 3 ? (
                <motion.div key="discount-code" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                  {!isRequestConfirmed && <p className="text-sm leading-relaxed text-slate-600">{isWebsiteService ? 'La richiesta non è ancora stata inviata. Autorizza il trattamento necessario e conferma per procedere.' : 'Nessuna diagnosi è stata ancora avviata. Per procedere, autorizza il trattamento necessario alla richiesta e invia la conferma.'}</p>}
                  {!isRequestConfirmed && <div className="mt-5 space-y-3 border-t border-slate-200 pt-5 text-sm leading-relaxed text-slate-600">
                    <label className="flex cursor-pointer items-start gap-3">
                      <input type="checkbox" checked={privacyAccepted} onChange={(event) => setPrivacyAccepted(event.target.checked)} className="checkbox checkbox-sm mt-0.5 border-slate-400 [--chkbg:var(--color-brand-blue)] [--chkfg:white]" />
                      <span>Ho letto l’informativa privacy e autorizzo il trattamento di nome, URL o descrizione dell’attività e numero di cellulare per gestire questa richiesta e ricontattarmi.</span>
                    </label>
                    <label className="flex cursor-pointer items-start gap-3">
                      <input type="checkbox" checked={marketingAccepted} onChange={(event) => setMarketingAccepted(event.target.checked)} className="checkbox checkbox-sm mt-0.5 border-slate-400 [--chkbg:var(--color-brand-blue)] [--chkfg:white]" />
                      <span>Desidero ricevere, facoltativamente, comunicazioni su servizi e iniziative di Giorgio Tedesco.</span>
                    </label>
                  </div>}

                  {!isRequestConfirmed ? (
                    <button type="button" onClick={confirmRequest} disabled={!privacyAccepted || isSubmittingRequest} className="btn mt-5 border-none bg-brand-blue font-bold text-white hover:bg-blue-700 disabled:bg-slate-300">{isSubmittingRequest ? 'Invio in corso…' : isWebsiteService ? 'Invia la richiesta' : 'Avvia diagnosi preliminare'}</button>
                  ) : (
                    <div className="mt-6">
                      <p className="flex items-center gap-2 text-sm font-medium text-brand-blue"><Check size={16} /> Richiesta confermata in questa sessione.</p>
                      {!isWebsiteService && <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-4">
                        <div className="aspect-video overflow-hidden rounded-xl bg-slate-950 lg:col-span-3">
                          <iframe
                            className="h-full w-full"
                            src="https://www.youtube-nocookie.com/embed/INMeCbjnAfE"
                            title="Video placeholder della Visura AI"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          />
                        </div>
                        <div className="flex min-w-0 flex-col justify-between rounded-xl bg-brand-blue p-4 text-white lg:self-stretch">
                          <div className="min-w-0">
                            <p className="font-mono text-xs uppercase tracking-[0.14em] text-blue-100">Codice sconto</p>
                            <p className="mt-1 truncate font-mono text-sm tracking-[0.08em]" title={discountCode ?? undefined}>{discountCode}</p>
                          </div>
                          {qrCodeDataUrl && <Image src={qrCodeDataUrl} alt="QR code del codice sconto" width={512} height={512} unoptimized className="my-4 aspect-square w-full rounded-lg bg-white p-2" />}
                          <div className="grid gap-2">
                            <button type="button" onClick={copyDiscountCode} className="btn btn-sm w-full border-white/40 bg-transparent text-white hover:border-white hover:bg-blue-700"><Copy size={15} /> {isCodeCopied ? 'Copiato' : 'Copia codice'}</button>
                            <a href={`sms:${phoneNumber.replace(/\D/g, '')}?body=${encodeURIComponent(`Il tuo codice sconto Visura AI: ${discountCode}`)}`} className="btn btn-sm w-full border-white/40 bg-transparent text-white hover:border-white hover:bg-blue-700"><Smartphone size={15} /> Invia a cellulare</a>
                          </div>
                        </div>
                      </div>}
                      {isWebsiteService && <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-600">Ho ricevuto sito, obiettivo e riferimenti. Li userò per preparare il primo confronto sul progetto.</p>}
                    </div>
                  )}
                  {requestError && <p role="alert" className="mt-3 text-sm leading-relaxed text-red-700">{requestError}</p>}
                </motion.div>
              ) : step === 2 ? (
                <motion.p key="thanks-waiting-phone" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 text-sm leading-relaxed text-slate-500">{isWebsiteService ? 'Inserisci i tuoi riferimenti per continuare.' : 'Inserisci il cellulare per ricevere il codice sconto.'}</motion.p>
              ) : (
                <motion.p key="thanks-waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 text-sm leading-relaxed text-slate-500">Si attiva quando invii il sito.</motion.p>
              )}
            </AnimatePresence>
          </motion.article>
        </div>

        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-500">{isWebsiteService ? 'La valutazione parte dalle informazioni che invii e dai contenuti pubblici del sito. Non accede a traffico, vendite, Analytics o Search Console senza autorizzazione.' : 'La visura osserva segnali pubblici. Non accede a traffico, vendite, Analytics o Search Console senza autorizzazione.'}</p>
      </div>
    </section>
  );
}
