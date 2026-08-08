import React from "react";
import {
  AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig,
  interpolate, spring, Easing,
} from "remotion";
import { CardStrip } from "./CardStrip";
import { loadFonts } from "./fonts";
import {
  COMP_W, COMP_H, BG, DIM,
  SLIDE, HOLD, CYCLE, N_CARDS, STEP, LOOP, CARD_W,
  APERTURE, APERTURE_CX, PHONE, SCRIM, WORDMARK, HEADLINE, HEADLINE_COLOR,
} from "./layout";

loadFonts();

// ---- knobs ------------------------------------------------------------------
const DIRECTION = 1; // 1 = strip travels left->right (new cards enter from the left)
const CENTER0 = 1; // card index centred at frame 0 (1 = Tapish, matching the Figma still)
// optional polish — off by default so frame 0 matches the static creative exactly
const ENABLE_CENTER_EMPHASIS = false;
const ENABLE_BADGE_POP = false;
// -----------------------------------------------------------------------------

export const BossCarousel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // slide -> hold -> slide -> hold, forever
  const cycleIndex = Math.floor(frame / CYCLE);
  const t = frame % CYCLE;
  const progress = interpolate(t, [0, SLIDE], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1), // expo-out: quick start, soft settle
  });
  const p = cycleIndex + progress;

  // wrap into one loop length so the strip never runs out
  const travel = (((DIRECTION * p * STEP) % LOOP) + LOOP) % LOOP;
  // base places us in the middle copy (invisible wrap); +CENTER0 centres Tapish at frame 0
  const translateX = APERTURE_CX - CARD_W / 2 - (N_CARDS + CENTER0) * STEP + travel;

  // badge pop: 0.9 -> 1.0 over the first frames of each HOLD
  let badgeScale = 1;
  if (ENABLE_BADGE_POP && t >= SLIDE) {
    const s = spring({ frame: t - SLIDE, fps, config: { stiffness: 200, damping: 18 }, durationInFrames: 12 });
    badgeScale = 0.9 + 0.1 * s;
  }

  const strip = (
    <CardStrip translateX={translateX} centerEmphasis={ENABLE_CENTER_EMPHASIS} badgeScale={badgeScale} />
  );

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      {/* 1. dimmed neighbours bleeding past the phone (behind everything) */}
      <AbsoluteFill style={{ filter: `brightness(${DIM})` }}>{strip}</AbsoluteFill>

      {/* 2. phone chrome: bezel + white screen + status bar + "10+ BOSSES" */}
      <Img src={staticFile(PHONE.src)} style={{ position: "absolute", left: PHONE.x, top: PHONE.y, width: PHONE.w, height: PHONE.h }} />

      {/* 3. bottom scrim — below the bright cards, above the white screen */}
      <div
        style={{
          position: "absolute", left: SCRIM.x, top: SCRIM.y, width: SCRIM.w, height: SCRIM.h,
          // rgb(11,11,13) == SCRIM_COLOR #0b0b0d
          background: `linear-gradient(180deg, rgba(11,11,13,0) 0%, rgba(11,11,13,0) ${SCRIM.fadeStart * 100}%, rgba(11,11,13,1) 100%)`,
        }}
      />

      {/* 4. bright cards, clipped to the screen aperture (rounded corners) */}
      <div style={{ position: "absolute", left: APERTURE.x, top: APERTURE.y, width: APERTURE.w, height: APERTURE.h, overflow: "hidden", borderRadius: APERTURE.r }}>
        <div style={{ position: "absolute", left: -APERTURE.x, top: -APERTURE.y, width: COMP_W, height: COMP_H }}>{strip}</div>
      </div>

      {/* 5. tal BOSS wordmark */}
      <Img src={staticFile(WORDMARK.src)} style={{ position: "absolute", left: WORDMARK.x, top: WORDMARK.y, width: WORDMARK.w, height: WORDMARK.h }} />

      {/* 6. headline */}
      <div
        style={{
          position: "absolute", left: HEADLINE.x, top: HEADLINE.y, width: HEADLINE.w, height: HEADLINE.h,
          display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center",
          fontFamily: "SF Pro Display", fontWeight: HEADLINE.fontWeight, fontSize: HEADLINE.fontSize,
          lineHeight: HEADLINE.lineHeight, color: HEADLINE_COLOR, letterSpacing: 0,
        }}
      >
        <div>{HEADLINE.text}</div>
      </div>
    </AbsoluteFill>
  );
};
