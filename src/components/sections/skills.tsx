import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { skillGroups } from "@/lib/data/skills";

export function Skills() {
  return (
    <section
      id="skills"
      className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <ScrollReveal>
        <div className="mb-14 text-center">
          <p className="text-sm font-medium text-cyan-400">Skills</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            What I work with
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <ScrollReveal key={group.category} delay={i * 0.05}>
            <div className="glass-card h-full p-6">
              <h3 className="mb-4 text-sm font-semibold tracking-wide text-cyan-400 uppercase">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border/60 bg-background/40 px-3 py-1.5 text-sm transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
