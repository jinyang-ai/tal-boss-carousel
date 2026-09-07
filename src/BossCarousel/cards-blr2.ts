// ---------------------------------------------------------------------------
// cards-blr2.ts — "Bangalore startup bosses, vol. 2". 4 senior leaders from the
// Tal Boss Mixpanel roster (registered bosses in Bengaluru); real LinkedIn
// photos + official company logos. Roles/companies come from their Tal Boss
// profiles. Nikhil (CTO, Zepto) opens as the most senior.
// ---------------------------------------------------------------------------

import { BossCard } from "./cards";

export const BLR2_CARDS: BossCard[] = [
  {
    id: "blr2-nikhil", name: "Nikhil Mittal", role: "Chief Technology Officer",
    portrait: "blr2-nikhil.png", p: { x: 0, y: -43, w: 386, h: 386 },
    logo: "logo-zepto2.png", l: { x: 0, y: 0, w: 114, h: 114 },
    badge: "white", textTop: 328, gap: 2, roleLH: 16,
  },
  {
    id: "blr2-himanshu", name: "Himanshu Sahu", role: "Head of Engineering",
    portrait: "blr2-himanshu.png", p: { x: 0, y: -43, w: 386, h: 386 },
    logo: "logo-phonepe.png", l: { x: 0, y: 0, w: 114, h: 114 },
    badge: "white", textTop: 328, gap: 2, roleLH: 16,
  },
  {
    id: "blr2-mohit", name: "Mohit Patni", role: "Head of Product",
    portrait: "blr2-mohit.png", p: { x: 0, y: -43, w: 386, h: 386 },
    logo: "logo-fi.png", l: { x: 0, y: 0, w: 114, h: 114 },
    badge: "white", textTop: 328, gap: 2, roleLH: 16,
  },
  {
    id: "blr2-yuvraj", name: "Yuvraj Adhikari", role: "Head of Applied AI",
    portrait: "blr2-yuvraj.png", p: { x: 0, y: -43, w: 386, h: 386 },
    logo: "logo-headout2.png", l: { x: 0, y: 0, w: 114, h: 114 },
    badge: "white", textTop: 328, gap: 2, roleLH: 16,
  },
];
