import { Suspense } from "react";
import type { Metadata } from "next";
import { EmbedChartView } from "@/components/embed/embed-chart-view";

export const metadata: Metadata = {
    title: "Bitcoin Inflation Chart - Embed",
    description: "Embeddable Bitcoin inflation visualization",
    robots: "noindex, nofollow",
};

/**
 * Embed page for Bitcoin Inflation Chart.
 * Minimal view designed for iframe embedding.
 */
export default function EmbedBitcoinInflationPage() {
    // Base URL for attribution links
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://beamdelta.com";

    return (
        <Suspense fallback={<EmbedLoadingSkeleton />}>
            <EmbedChartView baseUrl={baseUrl} />
        </Suspense>
    );
}

/** Loading skeleton for embed chart */
function EmbedLoadingSkeleton() {
    return (
        <div className="flex flex-col h-screen bg-background">
            <div className="flex-1 p-2 flex items-center justify-center">
                <div className="animate-pulse bg-muted/50 rounded-lg w-full h-full" />
            </div>
            <div className="h-10 border-t border-border bg-background/80" />
        </div>
    );
}
