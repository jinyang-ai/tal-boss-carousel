// ---------------------------------------------------------------------------
// Outro.tsx — CTA slate ported from the "Hinge for hiring" reel (src/hinge/
// Outro.tsx). Cross-dissolves in over white: the "tal" logo pops, the tagline
// fades up, then the App Store / Google Play badges. Here it ends the reel, so
// it HOLDS on the CTA (the original faded back to white to loop into an intro).
//
// Sizes are the Hinge values * 1.5 — the carousel is 1080x1350, exactly 1.5x
// the Hinge reel's 720x900, so the slate matches proportionally.
// ---------------------------------------------------------------------------
import React from "react";
import { AbsoluteFill, Img, Easing, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

const clampE = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const S = 1.5; // 720x900 -> 1080x1350

// Local-frame timeline (frames @30). The outro Sequence starts a few frames
// before the carousel ends, so the first ~12 frames are the cross-dissolve.
export const OUTRO_FADE = 14;

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // cross-dissolve in from the carousel (white slate ramps up)
  const fadeIn = interpolate(frame, [0, OUTRO_FADE], [0, 1], { ...clampE, easing: Easing.out(Easing.cubic) });

  const pop = spring({ frame, fps, config: { damping: 12, stiffness: 150, mass: 0.8 } });
  const tShow = interpolate(frame, [10, 28], [0, 1], { ...clampE, easing: Easing.out(Easing.cubic) });
  const bShow = interpolate(frame, [20, 42], [0, 1], { ...clampE, easing: Easing.out(Easing.cubic) });

  return (
    <AbsoluteFill style={{ background: "#ffffff", opacity: fadeIn, alignItems: "center", justifyContent: "center", flexDirection: "column", zIndex: 900 }}>
      <Img
        src={staticFile("reel/tal-logo.png")}
        style={{ width: 300 * S, height: "auto", display: "block", transform: `scale(${0.9 + 0.1 * Math.min(pop, 1.05)})`, marginBottom: 26 * S }}
      />
      <div style={{ fontFamily: "SF Pro Text", fontSize: 22 * S, fontWeight: 500, color: "#8a8a8a", letterSpacing: "0.01em", opacity: tShow, marginBottom: 48 * S }}>
        the app where bosses hire directly
      </div>
      <Img
        src={staticFile("reel/badges-stores.png")}
        style={{ width: 560 * S, height: "auto", display: "block", opacity: bShow, transform: `translateY(${(1 - bShow) * 16 * S}px)` }}
      />
    </AbsoluteFill>
  );
};
