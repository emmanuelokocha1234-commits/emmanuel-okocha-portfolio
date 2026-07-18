// One-off script — not run at build time. Regenerate with:
//   node scripts/generate-resume-pdf.mjs
// Content mirrors src/lib/data/profile.ts, experience.ts, and skills.ts.
// Update both places if the resume content changes.
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const INDIGO = rgb(0.31, 0.27, 0.9);
const DARK = rgb(0.09, 0.09, 0.11);
const GRAY = rgb(0.38, 0.38, 0.42);

const resume = {
  name: "Emmanuel Okocha Chinonso",
  location: "Lagos, Nigeria",
  github: "github.com/emmanuelokocha1234-commits",
  email: "emmanuelokocha1234@gmail.com",
  phone: "08167510521",
  summary:
    "Computer Science undergraduate with hands-on experience in frontend and full-stack web development, AI-assisted software development, prompt engineering, PostgreSQL, Prisma, and Python. Passionate about building modern, responsive applications and leveraging AI to solve real-world problems. Seeking Software Engineer, Frontend Developer, Full-Stack Developer, or AI Engineer opportunities.",
  education: [
    {
      title: "B.Sc. Computer Science — Caleb University, Lagos, Nigeria",
      period: "Expected Graduation: 2026/2027",
    },
  ],
  experience: [
    {
      title: "Frontend Developer Intern — Codeline Technologies and Solutions, Ogba, Lagos",
      bullets: [
        "Developed responsive web interfaces",
        "Assisted with debugging, testing, and UI improvements",
        "Collaborated on software development projects",
      ],
    },
  ],
  skills: [
    ["Languages", "JavaScript, TypeScript, Python, HTML5, CSS3"],
    ["Frontend", "React, Next.js, Tailwind CSS"],
    ["Backend", "Node.js, Express.js"],
    ["Databases", "PostgreSQL, Prisma ORM"],
    ["AI", "Prompt Engineering, Claude AI, ChatGPT, Ollama, AI Testing, Data Annotation"],
    ["Tools", "Git, GitHub, Vercel, VS Code, REST APIs"],
  ],
  projects: [
    "Mophins — AI audio noise-filtration web app (FastAPI, PyTorch, Next.js), deployed live",
    "Varsity AI — RAG-powered university conversational agent with fine-tuned BERT intent layer",
    "MindBridge — Mental health & counselling platform (Node.js, Prisma, PostgreSQL, Socket.IO)",
    "Account Authenticity Detector — bot-probability heuristic engine with cloud analysis mode",
    "Invenio — role-based inventory management system (Node.js, SQLite)",
  ],
  research: "Artificial Intelligence, Large Language Models, Prompt Engineering, AI Automation, Full-Stack Web Development, Human-Computer Interaction",
  soft: "Analytical Thinking, Problem Solving, Communication, Team Collaboration, Adaptability, Attention to Detail, Continuous Learning",
  objective:
    "To contribute as a software engineer by building high-quality AI-enabled and web-based solutions while continuously growing my technical expertise.",
};

function wrapText(text, font, size, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let current = "";

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(test, size) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

async function main() {
  const doc = await PDFDocument.create();
  const page = doc.addPage([612, 792]); // Letter
  const { width, height } = page.getSize();
  const margin = 56;
  const contentWidth = width - margin * 2;

  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  let y = height - margin;

  function text(str, { font = regular, size = 10, color = DARK, x = margin, gap = 14 } = {}) {
    page.drawText(str, { x, y, size, font, color });
    y -= gap;
  }

  function paragraph(str, { font = regular, size = 10, color = GRAY, gap = 13 } = {}) {
    for (const line of wrapText(str, font, size, contentWidth)) {
      text(line, { font, size, color, gap });
    }
  }

  function heading(str) {
    y -= 6;
    text(str.toUpperCase(), { font: bold, size: 11, color: INDIGO, gap: 4 });
    page.drawLine({
      start: { x: margin, y: y + 10 },
      end: { x: width - margin, y: y + 10 },
      thickness: 0.75,
      color: rgb(0.85, 0.85, 0.9),
    });
    y -= 8;
  }

  // Header
  text(resume.name, { font: bold, size: 22, gap: 20 });
  text(
    `${resume.location}  |  ${resume.email}  |  ${resume.phone}  |  ${resume.github}`,
    { size: 9.5, color: GRAY, gap: 22 }
  );

  heading("Professional Summary");
  paragraph(resume.summary);

  heading("Education");
  for (const edu of resume.education) {
    text(edu.title, { font: bold, size: 10, gap: 13 });
    text(edu.period, { size: 9.5, color: GRAY, gap: 16 });
  }

  heading("Experience");
  for (const exp of resume.experience) {
    text(exp.title, { font: bold, size: 10, gap: 14 });
    for (const bullet of exp.bullets) {
      paragraph(`•  ${bullet}`, { gap: 13 });
    }
    y -= 4;
  }

  heading("Technical Skills");
  for (const [label, value] of resume.skills) {
    const line = `${label}: `;
    page.drawText(line, { x: margin, y, size: 10, font: bold, color: DARK });
    const offset = bold.widthOfTextAtSize(line, 10);
    const wrapped = wrapText(value, regular, 10, contentWidth - offset);
    page.drawText(wrapped[0] ?? "", {
      x: margin + offset,
      y,
      size: 10,
      font: regular,
      color: GRAY,
    });
    y -= 14;
    for (const extra of wrapped.slice(1)) {
      text(extra, { x: margin + offset, size: 10, color: GRAY, gap: 14 });
    }
  }

  heading("Selected Projects");
  for (const project of resume.projects) {
    paragraph(`•  ${project}`, { gap: 13 });
  }

  heading("Research Interests");
  paragraph(resume.research);

  heading("Soft Skills");
  paragraph(resume.soft);

  heading("Career Objective");
  paragraph(resume.objective);

  const bytes = await doc.save();
  const outPath = path.join(__dirname, "..", "public", "resume.pdf");
  await writeFile(outPath, bytes);
  console.log(`Resume PDF written to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
