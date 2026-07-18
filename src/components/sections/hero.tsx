"use client";

import { useRef } from "react";
import { useReducedMotion, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowRight, Download, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfilePhoto } from "@/components/shared/profile-photo";
import { Magnetic } from "@/components/shared/magnetic";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { profile } from "@/lib/data/profile";
import { projects } from "@/lib/data/projects";
import { skillGroups } from "@/lib/data/skills";

const ParticlesBackground = dynamic(
  () =>
    import("@/components/shared/particles-background").then(
      (m) => m.ParticlesBackground
    ),
  { ssr: false }
);

const floatLoop = (delay = 0) => ({
  y: [0, -12, 0],
  transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const, delay },
});

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="absolute inset-0 grid-background opacity-30" />
      <ParticlesBackground />

      <div className="relative mx-auto grid max-w-6xl gap-16 px-4 py-28 sm:px-6 sm:py-36 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-40">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-panel mb-6 flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            Open to Software Engineer / AI Engineer roles
          </motion.div>

          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-6xl">
            {prefersReducedMotion ? (
              <>
                Hi, I&apos;m {profile.firstName} —{" "}
                <span className="gradient-text-emerald">
                  {profile.titles.slice(0, 2).join(" & ")}
                </span>
              </>
            ) : (
              <>
                <VerticalCutReveal
                  splitBy="words"
                  staggerDuration={0.08}
                  transition={{ type: "spring", stiffness: 200, damping: 21 }}
                >
                  {`Hi, I'm ${profile.firstName} —`}
                </VerticalCutReveal>{" "}
                <VerticalCutReveal
                  splitBy="words"
                  staggerDuration={0.08}
                  staggerFrom="last"
                  elementLevelClassName="gradient-text-emerald"
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 21,
                    delay: 0.4,
                  }}
                >
                  {profile.titles.slice(0, 2).join(" & ")}
                </VerticalCutReveal>
              </>
            )}
          </h1>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-balance"
          >
            {profile.heroSubheadline}
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <Magnetic>
              <Button
                render={<a href={profile.resumeUrl} download />}
                nativeButton={false}
                size="lg"
                className="gap-2 rounded-full shadow-lg shadow-emerald-500/20"
              >
                <Download className="size-4" />
                Download Resume
              </Button>
            </Magnetic>
            <Button
              render={<a href="#projects" />}
              nativeButton={false}
              variant="outline"
              size="lg"
              className="gap-2 rounded-full"
            >
              View Projects
              <ArrowRight className="size-4" />
            </Button>
            <Button
              render={<a href="#contact" />}
              nativeButton={false}
              variant="ghost"
              size="lg"
              className="gap-2 rounded-full"
            >
              <Mail className="size-4" />
              Contact Me
            </Button>
          </motion.div>
        </div>

        <div className="relative mx-auto hidden h-[26rem] w-full max-w-md lg:block">
          <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-purple-500/10 blur-3xl" />

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={
              prefersReducedMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 1, scale: 1, ...floatLoop(0) }
            }
            transition={{ duration: 0.6 }}
            className="glass-card absolute top-4 left-8 flex w-56 items-center gap-3 p-4"
          >
            <ProfilePhoto alt={profile.name} className="size-14 shrink-0" priority />
            <div>
              <p className="text-sm font-semibold">{profile.firstName}</p>
              <p className="text-xs text-muted-foreground">
                {profile.titles[0]}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={
              prefersReducedMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 1, scale: 1, ...floatLoop(1) }
            }
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-card absolute top-44 right-0 w-44 p-4"
          >
            <p className="gradient-text-emerald text-2xl font-bold">
              <AnimatedCounter value={projects.length} suffix="+" />
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Projects Shipped
            </p>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={
              prefersReducedMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 1, scale: 1, ...floatLoop(0.6) }
            }
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card absolute bottom-6 left-16 w-48 p-4"
          >
            <p className="gradient-text-purple text-2xl font-bold">
              <AnimatedCounter value={skillGroups.length} suffix="+" />
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Tech Categories
            </p>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={
              prefersReducedMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 1, scale: 1, ...floatLoop(1.4) }
            }
            transition={{ duration: 0.6, delay: 0.45 }}
            className="glass-card absolute right-6 bottom-24 flex size-16 items-center justify-center"
          >
            <Sparkles className="size-6 text-cyan-400" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
