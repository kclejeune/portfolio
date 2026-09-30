export interface SkillCategory {
  name: string;
  skills: string[];
}

/** Radar axes shown when GitHub language data is missing. */
export const skillDomains: { axis: string; level: number }[] = [
  { axis: "Distributed Systems", level: 5 },
  { axis: "Infra / DevOps", level: 5 },
  { axis: "Machine Learning", level: 4 },
  { axis: "Backend", level: 5 },
  { axis: "Frontend", level: 4 },
  { axis: "Languages", level: 4 },
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Machine Learning & AI",
    skills: ["Python", "Scikit-Learn", "TensorFlow", "Keras"],
  },
  {
    name: "Frontend Development",
    skills: ["TypeScript", "JavaScript", "Svelte", "Vue", "Angular"],
  },
  {
    name: "Backend & Systems",
    skills: ["Go", "NixOS", "Kubernetes", "AWS", "Java", "Kotlin", "Postgres"],
  },
];

export const skills: string[] = skillCategories.flatMap((c) => c.skills);

/** Lowercase repo language/topic terms a skill matches besides its own name. */
const skillAliases: Record<string, string[]> = {
  Go: ["golang"],
  NixOS: ["nix", "nix-darwin", "home-manager", "flakes"],
  Svelte: ["sveltekit"],
  Vue: ["vuejs", "nuxt"],
  Angular: ["angularjs"],
  Postgres: ["postgresql"],
  Kubernetes: ["k8s"],
  "Scikit-Learn": ["sklearn"],
  TensorFlow: ["tf"],
  AWS: ["amazon-web-services"],
};

export function skillTerms(skill: string): string[] {
  return [skill.toLowerCase(), ...(skillAliases[skill] ?? [])];
}
