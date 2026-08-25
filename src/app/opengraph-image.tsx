import { ImageResponse } from "next/og";

export const alt = "The Monkey Shop — Thirty Years in Frankston";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        color: "#fbf7ed",
        background:
          "radial-gradient(circle at 50% 115%, #6e211e 0%, #16130f 53%, #0d0b09 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 28,
          display: "flex",
          border: "2px solid rgba(214,168,75,.56)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 44,
          display: "flex",
          border: "1px solid rgba(251,247,237,.18)",
        }}
      />
      <div
        style={{
          display: "flex",
          width: 980,
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            marginBottom: 24,
            color: "#d6a84b",
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: ".22em",
            textTransform: "uppercase",
          }}
        >
          Frankston · Est. 1996
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 116,
            letterSpacing: "-.07em",
            lineHeight: 0.8,
          }}
        >
          <span>The</span>
          <span style={{ color: "#a02b26", fontStyle: "italic" }}>Monkey</span>
          <span>Shop</span>
        </div>
        <div
          style={{
            marginTop: 28,
            color: "rgba(251,247,237,.75)",
            fontSize: 21,
            letterSpacing: ".12em",
            textTransform: "uppercase",
          }}
        >
          Thirty years behind the counter · an unofficial gift for Rob + Carla
        </div>
      </div>
    </div>,
    size,
  );
}
