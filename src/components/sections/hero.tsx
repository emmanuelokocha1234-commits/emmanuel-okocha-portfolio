"use client";

import { useRef } from "react";
import { useReducedMotion, motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowRight, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfilePhoto } from "@/components/shared/profile-photo";
import { Magnetic } from "@/components/shared/magnetic";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { profile } from "@/lib/data/profile";

const ParticlesBackground = dynamic(
  () =>
    import("@/components/shared/particles-background").then(
      (m) => m.ParticlesBackground
    ),
  { ssr: false }
);

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const glowY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 60]
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="absolute inset-0 grid-background" />
      <ParticlesBackground />
      <motion.div
        style={{ y: glowY }}
        className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent"
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 py-28 text-center sm:px-6 sm:py-36 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <ProfilePhoto alt={profile.name} className="size-24 sm:size-28" priority />
        </motion.div>

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
              <span className="gradient-text">
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
                elementLevelClassName="gradient-text"
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
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-balance"
        >
          {profile.heroSubheadline}
        </motion.p>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Magnetic>
            <Button
              render={<a href={profile.resumeUrl} download />}
              nativeButton={false}
              size="lg"
              className="gap-2 rounded-full"
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
    </section>
  );
}
