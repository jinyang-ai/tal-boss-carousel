import React from "react";
import { Composition } from "remotion";
import { BossCarousel } from "./BossCarousel/BossCarousel";
import { COMP_W, COMP_H, FPS, DURATION, SCREEN_STEP } from "./BossCarousel/layout";

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
    </>
  );
};
