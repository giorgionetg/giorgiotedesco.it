import type { Metadata } from 'next';
import { Video } from 'lucide-react';
import BlogHeader from '@/app/components/googlestudioai/BlogHeader';

export const metadata: Metadata = {
  title: 'Privacy | Giorgio Tedesco',
  description: 'Privacy notice for GiorgioTedesco.it.',
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  const name = process.env.NEXT_PUBLIC_PRIVACY_CONTROLLER_NAME?.trim();
  const email = process.env.NEXT_PUBLIC_PRIVACY_EMAIL?.trim();

  return <div lang="en">
    <BlogHeader title="Privacy notice" category="Privacy and personal data" showReadingTime={false} />
    <div className="container mx-auto mb-20 max-w-7xl px-6">
      <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12">
        <article className="min-w-0 rounded-lg bg-white/95 px-6 py-10 shadow-lg backdrop-blur-sm sm:px-10 sm:py-12 lg:px-12">
          <div className="prose prose-lg prose-slate mx-auto max-w-4xl prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-brand-blue">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue">Draft in progress · <a href="/it/privacy/" lang="it">Italiano</a></p>
            <p>This page is being prepared. It will explain how personal data is processed when you visit the site or use connected services.</p>
            {(name || email) && <section aria-labelledby="privacy-controller">
              <h2 id="privacy-controller">Data controller</h2>
              {name && <p>{name}</p>}
              {email && <p>For questions about your data, contact <a href={`mailto:${email}`}>{email}</a>.</p>}
            </section>}
            <section aria-labelledby="privacy-requests">
              <h2 id="privacy-requests">Contact and service requests</h2>
              <p>When you submit a form, I may receive the information you enter, such as your name, email address or phone number, website address, and details about your project or business. The information requested depends on the form.</p>
              <p>I use this information to review and respond to your request and discuss a possible service with you. Data submitted through forms connected to PocketBase is managed via pb.giorgiotedesco.it. Without the necessary information, I may be unable to respond or handle your request.</p>
            </section>
            <section aria-labelledby="privacy-newsletter">
              <h2 id="privacy-newsletter">Newsletter</h2>
              <p>If you subscribe from the homepage, your full name, email address and newsletter consent are sent to PocketBase at pb.giorgiotedesco.it to manage the subscription. The form does not opt you into separate marketing messages.</p>
              <p>To withdraw your newsletter consent, contact {email ? <a href={`mailto:${email}`}>{email}</a> : 'the site owner'}.</p>
            </section>
            <section aria-labelledby="privacy-infrastructure">
              <h2 id="privacy-infrastructure">Services and infrastructure</h2>
              <div className="overflow-x-auto">
                <table>
                  <thead><tr><th>Service</th><th>Internet address</th><th>Hosting / VPS</th><th>Link</th></tr></thead>
                  <tbody>
                    <tr><td>Website</td><td>giorgiotedesco.it</td><td>GitHub Pages</td><td><a href="https://github.com/giorgionetg/giorgiotedesco.it">Repository</a></td></tr>
                    <tr><td>PocketBase</td><td>pb.giorgiotedesco.it</td><td>Hetzner</td><td><a href="https://www.hetzner.com/">Hetzner</a></td></tr>
                    <tr><td>Umami</td><td>get.giorgiotedesco.it</td><td>DigitalOcean</td><td><a href="https://www.digitalocean.com/">DigitalOcean</a></td></tr>
                    <tr><td>dex-id.it</td><td>dex-id.it</td><td>Hetzner and private cloud</td><td><a href="https://www.hetzner.com/">Hetzner</a></td></tr>
                  </tbody>
                </table>
              </div>
              <p>The site’s code and main content are available in the repository linked in the table.</p>
              <p>GitHub states that when you visit a site hosted on GitHub Pages, your IP address is logged and stored for security purposes, even if you are not signed in to GitHub. See the <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages">GitHub Pages documentation</a>.</p>
              <p>Data submitted through forms and other features that use the database is managed by PocketBase. The site uses Umami for statistics.</p>
              <p>Information about the data collected, purposes, retention periods and providers involved still needs to be verified and completed.</p>
            </section>
            <section aria-labelledby="privacy-tracking">
              <h2 id="privacy-tracking">Cookies and other browser storage</h2>
              <p>In addition to cookies, some features may use other browser storage, such as localStorage and IndexedDB. The information in this section is being verified and will be completed with the duration and details of each tool.</p>
              <h3>Umami statistics</h3>
              <p>With your consent, the live site loads Umami from get.giorgiotedesco.it to collect statistics on visits and certain interactions. The installation’s configuration and any data stored in the browser still need to be verified.</p>
              <p>Clicks from blog articles to suggested services are measured with the article path, language and service identifier. If Umami has not loaded yet, a pending click is held in this browser tab until the next page loads. No such event is sent without statistics consent.</p>
              <h3>Visura AI experiments</h3>
              <p>With your consent to statistics, some Visura AI pages use browser localStorage to save an identifier named <code>visura-ai.visitor-id</code>. The identifier, the variant shown and interaction events are sent to PocketBase to measure experiments. The code does not set an expiry for this browser data; the identifier is removed from the browser if you withdraw consent to statistics.</p>
              <h3>Your preferences</h3>
              <p>Your choice about statistics and external content is saved in the browser under the key <code>privacy.preferences.v1</code>. You will be asked again after 183 days. You can change your choice at any time using the “Preferenze privacy” button in the footer.</p>
              <h3>AT Protocol sign-in</h3>
              <p>The sign-in feature uses a library that may store information in localStorage and IndexedDB to manage the session and authentication process. The data actually stored and its duration still need to be verified.</p>
              <h3>External services</h3>
              <div className="overflow-x-auto">
                <table>
                  <thead><tr><th>Service</th><th>Use on this site</th><th>Information</th></tr></thead>
                  <tbody>
                    <tr><td>Cal.com</td><td>The booking script is initialized when you open the booking feature and have allowed external content.</td><td><a href="https://cal.com/privacy">Cal.com privacy notice</a></td></tr>
                    <tr><td>YouTube</td><td>Some pages may embed videos.</td><td><a href="https://policies.google.com/privacy?hl=it">Google privacy notice</a></td></tr>
                    <tr><td>SuperSplat</td><td>Some pages may embed 3D models.</td><td><a href="https://superspl.at/">Service website</a></td></tr>
                    <tr><td>Hovod</td><td>Service available at snack.sentica.io, hosted on the controller’s local computer.</td><td><a href="https://snack.sentica.io/">snack.sentica.io</a></td></tr>
                  </tbody>
                </table>
              </div>
              <p>Any data stored or collected by these services, and the conditions under which they load, remain to be verified.</p>
              <p>The presence, purposes and duration of cookies and other identifiers used by external services will also be checked during browsing, sign-in and interactions with content.</p>
            </section>
            <section aria-labelledby="privacy-rights">
              <h2 id="privacy-rights">Your rights</h2>
              <p>Where applicable under the GDPR, you may request access to, correction or erasure of your data, restriction of processing, object to processing and request data portability. Where processing is based on consent, you may withdraw it at any time; this does not affect the lawfulness of earlier processing.</p>
              {email && <p>To exercise these rights, contact <a href={`mailto:${email}`}>{email}</a>.</p>}
              <p>You may also lodge a complaint with the <a href="https://www.garanteprivacy.it/">Italian Data Protection Authority</a> or another competent supervisory authority.</p>
            </section>
          </div>
        </article>
        <aside aria-labelledby="presentation-title" className="w-full min-w-0 lg:sticky lg:top-24">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-orange">Get to know me</p>
          <h2 id="presentation-title" className="mt-2 text-xl font-bold tracking-tight text-slate-900">A short introduction</h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex aspect-video items-center justify-center bg-slate-900 text-white" aria-hidden="true">
              <Video size={32} className="text-slate-400" />
            </div>
            <div className="p-5">
              <p className="font-semibold text-slate-900">Hi, I’m Giorgio</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">A video introduction will be available here soon.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>;
}
