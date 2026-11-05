import type { Metadata } from 'next';
import { Video } from 'lucide-react';
import BlogHeader from '@/app/components/googlestudioai/BlogHeader';

export const metadata: Metadata = {
  title: 'Privacy | Giorgio Tedesco',
  description: 'Informativa privacy di GiorgioTedesco.it.',
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  const name = process.env.NEXT_PUBLIC_PRIVACY_CONTROLLER_NAME?.trim();
  const email = process.env.NEXT_PUBLIC_PRIVACY_EMAIL?.trim();

  return <div lang="it">
    <BlogHeader title="Informativa privacy" category="Privacy e dati personali" showReadingTime={false} />
    <div className="container mx-auto mb-20 max-w-7xl px-6">
      <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12">
        <article className="min-w-0 rounded-lg bg-white/95 px-6 py-10 shadow-lg backdrop-blur-sm sm:px-10 sm:py-12 lg:px-12">
          <div className="prose prose-lg prose-slate mx-auto max-w-4xl prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-brand-blue">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue">Bozza in preparazione · <a href="/privacy/" lang="en">English</a></p>
            <p>Questa pagina è in preparazione. Qui troverai le informazioni su come vengono trattati i dati personali quando visiti il sito o utilizzi i servizi collegati.</p>
            {(name || email) && <section aria-labelledby="privacy-controller">
              <h2 id="privacy-controller">Titolare del trattamento</h2>
              {name && <p>{name}</p>}
              {email && <p>Per informazioni sui tuoi dati puoi scrivere a <a href={`mailto:${email}`}>{email}</a>.</p>}
            </section>}
            <section aria-labelledby="privacy-requests">
              <h2 id="privacy-requests">Richieste di contatto e servizi</h2>
              <p>Quando invii una richiesta tramite i moduli, posso ricevere i dati che inserisci, come nome, indirizzo email o numero di telefono, indirizzo del sito e informazioni sul progetto o sull’attività. Le informazioni richieste cambiano in base al modulo utilizzato.</p>
              <p>Uso questi dati per esaminare la richiesta, risponderti e valutare con te un eventuale servizio. I dati inviati ai moduli collegati a PocketBase sono gestiti tramite pb.giorgiotedesco.it. Se non fornisci i dati necessari, potrei non essere in grado di rispondere o gestire la richiesta.</p>
            </section>
            <section aria-labelledby="privacy-infrastructure">
              <h2 id="privacy-infrastructure">Servizi e Infrastruttura</h2>
              <div className="overflow-x-auto">
                <table>
                  <thead><tr><th>Servizio</th><th>Indirizzo internet</th><th>Hosting / VPS</th><th>Link</th></tr></thead>
                  <tbody>
                    <tr><td>Sito web</td><td>giorgiotedesco.it</td><td>GitHub Pages</td><td><a href="https://github.com/giorgionetg/giorgiotedesco.it">Repository</a></td></tr>
                    <tr><td>PocketBase</td><td>pb.giorgiotedesco.it</td><td>Hetzner</td><td><a href="https://www.hetzner.com/">Hetzner</a></td></tr>
                    <tr><td>Umami</td><td>get.giorgiotedesco.it</td><td>DigitalOcean</td><td><a href="https://www.digitalocean.com/">DigitalOcean</a></td></tr>
                    <tr><td>dex-id.it</td><td>dex-id.it</td><td>Hetzner e cloud privato</td><td><a href="https://www.hetzner.com/">Hetzner</a></td></tr>
                  </tbody>
                </table>
              </div>
              <p>Il codice e i contenuti principali del sito sono disponibili nella repository indicata nella tabella.</p>
              <p>GitHub informa che, quando visiti un sito pubblicato con GitHub Pages, il tuo indirizzo IP viene registrato e conservato per finalità di sicurezza, anche se non hai effettuato l’accesso a GitHub. Puoi consultare la <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages">documentazione di GitHub Pages</a>.</p>
              <p>I dati inviati attraverso i moduli e le altre funzionalità che usano il database vengono gestiti da PocketBase. Le statistiche del sito utilizzano Umami.</p>
              <p>Le informazioni sui dati raccolti, sulle finalità, sui tempi di conservazione e sui fornitori coinvolti sono ancora da verificare e completare.</p>
            </section>
            <section aria-labelledby="privacy-tracking">
              <h2 id="privacy-tracking">Cookie e altri dati nel browser</h2>
              <p>Oltre ai cookie, alcune funzionalità possono usare altri spazi di memoria del browser, come il localStorage e IndexedDB. Le informazioni in questa sezione sono in corso di verifica e saranno completate con le durate e i dettagli dei singoli strumenti.</p>
              <h3>Statistiche con Umami</h3>
              <p>Con il tuo consenso, in produzione il sito carica Umami da get.giorgiotedesco.it per raccogliere statistiche sulle visite e su alcune interazioni. La configurazione dell’installazione e gli eventuali dati memorizzati nel browser sono da verificare.</p>
              <p>I clic dagli articoli del blog ai servizi suggeriti vengono misurati con il percorso dell’articolo, la lingua e l’identificativo del servizio. Se Umami non è ancora caricato, il clic resta in attesa nella scheda del browser fino al caricamento della pagina successiva. Senza consenso alle statistiche non viene inviato alcun evento.</p>
              <h3>Esperimenti Visura AI</h3>
              <p>Con il tuo consenso alle statistiche, alcune pagine Visura AI usano il localStorage del browser per salvare un identificativo denominato <code>visura-ai.visitor-id</code>. L’identificativo, la variante visualizzata e gli eventi di interazione vengono inviati a PocketBase per misurare gli esperimenti. Il codice non imposta una scadenza per questo dato nel browser; l’identificativo viene rimosso dal browser se revochi il consenso alle statistiche.</p>
              <h3>Le tue preferenze</h3>
              <p>La scelta sulle statistiche e sui contenuti esterni viene salvata nel browser con la chiave <code>privacy.preferences.v1</code>. Dopo 183 giorni viene richiesta nuovamente. Puoi modificarla in qualsiasi momento dal collegamento «Preferenze privacy» nel piè di pagina.</p>
              <h3>Accesso AT Protocol</h3>
              <p>La funzionalità di accesso utilizza una libreria che può conservare informazioni nel localStorage e in IndexedDB per gestire la sessione e il processo di autenticazione. I dati effettivamente memorizzati e le relative durate sono da verificare.</p>
              <h3>Servizi esterni</h3>
              <div className="overflow-x-auto">
                <table>
                  <thead><tr><th>Servizio</th><th>Utilizzo sul sito</th><th>Informazioni</th></tr></thead>
                  <tbody>
                    <tr><td>Cal.com</td><td>Lo script per le prenotazioni viene inizializzato quando apri la prenotazione e hai consentito i contenuti esterni.</td><td><a href="https://cal.com/privacy">Informativa Cal.com</a></td></tr>
                    <tr><td>YouTube</td><td>Alcune pagine possono incorporare video.</td><td><a href="https://policies.google.com/privacy?hl=it">Informativa Google</a></td></tr>
                    <tr><td>SuperSplat</td><td>Alcune pagine possono incorporare modelli 3D.</td><td><a href="https://superspl.at/">Sito del servizio</a></td></tr>
                    <tr><td>Hovod</td><td>Servizio raggiungibile su snack.sentica.io, ospitato sul computer locale del titolare.</td><td><a href="https://snack.sentica.io/">snack.sentica.io</a></td></tr>
                  </tbody>
                </table>
              </div>
              <p>I dati eventualmente memorizzati o raccolti da questi servizi, e le condizioni del loro caricamento, sono da verificare.</p>
              <p>La presenza, le finalità e la durata dei cookie e degli altri identificativi utilizzati dai servizi esterni saranno verificate anche durante la navigazione, l’accesso e l’interazione con i contenuti.</p>
            </section>
            <section aria-labelledby="privacy-rights">
              <h2 id="privacy-rights">I tuoi diritti</h2>
              <p>Nei casi previsti dal GDPR puoi chiedere l’accesso ai tuoi dati, la loro rettifica o cancellazione, la limitazione del trattamento, opporti al trattamento e richiedere la portabilità dei dati. Quando il trattamento si basa sul consenso, puoi revocarlo in qualsiasi momento: la revoca non pregiudica la liceità del trattamento precedente.</p>
              {email && <p>Per esercitare questi diritti puoi scrivere a <a href={`mailto:${email}`}>{email}</a>.</p>}
              <p>Puoi inoltre proporre reclamo al <a href="https://www.garanteprivacy.it/">Garante per la protezione dei dati personali</a> o a un’altra autorità di controllo competente.</p>
            </section>
          </div>
        </article>
        <aside aria-labelledby="presentation-title" className="w-full min-w-0 lg:sticky lg:top-24">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-orange">Conosciamoci</p>
          <h2 id="presentation-title" className="mt-2 text-xl font-bold tracking-tight text-slate-900">Una breve presentazione</h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex aspect-video items-center justify-center bg-slate-900 text-white" aria-hidden="true">
              <Video size={32} className="text-slate-400" />
            </div>
            <div className="p-5">
              <p className="font-semibold text-slate-900">Ciao, sono Giorgio</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">Qui troverai presto un video in cui mi presento.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>;
}
