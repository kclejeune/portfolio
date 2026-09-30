import { EmailIcon, GitHubIcon, LinkedInIcon, ResumeIcon } from "$lib/components/icons";

const baseUrl = "https://www.kclj.io";

const name = "Kennan LeJeune";
const description = "Full-stack Software Engineer";

// Each section of the site is a face of the cube: its `face` sticker color is
// the accent for that page (see `[data-face]` in app.css), its nav marker, and
// the mini-cube logo's color.
export const siteConfig = {
  baseUrl,
  name,
  description,
  routes: {
    home: {
      path: "/",
      canonicalUrl: baseUrl,
      title: "Home",
      face: "green",
      head: {
        title: `${name} | Software Engineer`,
        description: `${name} is a full-stack software engineer building platform infrastructure, networking, and hardware integration for distributed robotic systems.`,
      },
    },
    about: {
      path: "/about",
      canonicalUrl: `${baseUrl}/about`,
      title: "About",
      face: "orange",
      blurb: "Background and speedcubing",
      head: {
        title: `About | ${name}`,
        description: `About ${name}, a software engineer at Anduril Industries working on infrastructure for distributed systems and robotics.`,
      },
    },
    work: {
      path: "/work",
      canonicalUrl: `${baseUrl}/work`,
      title: "Work",
      face: "blue",
      blurb: "Currently at Anduril, formerly JHU APL",
      head: {
        title: `Work | ${name}`,
        description: `Where ${name} has worked: Anduril Industries and the Johns Hopkins Applied Physics Laboratory.`,
      },
    },
    projects: {
      path: "/projects",
      canonicalUrl: `${baseUrl}/projects`,
      title: "Projects",
      face: "green",
      blurb: "Open source work from GitHub",
      head: {
        title: `Projects | ${name}`,
        description: `Open source projects, languages, and tools of ${name}, pulled from GitHub.`,
      },
    },
  },
} as const;

export const links = {
  github: "https://github.com/kclejeune",
  linkedin: "https://linkedin.com/in/kclejeune",
  email: "mailto:contact@kclj.io",
  resume: "https://assets.kclj.io/resume.pdf",
  lattice: "https://www.anduril.com/lattice/mission-autonomy",
  source: "https://github.com/kclejeune/portfolio",
} as const;

// Contact links, in display order. The footer shows all but the resume.
export const contacts = [
  { href: links.github, label: "GitHub", icon: GitHubIcon },
  { href: links.linkedin, label: "LinkedIn", icon: LinkedInIcon },
  { href: links.email, label: "Email", icon: EmailIcon },
  { href: links.resume, label: "Resume", icon: ResumeIcon },
];

// Ordered section list for navigation (the logo links home).
export const sections = [
  siteConfig.routes.about,
  siteConfig.routes.work,
  siteConfig.routes.projects,
];
