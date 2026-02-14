import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import { SpotlightGrid } from "@/components/home/spotlight-grid";
import { ShineButton } from "@/components/home/shine-button";
import { BentoGrid } from "@/components/home/bento-grid";
import { BentoCard } from "@/components/home/bento-card";
import { LiveMiniChart } from "@/components/home/live-mini-chart";


export default function Home() {
  return (
    <ResponsiveLayout>
      {/* Hero Section with Spotlight Grid */}
      <main className="relative flex min-h-[90vh] flex-col items-center justify-center gap-8 text-center">
        {/* Spotlight Grid Background */}
        <SpotlightGrid />

        {/* Content - above grid */}
        <div className="relative z-10 flex flex-col items-center gap-8">
          {/* Logo/Title */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 ring-1 ring-accent/20">
              <svg
                className="h-12 w-12 text-accent"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinejoin="round"
                viewBox="-2 -4 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 1L18.66 15H1.34L10 1z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Beam <span className="text-accent">Delta</span>
            </h1>
          </div>

          {/* Sub-headline */}
          <p className="max-w-2xl text-lg text-foreground-muted md:text-xl">
            Interactive models for Bitcoin scarcity, DeFi mechanics, and market
            cycles. <span className="text-foreground">Stop guessing. Touch the math.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <ShineButton href="/sims/bitcoin/inflation" variant="primary">
              Run Simulation
            </ShineButton>
            <ShineButton href="/cheatsheets" variant="outline">
              View Cheatsheets
            </ShineButton>
          </div>
        </div>

        {/* Bento Grid - Application Cards */}
        <BentoGrid>
          {/* Featured: Models */}
          <BentoCard
            href="/sims"
            variant="featured"
            label="Simulations"
            title="Models"
            description="Real-time parameter testing. No login required. Drag sliders and watch the math update instantly."
            action="Launch BTC Inflation"
          >
            <LiveMiniChart />
          </BentoCard>

          {/* Reference: Cheatsheets */}
          <BentoCard
            href="/cheatsheets"
            variant="standard"
            labels={["Knowledge Base", "Cheatsheets"]}
            title="Reference"
            description="Protocol definitions, opcode gas costs, and formulas."
            action="Browse Library"
          >
            {/* Code snippet visual */}
            <div className="font-mono text-xs text-foreground-muted">
              <span className="text-accent">const</span>{" "}
              <span className="text-chart-supply">halving</span> = 210000;
            </div>
          </BentoCard>

          {/* Research: Blog */}
          <BentoCard
            href="/blog"
            variant="standard"
            labels={["Deep Dives", "Blog", "Research", "Insights"]}
            title="Insights"
            description="Engineering breakdowns and market mechanics."
            action="Read Latest"
          />

          {/* About
          <BentoCard
            href="/about"
            variant="standard"
            label="Behind the Scenes"
            title="About"
            description="The engineer behind the screen. Let's build together."
            action="Meet the Builder"
          /> */}
        </BentoGrid>

        {/* Social Conversion Footer */}

      </main>
    </ResponsiveLayout>
  );
}
