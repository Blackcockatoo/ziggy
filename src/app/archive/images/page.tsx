import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Ziggy — Supplied Visual Archive",
  description: "User-supplied Ziggy image studies being ingested into the Working Archive.",
};

const originalReferences = [
  "Ziggy — 30 Years group poster",
  "Ziggy — original tray reference",
];

const conceptsA = [
  "Cabinet of 30 Years",
  "Oracle of Thompson Street",
  "1996 / 2026 Split Era",
  "After Closing",
  "Thirty-Year Receipt",
  "Saint Ziggy of Frankston",
  "Reflection Close-up",
  "Oracle Tarot Cards",
  "Archaeological Discovery",
  "Snow Globe",
];

const page = {
  minHeight: "100vh",
  background: "#0b0b08",
  color: "#eee7d8",
  padding: "clamp(24px, 5vw, 72px)",
  fontFamily: "ui-sans-serif, system-ui, sans-serif",
} as const;

const shell = { maxWidth: 1180, margin: "0 auto" } as const;
const serif = { fontFamily: "Georgia, 'Times New Roman', serif" } as const;
const eyebrow = { fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase" as const, color: "#d9c18a" };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 } as const;
const panel = { border: "1px solid rgba(217,193,138,.24)", background: "#12120e", padding: 18 } as const;
const listStyle = { margin: "18px 0 0", paddingLeft: 20, color: "#cfc4ad", lineHeight: 1.75 } as const;

export default function VisualArchivePage() {
  return (
    <main style={page}>
      <div style={shell}>
        <nav style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center", marginBottom: 56 }}>
          <a href="/archive" style={{ color: "#d9c18a", textDecoration: "none", letterSpacing: ".12em", textTransform: "uppercase", fontSize: 11 }}>← Working Archive</a>
          <span style={eyebrow}>Supplied archive · intake 01</span>
        </nav>

        <header style={{ maxWidth: 900, marginBottom: 52 }}>
          <p style={eyebrow}>Visual library</p>
          <h1 style={{ ...serif, fontSize: "clamp(48px, 8vw, 104px)", lineHeight: .9, fontWeight: 400, letterSpacing: "-.055em", margin: "14px 0 24px" }}>The images that made the project.</h1>
          <p style={{ ...serif, fontSize: "clamp(19px, 2.2vw, 28px)", color: "#cfc4ad", lineHeight: 1.45, maxWidth: 780 }}>This room is for the actual image material supplied with the project — not new renders. It keeps the experiments, references and strange useful detours visible beside the finished argument.</p>
          <div style={{ marginTop: 24, display: "inline-flex", gap: 10, flexWrap: "wrap" }}>
            <span style={{ border: "1px solid #b58a3c", padding: "7px 10px", fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase" }}>12 images ingested</span>
            <span style={{ border: "1px solid rgba(238,231,216,.2)", padding: "7px 10px", fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "#a99e89" }}>Source: supplied Ziggy archive ZIP</span>
          </div>
        </header>

        <section style={{ ...grid, marginBottom: 64 }}>
          <article style={panel}>
            <p style={eyebrow}>00 · Original references</p>
            <div style={{ position: "relative", width: "100%", aspectRatio: "115 / 53", marginTop: 14, background: "#080806", overflow: "hidden" }}>
              <Image src="/images/ziggy/archive-upload/00-original-references.webp" alt="Contact sheet of the supplied original Ziggy reference images" fill sizes="(max-width: 700px) 100vw, 50vw" style={{ objectFit: "contain" }} />
            </div>
            <ol style={listStyle}>{originalReferences.map((item) => <li key={item}>{item}</li>)}</ol>
          </article>

          <article style={panel}>
            <p style={eyebrow}>01 · Thirty Years concepts — Set A</p>
            <div style={{ position: "relative", width: "100%", aspectRatio: "115 / 263", marginTop: 14, background: "#080806", overflow: "hidden" }}>
              <Image src="/images/ziggy/archive-upload/01-thirty-years-concepts-a.webp" alt="Contact sheet of ten supplied Thirty Years Ziggy concept images" fill sizes="(max-width: 700px) 100vw, 50vw" style={{ objectFit: "contain" }} />
            </div>
            <ol style={listStyle}>{conceptsA.map((item) => <li key={item}>{item}</li>)}</ol>
          </article>
        </section>

        <section style={{ borderTop: "1px solid rgba(217,193,138,.24)", paddingTop: 28, display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(220px, .45fr)", gap: 28 }}>
          <div>
            <p style={eyebrow}>Archive rule</p>
            <h2 style={{ ...serif, fontSize: "clamp(32px, 5vw, 62px)", fontWeight: 400, lineHeight: 1, margin: "10px 0 18px" }}>Keep the experiments. Label what they are.</h2>
            <p style={{ color: "#bdb19a", maxWidth: 700 }}>These are creative/reference artefacts from the working project. They do not become historical evidence merely by entering the archive. Where an image illustrates folklore, imagined history, Old Vic State or future speculation, the surrounding copy must keep that distinction clear.</p>
          </div>
          <div style={{ borderLeft: "1px solid rgba(217,193,138,.24)", paddingLeft: 22 }}>
            <p style={eyebrow}>Intake status</p>
            <p style={{ ...serif, fontSize: 27, margin: "8px 0" }}>Originals + Set A</p>
            <p style={{ color: "#948a78", fontSize: 13 }}>This is the first live ingest from the 44-image supplied archive.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
