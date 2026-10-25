import { ImageResponse } from "next/og";

export const alt = "Anitrack - Tu rastreador de anime";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B0B10",
          gap: 24,
        }}
      >
        <div style={{ display: "flex", fontSize: 128, fontWeight: 700, color: "#F5F5F7", letterSpacing: -2 }}>
          Anitrack
        </div>
        <div style={{ display: "flex", fontSize: 44, color: "#A0A0B0" }}>
          Tu rastreador de anime
        </div>
      </div>
    ),
    size
  );
}
