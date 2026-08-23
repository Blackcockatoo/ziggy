import type { Metadata } from "next";
import { ArchiveExperience } from "./archive-experience";

export const metadata: Metadata = {
  title: "Ziggy — The Working Archive",
  description:
    "A living Frankston archive: exhibition, evidence, visual language, object studies and the working conversation behind Ziggy.",
};

export default function ArchivePage() {
  return (
    <>
      <a
        href="/archive/images"
        style={{
          position: "fixed",
          right: 18,
          bottom: 18,
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
          textTransform: "uppercase",
          backdropFilter: "blur(10px)",
          boxShadow: "0 10px 30px rgba(0,0,0,.35)",
        }}
      >
        Visual archive · 12
      </a>
      <ArchiveExperience />
    </>
  );
}
