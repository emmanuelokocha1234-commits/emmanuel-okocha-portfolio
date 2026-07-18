import { Bot, Code2, LayoutTemplate, Plug, Sparkles, Terminal } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { TiltCard } from "@/components/shared/tilt-card";
import { services, type Service } from "@/lib/data/services";

const icons: Record<Service["icon"], typeof Code2> = {
  code: Code2,
  sparkles: Sparkles,
  layout: LayoutTemplate,
  terminal: Terminal,
  plug: Plug,
  bot: Bot,
};

export function Services() {
  return (
    <section
      id="services"
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <ScrollReveal>
        <div className="mb-14 text-center">
          <p className="text-sm font-medium text-emerald-400">Services</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            How I can help
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Available for freelance and contract work across these areas.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => {
          const Icon = icons[service.icon];
          return (
            <ScrollReveal key={service.title} delay={i * 0.06}>
              <TiltCard className="h-full">
                <SpotlightCard
                  spotlightColor="rgba(16,185,129,0.16)"
                  className="glass-card h-full p-6"
                >
                  <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20">
                    <Icon className="size-5 text-emerald-400" />
                  </div>
                  <h3 className="font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </SpotlightCard>
              </TiltCard>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
