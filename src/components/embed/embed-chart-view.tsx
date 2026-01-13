"use client";

import { useMemo } from "react";
import { useQueryState } from "nuqs";
import { InflationChart } from "@/components/sims/bitcoin/inflation-chart";
import { EmbedFooter } from "@/components/embed/embed-footer";

interface EmbedChartViewProps {
    /** Base URL for the source simulation */
    baseUrl: string;
}

/**
 * Embeddable Bitcoin Inflation Chart View.
 * Reads params from URL and renders minimal chart with attribution.
 */
export function EmbedChartView({ baseUrl }: EmbedChartViewProps) {
    // Read params from URL
    const [rewardParam] = useQueryState("reward");
    const [halvingParam] = useQueryState("halving");
    const [blocksParam] = useQueryState("blocks");
    const [heightParam] = useQueryState("height");

    // Parse params with defaults
    const params = useMemo(() => ({
        blockReward: rewardParam ? Number(rewardParam) : 50,
        halvingInterval: halvingParam ? Number(halvingParam) : 210000,
        maxBlocks: blocksParam ? Number(blocksParam) : 1050000,
    }), [rewardParam, halvingParam, blocksParam]);

    // Chart height from params or default
    const chartHeight = heightParam ? Number(heightParam) : 350;

    // Build source URL with params
    const sourceUrl = useMemo(() => {
        const url = new URL(`${baseUrl}/sims/bitcoin/inflation`);
        if (rewardParam) url.searchParams.set("reward", rewardParam);
        if (halvingParam) url.searchParams.set("halving", halvingParam);
        if (blocksParam) url.searchParams.set("blocks", blocksParam);
        return url.toString();
    }, [baseUrl, rewardParam, halvingParam, blocksParam]);

    return (
        <div className="flex flex-col h-screen bg-background">
            {/* Chart Area */}
            <div className="flex-1 p-2 min-h-0">
                <InflationChart
                    blockReward={params.blockReward}
                    halvingInterval={params.halvingInterval}
                    maxBlocks={params.maxBlocks}
                    height={chartHeight}
                />
            </div>

            {/* Attribution Footer */}
            <EmbedFooter sourceUrl={sourceUrl} />
        </div>
    );
}
