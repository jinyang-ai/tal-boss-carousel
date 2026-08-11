// ---------------------------------------------------------------------------
// cards-eng.ts — the 6 engineering-leader cards (Bosses of Bangalore, eng cut).
// Order note: the two Zepto cards (ansuman, nikhil) are kept 3 apart so the
// same badge never shows on consecutive cards (adjacency wraps around the loop).
// Harshit is the last GENERATED PLACEHOLDER (initials on a gradient); all other
// cards carry real LinkedIn photos + official company logos.
// ---------------------------------------------------------------------------

import { BossCard } from "./cards";

export const ENG_CARDS: BossCard[] = [
  {
    // REAL assets (LinkedIn photo + official Rippling logo)
    id: "jayant", name: "Jayant P", role: "Engineering Leader",
    portrait: "jayant.png", p: { x: 0, y: -43, w: 386, h: 386 },
    logo: "logo-rippling.png", l: { x: 0, y: 0, w: 114, h: 114 },
    badge: "purple", textTop: 328, gap: 2, roleLH: 16,
  },
  {
    // REAL assets (LinkedIn photo + official Zepto company logo); 2-line role
    // uses the taller text settings from the PM build (cf. Puneet in cards.ts).
    id: "ansuman", name: "Ansuman S", role: "Associate Director of engineering",
    portrait: "ansuman.png", p: { x: 0, y: -43, w: 386, h: 386 },
    logo: "logo-zepto.png", l: { x: 0, y: 0, w: 114, h: 114 },
    badge: "purple", textTop: 323, gap: 9, roleLH: 24,
  },
  {
    // REAL assets (LinkedIn photo + official Headout logo)
    id: "rachit", name: "Rachit W", role: "Chief technology officer",
    portrait: "rachit.png", p: { x: 0, y: -43, w: 386, h: 386 },
    logo: "logo-headout.png", l: { x: 0, y: 0, w: 114, h: 114 },
    badge: "purple", textTop: 328, gap: 2, roleLH: 16,
  },
  {
    // REAL assets (LinkedIn photo + official WeWork India logo — black-on-white
    // mark, so this badge is white with a shadow instead of purple-ringed)
    id: "kiran", name: "Kiran K", role: "Director of engineering",
    portrait: "kiran.png", p: { x: 0, y: -43, w: 386, h: 386 },
    logo: "logo-wework.png", l: { x: 0, y: 0, w: 114, h: 114 },
    badge: "white-shadow", textTop: 328, gap: 2, roleLH: 16,
  },
  {
    // REAL assets (LinkedIn photo + official Zepto logo — second Zepto card)
    id: "nikhil", name: "Nikhil M", role: "Chief technology officer",
    portrait: "nikhil.png", p: { x: 0, y: -43, w: 386, h: 386 },
    logo: "logo-zepto.png", l: { x: 0, y: 0, w: 114, h: 114 },
    badge: "purple", textTop: 328, gap: 2, roleLH: 16,
  },
  {
    // REAL assets (LinkedIn photo + official Swish logo). Subject sits small and
    // off-centre in the source photo, so the crop zooms 1.6x onto his face/torso.
    id: "mayank", name: "Mayank A", role: "Founding Engineer",
    portrait: "mayank.png", p: { x: -174, y: -63, w: 618, h: 618 },
    logo: "logo-swish.png", l: { x: 0, y: 0, w: 114, h: 114 },
    badge: "purple", textTop: 328, gap: 2, roleLH: 16,
  },
];
