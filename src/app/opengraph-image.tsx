import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} – Rajkot Taxi Service & Rajkot to Ahmedabad Cab`;
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
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #0a0a0a 0%, #1f1f1f 60%, #3a2f00 100%)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 800 }}>
          Challo<span style={{ color: "#facc15" }}>Taxi</span>
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 800, marginTop: 24, lineHeight: 1.1 }}>
          Rajkot Taxi Service
        </div>
        <div style={{ display: "flex", fontSize: 44, color: "#facc15", marginTop: 16 }}>
          Rajkot to Ahmedabad · Local · Airport · Outstation
        </div>
        <div style={{ display: "flex", fontSize: 36, marginTop: 48, color: "#d4d4d4" }}>
          Book on WhatsApp {site.phoneDisplay} · 24x7
        </div>
      </div>
    ),
    size,
  );
}
