import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { featuredProjects } from "@/lib/data/projects";
import { getAllRepoStats } from "@/lib/github";

export async function FeaturedProjects() {
  const stats = await getAllRepoStats();

  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <ScrollReveal>
        <div className="mb-14 text-center">
          <p className="text-sm font-medium text-emerald-400">Featured Projects</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Things I&apos;ve built
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Real, deployed and deployable projects — pulled live from GitHub.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project, i) => (
          <ScrollReveal key={project.slug} delay={i * 0.08}>
            <ProjectCard
              project={project}
              index={i}
              stars={stats[project.slug]?.stars}
            />
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.2}>
        <div className="mt-12 flex justify-center">
          <Button
            render={<Link href="/projects" />}
            nativeButton={false}
            variant="outline"
            size="lg"
            className="gap-2 rounded-full"
          >
            View All Projects
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </ScrollReveal>
    </section>
  );
}
