import React from "react";
import { Composition } from "remotion";
import { BossCarousel } from "./BossCarousel/BossCarousel";
import { COMP_W, COMP_H, FPS, DURATION, CYCLE, SCREEN_STEP } from "./BossCarousel/layout";
import { ENG_CARDS } from "./BossCarousel/cards-eng";
import { BLR_CARDS } from "./BossCarousel/cards-blr";
import { BLR2_CARDS } from "./BossCarousel/cards-blr2";
import { BossReel } from "./BossCarousel/BossReel";
import { CompanyWall, LOOP as WALL_LOOP } from "./CompanyWall/CompanyWall";
import { LogoWall, LOGO_LOOP } from "./CompanyWall/LogoWall";
import { SectorWall, SECTOR_LOOP } from "./CompanyWall/SectorWall";

// Engineers cut: same design, different cast + headline. Duration self-adjusts
// to the cast size so the loop still lands exactly on frame 0. Headline drops
// 60 -> 52 (raw px) so the longer copy stays on two lines like the PM cut.
const ENG_HEADLINE = "400+ Engineering Leaders have joined Tal Boss";
const ENG_HEADLINE_SIZE = 52 * 1.5; // raw figma px * SCALE
const ENG_DURATION = CYCLE * ENG_CARDS.length;

// Bangalore startup-bosses cut — 5 senior leaders. Same design/knobs; headline
// matches the eng copy length so it stays on two lines.
const BLR_HEADLINE = "HSR's Top Bosses are already hiring on Tal Boss";
const BLR_HEADLINE_SIZE = 46 * 1.5; // raw figma px * SCALE (longer copy → smaller)
const BLR_DURATION = CYCLE * BLR_CARDS.length;

// Bangalore startup-bosses vol. 2 — 4 cards, same header/knobs as vol. 1.
const BLR2_HEADLINE = "HSR's Top Bosses are already hiring on Tal Boss";
const BLR2_HEADLINE_SIZE = 46 * 1.5;
const BLR2_DURATION = CYCLE * BLR2_CARDS.length;

