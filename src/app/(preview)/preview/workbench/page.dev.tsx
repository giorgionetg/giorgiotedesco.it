import Link from "next/link";

const rows = [
  ["frontend", "React · Next.js · TypeScript", "interface systems"],
  ["backend", "APIs · auth · event flows", "service boundaries"],
  ["platform", "Docker · Kubernetes · CI/CD", "ship paths"],
  ["architecture", "legacy refactors · cloud native", "decision records"],
];

export default function WorkbenchPreviewPage() {
  return (
    <main className="hm-shell">
      <nav className="hm-nav-pill" aria-label="Workbench preview navigation">
        <Link className="hm-wordmark hm-link" href="/preview">GT<span>.preview</span></Link>
        <div className="hm-nav-links">
          <a className="hm-link" href="#workbench">Workbench</a>
          <a className="hm-link" href="#proof">Proof</a>
          <a className="hm-link" href="#contact">Contact</a>
        </div>
        <Link className="hm-button hm-button--solid" href="/">Home</Link>
      </nav>

      <section className="hm-page hm-workbench" id="workbench">
        <div className="hm-workbench-hero">
          <div className="hm-reveal">
            <p className="hm-kicker">Workbench direction</p>
            <h1>Open the system. Read the decisions.</h1>
            <p className="hm-lede">
              A portfolio direction for senior technical work: less theatre, more operating surface. The page behaves like a compact architecture bench rather than a marketing poster.
            </p>
            <Link className="hm-button" href="/about-me/">Read profile</Link>
          </div>

          <div className="hm-ledger hm-reveal" style={{ "--hm-i": 1 } as React.CSSProperties}>
            <div className="hm-ledger-head">
              <span>architecture.log</span>
              <span>live notes</span>
            </div>
            <div className="hm-ledger-body">
              {rows.map(([area, stack, role]) => (
                <div className="hm-code-line" key={area}>
                  <span>{area}</span>
                  <span>{stack}</span>
                  <span>{role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hm-proof-grid" id="proof">
          <div className="hm-proof">
            <strong>16+</strong>
            <p className="hm-lede">years across web platforms, product delivery, and long-lived systems.</p>
          </div>
          <div className="hm-proof">
            <strong>10+</strong>
            <p className="hm-lede">systems maintained beyond the launch window, where architecture keeps paying rent.</p>
          </div>
          <div className="hm-proof">
            <strong>0</strong>
            <p className="hm-lede">invented case-study numbers in this preview. Proof stays honest until metrics are confirmed.</p>
          </div>
        </div>
      </section>

      <footer className="hm-page hm-footer-line" id="contact">
        <span>Workbench · Hallmark preview</span>
        <Link className="hm-link" href="/preview">Back to previews</Link>
      </footer>
    </main>
  );
}
