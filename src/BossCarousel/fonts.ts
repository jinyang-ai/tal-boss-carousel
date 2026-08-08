// Loads the real Figma faces from public/fonts before the first frame renders.
// SF Pro Display (Semibold/Bold) + SF Pro Text (Semibold) for the headline and
// card text; Obviously Semibold for the "BOSSES OF BANGALORE" eyebrow (rendered
// live so the text can be edited). The iOS status bar stays baked in phone-chrome.png.
import { staticFile, delayRender, continueRender } from "remotion";

type Face = { family: string; weight: string; file: string };

const FACES: Face[] = [
  { family: "SF Pro Display", weight: "600", file: "fonts/SF-Pro-Display-Semibold.otf" },
  { family: "SF Pro Display", weight: "700", file: "fonts/SF-Pro-Display-Bold.otf" },
  { family: "SF Pro Text", weight: "600", file: "fonts/SF-Pro-Text-Semibold.otf" },
  { family: "Obviously", weight: "600", file: "fonts/ObviouslyDemo-Semibold.otf" },
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
