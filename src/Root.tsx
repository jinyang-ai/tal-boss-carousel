import React from "react";
import { Composition } from "remotion";
import { BossCarousel } from "./BossCarousel/BossCarousel";
import { COMP_W, COMP_H, FPS, DURATION } from "./BossCarousel/layout";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="BossCarousel"
      component={BossCarousel}
      durationInFrames={DURATION}
      fps={FPS}
      width={COMP_W}
      height={COMP_H}
    />
  );
};
