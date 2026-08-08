// ---------------------------------------------------------------------------
// cards.ts — the 10 PM-leader cards, in left-to-right order from strip 3249:31582.
// Crops (`p` = portrait, `l` = logo) are raw Figma px: the image's box inside its
// clip container (portrait container 386x300; badge circle 114). Card.tsx scales
// them. `badge`, `textTop`, `gap`, `roleLH` also come straight from Figma.
// ---------------------------------------------------------------------------

export type Badge = "white" | "white-shadow" | "purple";

export type Crop = { x: number; y: number; w: number; h: number };

export type BossCard = {
  id: string;
  name: string; // raw source string; rendered uppercase via CSS
  role: string;
  portrait: string; // file under public/boss-carousel/cards/
  p: Crop; // portrait crop (figma px, in the 386x300 container)
  logo: string; // file under public/boss-carousel/logos/
  l: Crop; // logo crop (figma px, in the 114 circle)
  badge: Badge;
  textTop: number; // figma px: name/role block top
  gap: number; // figma px: gap between name and role
  roleLH: number; // figma px: role line-height
};

export const CARDS: BossCard[] = [
  {
    id: "srikanth", name: "Srikanth a", role: "Product manager 2",
    portrait: "srikanth.png", p: { x: -75, y: 0, w: 545, h: 545 },
    logo: "l935903.png", l: { x: -12, y: -12, w: 138, h: 138 },
    badge: "white", textTop: 328, gap: 2, roleLH: 16,
  },
  {
    id: "tapish", name: "Tapish k", role: "product manager 2",
    portrait: "tapish.png", p: { x: -95, y: -226, w: 661, h: 661 },
    logo: "l935901.png", l: { x: -17, y: -17, w: 148, h: 148 },
    badge: "white", textTop: 328, gap: 2, roleLH: 16,
  },
  {
    id: "logarajan", name: "Logarajan m", role: "Group product manager",
    portrait: "logarajan.png", p: { x: -359, y: -171, w: 910, h: 910 },
    logo: "l935890.png", l: { x: -18.804, y: -17.629, w: 151.608, h: 151.608 },
    badge: "purple", textTop: 328, gap: 2, roleLH: 16,
  },
  {
    id: "ayush", name: "Ayush K", role: "Director of product management",
    portrait: "ayush.png", p: { x: -11, y: -21, w: 408, h: 408 },
    logo: "l935899.png", l: { x: 4, y: 4, w: 106, h: 106 },
    badge: "white-shadow", textTop: 323, gap: 9, roleLH: 24,
  },
  {
    id: "puneet", name: "Puneet J", role: "Director of product management",
    portrait: "puneet.png", p: { x: -83, y: -122, w: 524, h: 524 },
    logo: "l935890.png", l: { x: -18.804, y: -17.629, w: 151.608, h: 151.608 },
    badge: "purple", textTop: 323, gap: 9, roleLH: 24,
  },
  {
    id: "piyush", name: "Piyush GUpta", role: "Head of product",
    portrait: "piyush.png", p: { x: 0, y: 0, w: 386, h: 386 },
    logo: "l935900.png", l: { x: 0, y: 0, w: 114, h: 114 },
    badge: "purple", textTop: 328, gap: 2, roleLH: 16,
  },
  {
    id: "ankit", name: "Ankit agarwal", role: "Chief product officer",
    portrait: "ankit.png", p: { x: -35, y: -40, w: 456, h: 466 },
    logo: "l935890.png", l: { x: -18.804, y: -17.629, w: 151.608, h: 151.608 },
    badge: "purple", textTop: 328, gap: 2, roleLH: 16,
  },
  {
    id: "akash", name: "Akash Mehta", role: "Vice president - product",
    portrait: "akash.png", p: { x: -118, y: -87, w: 638, h: 638 },
    logo: "l935904.png", l: { x: 5, y: 5, w: 104, h: 104 },
    badge: "purple", textTop: 328, gap: 2, roleLH: 16,
  },
  {
    id: "meet", name: "Meet pathak", role: "Group product manager",
    portrait: "meet.png", p: { x: -70, y: -63, w: 526, h: 597 },
    logo: "l935898.png", l: { x: 10, y: 6, w: 100, h: 100 },
    badge: "white", textTop: 328, gap: 2, roleLH: 16,
  },
  {
    id: "kapil", name: "Kapil thakur", role: "Principal product manager",
    portrait: "kapil.png", p: { x: -189, y: 0, w: 800, h: 800 },
    logo: "l935902.png", l: { x: 16, y: 19, w: 82, h: 68 },
    badge: "white", textTop: 328, gap: 2, roleLH: 16,
  },
];
