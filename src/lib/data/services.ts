export type Service = {
  title: string;
  description: string;
  icon: "code" | "sparkles" | "layout" | "terminal" | "plug" | "bot";
};

export const services: Service[] = [
  {
    title: "Website Development",
    description:
      "Fast, responsive, production-ready websites built with Next.js and Tailwind CSS — from marketing sites to full web apps.",
    icon: "layout",
  },
  {
    title: "AI Applications",
    description:
      "AI-enabled features and applications — RAG pipelines, chat assistants, model integration — built on real infrastructure, not demos.",
    icon: "sparkles",
  },
  {
    title: "Frontend Development",
    description:
      "Clean, accessible, well-typed React/Next.js interfaces with careful attention to performance and UX detail.",
    icon: "code",
  },
  {
    title: "Prompt Engineering",
    description:
      "Designing and testing prompts and grounding strategies for reliable, on-task LLM behavior across Claude, GPT, and open models.",
    icon: "bot",
  },
  {
    title: "API Integration",
    description:
      "Connecting frontends to third-party and internal APIs — REST design, auth flows, and clean error handling included.",
    icon: "plug",
  },
  {
    title: "Automation",
    description:
      "Scripting and tooling to remove repetitive manual work from a workflow, backend or frontend.",
    icon: "terminal",
  },
];
