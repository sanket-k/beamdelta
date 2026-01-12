import type { Metadata } from "next";
import { InflationSimClient } from "@/components/sims/bitcoin/inflation-sim-client";

export const metadata: Metadata = {
    title: "Bitcoin Inflation Visualizer",
    description:
        "Interactive visualization of Bitcoin's inflation rate and total supply over time. Explore how halving events shape Bitcoin's monetary policy.",
    openGraph: {
        title: "Bitcoin Inflation Visualizer | SimLab",
        description:
            "Interactive visualization of Bitcoin's inflation rate and total supply over time.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Bitcoin Inflation Visualizer | SimLab",
        description:
            "Interactive visualization of Bitcoin's inflation rate and total supply over time.",
    },
};

/**
 * Bitcoin Inflation Visualizer Page
 * Server component that renders the client-side simulation
 */
export default function BitcoinInflationPage() {
    return <InflationSimClient />;
}
