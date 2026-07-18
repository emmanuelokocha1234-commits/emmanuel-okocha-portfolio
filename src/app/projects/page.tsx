import type { Metadata } from "next";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { projects } from "@/lib/data/projects";
import { getAllRepoStats } from "@/lib/github";

export const metadata: Metadata = {
  title: "All Projects",
  description:
    "Every project — full-stack apps, AI assistants, and tools — built and shipped, with live GitHub stats.",
};

export default async function ProjectsPage() {
  const stats = await getAllRepoStats();

  return (
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="mb-14 text-center">
          <p className="text-sm font-medium text-indigo-400">All Projects</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything I&apos;ve built
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Filter by technology to see it in context.
          </p>
        </div>
      </ScrollReveal>

      <ProjectsGrid projects={projects} stats={stats} />
    </div>
  );
}
