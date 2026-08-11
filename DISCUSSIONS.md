# Build log — every discussion & decision (2026-08-08 → 08-11)

Chronological record of how this project went from a Figma still to the final
looping GIFs, including every request, problem, and the reasoning behind each fix.

---

## 1. The brief

Animate the static Figma creative **"Boss" (node `3249:31556`, file
`PjtEF4yHgCQhvgy8buO4q5`)** into a seamlessly looping GIF: a strip of
hiring-manager profile cards slides sideways, pauses centred in a phone screen,
slides on. Nothing else moves. Slide 18 frames / hold 27 frames @30 fps,
expo-out easing, tripled card array for an invisible wrap, duration = 45 × N so
the last frame lands exactly on frame 0.

**Mid-task change:** originally briefed into the existing `remotion-boss-swipe`
repo — Yash redirected to a **fresh standalone repo** ("GIF - PM" folder). Fonts,
config patterns were mirrored from the old repo but nothing inherited.

## 2. Pulling the design out of Figma

- Tools used: `get_metadata`, `get_variable_defs`, `get_design_context`,
  `get_screenshot`, `download_assets` (official Figma MCP, Starter-plan rate cap).
- Root frame 720×900 → comp authored at 1080×1350 (scale ×1.5). Every derived
  number lives in `src/BossCarousel/layout.ts` with its raw Figma value in a
  comment.
- **Discovery #1 — Figma clips every export to the containing frame.** The
  10-card strip (4166 px wide, mostly outside the frame) exported as a 720-wide
  clipped slice; a fully off-frame card rendered 1×1. So the strip could not be
  used as a baked image. **Resolution:** rebuild each card in code — portraits,
  logos, exact per-card crops from `get_design_context`, live SF Pro text. Bonus:
  the dim and bright strips are the same component with one shared `translateX`,
  so register can't drift.
- **Discovery #2 — the phone mockup is a photo with an opaque baked screen.** No
  transparent-screen bezel exists in the file. **Resolution:** use Figma's own
  render of the phone node (bezel + white screen + status bar + eyebrow) as a
  chrome layer; composite the bright cards *on top*, clipped to the screen
  aperture (radius 63.759 from Figma).
- **Fonts:** SF Pro Display Semibold/Bold + SF Pro Text Semibold found in
  `/Library/Fonts`; the eyebrow's "Obviously" exists locally as the foundry demo
  cut (`ObviouslyDemo-*`). All vendored into `public/fonts/`, loaded via
  `FontFace` before frame 0.
- **Dim level:** the brief assumed the cards bleeding past the phone are dimmed
  (`brightness 0.32`). Pixel-sampling the reference showed they're at **full
  brightness** — the phone pops via bezel + white screen, not dimming. `DIM = 1.0`.

## 3. Verification of the first build

- Frame 0 vs the Figma node: side-by-side match (headline, bezel, status bar,
  eyebrow, Tapish card, neighbours, wordmark).
- Loop: frame 0 vs frame 450 = **0 differing pixels**.
- **Discovery #3 — Remotion's `--number-of-gif-loops=0` disables looping**
  (opposite of ffmpeg, where 0 = infinite). First GIF shipped non-looping;
  omitting the flag entirely gives an infinite loop. npm scripts fixed.

## 4. Iteration rounds (in order)

1. **Light wordmark** — swapped the pure-white baked wordmark for the light
   `#f5f5f8` export Yash supplied (`Group 2085663602 (1).png`); same node, same
   aspect (1.083), straight asset swap.
2. **Name/role spacing looked wrong** — my card had the role hugging the name.
   Figma actually wraps the role in a **fixed 41 px box, vertically centred**
   (`h-[41px] justify-center`); that box is what creates the gap. Reproduced the
   exact structure; verified on 1-line and 2-line roles.
3. **New variant: screen-only wipe** — request: cards should exist only inside
   the phone screen, no side bleed. Added `showNeighbors` prop + second
   composition `BossCarouselScreen`. Original untouched.
4. **"Black border next to the phone" (screen variant)** — the screen (469 px) is
   wider than a card (404 px), so the *next* card's dark edge peeked into the
   aperture at rest. Fix: widened the pitch for this variant
   (`SCREEN_STEP = CARD_W/2 + APERTURE.w/2 + buffer`) so only the centred card
   shows at rest; neighbours appear only mid-wipe.
5. **"Two shades of black" (round 1)** — card `#1c1c1e` read grey against the
   darker backdrop. First unified everything to deep black `#0b0b0d`; then Yash
   chose the final scheme: **base background grey `#1c1c1e`, card deep black
   `#0b0b0d`** (card pops against the grey).
6. **Eyebrow copy change** — "10+ BOSSES" → **"BOSSES OF BANGALORE"**. The
   original text is baked into the phone PNG, so a white band masks it and the
   new line renders live in Obviously Semibold (size 30 vs 36.8, tracking eased
   to fit one line). Copy is now editable in `layout.ts → EYEBROW.text`.
7. **Cast trim** — removed **Ayush K** and **Srikanth A** → 8 cards. `N_CARDS`
   now derives from `cards.ts`, so the loop length (45 × N = 360 f = 12 s)
   self-adjusts on any future add/remove.
8. **"Two shades" persisted (round 2) — the real root cause.** Even with colours
   unified, a hard-edged rectangle of a different dark hung around the phone.
   Sampling the asset revealed **Figma's phone export carries the source photo's
   own baked backdrop** — an opaque `#161618 → #020202` gradient slab filling the
   export rect (alpha 255 everywhere). Invisible dark-on-dark in the original
   design; obvious on flat grey. **Fix:** flood-filled the slab to true
   transparency from the image edges (dark-seeded only — first attempt ate the
   white screen via a bottom-centre seed and was redone), plus a 3-pass dark-fringe
   cleanup. Original export kept as `phone-chrome-baked.png`. After the fix,
   every point around the phone samples exactly `#1c1c1e`; the only darkening
   left is the intentional scrim fade behind the wordmark.
