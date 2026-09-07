// ---------------------------------------------------------------------------
// cards-blr.ts — "Bangalore startup bosses" cut. 5 senior leaders sourced from
// the Tal Boss Mixpanel roster (registered bosses in Bengaluru), each carrying a
// real LinkedIn photo + official company logo. Roles/companies come from their
// Tal Boss profiles; photos + logos were supplied directly.
//
// NOTE: Vivek V. — Head of Engineering at Swiggy Crew (Mixpanel had him as
// "AVP – Engineering, Swiggy"; updated per confirmation). Uses the Crew logo.
// ---------------------------------------------------------------------------

import { BossCard } from "./cards";

export const BLR_CARDS: BossCard[] = [
  {
    // Forbes 30-Under-30 ring in the source photo, so the crop zooms in past the
    // frame/badge onto the face.
    id: "blr-abhinav", name: "Abhinav Anurag", role: "Co-Founder & CTO",
    portrait: "blr-abhinav.png", p: { x: -147, y: -165, w: 680, h: 680 },
    logo: "logo-schmooze.png", l: { x: 0, y: 0, w: 114, h: 114 },
    badge: "white", textTop: 328, gap: 2, roleLH: 16,
  },
  {
    // Casual sunglasses/cap selfie; crop zooms onto the face and away from the
    // boat-window framing.
    id: "blr-vaibhav", name: "Vaibhav Magon", role: "VP of Engineering",
    portrait: "blr-vaibhav.png", p: { x: 0, y: -183, w: 620, h: 620 },
    logo: "logo-acko.png", l: { x: 0, y: 0, w: 114, h: 114 },
    badge: "white", textTop: 328, gap: 2, roleLH: 16,
  },
  {
    // 2-line role uses the taller text settings (cf. Puneet in cards.ts).
    id: "blr-rahul", name: "Rahul Jain", role: "Senior Director of Engineering",
    portrait: "blr-rahul.png", p: { x: 0, y: -43, w: 386, h: 386 },
    logo: "logo-flipkart-real.png", l: { x: 0, y: 0, w: 114, h: 114 },
    badge: "white", textTop: 323, gap: 9, roleLH: 24,
  },
  {
    id: "blr-aryan", name: "Aryan Yadav", role: "Co-Founder & CTO",
    portrait: "blr-aryan.png", p: { x: 0, y: -43, w: 386, h: 386 },
    logo: "logo-neosapien.png", l: { x: 0, y: 0, w: 114, h: 114 },
    badge: "white", textTop: 328, gap: 2, roleLH: 16,
  },
  {
    // Vivek V. — see file header note (Crew logo, Swiggy per Mixpanel).
    id: "blr-vivek", name: "Vivek V.", role: "Head of Engineering",
    portrait: "blr-vivek.png", p: { x: 0, y: -43, w: 386, h: 386 },
    logo: "logo-crew.png", l: { x: 0, y: 0, w: 114, h: 114 },
    badge: "white", textTop: 328, gap: 2, roleLH: 16,
  },
];
