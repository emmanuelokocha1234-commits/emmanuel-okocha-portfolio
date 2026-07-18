import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "@/components/shared/github-icon";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import type { Project } from "@/lib/data/projects";

const gradients = [
  "from-indigo-500/20 via-violet-500/10 to-transparent",
  "from-cyan-500/20 via-blue-500/10 to-transparent",
  "from-fuchsia-500/20 via-pink-500/10 to-transparent",
  "from-emerald-500/20 via-teal-500/10 to-transparent",
  "from-amber-500/20 via-orange-500/10 to-transparent",
];

export function ProjectCard({
  project,
  index = 0,
  stars,
}: {
  project: Project;
  index?: number;
  stars?: number;
}) {
  const gradient = gradients[index % gradients.length];

  return (
    <SpotlightCard
      spotlightColor="rgba(99,102,241,0.18)"
      className="glass-card group flex h-full flex-col overflow-hidden"
    >
      <div
        className={`relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br ${gradient}`}
      >
        <span className="text-4xl font-bold tracking-tight text-foreground/10 select-none">
          {project.title.split(" ")[0]}
        </span>
        <div className="absolute right-3 top-3 flex items-center gap-2">
          <Badge variant="secondary" className="backdrop-blur-sm">
            {project.complexity}
          </Badge>
          {typeof stars === "number" && stars > 0 && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 backdrop-blur-sm"
            >
              <Star className="size-3" />
              {stars}
            </Badge>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-base font-semibold leading-snug">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {project.tagline}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.tech.slice(0, 5).map((t) => (
            <Badge key={t} variant="outline" className="font-normal">
              {t}
            </Badge>
          ))}
          {project.tech.length > 5 && (
            <Badge variant="outline" className="font-normal">
              +{project.tech.length - 5}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-4 pt-2 text-sm">
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <GithubIcon className="size-4" />
            Code
          </Link>
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowUpRight className="size-4" />
              Live Demo
            </Link>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}
