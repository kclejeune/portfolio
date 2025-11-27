export interface Job {
  employer: string;
  title: string;
  startDate: Date;
  endDate: Date;
  description?: string;
  tasks: string[];
  tags?: string[];
}

const currentDate = new Date();

export const jobs: Job[] = [
  {
    employer: "Anduril Industries",
    title: "Software Engineer",
    startDate: new Date(2025, 0),
    endDate: new Date(currentDate.getFullYear(), currentDate.getMonth()),
    tasks: [
      "Building scalable infrastructure for Lattice Mission Autonomy",
      "Developing tooling for highly representative autonomous vehicle simulations",
    ],
    tags: ["NixOS", "Kubernetes", "AWS"],
  },
  {
    employer: "Johns Hopkins University Applied Physics Laboratory",
    title: "Software Engineer",
    startDate: new Date(2021, 5),
    endDate: new Date(2024, 11),
    tasks: [
      "Applied NLP and semantic knowledge representation methods to detect early stage biothreats from large-scale public data sources",
      "Built DevOps tooling to improve software quality and optimize developer workflows",
      "Designed machine learning models for viral and bacterial threat classification using Scikit-Learn, Tensorflow, and Keras",
    ],
    tags: ["Python", "Machine Learning", "NLP", "DevOps", "Tensorflow"],
  },
  {
    employer: "Agriplex Genomics",
    title: "Software Engineering Intern",
    startDate: new Date(2018, 8),
    endDate: new Date(2019, 4),
    tasks: [
      "Developed a job scheduling application from scratch in Angular and designed an algorithm to optimize job scheduling to increase data throughput.",
      "Designed a Postgres database model to store jobs and their associated data, and built a corresponding REST API to allow application interaction.",
      "Created an Amazon AWS management server to create and destroy EC2 instances to efficiently allocate funds and expedite job processing.",
    ],
    tags: ["Angular", "Typescript", "Postgres", "AWS"],
  },
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatDateRange(start: Date, end: Date): string {
  const formatDate = (date: Date) =>
    `${months[date.getMonth()]} ${date.getFullYear()}`;
  return `${formatDate(start)} - ${formatDate(end)}`;
}
