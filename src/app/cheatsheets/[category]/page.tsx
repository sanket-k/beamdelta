import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPageClient } from "./category-page-client";
import type { CheatsheetCategory } from "@/types/cheatsheet";

// Import cheatsheet data
import bitcoinProtocol from "@/content/cheatsheets/bitcoin-protocol.json";
import defiConcepts from "@/content/cheatsheets/defi-concepts.json";

// Category data map
const categoryMap: Record<string, CheatsheetCategory> = {
    "bitcoin-protocol": bitcoinProtocol as CheatsheetCategory,
    "defi-concepts": defiConcepts as CheatsheetCategory,
};

interface PageProps {
    params: Promise<{ category: string }>;
}

// SEO metadata per category
const categoryMeta: Record<
    string,
    { title: string; description: string; keywords: string[] }
> = {
    "bitcoin-protocol": {
        title: "Bitcoin Protocol Terms | Cheatsheet | SimLab",
        description:
            "Learn Bitcoin protocol terminology: halving, block reward, UTXO, nonce, merkle root, and more. Interactive definitions with code examples.",
        keywords: [
            "bitcoin nonce meaning",
            "UTXO explained",
            "bitcoin halving",
            "block reward",
            "merkle root",
            "proof of work",
        ],
    },
    "defi-concepts": {
        title: "DeFi Glossary | Cheatsheet | SimLab",
        description:
            "Master DeFi terminology: AMM, liquidity pools, impermanent loss, yield farming, flash loans, and more. Interactive definitions with formulas.",
        keywords: [
            "impermanent loss explained",
            "AMM crypto",
            "liquidity pool",
            "yield farming",
            "flash loan",
            "TVL meaning",
        ],
    },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category } = await params;
    const meta = categoryMeta[category];

    if (!meta) {
        return {
            title: "Cheatsheet Not Found | SimLab",
        };
    }

    return {
        title: meta.title,
        description: meta.description,
        keywords: meta.keywords,
        openGraph: {
            title: meta.title,
            description: meta.description,
        },
    };
}

export function generateStaticParams() {
    return Object.keys(categoryMap).map((category) => ({
        category,
    }));
}

export default async function CategoryPage({ params }: PageProps) {
    const { category: categoryId } = await params;
    const category = categoryMap[categoryId];

    if (!category) {
        notFound();
    }

    return <CategoryPageClient category={category} />;
}
