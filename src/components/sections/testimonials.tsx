import { Quote } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { testimonials } from "@/lib/data/testimonials";

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="mb-14 text-center">
          <p className="text-sm font-medium text-indigo-400">Testimonials</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            What people say
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid gap-6 sm:grid-cols-2">
        {testimonials.map((t, i) => (
          <ScrollReveal key={t.name} delay={i * 0.08}>
            <div className="glass-card relative h-full p-6">
              {t.isSample && (
                <Badge
                  variant="secondary"
                  className="absolute right-4 top-4 text-[10px]"
                >
                  Sample
                </Badge>
              )}
              <Quote className="size-6 text-indigo-400/50" />
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-5">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
