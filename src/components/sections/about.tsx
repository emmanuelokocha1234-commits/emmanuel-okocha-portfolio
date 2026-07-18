import { GraduationCap, Target, Sparkle } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { ProfilePhoto } from "@/components/shared/profile-photo";
import { profile } from "@/lib/data/profile";
import { projects } from "@/lib/data/projects";

const stats = [
  { label: "Projects Shipped", value: projects.length },
  { label: "Tech Categories Mastered", value: 6 },
  { label: "Research Interests", value: profile.researchInterests.length },
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="mb-14 text-center">
          <p className="text-sm font-medium text-emerald-400">About Me</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            The story so far
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
        <ScrollReveal direction="right">
          <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <ProfilePhoto alt={profile.name} className="size-32" />
            <div>
              <h3 className="text-lg font-semibold">{profile.name}</h3>
              <p className="text-sm text-muted-foreground">{profile.location}</p>
            </div>
            <div className="glass-card w-full space-y-3 p-5 text-left text-sm">
              <div className="flex items-start gap-2.5">
                <GraduationCap className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                <span>
                  {profile.education.degree}
                  <br />
                  <span className="text-muted-foreground">
                    {profile.education.institution}
                  </span>
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Target className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                <span className="text-muted-foreground">
                  {profile.careerObjective}
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="space-y-8">
          <ScrollReveal>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              {profile.bio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-card p-4 text-center">
                  <div className="text-2xl font-bold gradient-text-emerald">
                    <AnimatedCounter value={stat.value} suffix="+" />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="glass-card p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                <Sparkle className="size-4 text-emerald-400" />
                Strengths
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.softSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
