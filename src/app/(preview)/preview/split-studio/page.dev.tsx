import Link from "next/link";

export default function SplitStudioPreviewPage() {
  return (
    <main className="hm-shell">
      <div className="hm-page hm-split">
        <nav className="hm-nav-edge" aria-label="Split studio preview navigation">
          <Link className="hm-wordmark hm-link" href="/preview">GiorgioTedesco<span>.it</span></Link>
          <Link className="hm-button" href="/">Home</Link>
        </nav>

        <section className="hm-split-block">
          <div className="hm-reveal">
            <p className="hm-kicker">Split Studio direction</p>
            <h1>Technical leadership, set in two columns.</h1>
            <p className="hm-lede">
              This keeps the personal clarity of the current site but removes the centered-hero habit. Each fold pairs a claim with proof: experience, systems, constraints, and the work surface behind them.
            </p>
            <div className="hm-split-proof">
              <div>
                <strong>16+</strong>
                <p className="hm-lede">years</p>
              </div>
              <div>
                <strong>Full stack</strong>
                <p className="hm-lede">frontend to platform</p>
              </div>
              <div>
                <strong>Senior</strong>
                <p className="hm-lede">IC + tech lead</p>
              </div>
            </div>
          </div>

          <div className="hm-portrait-panel hm-reveal" style={{ "--hm-i": 1 } as React.CSSProperties}>
            <strong>BUILD SYSTEMS THAT LAST.</strong>
          </div>
        </section>

        <footer className="hm-footer-statement">
          <strong>Available for work that needs decisions, not decoration.</strong>
          <div className="hm-footer-line">
            <span>Split Studio · Hallmark preview</span>
            <Link className="hm-link" href="/preview">Back to previews</Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
