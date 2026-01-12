import Link from "next/link";
import { ResponsiveLayout } from "@/components/layout/responsive-layout";

export default function Home() {
  return (
    <ResponsiveLayout>
      {/* Hero Section */}
      <main className="flex min-h-[80vh] flex-col items-center justify-center gap-8 text-center">
        {/* Logo/Title */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 ring-1 ring-accent/20">
            <svg
              className="h-8 w-8 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Sim<span className="text-accent">Lab</span>
          </h1>
        </div>

        {/* Description */}
        <p className="max-w-md text-lg text-foreground-muted">
          Interactive simulations for understanding cryptocurrency economics.
          Visualize Bitcoin inflation, halving events, and more.
        </p>

        {/* Status Badge */}
        <div className="flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent ring-1 ring-accent/20">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
          </span>
          Phase 3 — Bitcoin Inflation Visualizer
        </div>

        {/* Quick Links */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/sims"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-accent px-6 font-medium text-accent-foreground transition-all duration-[var(--duration-fast)] hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(247,147,26,0.5)] active:scale-95"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Explore Simulations
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border px-6 font-medium transition-all duration-[var(--duration-fast)] hover:bg-secondary active:scale-95"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            View Source
          </a>
        </div>

        {/* Tech Stack */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-foreground-muted">
          <span className="rounded-md bg-secondary px-3 py-1">Next.js 16</span>
          <span className="rounded-md bg-secondary px-3 py-1">TypeScript</span>
          <span className="rounded-md bg-secondary px-3 py-1">Tailwind 4</span>
          <span className="rounded-md bg-secondary px-3 py-1">shadcn/ui</span>
          <span className="rounded-md bg-secondary px-3 py-1">Recharts</span>
        </div>
      </main>
    </ResponsiveLayout>
  );
}
