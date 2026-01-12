"use client";

import { useMemo } from "react";
import {
    ComposedChart,
    Area,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
} from "recharts";
import { ChartWrapper } from "@/components/sims/shared/chart-wrapper";
import {
    generateChartData,
    formatSupply,
    formatInflationRate,
    type ChartDataPoint,
} from "@/lib/math/bitcoin/inflation";
import { BLOCKS_PER_YEAR } from "@/lib/constants/bitcoin";

interface InflationChartProps {
    /** Initial block reward */
    blockReward: number;
    /** Blocks between halvings */
    halvingInterval: number;
    /** Maximum blocks to simulate */
    maxBlocks: number;
    /** Ghost data for comparison */
    ghostData?: ChartDataPoint[] | null;
    /** Whether ghost is visible */
    showGhost?: boolean;
    /** Chart height */
    height?: number;
}

/**
 * Bitcoin Inflation Visualization Chart
 * Shows total supply (area) and inflation rate (line) over time
 */
export function InflationChart({
    blockReward,
    halvingInterval,
    maxBlocks,
    ghostData,
    showGhost = false,
    height = 400,
}: InflationChartProps) {
    // Generate chart data
    const data = useMemo(
        () => generateChartData(blockReward, halvingInterval, maxBlocks, 150),
        [blockReward, halvingInterval, maxBlocks]
    );

    // Calculate halving lines
    const halvingLines = useMemo(() => {
        const lines: number[] = [];
        for (let h = 1; h * halvingInterval <= maxBlocks; h++) {
            lines.push(h * halvingInterval);
        }
        return lines;
    }, [halvingInterval, maxBlocks]);

    // Custom tooltip
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (!active || !payload || !payload.length) return null;

        const blockHeight = label;
        const year = (blockHeight / BLOCKS_PER_YEAR).toFixed(1);
        const dataPoint = payload[0]?.payload as ChartDataPoint;

        return (
            <div className="rounded-lg border border-border bg-popover p-3 shadow-xl">
                <p className="font-mono text-sm text-muted-foreground">
                    Block {blockHeight.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                    ~Year {year}
                </p>
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[hsl(142,76%,36%)]" />
                        <span className="text-sm">
                            Supply: <span className="font-mono font-medium">{formatSupply(dataPoint?.totalSupply || 0)} BTC</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-accent" />
                        <span className="text-sm">
                            Inflation: <span className="font-mono font-medium">{formatInflationRate(dataPoint?.inflationRate || 0)}</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 pt-1 border-t border-border">
                        <span className="text-xs text-muted-foreground">
                            Block Reward: {dataPoint?.blockReward} BTC
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <ChartWrapper height={height}>
            <ComposedChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
                <defs>
                    {/* Supply area gradient */}
                    <linearGradient id="supplyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(142 76% 36%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(142 76% 36%)" stopOpacity={0} />
                    </linearGradient>
                </defs>

                <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(0 0% 20%)"
                    vertical={false}
                />

                <XAxis
                    dataKey="blockHeight"
                    stroke="hsl(0 0% 64%)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                />

                {/* Left Y-Axis: Total Supply */}
                <YAxis
                    yAxisId="left"
                    stroke="hsl(142 76% 36%)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => formatSupply(value)}
                    width={70}
                />

                {/* Right Y-Axis: Inflation Rate */}
                <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="hsl(25 95% 53%)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value.toFixed(1)}%`}
                    width={50}
                />

                <Tooltip content={<CustomTooltip />} />

                <Legend
                    verticalAlign="top"
                    height={36}
                    formatter={(value) => (
                        <span className="text-sm text-foreground">{value}</span>
                    )}
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
                            value: `Halving ${i + 1}`,
                            position: "top",
                            fill: "hsl(25 95% 53%)",
                            fontSize: 10,
                        }}
                    />
                ))}

                {/* Ghost lines (previous state) */}
                {showGhost && ghostData && (
                    <>
                        <Area
                            data={ghostData}
                            type="monotone"
                            dataKey="totalSupply"
                            yAxisId="left"
                            fill="transparent"
                            stroke="hsl(0 0% 50%)"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            strokeOpacity={0.3}
                            dot={false}
                            isAnimationActive={false}
                            legendType="none"
                        />
                        <Line
                            data={ghostData}
                            type="monotone"
                            dataKey="inflationRate"
                            yAxisId="right"
                            stroke="hsl(0 0% 50%)"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            strokeOpacity={0.3}
                            dot={false}
                            isAnimationActive={false}
                            legendType="none"
                        />
                    </>
                )}

                {/* Current data - Total Supply Area */}
                <Area
                    type="monotone"
                    dataKey="totalSupply"
                    yAxisId="left"
                    name="Total Supply (BTC)"
                    fill="url(#supplyGradient)"
                    stroke="hsl(142 76% 36%)"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={true}
                    animationDuration={500}
                />

                {/* Current data - Inflation Rate Line */}
                <Line
                    type="monotone"
                    dataKey="inflationRate"
                    yAxisId="right"
                    name="Inflation Rate (%)"
                    stroke="hsl(25 95% 53%)"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={true}
                    animationDuration={500}
                />
            </ComposedChart>
        </ChartWrapper>
    );
}
