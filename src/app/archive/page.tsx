import type { Metadata } from "next";
import { ArchiveExperience } from "./archive-experience";

export const metadata: Metadata = {
  title: "Ziggy — The Optional Back Room",
  description:
    "The optional creative back room behind The Monkey Shop tribute: evidence, visual experiments, object studies and the working conversation behind Ziggy.",
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

export default function ArchivePage() {
  return (
    <>
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
          Songs · if curious
        </a>
        <a href="/archive/images" style={floatingLink}>
          Image room
        </a>
        <a href="/archive/stationery" style={floatingLink}>
          Ridiculous stationery
        </a>
      </div>
      <ArchiveExperience />
    </>
  );
}
