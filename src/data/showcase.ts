import { existsSync } from "node:fs";
import type { ImageMetadata } from "astro";
import { featured, inProgress, moreWork, type Project } from "./portfolio";

// Screenshots dropped into src/assets/projects/<id>/ (by scripts/prepare-assets.mjs) give that
// project a /work/<id> page. Files sort by their numeric prefix; the rest of the name is the caption.
const files = import.meta.glob<ImageMetadata>("../assets/projects/*/*.png", {
  eager: true,
  import: "default",
});
// Pages are prerendered from the project root, so public/ is checked on disk at build time.
const videoFor = (id: string) =>
  existsSync(`public/videos/${id}.mp4`) ? `/videos/${id}.mp4` : undefined;

const acronyms: Record<string, string> = { btc: "BTC" };
const caption = (file: string) => {
  const words = file.replace(/^\d+-/, "").replace(".png", "").split("-");
  const text = words.map((w) => acronyms[w] ?? w).join(" ");
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export interface Screen {
  src: ImageMetadata;
  caption: string;
}

export interface Showcase {
  project: Project;
  href: string;
  screens: Screen[];
  video?: string;
}

const projects = [...featured, inProgress, ...moreWork];

export const showcases: Showcase[] = projects.flatMap((project) => {
  const screens = Object.entries(files)
    .filter(([path]) => path.split("/").at(-2) === project.id)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, src]) => ({ src, caption: caption(path.split("/").at(-1)!) }));
  if (!screens.length) return [];
  return [
    {
      project,
      href: `/work/${project.id}`,
      screens,
      video: videoFor(project.id),
    },
  ];
});

export const showcaseHref = (id: string) =>
  showcases.find((s) => s.project.id === id)?.href;
