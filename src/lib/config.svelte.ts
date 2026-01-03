// Site configuration
const baseUrl = "https://www.kclj.io";

const name = "Kennan LeJeune";
const description = "Full-stack Software Engineer";

export const siteConfig = {
  baseUrl,
  name,
  description,
  routes: {
    home: { path: "/", canonicalUrl: baseUrl },
    about: {
      path: "/about",
      canonicalUrl: `${baseUrl}/about`,
      title: "About Me",
    },
    work: {
      path: "/work",
      canonicalUrl: `${baseUrl}/work`,
      title: "Work Experience",
    },
    projects: {
      path: "/projects",
      canonicalUrl: `${baseUrl}/projects`,
      title: "Projects",
    },
    skills: {
      path: "/skills",
      canonicalUrl: `${baseUrl}/skills`,
      title: "Skills & Technologies",
    },
  },
} as const;
