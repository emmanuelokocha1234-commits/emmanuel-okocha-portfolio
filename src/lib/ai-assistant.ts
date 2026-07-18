import { profile } from "@/lib/data/profile";
import { projects } from "@/lib/data/projects";
import { skillGroups } from "@/lib/data/skills";
import { timeline } from "@/lib/data/experience";

// Rule-based responder over the portfolio's own content data — no live LLM
// call yet. TODO: swap the body of `answerQuestion` for a real Claude API
// call (anthropic.messages.create with this file's data as system context)
// once ANTHROPIC_API_KEY is available.
export function answerQuestion(rawMessage: string): string {
  const message = rawMessage.toLowerCase();

  const has = (...words: string[]) => words.some((w) => message.includes(w));

  if (has("project", "built", "build", "portfolio piece", "app")) {
    const list = projects
      .map((p) => `• ${p.title} — ${p.tagline}`)
      .join("\n");
    return `Here are ${profile.firstName}'s projects:\n\n${list}\n\nAsk about any one of them by name for more detail, or check the Projects section for links.`;
  }

  const projectMatch = projects.find((p) =>
    has(p.slug.replace(/-/g, " "), p.title.toLowerCase())
  );
  if (projectMatch) {
    return `${projectMatch.title}: ${projectMatch.description}\n\nTech: ${projectMatch.tech.join(", ")}\nGitHub: ${projectMatch.githubUrl}${
      projectMatch.liveUrl ? `\nLive: ${projectMatch.liveUrl}` : ""
    }`;
  }

  if (has("skill", "tech stack", "technolog", "language", "framework")) {
    const list = skillGroups
      .map((g) => `${g.category}: ${g.skills.join(", ")}`)
      .join("\n");
    return `${profile.firstName}'s skills:\n\n${list}`;
  }

  if (has("ai", "llm", "prompt engineer", "machine learning", "rag", "bert")) {
    return `${profile.firstName} works hands-on with applied AI: prompt engineering across Claude, ChatGPT, and self-hosted Ollama models, retrieval-augmented generation, and fine-tuned BERT models for intent classification. See the Varsity AI and Mophins projects for concrete examples.`;
  }

  if (has("experience", "work", "intern", "job", "career")) {
    const list = timeline
      .map((t) => `• ${t.title} — ${t.organization} (${t.period})`)
      .join("\n");
    return `${profile.firstName}'s background:\n\n${list}`;
  }

  if (has("education", "school", "university", "degree", "study")) {
    return `${profile.firstName} is studying ${profile.education.degree} at ${profile.education.institution} (${profile.education.period}).`;
  }

  if (has("contact", "email", "hire", "reach", "phone", "available")) {
    return `You can reach ${profile.firstName} at ${profile.email}${
      profile.phone ? ` or ${profile.phone}` : ""
    }, or use the contact form below. Currently open to Software Engineer, Frontend, Full-Stack, and AI Engineer roles.`;
  }

  if (has("resume", "cv")) {
    return `You can download ${profile.firstName}'s resume from the "Resume" button in the navigation bar.`;
  }

  return `I can answer questions about ${profile.firstName}'s projects, skills, experience, and how to get in touch — try asking something like "what projects has he built?" or "what's his tech stack?"`;
}
