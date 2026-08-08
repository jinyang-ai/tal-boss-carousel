// Loads the real Figma faces from public/fonts before the first frame renders.
// SF Pro Display (Semibold/Bold) + SF Pro Text (Semibold) are the applied faces
// in the creative. The "10+ BOSSES" eyebrow (Obviously Semibold) and the iOS
// status bar are baked into phone-chrome.png (Figma's own render), so they need
// no live face here.
import { staticFile, delayRender, continueRender } from "remotion";

type Face = { family: string; weight: string; file: string };

const FACES: Face[] = [
  { family: "SF Pro Display", weight: "600", file: "fonts/SF-Pro-Display-Semibold.otf" },
  { family: "SF Pro Display", weight: "700", file: "fonts/SF-Pro-Display-Bold.otf" },
  { family: "SF Pro Text", weight: "600", file: "fonts/SF-Pro-Text-Semibold.otf" },
];

let started = false;

export const loadFonts = (): void => {
  if (started || typeof document === "undefined" || typeof FontFace === "undefined") return;
  started = true;
  const handle = delayRender("Loading SF Pro faces");
  Promise.all(
    FACES.map(async (f) => {
      const face = new FontFace(f.family, `url(${staticFile(f.file)})`, { weight: f.weight });
      await face.load();
      document.fonts.add(face);
    })
  )
    .then(() => continueRender(handle))
    .catch(() => continueRender(handle));
};