9. **Publish** — committed everything (final renders force-added past
   `.gitignore`) and pushed to **github.com/MediumMasala/tal-boss-carousel**;
   Yash explicitly chose **public** visibility.
10. **Quality bump** — GIF resolution +25%: 540×675 → **675×844**
    (`--scale=0.625`), npm scripts updated. Screen GIF 5.3 MB; side-bleed GIF
    8.3 MB (flagged: crosses the informal 8 MB ceiling; MP4s already full-res).

## 5. Final state

| File | Spec |
|---|---|
| `out/tal-boss-carousel-screen.gif` | 675×844, ~15 fps, infinite loop, 5.3 MB — **primary deliverable** |
| `out/tal-boss-carousel-screen.mp4` | 1080×1350, 30 fps, 12 s, 1.8 MB |
| `out/tal-boss-carousel.gif` | 675×844, infinite loop, 8.3 MB (side-bleed look) |
| `out/tal-boss-carousel.mp4` | 1080×1350, 30 fps, 12 s, 2.5 MB |

Cast (L→R): Tapish K, Logarajan M, Puneet J, Piyush Gupta, Ankit Agarwal,
Akash Mehta, Meet Pathak, Kapil Thakur. Tapish opens the loop.

## 6. Reusable lessons

- Figma exports/screenshots are always frame-clipped → off-frame artwork must be
  rebuilt in code from raw assets + crops.
- A Figma "mockup" image can carry baked backdrops/screens — check the alpha
  channel before compositing on a new background.
- Remotion GIFs: omit `--number-of-gif-loops` for infinite looping; `0` = play once.
- Verify loops empirically: render frame 0 and frame N, diff the pixels.
- When a colour looks "off by a shade", sample pixels — perception lies,
  hex doesn't.

---

## 7. Engineering-leaders cut + app-icon logo (2026-08-10 → 08-11)

Second pass, after the PM build shipped. Two things: a new cast, then a brand-mark swap.

### 7.1 The engineering cut

- **Request:** a parallel carousel for **engineering leaders** instead of PMs.
- **How it reuses the PM build:** no layout/motion code was forked. `BossCarousel`
  already took `cards` / `headline` / `headlineSize` as props, so the eng cut is
  just a new card list (`cards-eng.ts`) + headline wired through two new
  compositions in `Root.tsx` — `BossCarouselEng` (side-bleed) and
  `BossCarouselEngScreen` (screen-only). `N_CARDS` / loop length derive from the
  list, so the 6-card cast loops seamlessly at `45 × 6 = 270 f` (9 s).
- **Cast (6, L→R):** Jayant P (Rippling), Ansuman S (Zepto), Rachit W (Headout),
  Kiran K (WeWork India), Nikhil M (Zepto), Mayank A (Swish). Real LinkedIn
  portraits + official company logos, same per-card crop approach as the PM cards.
- **Badge adjacency:** two Zepto cards (Ansuman, Nikhil) are kept **3 apart** so
  the same logo never lands on two consecutive cards as the loop wraps.
- **Headline:** "400+ Engineering Leaders have joined Tal Boss" — longer than the
  PM line, so `headlineSize` is passed at `52 × 1.5` to keep it on two lines.
- **WeWork logo** is a black-on-white mark, so that badge uses the `white-shadow`
  treatment instead of the purple ring.
- **Render specs:** GIF `--scale=0.8`, MP4 `--scale=1.333` (a notch above the PM
  cut). Outputs: `out/tal-eng-carousel-screen.{gif,mp4}` + `out/tal-eng-carousel.{gif,mp4}`.

### 7.2 White wordmark → "tal BOSS" app icon

- **Request:** replace the bottom-centre logo with the **rounded-square "tal BOSS"
  app icon** (light gradient bg, dark text) and size it right.
- The old mark was a flat white text wordmark (transparent bg, aspect 1.083); the
  new one is a **square** app icon → the `WORDMARK` box became square, centred on
  the old x-centre. Sized by rendering S/M/L stills (92 / 112 / 134 raw px): **134
  overlapped the card**, 92 read small, **112 (Medium)** was the pick.
- **Crowding fix:** Medium, bottom-anchored at the old wordmark baseline, grew
  *upward* and its top intruded into the card's lowest text. Invisible on 1-line
  roles (Jayant) but on **Ansuman's 2-line "Associate Director of Engineering"**
  the icon touched the text. Fix: stop anchoring to the old baseline — drop the
  icon into the **dark band below the card** (`card bottom raw 769 → frame bottom
  900`), centred with equal `ICON_GAP` top and bottom. Side derives to `101 raw`,
  so it fits the band cleanly and can never collide with card text again.
- **Global by design:** `WORDMARK` is shared by all four comps, so the icon (and
  the reposition) applies to the PM cut too; both casts were re-rendered so every
  output carries the new mark.

### 7.3 Reusable lessons (this pass)

- Prop-driven comps pay off: a whole second cast cost one card file + two
  `<Composition>` lines, zero layout code.
- Size a bottom overlay against the **tallest** content variant, not the opener.
  Frame 0 (1-line role) hid a collision that only the 2-line card exposed.
- Anchor an overlay to the *space it lives in* (the band below the card), not to a
  legacy element's baseline — the baseline was tuned for smaller artwork.
