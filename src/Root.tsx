import React from "react";
import { Composition } from "remotion";
import { BossCarousel } from "./BossCarousel/BossCarousel";
import { COMP_W, COMP_H, FPS, DURATION, CYCLE, SCREEN_STEP } from "./BossCarousel/layout";
import { ENG_CARDS } from "./BossCarousel/cards-eng";

// Engineers cut: same design, different cast + headline. Duration self-adjusts
// to the cast size so the loop still lands exactly on frame 0. Headline drops
// 60 -> 52 (raw px) so the longer copy stays on two lines like the PM cut.
const ENG_HEADLINE = "400+ Engineering Leaders have joined Tal Boss";
const ENG_HEADLINE_SIZE = 52 * 1.5; // raw figma px * SCALE
const ENG_DURATION = CYCLE * ENG_CARDS.length;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* original: cards bleed past the phone on both sides */}
      <Composition
        id="BossCarousel"
        component={BossCarousel}
        defaultProps={{ showNeighbors: true }}
        durationInFrames={DURATION}
        fps={FPS}
        width={COMP_W}
        height={COMP_H}
      />
      {/* screen-only: cards wipe inside the phone screen, sides stay clean, and
          the pitch is widened so no neighbour peeks at the screen edges at rest */}
      <Composition
        id="BossCarouselScreen"
        component={BossCarousel}
        defaultProps={{ showNeighbors: false, pitch: SCREEN_STEP }}
        durationInFrames={DURATION}
        fps={FPS}
        width={COMP_W}
        height={COMP_H}
      />
      {/* engineers cast — side-bleed and screen-only, same knobs as above */}
      <Composition
        id="BossCarouselEng"
        component={BossCarousel}
        defaultProps={{ showNeighbors: true, cards: ENG_CARDS, headline: ENG_HEADLINE, headlineSize: ENG_HEADLINE_SIZE }}
        durationInFrames={ENG_DURATION}
        fps={FPS}
        width={COMP_W}
        height={COMP_H}
      />
      <Composition
        id="BossCarouselEngScreen"
        component={BossCarousel}
        defaultProps={{ showNeighbors: false, pitch: SCREEN_STEP, cards: ENG_CARDS, headline: ENG_HEADLINE, headlineSize: ENG_HEADLINE_SIZE }}
        durationInFrames={ENG_DURATION}
        fps={FPS}
        width={COMP_W}
        height={COMP_H}
      />
    </>
  );
};
