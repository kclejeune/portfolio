export interface Skill {
  name: string;
  /** Proficiency on a 1–5 scale. */
  level: number;
}

export interface SkillCategory {
  name: string;
  icon: "brain" | "code" | "server";
  skills: Skill[];
}

/** Axes for the radar chart — broad domains rather than individual tools. */
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
    skills: [
      { name: "Python", level: 5 },
      { name: "Scikit-Learn", level: 4 },
      { name: "TensorFlow", level: 4 },
      { name: "Keras", level: 4 },
    ],
  },
  {
    name: "Frontend Development",
    icon: "code",
    skills: [
      { name: "TypeScript", level: 5 },
      { name: "JavaScript", level: 5 },
      { name: "Svelte", level: 4 },
      { name: "Vue", level: 4 },
      { name: "Angular", level: 3 },
    ],
  },
  {
    name: "Backend & Systems",
    icon: "server",
    skills: [
      { name: "NixOS", level: 5 },
      { name: "Kubernetes", level: 4 },
      { name: "AWS", level: 4 },
      { name: "Java", level: 4 },
      { name: "Kotlin", level: 4 },
      { name: "Postgres", level: 4 },
    ],
  },
];

/** Flat list of every skill name, kept for any consumers that need it. */
export const skills: string[] = skillCategories.flatMap((c) => c.skills.map((s) => s.name));
