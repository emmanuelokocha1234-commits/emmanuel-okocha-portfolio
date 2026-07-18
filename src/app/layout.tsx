import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { CursorGlow } from "@/components/shared/cursor-glow";
import { AiAssistantWidget } from "@/components/sections/ai-assistant-widget";
import { profile } from "@/lib/data/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://emmanuelokocha.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.titles.join(" · ")}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.heroSubheadline,
  keywords: [
    "Emmanuel Okocha",
    "Software Engineer",
    "Frontend Developer",
    "Full-Stack Developer",
    "AI Engineer",
    "Next.js Developer",
    "React Developer",
    "Prompt Engineer",
    "Lagos Nigeria Developer",
  ],
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${profile.name} — ${profile.titles.join(" · ")}`,
    description: profile.heroSubheadline,
    siteName: `${profile.name} — Portfolio`,
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.titles.join(" · ")}`,
    description: profile.heroSubheadline,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteUrl,
    email: profile.email,
    jobTitle: profile.titles[0],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    sameAs: [profile.github],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: profile.education.institution,
    },
    knowsAbout: [...profile.titles, ...profile.researchInterests],
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CursorGlow />
          <Navbar />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
          <AiAssistantWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
