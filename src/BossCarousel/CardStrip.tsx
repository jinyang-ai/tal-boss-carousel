import React from "react";
import { interpolate } from "remotion";
import { Card } from "./Card";
import { CARDS } from "./cards";
import { STEP, CARD_W, CARD_H, CARD_TOP, APERTURE_CX } from "./layout";

// The strip is tripled so a full copy of margin always exists on both sides when
// the parent's translateX wraps. Dim and bright layers render this same component
// with the SAME translateX, so the two are always in perfect horizontal register.
const TRIPLED = [...CARDS, ...CARDS, ...CARDS];

export const CardStrip: React.FC<{
  translateX: number;
  step?: number;
  centerEmphasis?: boolean;
  badgeScale?: number;
}> = ({ translateX, step = STEP, centerEmphasis = false, badgeScale = 1 }) => {
  return (
    <div style={{ position: "absolute", left: 0, top: CARD_TOP, height: CARD_H, transform: `translateX(${translateX}px)` }}>
      {TRIPLED.map((card, j) => {
        const centreX = translateX + j * step + CARD_W / 2;
        const scale = centerEmphasis
          ? interpolate(Math.abs(centreX - APERTURE_CX), [0, step], [1.0, 0.96], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
          : 1;
        return (
          <div key={j} style={{ position: "absolute", left: j * step, top: 0, width: CARD_W, height: CARD_H, transform: `scale(${scale})`, transformOrigin: "center" }}>
            <Card card={card} badgeScale={badgeScale} />
          </div>
        );
      })}
    </div>
  );
};
