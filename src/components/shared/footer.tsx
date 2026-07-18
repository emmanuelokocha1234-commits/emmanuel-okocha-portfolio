import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon } from "@/components/shared/github-icon";
import { profile } from "@/lib/data/profile";

export function Footer() {
  return (
    <footer className="relative border-t border-border/60">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-500/40 via-cyan-500/40 to-purple-500/40" />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}. Built with
          Next.js &amp; Tailwind CSS.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-emerald-400"
          >
            <GithubIcon className="size-4" />
          </Link>
          <Link
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="transition-colors hover:text-emerald-400"
          >
            <Mail className="size-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
