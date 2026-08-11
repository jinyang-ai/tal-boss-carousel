# Tal Boss — "Bosses of Bangalore" carousel (Remotion)

A seamlessly looping carousel of hiring-manager profile cards inside an iPhone.
Cards slide sideways, pause dead-centre in the screen, then slide on — nothing else
moves, and the loop has no visible seam. Built from the Figma creative
[`Creatives` node `3249:31556`](https://www.figma.com/design/PjtEF4yHgCQhvgy8buO4q5/Creatives?node-id=3249-31556).

## Variants

Two **layouts** × two **casts** = four compositions.

**Layouts** (both render the same `<CardStrip>` with the same `translateX`):

| Layout | What it looks like |
|---|---|
| **Screen-only** (`…Screen`) | The wipe happens entirely inside the phone screen; nothing outside the phone moves. Card pitch is widened so no neighbour peeks at rest. |
| **Side-bleed** | The card strip runs edge-to-edge behind the phone (the original Figma look). |

**Casts:**

| Composition | Cast | Headline | Output |
|---|---|---|---|
| `BossCarouselScreen` / `BossCarousel` | PM leaders (8) | "50+ PM Leaders have joined Tal Boss" | `out/tal-boss-carousel-screen.{gif,mp4}` / `out/tal-boss-carousel.{gif,mp4}` |
| `BossCarouselEngScreen` / `BossCarouselEng` | Engineering leaders (6) | "400+ Engineering Leaders have joined Tal Boss" | `out/tal-eng-carousel-screen.{gif,mp4}` / `out/tal-eng-carousel.{gif,mp4}` |

The engineering cut (`cards-eng.ts`) reuses every bit of the PM layout/motion code —
only the card list and headline differ, passed as props (`cards`, `headline`,
`headlineSize`) into the shared `<BossCarousel>`. Engineering renders are a touch
higher-res (GIF `--scale=0.8`, MP4 `--scale=1.333`).

```bash
npm install
npm run dev                 # Remotion Studio
npm run render-gif-screen   # PM cast, screen-only GIF   (the main deliverable)
npm run render-mp4-screen   # PM cast, screen-only MP4
npm run render-gif          # PM cast, side-bleed GIF
npm run render-mp4          # PM cast, side-bleed MP4
npm run render-gif-eng-screen   # engineering cast, screen-only GIF
npm run render-mp4-eng-screen   # engineering cast, screen-only MP4
npm run render-gif-eng          # engineering cast, side-bleed GIF
npm run render-mp4-eng          # engineering cast, side-bleed MP4
npm run still               # frame 0 PNG
```

## Design decisions / current state

- **PM cast**: 8 cards (left→right): Tapish K, Logarajan M, Puneet J, Piyush Gupta,
  Ankit Agarwal, Akash Mehta, Meet Pathak, Kapil Thakur. Ayush K and Srikanth A
  were removed on request. `N_CARDS` derives from `cards.ts`, so adding/removing a
  card automatically adjusts the loop length (`duration = 45 frames × N`).
- **Engineering cast**: 6 cards (left→right): Jayant P (Rippling), Ansuman S
  (Zepto), Rachit W (Headout), Kiran K (WeWork India), Nikhil M (Zepto), Mayank A
  (Swish) — in `cards-eng.ts`. The two Zepto cards are deliberately kept 3 apart so
  the same badge never appears on adjacent cards as the loop wraps.
- **Brand mark**: the bottom-centre logo is the **"tal BOSS" app icon** (rounded
  light square, `tal-boss-app-icon.png`) — it replaced the flat white wordmark on
  2026-08-11. It's a square asset that sits in the dark band *below* the card,
  centred with equal top/bottom gaps (`layout.ts → WORDMARK`, sized from the band
  height via `ICON_GAP`) so it never crowds the lowest card text — 2-line roles
  like Ansuman's "Associate Director of Engineering" reach nearly to the card edge.
- **Eyebrow**: "BOSSES OF BANGALORE" (was "10+ BOSSES"), rendered live in
  Obviously Semibold — a white band masks the text baked into the phone PNG, so the
  copy is editable in `layout.ts → EYEBROW.text`.
- **Colours**: base background `#1c1c1e` (grey, token Surface/90); card fill
  `#0b0b0d` (deep black, token Grey/90 — same tone the bottom scrim fades to);
  screen `#fbfbfc`.
- **Motion**: slide 18 f → hold 27 f per card @30 fps, expo-out easing. Frame 0
  centres Tapish. Frame `45 × N` is pixel-identical to frame 0 (verified), so the
  GIF loops seamlessly.
- Optional flags in `BossCarousel.tsx` (both implemented, off by default):
  `ENABLE_CENTER_EMPHASIS`, `ENABLE_BADGE_POP`.

## How it's built

Composition space is 1080×1350 (Figma root is 720×900 → scale ×1.5). Every
geometric value lives in `src/BossCarousel/layout.ts` with the raw Figma number it
came from — no magic numbers elsewhere.

Layer stack (back → front): background → card strip (side-bleed variant only) →
phone chrome PNG → eyebrow mask + live eyebrow → bottom scrim → bright card strip
clipped to the screen aperture (radius 63.76 from Figma) → app-icon logo → headline.
The outside strip and the in-screen strip render the same `<CardStrip>` with the
same `translateX`, so they can never drift out of register.

### Gotchas we hit (worth knowing before editing)

1. **Figma clips every export/screenshot to the containing frame.** The 10-card
   strip lives mostly outside the frame, so it cannot be exported as one image
   (off-frame nodes render 1×1). Cards are therefore rebuilt in code from each
   card's portrait/logo assets + exact Figma crops (`cards.ts`), with live SF Pro
   text.
2. **The phone export carried a baked near-black backdrop** from its source photo
   (a `#161618→#020202` slab filling the export rect). Invisible on the original
   dark design, it showed as a "second shade" on flat backgrounds. It's been
   stripped to true transparency (flood fill + fringe cleanup) in
   `phone-chrome.png`; the untouched export is kept as `phone-chrome-baked.png`.
3. **Remotion's `--number-of-gif-loops=0` means *no* loop** (unlike ffmpeg).
   Omit the flag entirely for an infinitely looping GIF.

## Fonts

Vendored in `public/fonts/`, loaded via `FontFace` before the first frame:
SF Pro Display Semibold/Bold (headline, names), SF Pro Text Semibold (roles),
Obviously Semibold (eyebrow — demo cut, covers the needed glyphs). The iOS status
bar stays baked in the phone PNG.
