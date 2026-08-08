import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("png");
Config.setConcurrency(4);
// No global scale: BossCarousel is authored at its final 1080x1350.
// GIF output size is controlled per-render via --scale (see package.json scripts).
