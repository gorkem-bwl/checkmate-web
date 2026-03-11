import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Checkmate - Open source infrastructure monitoring";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 96px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Green accent bar */}
        <div
          style={{
            width: "48px",
            height: "4px",
            background: "#13715B",
            marginBottom: "40px",
            borderRadius: "2px",
          }}
        />

        {/* Main heading */}
        <div
          style={{
            fontSize: "80px",
            fontWeight: "800",
            color: "#111827",
            lineHeight: "1.0",
            letterSpacing: "-3px",
            marginBottom: "28px",
          }}
        >
          Checkmate
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "32px",
            fontWeight: "600",
            color: "#374151",
            lineHeight: "1.3",
            marginBottom: "24px",
          }}
        >
          Open-source infrastructure monitoring
        </div>

        {/* Body copy */}
        <div
          style={{
            fontSize: "22px",
            color: "#6B7280",
            lineHeight: "1.5",
            maxWidth: "800px",
          }}
        >
          Monitor uptime, servers, Docker, and more. Self-hosted and free.
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: "absolute",
            bottom: "64px",
            right: "96px",
            fontSize: "20px",
            color: "#9CA3AF",
            fontWeight: "500",
          }}
        >
          checkmate.so
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
