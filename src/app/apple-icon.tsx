import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        color: "#d6a84b",
        background: "#16130f",
        fontSize: 112,
        fontWeight: 700,
      }}
    >
      <div
        style={{
          display: "flex",
          width: 142,
          height: 142,
          alignItems: "center",
          justifyContent: "center",
          border: "4px solid #d6a84b",
          borderRadius: 999,
        }}
      >
        M
      </div>
    </div>,
    size,
  );
}
