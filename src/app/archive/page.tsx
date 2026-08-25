import type { Metadata } from "next";
import { ArchiveExperience } from "./archive-experience";

export const metadata: Metadata = {
  title: "Ziggy — The Working Archive",
  description:
    "The optional creative back room behind The Monkey Shop exhibition: evidence, visual experiments, object studies and the working conversation behind Ziggy.",
};

const floatingLink = {
  zIndex: 9999,
  padding: "11px 14px",
  border: "1px solid rgba(217,193,138,.7)",
  borderRadius: 999,
  background: "rgba(11,11,8,.9)",
  color: "#d9c18a",
  textDecoration: "none",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: ".12em",
  textTransform: "uppercase" as const,
  backdropFilter: "blur(10px)",
  boxShadow: "0 10px 30px rgba(0,0,0,.35)",
};

const contextNote = {
  position: "relative" as const,
  zIndex: 10000,
  padding: "14px 20px 15px",
  borderBottom: "1px solid rgba(217,193,138,.35)",
  background: "#efe4cc",
  color: "#1b1710",
  textAlign: "center" as const,
  lineHeight: 1.5,
};

export default function ArchivePage() {
  return (
    <>
      <aside style={contextNote} aria-label="About the working archive">
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <strong
            style={{
              display: "block",
              marginBottom: 4,
              fontSize: 10,
              letterSpacing: ".15em",
              textTransform: "uppercase",
            }}
          >
            The optional back room
          </strong>
          <span style={{ fontSize: 13 }}>
            The exhibition is the gift. This is simply where the research, design experiments
            and bits that got wildly carried away live. Rob and Carla do not need to read,
            approve, launch or manage any of it — curiosity is the only reason to come in here.
          </span>
        </div>
      </aside>

      <div
        style={{
          position: "fixed",
          right: 18,
          bottom: 18,
          zIndex: 9999,
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          justifyContent: "flex-end",
        }}
      >
        <a href="/archive/record-room" style={floatingLink}>
          Record room · 13
        </a>
        <a href="/archive/images" style={floatingLink}>
          Visual archive
        </a>
        <a href="/archive/stationery" style={floatingLink}>
          Stationery cupboard · 8
        </a>
      </div>
      <ArchiveExperience />
    </>
  );
}
