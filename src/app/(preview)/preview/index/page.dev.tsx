import Link from "next/link";

const items = [
  ["01", "Architecture notes", "How I choose boundaries, contracts, and migrations."],
  ["02", "Selected constraints", "Security, auth, scale, maintainability, team velocity."],
  ["03", "Writing", "Engineering essays and field notes from delivery work."],
  ["04", "Availability", "Contract work, senior IC roles, and technical leadership."],
  ["05", "Contact", "A direct path to talk about fit, scope, and timing."],
];

export default function IndexPreviewPage() {
  return (
    <main className="hm-shell">
      <aside className="hm-side-rail">
        <Link className="hm-wordmark hm-link" href="/preview">GT<span>.index</span></Link>
      </aside>

      <section className="hm-page hm-index">
        <div className="hm-index-grid">
          <div className="hm-reveal">
            <p className="hm-kicker">Index-first direction</p>
            <h1>No hero. Just the map.</h1>
            <p className="hm-lede">
              This direction treats the homepage as a technical index. It is blunt, fast to scan, and better for visitors who already know they need a senior architect.
            </p>
          </div>

          <div className="hm-index-list hm-reveal" style={{ "--hm-i": 1 } as React.CSSProperties}>
            {items.map(([num, title, text]) => (
              <a className="hm-index-row hm-link" href="#contact" key={num}>
                <b>{num}</b>
                <span>
                  <strong>{title}</strong>
                  <p className="hm-lede">{text}</p>
                </span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="hm-page hm-footer-line" id="contact">
        <span>Index-First · Hallmark preview</span>
        <Link className="hm-link" href="/">Return home</Link>
        <Link className="hm-link" href="/preview">All previews</Link>
      </footer>
    </main>
  );
}
