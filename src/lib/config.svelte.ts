// Site configuration
const baseUrl = "https://www.kclj.io";

const name = "Kennan LeJeune";
const description = "Full-stack Software Engineer";

export const siteConfig = {
  baseUrl,
  name,
  description,
  routes: {
    home: { path: "/", canonicalUrl: baseUrl, title: "Home" },
    about: {
      path: "/about",
      canonicalUrl: `${baseUrl}/about`,
      title: "About",
    },
    work: {
      path: "/work",
      canonicalUrl: `${baseUrl}/work`,
      title: "Work",
    },
    projects: {
      path: "/projects",
      canonicalUrl: `${baseUrl}/projects`,
      title: "Projects",
    },
    skills: {
      path: "/skills",
      canonicalUrl: `${baseUrl}/skills`,
      title: "Skills",
    },
  },
} as const;

// Ordered route list for navigation
export const routes = Object.values(siteConfig.routes);

// Get previous and next routes for a given path
export function getAdjacentRoutes(currentPath: string) {
  const currentIndex = routes.findIndex((r) => r.path === currentPath);
  if (currentIndex === -1) return { prev: null, next: null };

  return {
    prev: currentIndex > 0 ? routes[currentIndex - 1] : null,
    next: currentIndex < routes.length - 1 ? routes[currentIndex + 1] : null,
  };
}
