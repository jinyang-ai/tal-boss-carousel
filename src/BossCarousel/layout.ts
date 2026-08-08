// ---------------------------------------------------------------------------
// layout.ts — every value derives from the Figma creative.
// Source node: 3249:31556 ("Boss") in file PjtEF4yHgCQhvgy8buO4q5 ("Creatives").
// Root frame is 720 x 900 (4:5). The composition is authored at 1080 x 1350.
// `sc()` maps a raw Figma pixel to composition space (x1.5). Every raw Figma
// number below is written literally and passed through sc() — no magic numbers
// live anywhere else in the code.
// ---------------------------------------------------------------------------

export const FIGMA_W = 720; // raw: root frame width
export const FIGMA_H = 900; // raw: root frame height
export const COMP_W = 1080;
export const COMP_H = 1350; // round(1080 * 900 / 720)
export const SCALE = COMP_W / FIGMA_W; // 1.5

/** Figma px -> composition px */
export const sc = (v: number): number => v * SCALE;

// ---- Colours (design tokens + sampled from the Figma render) ----------------
export const BG = "#1c1c1e"; // sampled frame background (token Surface/90)
export const SCREEN_BG = "#fbfbfc"; // raw: screen 3249:31559 fill
export const CARD_BG = "#1c1c1e"; // raw: card fill (token Surface/90)
export const NAME_COLOR = "#fbfbfc"; // raw: card name 3249:31595
export const ROLE_COLOR = "#efeff4"; // raw: card role (token Surface/25)
export const SCRIM_COLOR = "#0b0b0d"; // raw: bottom scrim target (token Grey/90)
export const HEADLINE_COLOR = "#ffffff"; // raw: headline (token Surface/10)

// ---- Motion (frames @ 30fps) ------------------------------------------------
export const FPS = 30;
export const SLIDE = 18; // frames of movement  (0.60s)
export const HOLD = 27; // frames of rest      (0.90s)
export const CYCLE = SLIDE + HOLD; // 45
export const N_CARDS = 10;
export const DURATION = CYCLE * N_CARDS; // 450 -> frame DURATION == frame 0 (seamless)

// ---- Headline (3249:31580) --------------------------------------------------
export const HEADLINE = {
  text: "50+ PM Leaders have joined Tal Boss",
  x: sc(41.7734375), // raw bbox x
  y: sc(32), // raw bbox y
  w: sc(637.3547973632812), // raw bbox w
  h: sc(111), // raw bbox h
  fontFamily: "SF Pro Display", // raw: font-['SF_Pro_Display:Semibold']
  fontWeight: 600,
  fontSize: sc(60), // raw: text-[60px]
  lineHeight: 1.04, // raw: leading-[1.04]
};

// ---- Phone chrome PNG (3249:31557) ------------------------------------------
// The exported render of the phone node: realistic bezel + Dynamic Island +
// white #fbfbfc screen + iOS status bar + "10+ BOSSES" eyebrow. Transparent
// outside the phone. Exported at 3x (1693 x 2202), clipped to the frame bottom.
export const PHONE = {
  src: "boss-carousel/phone-chrome.png",
  x: sc(78.330078125), // raw bbox x
  y: sc(166), // raw bbox y
  w: sc(564.1388549804688), // raw bbox w
  h: sc(734), // raw visible height (900 - 166), clipped to frame bottom
};

// ---- Screen aperture (3249:31559) -------------------------------------------
// The rounded window the bright cards show through. Raw is phone-relative
// (47.468971, 42.194416) 469.233 x 1011.692, r 63.759. Converted to root here.
export const APERTURE = {
  x: sc(78.330078125 + 47.468971252), // phone.x + screen rel x = 125.799
  y: sc(166 + 42.19441604), // phone.y + screen rel y = 208.194
  w: sc(469.2325134277344),
  h: sc(1011.692138671875), // extends past the frame; the comp clips it
  r: sc(63.759),
};
export const APERTURE_CX = APERTURE.x + APERTURE.w / 2; // aperture centre x (comp)

// ---- Card geometry (children of strip 3249:31582) ---------------------------
export const CARD_W = sc(404); // raw card width
export const CARD_H = sc(423); // raw card height
export const CARD_GAP = sc(14); // raw flex gap between cards
export const STEP = CARD_W + CARD_GAP; // pitch = sc(418)
export const LOOP = STEP * N_CARDS; // one full carousel period
export const CARD_TOP = sc(346); // raw: strip root y (cards are items-center => card top)
export const CARD_RADIUS = sc(30); // raw: rounded-[30px]

// Card interior (all raw Figma px, relative to the 404x423 card) --------------
export const PORTRAIT = { x: sc(9), y: sc(10), w: sc(386), h: sc(300), r: sc(22) };
export const TEXT = { left: sc(21), w: sc(361), nameSize: sc(32), nameLH: sc(33), roleSize: sc(21), roleTracking: sc(0.84) };
export const BADGE = { left: sc(262), top: sc(221), size: sc(114), purpleBg: "#3b006a", ringW: sc(5.876) };

// ---- Bottom scrim (3249:31581) ---------------------------------------------
// Full-width gradient that fades the screen bottom to Grey/90. Raw bbox
// x0 y506 718x394 (y 506..900). Sampled ramp: transparent until ~y600, opaque
// by ~y900. Rendered below the bright cards, above the white screen.
export const SCRIM = {
  x: sc(0),
  y: sc(506), // raw bbox y
  w: sc(718), // raw bbox w
  h: sc(394), // raw bbox h (to frame bottom)
  // stop where the fade begins, as a fraction of the scrim height (~ (600-506)/394)
  fadeStart: 0.24,
};

// ---- Wordmark PNG (3249:31669) ---------------------------------------------
export const WORDMARK = {
  src: "boss-carousel/tal-boss-wordmark.png",
  x: sc(315.59375), // raw bbox x
  y: sc(787), // raw bbox y
  w: sc(88.88054656982422), // raw bbox w
  h: sc(82.041015625), // raw bbox h
};

// ---- Neighbours -------------------------------------------------------------
// The Figma reference shows the cards bleeding past the phone at FULL brightness
// (the "TATA DIGITAL" badge is pure white) — the phone pops via its bezel + white
// screen + cropping, not via dimming. Sampling the reference confirmed ~1.0.
// Set to e.g. 0.32 for the dimmed look the brief originally assumed.
export const DIM = 1.0; // brightness() applied to the strip bleeding past the phone
