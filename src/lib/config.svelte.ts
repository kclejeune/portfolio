// Site configuration
const baseUrl = "https://www.kclj.io";

const name = "Kennan LeJeune";
const description = "Full-stack Software Engineer";

/**
 * Each section of the site is a face of the cube: its sticker color is the
 * accent for that page, the nav marker, and the mini-cube logo.
 */
export type Face = "green" | "orange" | "blue";

export const siteConfig = {
  baseUrl,
  name,
  description,
  routes: {
    home: { path: "/", canonicalUrl: baseUrl, title: "Home", face: "green" },
    about: {
      path: "/about",
      canonicalUrl: `${baseUrl}/about`,
      title: "About",
      face: "orange",
      blurb: "Background, education, and speedcubing.",
    },
    work: {
      path: "/work",
      canonicalUrl: `${baseUrl}/work`,
      title: "Work",
      face: "blue",
      blurb: "Where I've worked and what I did there.",
    },
    projects: {
      path: "/projects",
      canonicalUrl: `${baseUrl}/projects`,
      title: "Projects",
      face: "green",
      blurb: "Open source work, languages, and tools.",
    },
  },
} as const;

export const links = {
  github: "https://github.com/kclejeune",
  linkedin: "https://linkedin.com/in/kclejeune",
  email: "mailto:contact@kclj.io",
  resume: "https://assets.kclj.io/resume.pdf",
  source: "https://github.com/kclejeune/portfolio",
} as const;

// Ordered section list for navigation (the logo links home).
export const sections = [
  siteConfig.routes.about,
  siteConfig.routes.work,
  siteConfig.routes.projects,
];

export function faceFor(path: string): Face {
  return sections.find((s) => path.startsWith(s.path))?.face ?? siteConfig.routes.home.face;
}

/** The section after this one, wrapping back to the first. */
export function nextSection(path: string) {
  const index = sections.findIndex((s) => path.startsWith(s.path));
  return index === -1 ? null : sections[(index + 1) % sections.length];
}
