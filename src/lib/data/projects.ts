export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  tech: string[];
  githubUrl: string;
  liveUrl: string | null;
  featured: boolean;
  complexity: "Intermediate" | "Advanced";
  category: string;
};

// Hand-written, recruiter-facing copy based on each repo's real README —
// not copied verbatim. Source: github.com/emmanuelokocha1234-commits
export const projects: Project[] = [
  {
    slug: "mophins",
    title: "Mophins — AI Audio Enhancement Platform",
    tagline:
      "Real-time audio denoising with pretrained AI models and DSP baselines",
    description:
      "A full-stack audio enhancement platform: record or upload audio and run it through either a pretrained AI denoising model or a traditional DSP algorithm, then compare the result against the original using objective quality metrics. The FastAPI backend exposes every enhancement engine behind one shared interface so new engines can be added without touching the API or frontend, and the whole thing is deployed live rather than left as a local-only demo.",
    features: [
      "Interchangeable AI (SpeechBrain/PyTorch) and DSP enhancement engines behind a common interface",
      "Before/after comparison UI with waveform players and objective quality metrics",
      "Single-slot model cache/eviction system to fit multiple AI models in a 512MB RAM budget",
      "Live production deployment on Vercel (frontend) and Render (backend), with clean degradation when an engine is disabled rather than crashing",
    ],
    tech: [
      "FastAPI",
      "Python",
      "PyTorch",
      "SpeechBrain",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Docker",
    ],
    githubUrl:
      "https://github.com/emmanuelokocha1234-commits/mophins",
    liveUrl: "https://mophins-frontend.vercel.app",
    featured: true,
    complexity: "Advanced",
    category: "AI",
  },
  {
    slug: "varsity-ai-assistant",
    title: "Varsity AI — Conversational Agent for Student Support",
    tagline:
      "RAG-powered university chatbot with a fine-tuned BERT intent layer",
    description:
      "A ChatGPT-style assistant purpose-built for a university: course registration, academic policies, fees, exam schedules, graduation requirements, and general FAQs, grounded in real institutional data via retrieval-augmented generation. A fine-tuned BERT/DistilBERT layer handles intent and entity recognition, with Groq-hosted Llama 3 generating the actual responses — and a strict grounding rule means student-record data and knowledge-base data are never silently blended.",
    features: [
      "JWT auth with refresh-token rotation and four-tier RBAC (student/lecturer/admin/super-admin)",
      "Streaming, markdown-rendered chat grounded in RAG over an indexed knowledge base",
      "Admin knowledge-base upload with automatic chunking, embedding, and indexing",
      "Full BERT fine-tuning pipeline — dataset prep, training, accuracy/F1/confusion-matrix evaluation — that activates automatically once real training data exists",
    ],
    tech: [
      "FastAPI",
      "Python",
      "PostgreSQL",
      "React",
      "RAG",
      "BERT",
      "Groq / Llama 3",
      "JWT",
      "Docker",
    ],
    githubUrl:
      "https://github.com/emmanuelokocha1234-commits/varsity-ai-assistant",
    liveUrl: null,
    featured: true,
    complexity: "Advanced",
    category: "AI",
  },
  {
    slug: "mindbridge",
    title: "MindBridge — AI Mental Health & Counselling Platform",
    tagline: "Mental health platform for Nigerian university students",
    description:
      "A complete API layer for a mental health and counselling platform: student/counsellor/admin domains, AI-assisted chat with built-in crisis detection, mood tracking, appointment booking, curated resources, and real-time notifications over Socket.IO — all on a full Prisma/PostgreSQL schema with one consistent response envelope across every endpoint.",
    features: [
      "Crisis detection built directly into the AI chat pipeline",
      "Real-time notifications via Socket.IO",
      "Email-verification-gated auth flow with hashed, single-use verification tokens",
      "Mood tracking and appointment scheduling with a consistent `{ success, data, meta }` API contract throughout",
    ],
    tech: [
      "Node.js",
      "Express",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Socket.IO",
      "JWT",
    ],
    githubUrl: "https://github.com/emmanuelokocha1234-commits/mindbridge",
    liveUrl: null,
    featured: true,
    complexity: "Advanced",
    category: "Full-Stack",
  },
  {
    slug: "account-authenticity-detector",
    title: "Account Authenticity Detector",
    tagline:
      "Bot-probability detection with offline heuristics and a cloud mode",
    description:
      "A bot/fake-account detection tool with a weighted heuristic scoring engine that runs entirely offline in the browser, plus an optional 'Cloud Mode' backend that persists results and exposes analysis history — powered by the exact same scoring engine, so results stay consistent whether or not a user is signed in.",
    features: [
      "Dual offline/cloud analysis modes sharing one scoring engine — same result either way",
      "JWT auth with bcrypt password hashing and refresh tokens",
      "Centralized error handling with a consistent response shape across the API",
      "Zod request validation, rate limiting, and structured Winston logging",
    ],
    tech: ["Node.js", "Express", "PostgreSQL", "Prisma", "JWT", "Zod"],
    githubUrl:
      "https://github.com/emmanuelokocha1234-commits/account-authenticity-detector",
    liveUrl: null,
    featured: false,
    complexity: "Intermediate",
    category: "AI",
  },
  {
    slug: "invenio-inventory-system",
    title: "Invenio — Inventory Management System",
    tagline: "Role-based inventory management with zero framework dependencies",
    description:
      "A working inventory management system — login, product management, stock-in/out, low-stock alerts, reporting, and user management — backed by a real SQLite database and built entirely on Node's built-in HTTP and SQLite modules, with no external web framework.",
    features: [
      "Three-tier role-based access: Administrator, Inventory Officer, Sales Staff",
      "Stock-in/stock-out tracking with automatic low-stock alerts",
      "Cookie-based session authentication built from scratch, no auth library",
      "Vanilla JavaScript SPA frontend served by a zero-dependency Node HTTP server",
    ],
    tech: ["Node.js", "SQLite", "JavaScript", "HTML", "CSS"],
    githubUrl:
      "https://github.com/emmanuelokocha1234-commits/invenio-inventory-system",
    liveUrl: null,
    featured: false,
    complexity: "Intermediate",
    category: "Full-Stack",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
