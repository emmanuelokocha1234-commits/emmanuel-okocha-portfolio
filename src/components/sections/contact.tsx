"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Mail, Phone, Send } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { GithubIcon } from "@/components/shared/github-icon";
import { FloatingInput, FloatingTextarea } from "@/components/shared/floating-field";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/data/profile";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email"),
  message: z.string().trim().min(10, "Say a little more (10+ characters)").max(2000),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        return;
      }

      const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
        data.mailto.subject
      )}&body=${encodeURIComponent(data.mailto.body)}`;
      window.open(mailtoUrl, "_self");

      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="mb-14 text-center">
          <p className="text-sm font-medium text-purple-400">Contact</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s work together
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Open to remote roles and freelance work. Reach out directly or use
            the form below.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="glass-card grid gap-8 p-6 sm:p-8 md:grid-cols-[1fr_1.3fr]">
          <div className="space-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 rounded-2xl border border-border/60 p-3 text-sm transition-colors hover:border-purple-400/50"
            >
              <Mail className="size-4 text-purple-400" />
              {profile.email}
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 rounded-2xl border border-border/60 p-3 text-sm transition-colors hover:border-purple-400/50"
            >
              <Phone className="size-4 text-purple-400" />
              {profile.phone}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-border/60 p-3 text-sm transition-colors hover:border-purple-400/50"
            >
              <GithubIcon className="size-4 text-purple-400" />
              GitHub
            </a>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <FloatingInput
                id="name"
                label="Name"
                aria-invalid={!!errors.name}
                {...register("name")}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div>
              <FloatingInput
                id="email"
                type="email"
                label="Email"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div>
              <FloatingTextarea
                id="message"
                rows={4}
                label="What are you looking to build?"
                aria-invalid={!!errors.message}
                {...register("message")}
              />
              {errors.message && (
                <p className="mt-1.5 text-xs text-destructive">
                  {errors.message.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full gap-2 rounded-full shadow-lg shadow-purple-500/20 transition-shadow hover:shadow-purple-500/30"
            >
              {isSubmitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
              Send Message
            </Button>

            {status === "sent" && (
              <p className="text-center text-xs text-emerald-500">
                Your email client should have opened with the message ready to send.
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-xs text-destructive">
                Something went wrong — please email {profile.email} directly.
              </p>
            )}
          </form>
        </div>
      </ScrollReveal>
    </section>
  );
}
