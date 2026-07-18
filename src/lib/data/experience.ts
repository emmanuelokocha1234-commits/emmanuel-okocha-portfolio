export type TimelineEntry = {
  type: "education" | "experience" | "research";
  title: string;
  organization: string;
  period: string;
  description: string;
  bullets?: string[];
};

export const timeline: TimelineEntry[] = [
  {
    type: "experience",
    title: "Frontend Developer Intern",
    organization: "Codeline Technologies and Solutions, Ogba, Lagos",
    period: "Internship",
    description:
      "Contributed to production frontend work on a small development team.",
    bullets: [
      "Developed responsive web interfaces",
      "Assisted with debugging, testing, and UI improvements",
      "Collaborated on software development projects",
    ],
  },
  {
    type: "education",
    title: "B.Sc. Computer Science",
    organization: "Caleb University, Lagos, Nigeria",
    period: "Expected Graduation: 2026/2027",
    description:
      "Undergraduate coursework in computer science with a self-directed focus on full-stack web development and applied AI.",
  },
  {
    type: "research",
    title: "Independent Research & Applied AI Projects",
    organization: "Self-directed",
    period: "Ongoing",
    description:
      "Applied research across large language models, retrieval-augmented generation, and human-computer interaction, expressed through shipped projects rather than papers.",
    bullets: [
      "Retrieval-augmented generation with a fine-tuned BERT intent/NER layer (Varsity AI)",
      "Pretrained AI model evaluation for audio denoising against traditional DSP baselines (Mophins)",
      "Applied prompt engineering across Claude, ChatGPT, and self-hosted Ollama models",
    ],
  },
];
