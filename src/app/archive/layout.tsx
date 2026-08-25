import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const noticeStyle = {
  position: "relative" as const,
  zIndex: 10000,
  padding: "16px 20px 17px",
  borderBottom: "1px solid rgba(217,193,138,.38)",
  background: "#efe4cc",
  color: "#1b1710",
  textAlign: "center" as const,
  lineHeight: 1.55,
};

export default function ArchiveLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <aside style={noticeStyle} aria-label="About this optional creative back room">
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <strong
            style={{
              display: "block",
              marginBottom: 5,
              fontSize: 10,
              letterSpacing: ".16em",
              textTransform: "uppercase",
            }}
          >
            Optional creative back room · absolutely no homework
          </strong>
          <div style={{ fontSize: 14 }}>
            <b>If you are Rob or Carla: the exhibition is already the whole gift.</b>{" "}
            Everything below is simply the overbuilt cupboard where Tom put the research,
            songs, pictures, stationery, experiments and ideas after getting magnificently
            carried away. You do not need to read it, approve it, choose anything, download
            anything, correct anything, launch anything or manage anything. Wander in if it is
            fun. Leave whenever it stops being fun. Either response is complete.
          </div>
          <div style={{ marginTop: 9, fontSize: 12, opacity: 0.78 }}>
            Nothing in this back room is a proposal, commitment or expectation unless you
            explicitly decide you want to make something real later.
          </div>
          <a
            href="/"
            style={{
              display: "inline-block",
              marginTop: 10,
              color: "inherit",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: ".08em",
              textTransform: "uppercase",
            }}
          >
            ← Back to the actual tribute
          </a>
        </div>
      </aside>
      {children}
    </>
  );
}
