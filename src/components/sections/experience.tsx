import { Briefcase, GraduationCap, FlaskConical } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { timeline, type TimelineEntry } from "@/lib/data/experience";

const icons: Record<TimelineEntry["type"], typeof Briefcase> = {
  experience: Briefcase,
  education: GraduationCap,
  research: FlaskConical,
};

export function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <ScrollReveal>
        <div className="mb-14 text-center">
          <p className="text-sm font-medium text-indigo-400">Journey</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Experience &amp; Research
          </h2>
        </div>
      </ScrollReveal>

      <div className="relative space-y-8 border-l border-border/60 pl-8">
        {timeline.map((entry, i) => {
          const Icon = icons[entry.type];
          return (
            <ScrollReveal key={entry.title} delay={i * 0.1} direction="right">
              <div className="relative">
                <span className="glass-panel absolute -left-[2.55rem] flex size-8 items-center justify-center rounded-full">
                  <Icon className="size-4 text-indigo-400" />
                </span>
                <div className="glass-card p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-semibold">{entry.title}</h3>
                    <span className="text-xs text-muted-foreground">
                      {entry.period}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-indigo-400/90">
                    {entry.organization}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {entry.description}
                  </p>
                  {entry.bullets && (
                    <ul className="mt-3 space-y-1.5">
                      {entry.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-2 text-sm text-muted-foreground"
                        >
                          <span className="text-indigo-400">—</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
