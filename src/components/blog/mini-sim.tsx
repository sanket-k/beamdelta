"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
    generateChartData,
    calculateInflationRate,
} from "@/lib/math/bitcoin/inflation";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ReferenceLine,
} from "recharts";

interface MiniSimConfig {
    blockReward?: number;
    halvingInterval?: number;
    maxBlocks?: number;
}

interface MiniSimProps {
    type: "bitcoin-inflation";
    title?: string;
    config?: MiniSimConfig;
}

/**
 * Mini Simulation embed for blog posts
 * Compact, interactive chart with 1-2 controls
 */
export function MiniSim({
    type,
    title = "Interactive Simulation",
    config = {},
}: MiniSimProps) {
    // Only bitcoin-inflation is supported for now
    if (type !== "bitcoin-inflation") {
        return (
            <div className="my-6 p-4 rounded-lg border border-destructive/30 bg-destructive/5 text-sm">
                Unknown simulation type: {type}
            </div>
        );
    }

    return <BitcoinInflationMiniSim title={title} config={config} />;
}

function BitcoinInflationMiniSim({
    title,
    config,
}: {
    title: string;
    config: MiniSimConfig;
}) {
    const [isMounted, setIsMounted] = useState(false);
    const [blockReward, setBlockReward] = useState(config.blockReward || 50);
    const halvingInterval = config.halvingInterval || 210000;
    const maxBlocks = config.maxBlocks || 2100000;

    // Fix hydration issues - only render chart on client
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Generate chart data
    const chartData = useMemo(
        () => generateChartData(blockReward, halvingInterval, maxBlocks, 80),
        [blockReward, halvingInterval, maxBlocks]
    );

    // Current inflation rate
    const currentInflation = useMemo(
        () => calculateInflationRate(840000, blockReward, halvingInterval),
        [blockReward, halvingInterval]
    );

    // Halving block heights for reference lines
    const halvingLines = useMemo(() => {
        const lines = [];
        for (let i = 1; i <= 4; i++) {
            const block = halvingInterval * i;
            if (block <= maxBlocks) {
                lines.push(block);
            }
        }
        return lines;
    }, [halvingInterval, maxBlocks]);

    return (
        <div className="my-8 rounded-xl border border-border bg-background-secondary/50 backdrop-blur-sm overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-border bg-background/50">
                <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">{title}</h4>
                    <span className="text-xs text-muted-foreground">
                        Inflation: {currentInflation.toFixed(2)}%
                    </span>
                </div>
            </div>

            {/* Chart */}
            <div className="px-4 py-4 h-[220px]">
                {isMounted ? (
                    <ResponsiveContainer width="100%" height={220}>
                        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <XAxis
                                dataKey="blockHeight"
                                tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
                                stroke="hsl(0 0% 64%)"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                yAxisId="supply"
                                orientation="left"
                                tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`}
                                stroke="hsl(0 0% 64%)"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                yAxisId="inflation"
                                orientation="right"
                                tickFormatter={(v) => `${v}%`}
                                stroke="hsl(0 0% 64%)"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                domain={[0, "auto"]}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "hsl(var(--background-secondary))",
                                    border: "1px solid hsl(var(--border))",
                                    borderRadius: "8px",
                                    fontSize: "12px",
                                }}
                                formatter={(value, name) => {
                                    const numValue = typeof value === "number" ? value : 0;
                                    if (name === "totalSupply") return [`${numValue.toLocaleString()} BTC`, "Supply"];
                                    return [`${numValue.toFixed(2)}%`, "Inflation"];
                                }}
                                labelFormatter={(label) => `Block ${Number(label).toLocaleString()}`}
                            />
                            {/* Halving reference lines */}
                            {halvingLines.map((block, i) => (
                                <ReferenceLine
                                    key={block}
                                    x={block}
                                    stroke="hsl(25 95% 53%)"
                                    strokeDasharray="3 3"
                                    strokeOpacity={0.5}
                                    label={{
                                        value: `H${i + 1}`,
                                        position: "top",
                                        fill: "hsl(25 95% 53%)",
                                        fontSize: 10,
                                    }}
                                />
                            ))}
                            <Line
                                yAxisId="supply"
                                type="stepAfter"
                                dataKey="totalSupply"
                                stroke="hsl(142 76% 36%)"
                                strokeWidth={2}
                                dot={false}
                            />
                            <Line
                                yAxisId="inflation"
                                type="stepAfter"
                                dataKey="inflationRate"
                                stroke="hsl(25 95% 53%)"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="w-full h-[220px] rounded bg-muted/20 animate-pulse" />
                )}
            </div>

            {/* Controls */}
            <div className="px-4 py-3 border-t border-border bg-background/30">
                <div className="flex items-center gap-4">
                    <label className="text-xs text-muted-foreground whitespace-nowrap">
                        Block Reward:
                    </label>
                    <Slider
                        value={[blockReward]}
                        onValueChange={([v]) => setBlockReward(v)}
                        min={10}
                        max={100}
                        step={10}
                        className="flex-1"
                    />
                    <span className="text-xs font-mono text-foreground w-16 text-right">
                        {blockReward} BTC
                    </span>
                </div>
            </div>

            {/* Footer link */}
            <Link
                href="/sims/bitcoin/inflation"
                className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs text-accent hover:bg-accent/5 transition-colors border-t border-border"
            >
                Open Full Simulation
                <ExternalLink className="h-3 w-3" />
            </Link>
        </div>
    );
}
