import type { Metadata } from "next";
import Link from "next/link";
import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { TrendingDown, Clock, Blocks } from "lucide-react";

export const metadata: Metadata = {
    title: "Bitcoin Simulations",
    description:
        "Interactive Bitcoin simulations. Explore inflation dynamics, halving events, and supply mechanics through hands-on visualizations.",
};

interface Simulation {
    title: string;
    description: string;
    href: string;
    icon: React.ReactNode;
    status: "available" | "coming-soon";
}

const simulations: Simulation[] = [
    {
        title: "Inflation Visualizer",
        description:
            "Explore how Bitcoin's block reward halving creates predictable monetary policy. Adjust parameters to see supply and inflation dynamics.",
        href: "/sims/bitcoin/inflation",
        icon: <TrendingDown className="h-6 w-6" />,
        status: "available",
    },
    {
        title: "Halving Timeline",
        description:
            "Visualize Bitcoin's halving schedule and block reward reductions over time. See past and future halving events.",
        href: "/sims/bitcoin/halving",
        icon: <Clock className="h-6 w-6" />,
        status: "coming-soon",
    },
    {
        title: "Block Explorer",
        description:
            "Interactive block explorer showing transaction flow, difficulty adjustments, and mining dynamics.",
        href: "/sims/bitcoin/blocks",
        icon: <Blocks className="h-6 w-6" />,
        status: "coming-soon",
    },
];

/**
 * Bitcoin topic overview page
 * Lists all Bitcoin-related simulations
 */
export default function BitcoinPage() {
    return (
        <ResponsiveLayout>
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Breadcrumbs */}
                <Breadcrumbs
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Simulations", href: "/sims" },
                        { label: "Bitcoin" },
                    ]}
                />

                {/* Header */}
                <div className="space-y-2">
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-xl bg-accent/10 flex items-center justify-center">
                            <svg
                                className="h-8 w-8 text-accent"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                Bitcoin Simulations
                            </h1>
                            <p className="text-muted-foreground">
                                Explore Bitcoin&apos;s monetary mechanics
                            </p>
                        </div>
                    </div>
                </div>

                {/* Simulation List */}
                <div className="space-y-4">
                    {simulations.map((sim) => (
                        <SimulationCard key={sim.href} simulation={sim} />
                    ))}
                </div>

                {/* Bitcoin Facts */}
                <div className="rounded-xl border border-border bg-card p-6 space-y-4">
                    <h2 className="font-semibold text-lg">Quick Facts</h2>
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-1">
                            <p className="text-2xl font-bold text-accent">21M</p>
                            <p className="text-sm text-muted-foreground">Maximum Supply</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-2xl font-bold text-accent">210,000</p>
                            <p className="text-sm text-muted-foreground">Blocks per Halving</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-2xl font-bold text-accent">~4 years</p>
                            <p className="text-sm text-muted-foreground">Halving Interval</p>
                        </div>
                    </div>
                </div>
            </div>
        </ResponsiveLayout>
    );
}

function SimulationCard({ simulation }: { simulation: Simulation }) {
    const isAvailable = simulation.status === "available";

    const content = (
        <div
            className={`
        group relative flex items-start gap-4 rounded-xl border border-border bg-card p-6
        transition-all duration-[var(--duration-fast)]
        ${isAvailable ? "hover:border-accent/50 hover:shadow-lg cursor-pointer" : "opacity-60"}
      `}
        >
            {/* Icon */}
            <div
                className={`
          flex-shrink-0 h-12 w-12 rounded-lg flex items-center justify-center
          ${isAvailable ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"}
          transition-transform duration-[var(--duration-fast)]
          ${isAvailable ? "group-hover:scale-110" : ""}
        `}
            >
                {simulation.icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{simulation.title}</h3>
                    {!isAvailable && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-muted rounded-full">
                            Coming Soon
                        </span>
                    )}
                </div>
                <p className="text-sm text-muted-foreground">{simulation.description}</p>
            </div>

            {/* Arrow */}
            {isAvailable && (
                <span className="flex-shrink-0 text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    →
                </span>
            )}
        </div>
    );

    if (isAvailable) {
        return <Link href={simulation.href}>{content}</Link>;
    }

    return content;
}
