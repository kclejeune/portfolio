export interface Job {
  employer: string;
  employerUrl?: string;
  title: string;
  location?: string;
  startDate: Date;
  /** Omitted for the current role. */
  endDate?: Date;
  tasks: string[];
  tags?: string[];
}

export const jobs: Job[] = [
  {
    employer: "Anduril Industries",
    employerUrl: "https://www.anduril.com/",
    title: "Software Engineer",
    location: "Washington, DC",
    startDate: new Date(2025, 0),
    tasks: [
      "Building infrastructure for Lattice Mission Autonomy",
      "Developing tooling for high-fidelity autonomous vehicle simulation",
    ],
    tags: ["NixOS", "Kubernetes", "AWS"],
  },
  {
    employer: "Johns Hopkins University Applied Physics Laboratory",
    employerUrl: "https://www.jhuapl.edu/",
    title: "Software Engineer",
    location: "Laurel, MD",
    startDate: new Date(2021, 5),
    endDate: new Date(2024, 11),
    tasks: [
      "Applied NLP and knowledge representation methods to detect early-stage biothreats in large public datasets",
      "Built DevOps tooling to improve software quality and developer workflows",
      "Designed machine learning models to classify viral and bacterial threats, using scikit-learn, TensorFlow, and Keras",
    ],
    tags: ["Python", "Machine Learning", "NLP", "DevOps", "TensorFlow"],
  },
];

export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/** Duration like "2 yrs 3 mos", counting both end months. */
export function formatDuration(start: Date, end = new Date()): string {
  const total =
    (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
  const years = Math.floor(total / 12);
  const remMonths = total % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (remMonths > 0) parts.push(`${remMonths} mo${remMonths > 1 ? "s" : ""}`);
  return parts.join(" ") || "1 mo";
}

/** The current role, or the most recent one if none is ongoing. */
export const currentJob = jobs.find((job) => !job.endDate) ?? jobs[0];
