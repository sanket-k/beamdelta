import { Metadata } from "next";
import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import { CategoryCard } from "@/components/cheatsheets";
import type { CategoryMeta } from "@/types/cheatsheet";

// Import cheatsheet data
import bitcoinProtocol from "@/content/cheatsheets/bitcoin-protocol.json";
import defiConcepts from "@/content/cheatsheets/defi-concepts.json";

export const metadata: Metadata = {
    title: "Crypto Cheatsheets | BeamDelta",
    description:
        "Quick reference glossaries for Bitcoin protocol terms and DeFi concepts. Learn crypto terminology with interactive definitions and examples.",
    keywords: [
        "crypto glossary",
        "bitcoin terms",
        "defi terminology",
        "blockchain cheatsheet",
        "crypto education",
    ],
    openGraph: {
        title: "Crypto Cheatsheets | BeamDelta",
        description:
            "Quick reference glossaries for Bitcoin protocol terms and DeFi concepts.",
    },
};

// Build category metadata
const categories: CategoryMeta[] = [
    {
        id: bitcoinProtocol.id,
        name: bitcoinProtocol.name,
        description: bitcoinProtocol.description,
        icon: bitcoinProtocol.icon,
        termCount: bitcoinProtocol.terms.length,
        href: `/cheatsheets/${bitcoinProtocol.id}`,
    },
    {
        id: defiConcepts.id,
        name: defiConcepts.name,
        description: defiConcepts.description,
        icon: defiConcepts.icon,
        termCount: defiConcepts.terms.length,
        href: `/cheatsheets/${defiConcepts.id}`,
    },
];

export default function CheatsheetPage() {
    return (
        <ResponsiveLayout>
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                {/* Hero section */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                        Crypto <span className="text-accent">Cheatsheets</span>
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Quick reference glossaries for understanding Bitcoin, blockchain,
                        and DeFi terminology. Click any term to reveal detailed explanations.
                    </p>
                </div>

                {/* Category grid */}
                <div className="grid gap-6 sm:grid-cols-2">
                    {categories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>

                {/* Coming soon placeholder */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-muted-foreground">
                        More cheatsheets coming soon: Ethereum, Solana, Layer 2s...
                    </p>
                </div>
            </div>
        </ResponsiveLayout>
    );
}
