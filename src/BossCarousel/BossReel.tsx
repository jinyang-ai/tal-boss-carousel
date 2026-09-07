// ---------------------------------------------------------------------------
// BossReel.tsx — a one-shot reel: the looping <BossCarousel> plays for
// `carouselFrames`, then cross-dissolves into the <Outro> CTA slate. The outro
// Sequence starts OVERLAP frames early so its white slate dissolves over the
// last carousel beat. Total length = carouselFrames + outroFrames.
// ---------------------------------------------------------------------------
import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { BossCarousel } from "./BossCarousel";
import { Outro } from "./Outro";
import { BossCard } from "./cards";
import { STEP } from "./layout";

const OVERLAP = 12; // frames of carousel/outro cross-dissolve

export const BossReel: React.FC<{
  showNeighbors?: boolean;
  pitch?: number;
  cards?: BossCard[];
  headline?: string;
  headlineSize?: number;
  carouselFrames: number; // how long the carousel runs before the outro
  outroFrames: number; // outro hold length (after the carousel ends)
}> = ({ showNeighbors, pitch = STEP, cards, headline, headlineSize, carouselFrames, outroFrames }) => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={carouselFrames}>
        <BossCarousel showNeighbors={showNeighbors} pitch={pitch} cards={cards} headline={headline} headlineSize={headlineSize} />
      </Sequence>
      <Sequence from={carouselFrames - OVERLAP} durationInFrames={outroFrames + OVERLAP}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
