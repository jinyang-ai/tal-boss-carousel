// ---------------------------------------------------------------------------
// LogoWall.tsx — like CompanyWall, but the rows are real brand LOGOS scrolling
// horizontally instead of company names. Two modes:
//   "white" — monochrome logos directly on the dark ink background
//   "chips" — colored logos inside light pill-chips
// Same seamless-marquee technique as CompanyWall (two copies, %-translate).
// ---------------------------------------------------------------------------
import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Archivo";
import { WHITE_ROWS, COLOR_ROWS } from "./logo-rows";
import { STARTUP_ROWS, GCC_ROWS } from "./brand-rows";
import { STARTUP_COLOR_ROWS, GCC_COLOR_ROWS } from "./brand-color-rows";

const { fontFamily } = loadFont();

const INK = "#262220";
const CREAM = "#F5EFE7";

export const LOGO_LOOP = 720; // frames @30 = 24s — slow, readable drift; loops here
const ROW_DIR: (1 | -1)[] = [-1, 1, -1, 1, -1];

const Row: React.FC<{
  items: string[];
  dir: 1 | -1;
  folder: string;
  chips: boolean;
  logoH: number;
  gap: number;
  chipH: number;
}> = ({ items, dir, folder, chips, logoH, gap, chipH }) => {
  const frame = useCurrentFrame();
  const p = (frame % LOGO_LOOP) / LOGO_LOOP;
  const shift = dir < 0 ? -50 * p : -50 + 50 * p;

  const seq = (copy: number) =>
    items.map((slug, i) => {
      const img = (
        <Img
          src={staticFile(`boss-carousel/brand/${folder}/${slug}.png`)}
          style={{ height: logoH, width: "auto", display: "block", objectFit: "contain" }}
        />
      );
      return (
        <div
          key={`${copy}-${i}`}
          style={
            chips
              ? { height: chipH, display: "flex", alignItems: "center", justifyContent: "center", background: CREAM, borderRadius: 999, padding: `0 ${gap * 0.7}px`, marginRight: gap }
              : { display: "flex", alignItems: "center", marginRight: gap }
          }
        >
          {img}
        </div>
      );
    });

  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        WebkitMaskImage: "linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%)",
        maskImage: "linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%)",
      }}
    >
      <div style={{ display: "inline-flex", whiteSpace: "nowrap", transform: `translateX(${shift}%)`, willChange: "transform" }}>
        <div style={{ display: "inline-flex", alignItems: "center" }}>{seq(0)}</div>
        <div style={{ display: "inline-flex", alignItems: "center" }}>{seq(1)}</div>
      </div>
    </div>
  );
};

export const LogoWall: React.FC<{
  mode?: "white" | "chips" | "startups" | "gccs" | "startups-chips" | "gccs-chips";
  eyebrow?: string;
  sub?: string;
  cta?: string;
}> = ({
  mode = "white",
  eyebrow = "Bosses from 450+ companies are hiring on Tal Boss",
  sub = "Join 800+ bosses on Tal",
  cta = "Download the app",
}) => {
  const { height } = useVideoConfig();
  const u = height / 1080;
  const chips = mode === "chips" || mode === "startups-chips" || mode === "gccs-chips";
  const rows =
    mode === "startups" ? STARTUP_ROWS
    : mode === "gccs" ? GCC_ROWS
    : mode === "startups-chips" ? STARTUP_COLOR_ROWS
    : mode === "gccs-chips" ? GCC_COLOR_ROWS
    : chips ? COLOR_ROWS
    : WHITE_ROWS;
  // all non-chip walls use pure-white silhouettes, recolored from the logo alpha
  const folder =
    mode === "startups" ? "startups-mono"
    : mode === "gccs" ? "gccs-mono"
    : mode === "startups-chips" ? "startups-color"
    : mode === "gccs-chips" ? "gccs-color"
    : chips ? "color"
    : "mono";

  // denser 5-row walls (curated sets) run slightly smaller so 12-13 fit per row
  const dense = mode === "startups" || mode === "gccs" || mode === "startups-chips" || mode === "gccs-chips";
  const logoH = (dense && chips ? 38 : chips ? 44 : dense ? 46 : 52) * u;
  const chipH = (dense ? 78 : 92) * u;
  const gap = (dense && chips ? 26 : chips ? 34 : dense ? 70 : 84) * u;
  const rowGap = (dense && chips ? 20 : chips ? 26 : dense ? 38 : 44) * u;

  return (
    <AbsoluteFill style={{ background: INK, color: CREAM, fontFamily, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: `${62 * u}px 0 ${70 * u}px` }}>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <Img src={staticFile("boss-carousel/tal-boss-app-icon.png")} style={{ width: 116 * u, height: "auto", display: "block", marginBottom: 36 * u }} />

        <div style={{ fontWeight: 600, letterSpacing: "-0.01em", opacity: 0.6, fontSize: 34 * u, marginBottom: 44 * u }}>{eyebrow}</div>

        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: rowGap }}>
          {rows.map((items, i) => (
            <Row key={i} items={items} dir={ROW_DIR[i]} folder={folder} chips={chips} logoH={logoH} gap={gap} chipH={chipH} />
          ))}
        </div>

        <div style={{ fontWeight: 400, letterSpacing: "-0.015em", lineHeight: 1.3, opacity: 0.82, fontSize: 37 * u, marginTop: 44 * u, maxWidth: "27ch", paddingInline: 64 * u }}>{sub}</div>

        <div style={{ background: CREAM, color: INK, fontWeight: 700, letterSpacing: "-0.02em", borderRadius: 999, fontSize: 35 * u, marginTop: 50 * u, padding: `${29 * u}px ${60 * u}px` }}>{cta}</div>
      </div>
    </AbsoluteFill>
  );
};
