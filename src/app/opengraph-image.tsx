import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/lib/data/profile";

export const alt = `${profile.name} — Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const photoBuffer = await readFile(
    path.join(process.cwd(), "public", "profile.jpg")
  );
  const photoSrc = `data:image/jpeg;base64,${photoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "80px",
          backgroundColor: "#0a0a0f",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(99,102,241,0.35), transparent 50%), radial-gradient(circle at 80% 80%, rgba(34,211,238,0.25), transparent 50%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- next/og's ImageResponse (Satori) renders its own tree and can't use next/image */}
        <img
          src={photoSrc}
          alt={profile.name}
          width={280}
          height={280}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: 64,
            border: "4px solid rgba(165,180,252,0.5)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#a5b4fc",
              marginBottom: 24,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.1,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#c4c4cc",
              marginTop: 24,
            }}
          >
            {profile.titles.join("  ·  ")}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
