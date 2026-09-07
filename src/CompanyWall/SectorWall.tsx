// ---------------------------------------------------------------------------
// SectorWall.tsx — sector-targeted logo walls ("belongingness" creatives).
// Startup-only logos for one sector scroll horizontally on cream pill-chips,
// with a sector-specific caption. Top ~20 companies per sector by boss count
// (data/boss-companies-2026-09-07.csv), so logos stay large and readable.
// Same seamless-marquee technique as LogoWall: two copies, %-translate.
// ---------------------------------------------------------------------------
import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Archivo";
import { SECTOR_ROWS } from "./sector-rows";

const { fontFamily } = loadFont();
const INK = "#262220";
const CREAM = "#F5EFE7";
const PURPLE = "#A46BFF"; // accent — lifts the number out of the headline

export const SECTOR_LOOP = 720; // frames @30 = 24s — slow, readable drift

const ROW_DIR: (1 | -1)[] = [-1, 1, -1];

const Row: React.FC<{ items: string[]; dir: 1 | -1; logoH: number; chipH: number; gap: number }> = ({
  items, dir, logoH, chipH, gap,
}) => {
  const frame = useCurrentFrame();
  const p = (frame % SECTOR_LOOP) / SECTOR_LOOP;
  const shift = dir < 0 ? -50 * p : -50 + 50 * p;
  const seq = (copy: number) =>
    items.map((slug, i) => (
      <div
        key={`${copy}-${i}`}
        style={{
          height: chipH, display: "flex", alignItems: "center", justifyContent: "center",
          background: CREAM, borderRadius: 999, padding: `0 ${gap * 0.62}px`, marginRight: gap,
        }}
      >
        <Img
          src={staticFile(`boss-carousel/brand/sector/${slug}.png`)}
          style={{ height: logoH, width: "auto", display: "block", objectFit: "contain" }}
        />
      </div>
    ));
  return (
    <div
      style={{
        overflow: "hidden", width: "100%",
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

export const SectorWall: React.FC<{
  sector?: string;
  eyebrow?: string;
  sub?: string;
  cta?: string;
}> = ({
  sector = "fintech",
  eyebrow = "Bosses from these companies are hiring on Tal Boss",
  sub = "Join Bosses from 2000+ companies in Bangalore",
  cta = "Download the app",
}) => {
  const { height } = useVideoConfig();
  const u = height / 1080;
  const rows = SECTOR_ROWS[sector] ?? SECTOR_ROWS.fintech;

  // fewer rows (small sectors) => scale the chips up so the wall still fills
  // the frame instead of leaving a gap under the headline.
  const twoRow = rows.length <= 2;
  const logoH = (twoRow ? 78 : 62) * u;
  const chipH = (twoRow ? 158 : 124) * u;
  const gap = (twoRow ? 48 : 40) * u;
  const rowGap = (twoRow ? 38 : 30) * u;

  return (
    <AbsoluteFill style={{ background: INK, color: CREAM, fontFamily, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: `${46 * u}px 0 ${50 * u}px` }}>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <Img src={staticFile("boss-carousel/tal-boss-app-icon.png")} style={{ width: 100 * u, height: "auto", display: "block", marginBottom: 28 * u }} />
        {/* headline — the hero line. A leading count token ("700+") is pulled out
            in the accent colour so the number lands first. */}
        <div
          style={{
            fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.12, fontSize: 54 * u,
            marginBottom: 40 * u, paddingInline: 48 * u, maxWidth: "21ch", color: CREAM,
          }}
        >
          {(() => {
            const m = /^(\d[\d,]*\+?)\s+([\s\S]*)$/.exec(eyebrow);
            if (!m) return eyebrow;
            return (
              <>
                <span style={{ color: PURPLE }}>{m[1]}</span> {m[2]}
              </>
            );
          })()}
        </div>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: rowGap }}>
          {rows.map((items, i) => (
            <Row key={i} items={items} dir={ROW_DIR[i % 3]} logoH={logoH} chipH={chipH} gap={gap} />
          ))}
        </div>
        <div style={{ fontWeight: 400, letterSpacing: "-0.015em", lineHeight: 1.3, opacity: 0.7, fontSize: 30 * u, marginTop: 40 * u, maxWidth: "48ch", whiteSpace: "nowrap", paddingInline: 64 * u }}>{sub}</div>
        <div style={{ background: CREAM, color: INK, fontWeight: 700, letterSpacing: "-0.02em", borderRadius: 999, fontSize: 34 * u, marginTop: 36 * u, padding: `${26 * u}px ${56 * u}px` }}>{cta}</div>
      </div>
    </AbsoluteFill>
  );
};
