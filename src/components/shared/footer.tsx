import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon } from "@/components/shared/github-icon";
import { profile } from "@/lib/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-border/60">
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
            className="transition-colors hover:text-foreground"
          >
            <GithubIcon className="size-4" />
          </Link>
          <Link
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="transition-colors hover:text-foreground"
          >
            <Mail className="size-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
