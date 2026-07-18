export type SkillGroup = {
  category: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["JavaScript", "TypeScript", "Python", "HTML5", "CSS3"],
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express.js"],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "Prisma ORM"],
  },
  {
    category: "AI",
    skills: [
      "Prompt Engineering",
      "Claude AI",
      "ChatGPT",
      "Ollama",
      "AI Testing",
      "Data Annotation",
    ],
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub", "Vercel", "VS Code", "REST APIs"],
  },
];
