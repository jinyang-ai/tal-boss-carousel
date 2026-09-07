// ---------------------------------------------------------------------------
// CompanyWall.tsx — animated version of the "company wall" creative: the
// company names scroll horizontally across 5 rows (alternating direction), on
// the ink/cream/purple palette in Archivo. Eyebrow above, sub + CTA below.
//
// Seamless loop: each row renders TWO identical copies and translates by a
// percentage of its own (2-copy) width — at -50% the second copy sits exactly
// where the first began, so every row is seamless, and every row's cycle count
// divides the composition length (LOOP), so the whole reel loops cleanly.
// ---------------------------------------------------------------------------
import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Archivo";
import { ROWS, HL } from "./companies";

const { fontFamily } = loadFont();

const INK = "#262220";
const CREAM = "#F5EFE7";
const PURPLE = "#8B4CD8";

export const LOOP = 540; // frames @30 = 18s — calm marquee; the reel loops here

// per-row cycle counts (must divide LOOP) + scroll direction. One cycle each =
// a gentle, uniform pace; direction alternates row to row for a layered feel.
const ROW_CYCLES = [1, 1, 1, 1, 1];
const ROW_DIR: (1 | -1)[] = [-1, 1, -1, 1, -1]; // -1 = leftward

const Dot: React.FC = () => (
  <span style={{ opacity: 0.28, fontWeight: 400, padding: "0 0.30em" }}>·</span>
);

const Row: React.FC<{ items: string[]; dir: 1 | -1; cycles: number; size: number }> = ({ items, dir, cycles, size }) => {
  const frame = useCurrentFrame();
  const cycleFrames = LOOP / cycles;
  const p = (frame % cycleFrames) / cycleFrames; // 0..1
  // leftward: 0 -> -50%. rightward: -50% -> 0. Both endpoints are visually identical.
  const shift = dir < 0 ? -50 * p : -50 + 50 * p;

  const seq = (copy: number) =>
    items.map((name, i) => (
      <span key={`${copy}-${i}`} style={{ color: HL.has(name) ? PURPLE : CREAM }}>
        {name}
        <Dot />
      </span>
    ));

  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        // fade both edges so names appear/disappear softly
        WebkitMaskImage: "linear-gradient(90deg, transparent 0, #000 9%, #000 91%, transparent 100%)",
        maskImage: "linear-gradient(90deg, transparent 0, #000 9%, #000 91%, transparent 100%)",
      }}
    >
      <div style={{ display: "inline-flex", whiteSpace: "nowrap", transform: `translateX(${shift}%)`, willChange: "transform" }}>
        <div style={{ display: "inline-flex", fontSize: size, fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.36 }}>{seq(0)}</div>
        <div style={{ display: "inline-flex", fontSize: size, fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.36 }}>{seq(1)}</div>
      </div>
    </div>
  );
};

export const CompanyWall: React.FC<{
  eyebrow?: string;
  sub?: string;
  cta?: string;
}> = ({
  eyebrow = "Bosses already hiring on tal",
  sub = "Your next hire is being interviewed by one of them right now.",
  cta = "Download the app",
}) => {
  const { height } = useVideoConfig();
  const u = height / 1080; // scale unit (matches the source creative)

  return (
    <AbsoluteFill style={{ background: INK, color: CREAM, fontFamily, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: `${62 * u}px 0 ${70 * u}px` }}>
      {/* centered stack: Tal Boss logo -> eyebrow -> wall -> sub -> cta */}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        {/* Tal Boss app-icon logo, centered on top */}
        <Img src={staticFile("boss-carousel/tal-boss-app-icon.png")} style={{ width: 116 * u, height: "auto", display: "block", marginBottom: 36 * u }} />

        <div style={{ fontWeight: 600, letterSpacing: "-0.01em", opacity: 0.6, fontSize: 34 * u, marginBottom: 40 * u }}>{eyebrow}</div>

        {/* scrolling wall — full-bleed rows */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 6 * u }}>
          {ROWS.map((items, i) => (
            <Row key={i} items={items} dir={ROW_DIR[i]} cycles={ROW_CYCLES[i]} size={62 * u} />
          ))}
        </div>

        <div style={{ fontWeight: 400, letterSpacing: "-0.015em", lineHeight: 1.3, opacity: 0.82, fontSize: 37 * u, marginTop: 40 * u, maxWidth: `${27}ch`, paddingInline: 64 * u }}>{sub}</div>

        <div style={{ background: CREAM, color: INK, fontWeight: 700, letterSpacing: "-0.02em", borderRadius: 999, fontSize: 35 * u, marginTop: 50 * u, padding: `${29 * u}px ${60 * u}px` }}>{cta}</div>
      </div>
    </AbsoluteFill>
  );
};
