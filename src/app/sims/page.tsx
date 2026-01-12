import type { Metadata } from "next";
import Link from "next/link";
import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import { Bitcoin, Coins, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
    title: "Simulations",
    description:
        "Interactive crypto simulations. Explore Bitcoin inflation, Ethereum gas, DeFi mechanics, and more through hands-on visualizations.",
};

interface SimCategory {
    title: string;
    description: string;
    href: string;
    icon: React.ReactNode;
    simCount: number;
    available: boolean;
}

const categories: SimCategory[] = [
    {
        title: "Bitcoin",
        description:
            "Explore Bitcoin's monetary policy, halving events, and supply dynamics.",
        href: "/sims/bitcoin",
        icon: <Bitcoin className="h-8 w-8" />,
        simCount: 1,
        available: true,
    },
    {
        title: "Ethereum",
        description: "Understand gas mechanics, EIP-1559, and staking economics.",
        href: "/sims/ethereum",
        icon: <Coins className="h-8 w-8" />,
        simCount: 0,
        available: false,
    },
    {
        title: "Macro",
        description: "Investment strategies, portfolio allocation, and risk models.",
        href: "/sims/macro",
        icon: <TrendingUp className="h-8 w-8" />,
        simCount: 0,
        available: false,
    },
];

/**
 * Simulations listing page
 * Shows all available simulation categories
 */
export default function SimsPage() {
    return (
        <ResponsiveLayout>
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Simulations
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Interactive visualizations to master crypto economics
                    </p>
                </div>

                {/* Category Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <CategoryCard key={category.href} category={category} />
                    ))}
                </div>

                {/* Info */}
                <div className="rounded-xl border border-border bg-card p-6 text-center">
                    <p className="text-muted-foreground">
                        More simulations coming soon. Have a suggestion?{" "}
                        <a
                            href="https://github.com"
                            className="text-accent hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Open an issue
                        </a>
                    </p>
                </div>
            </div>
        </ResponsiveLayout>
    );
}

function CategoryCard({ category }: { category: SimCategory }) {
    return (
        <Link
            href={category.available ? category.href : "#"}
            className={`block ${!category.available ? "pointer-events-none" : ""}`}
        >
            <div
                className={`
                    group relative rounded-xl border border-border bg-card p-6
                    transition-all duration-[var(--duration-fast)]
                    ${category.available
                        ? "hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 cursor-pointer"
                        : "opacity-60 cursor-default"
                    }
                `}
            >
                {/* Coming Soon Badge */}
                {!category.available && (
                    <div className="absolute top-4 right-4 px-2 py-1 text-xs font-medium bg-muted rounded-full">
                        Coming Soon
                    </div>
                )}

                {/* Icon */}
                <div
                    className={`
                        mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl
                        ${category.available ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"}
                        transition-transform duration-[var(--duration-fast)]
                        ${category.available ? "group-hover:scale-110" : ""}
                    `}
                >
                    {category.icon}
                </div>

                {/* Content */}
                <h2 className="text-xl font-semibold mb-2">{category.title}</h2>
                <p className="text-sm text-muted-foreground mb-4">{category.description}</p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                        {category.simCount} {category.simCount === 1 ? "simulation" : "simulations"}
                    </span>
                    {category.available && (
                        <span className="text-sm font-medium text-accent group-hover:translate-x-1 transition-transform">
                            Explore →
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}
