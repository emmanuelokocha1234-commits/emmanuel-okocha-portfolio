"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/data/projects";
import type { RepoStats } from "@/lib/github";

export function ProjectsGrid({
  projects,
  stats,
}: {
  projects: Project[];
  stats: Record<string, RepoStats>;
}) {
  const technologies = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tech.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort()];
  }, [projects]);

  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.tech.includes(filter));

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {technologies.map((tech) => (
          <Button
            key={tech}
            size="sm"
            variant={filter === tech ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setFilter(tech)}
          >
            {tech}
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No projects match that filter.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <ScrollReveal key={project.slug} delay={(i % 3) * 0.06}>
              <ProjectCard
                project={project}
                index={i}
                stars={stats[project.slug]?.stars}
              />
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
