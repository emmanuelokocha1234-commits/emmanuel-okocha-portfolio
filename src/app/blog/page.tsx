import type { Metadata } from "next";
import { PenLine } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on AI, full-stack development, and prompt engineering — coming soon.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="glass-card mx-auto flex size-16 items-center justify-center rounded-2xl">
          <PenLine className="size-7 text-emerald-400" />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
          Writing soon
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          I&apos;m working on posts about AI engineering, full-stack
          architecture, and prompt engineering. Check back soon — or follow
          along on GitHub in the meantime.
        </p>
      </ScrollReveal>
    </div>
  );
}
