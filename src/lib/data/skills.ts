export interface SkillCategory {
  name: string;
  icon: "brain" | "code" | "server";
  skills: string[];
}

/** Fallback radar axes used only when live GitHub language data is missing. */
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
    icon: "brain",
    skills: ["Python", "Scikit-Learn", "TensorFlow", "Keras"],
  },
  {
    name: "Frontend Development",
    icon: "code",
    skills: ["TypeScript", "JavaScript", "Svelte", "Vue", "Angular"],
  },
  {
    name: "Backend & Systems",
    icon: "server",
    skills: ["NixOS", "Kubernetes", "AWS", "Java", "Kotlin", "Postgres"],
  },
];

/** Flat list of every skill name, kept for any consumers that need it. */
export const skills: string[] = skillCategories.flatMap((c) => c.skills);
