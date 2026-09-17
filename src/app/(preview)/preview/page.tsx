import Link from "next/link";

const previews = [
  {
    href: "/preview/workbench",
    name: "Workbench",
    note: "A technical tour: proof panels, operating notes, and an app-like command surface.",
  },
  {
    href: "/preview/index",
    name: "Index-First",
    note: "A dense personal operating index: links, proof, writing, availability.",
  },
  {
    href: "/preview/split-studio",
    name: "Split Studio",
    note: "A composed diptych: bio, proof, and positioning without the centered hero default.",
  },
];

export default function PreviewIndexPage() {
  return (
    <main className="hm-shell">
      <section className="hm-page hm-preview-index">
        <div className="hm-preview-list">
          <div className="hm-reveal">
            <p className="hm-kicker">Hallmark sandbox</p>
            <h1>Three safe directions.</h1>
          </div>
          <div className="hm-preview-cards hm-reveal" style={{ "--hm-i": 1 } as React.CSSProperties}>
            {previews.map((preview) => (
              <Link className="hm-preview-card hm-link" href={preview.href} key={preview.href}>
                <span className="hm-kicker">{preview.href}</span>
                <strong>{preview.name}</strong>
                <p className="hm-lede">{preview.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