// Reel = one full carousel loop (BLR2_DURATION) + a 90-frame (3s) outro hold.
const BLR2_OUTRO_FRAMES = 90;
const BLR2_REEL_DURATION = BLR2_DURATION + BLR2_OUTRO_FRAMES;

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
      {/* Bangalore startup-bosses cast — screen-only (main deliverable) + side-bleed */}
      <Composition
        id="BossCarouselBlrScreen"
        component={BossCarousel}
        defaultProps={{ showNeighbors: false, pitch: SCREEN_STEP, cards: BLR_CARDS, headline: BLR_HEADLINE, headlineSize: BLR_HEADLINE_SIZE }}
        durationInFrames={BLR_DURATION}
        fps={FPS}
        width={COMP_W}
        height={COMP_H}
      />
      <Composition
        id="BossCarouselBlr"
        component={BossCarousel}
        defaultProps={{ showNeighbors: true, cards: BLR_CARDS, headline: BLR_HEADLINE, headlineSize: BLR_HEADLINE_SIZE }}
        durationInFrames={BLR_DURATION}
        fps={FPS}
        width={COMP_W}
        height={COMP_H}
      />
      {/* Bangalore startup-bosses vol. 2 — screen-only (main) + side-bleed */}
      <Composition
        id="BossCarouselBlr2Screen"
        component={BossCarousel}
        defaultProps={{ showNeighbors: false, pitch: SCREEN_STEP, cards: BLR2_CARDS, headline: BLR2_HEADLINE, headlineSize: BLR2_HEADLINE_SIZE }}
        durationInFrames={BLR2_DURATION}
        fps={FPS}
        width={COMP_W}
        height={COMP_H}
      />
      <Composition
        id="BossCarouselBlr2"
        component={BossCarousel}
        defaultProps={{ showNeighbors: true, cards: BLR2_CARDS, headline: BLR2_HEADLINE, headlineSize: BLR2_HEADLINE_SIZE }}
        durationInFrames={BLR2_DURATION}
        fps={FPS}
        width={COMP_W}
        height={COMP_H}
      />
      {/* vol. 2 as a one-shot REEL: carousel loop -> Tal CTA outro (from Hinge) */}
      <Composition
        id="BossCarouselBlr2Reel"
        component={BossReel}
        defaultProps={{ showNeighbors: false, pitch: SCREEN_STEP, cards: BLR2_CARDS, headline: BLR2_HEADLINE, headlineSize: BLR2_HEADLINE_SIZE, carouselFrames: BLR2_DURATION, outroFrames: BLR2_OUTRO_FRAMES }}
        durationInFrames={BLR2_REEL_DURATION}
        fps={FPS}
        width={COMP_W}
        height={COMP_H}
      />
      {/* Company wall — company names scroll horizontally (marquee), 1080x1350 */}
      <Composition
        id="CompanyWall"
        component={CompanyWall}
        durationInFrames={WALL_LOOP}
        fps={FPS}
        width={COMP_W}
        height={COMP_H}
      />
      {/* Logo walls — brand logos scroll horizontally. White-on-dark + colored-on-chips */}
      <Composition
        id="LogoWallWhite"
        component={LogoWall}
        defaultProps={{ mode: "white" as const }}
        durationInFrames={LOGO_LOOP}
        fps={FPS}
        width={COMP_W}
        height={COMP_H}
      />
      <Composition
        id="LogoWallChips"
        component={LogoWall}
        defaultProps={{ mode: "chips" as const }}
        durationInFrames={LOGO_LOOP}
        fps={FPS}
        width={COMP_W}
        height={COMP_H}
      />
      {/* 1:1 square (1080x1080) for LinkedIn feed ads */}
      <Composition
        id="LogoWallWhiteSquare"
        component={LogoWall}
        defaultProps={{ mode: "white" as const }}
        durationInFrames={LOGO_LOOP}
        fps={FPS}
        width={1080}
        height={1080}
      />
      <Composition
        id="LogoWallChipsSquare"
        component={LogoWall}
        defaultProps={{ mode: "chips" as const }}
        durationInFrames={LOGO_LOOP}
        fps={FPS}
        width={1080}
        height={1080}
      />
      {/* Two curated cuts from the full boss-company roster (Mixpanel) */}
      <Composition
        id="LogoWallStartups"
        component={LogoWall}
        defaultProps={{ mode: "startups" as const, eyebrow: "Bosses from these startups are already on Tal" }}
        durationInFrames={LOGO_LOOP}
        fps={FPS}
        width={1080}
        height={1080}
      />
      <Composition
        id="LogoWallGCCs"
        component={LogoWall}
        defaultProps={{ mode: "gccs" as const, eyebrow: "Bosses from these global companies are already on Tal" }}
        durationInFrames={LOGO_LOOP}
        fps={FPS}
        width={1080}
        height={1080}
      />
      {/* v2 — "450+ companies" caption. White silhouettes + colored-chip variants. */}
      <Composition
        id="LogoWallStartupsV2"
        component={LogoWall}
        defaultProps={{ mode: "startups" as const }}
        durationInFrames={LOGO_LOOP}
        fps={FPS}
        width={1080}
        height={1080}
      />
      <Composition
        id="LogoWallGCCsV2"
        component={LogoWall}
        defaultProps={{ mode: "gccs" as const }}
        durationInFrames={LOGO_LOOP}
        fps={FPS}
        width={1080}
        height={1080}
      />
      <Composition
        id="LogoWallStartupsChips"
        component={LogoWall}
        defaultProps={{ mode: "startups-chips" as const }}
        durationInFrames={LOGO_LOOP}
        fps={FPS}
        width={1080}
        height={1080}
      />
      <Composition
        id="LogoWallGCCsChips"
        component={LogoWall}
        defaultProps={{ mode: "gccs-chips" as const }}
        durationInFrames={LOGO_LOOP}
        fps={FPS}
        width={1080}
        height={1080}
      />
      {/* Sector walls — startup-only, top ~20 logos per sector */}
      <Composition
        id="SectorWallFintech"
        component={SectorWall}
        defaultProps={{ sector: "fintech", eyebrow: "700+ fintech bosses are hiring on tal BOSS" }}
        durationInFrames={SECTOR_LOOP}
        fps={FPS}
        width={1080}
        height={1080}
      />
      <Composition
        id="SectorWallConsumer"
        component={SectorWall}
        defaultProps={{ sector: "quick-commerce-consumer", eyebrow: "650+ consumer startup bosses are hiring on tal BOSS" }}
        durationInFrames={SECTOR_LOOP}
        fps={FPS}
        width={1080}
        height={1080}
      />
      <Composition
        id="SectorWallSaas"
        component={SectorWall}
        defaultProps={{ sector: "saas-b2b", eyebrow: "600+ SaaS bosses are hiring on tal BOSS" }}
        durationInFrames={SECTOR_LOOP}
        fps={FPS}
        width={1080}
        height={1080}
      />
      <Composition
        id="SectorWallAi"
        component={SectorWall}
        defaultProps={{ sector: "ai-ml", eyebrow: "550+ AI bosses are hiring on tal BOSS" }}
        durationInFrames={SECTOR_LOOP}
        fps={FPS}
        width={1080}
        height={1080}
      />
      <Composition
        id="SectorWallHealth"
        component={SectorWall}
        defaultProps={{ sector: "healthtech", eyebrow: "500+ healthtech bosses are hiring on tal BOSS" }}
        durationInFrames={SECTOR_LOOP}
        fps={FPS}
        width={1080}
        height={1080}
      />
    </>
  );
};
