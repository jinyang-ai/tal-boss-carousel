# Tal Boss — "PM Leaders" carousel (Remotion)

A seamlessly looping carousel of hiring-manager profile cards that slides sideways,
pauses when a card is centred in the phone screen, then slides to the next — nothing
else moves. Built to match the Figma creative
[`Creatives` node `3249:31556`](https://www.figma.com/design/PjtEF4yHgCQhvgy8buO4q5/Creatives?node-id=3249-31556).

## Output

- **`out/tal-boss-carousel.gif`** — the deliverable, 540×675, ~15 fps, infinite loop (~6.3 MB)
- **`out/tal-boss-carousel.mp4`** — full-quality 1080×1350, 30 fps, 15 s

```bash
npm install
npm run dev          # open Remotion Studio
npm run render-gif   # out/tal-boss-carousel.gif
npm run render-mp4   # out/tal-boss-carousel.mp4
npm run still        # out/still.png (frame 0)
```

## How it works

The composition is authored at **1080×1350** (the Figma root is 720×900, so `SCALE = 1.5`).
`src/BossCarousel/layout.ts` holds every geometric value with its raw Figma source in a
comment — nothing is a magic number.

Layer stack (back → front):

1. Background `#1c1c1e`
2. **Dim/neighbour strip** — the full card row, full width, behind the phone (the cards
   bleeding past the phone are at full brightness in the reference; `DIM = 1.0`).
3. **Phone chrome** — `phone-chrome.png`, Figma's own 3× render of the phone node: bezel +
   Dynamic Island + white `#fbfbfc` screen + iOS status bar + "10+ BOSSES" eyebrow.
4. **Bottom scrim** — full-width gradient fading to `#0b0b0d`, below the cards.
5. **Bright strip** — the same `<CardStrip>`, clipped to the screen aperture (rounded).
6. **tal BOSS wordmark**, then the **headline**.

The dim strip and the bright strip render the **same `<CardStrip>` with the same
`translateX`**, so the cards outside and inside the phone are always in perfect register.

### The cards

The whole strip lives outside the frame, and Figma clips every export/screenshot to the
frame — so the strip can't be exported as one image. Instead each card is rebuilt in code
(`Card.tsx` + `cards.ts`) from its Figma source portrait, company logo, exact per-card crop,
badge treatment, and live SF Pro text. This composites in code (no frame clipping) and keeps
the register lock.

### Motion

`slide (18f) → hold (27f)` per card, `CYCLE = 45`, `durationInFrames = CYCLE × 10 = 450`, so
frame 450 lands exactly on frame 0 — the loop is seamless (verified: frame 0 == frame 450,
0 pixel diff). Frame 0 centres Tapish, matching the Figma still. Knobs live at the top of
`BossCarousel.tsx` (`DIRECTION`, `ENABLE_CENTER_EMPHASIS`, `ENABLE_BADGE_POP` — both effects
implemented, off by default so frame 0 matches the static creative).

## Fonts

Real Figma faces, vendored in `public/fonts/` and loaded before the first frame:
SF Pro Display (Semibold/Bold) + SF Pro Text (Semibold). The "10+ BOSSES" eyebrow
(Obviously Semibold) and the status bar are baked into `phone-chrome.png` (Figma's render).
