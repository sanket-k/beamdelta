"use client";

import { useCallback, useMemo } from "react";
import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import { SimContainer } from "@/components/sims/shared/sim-container";
import { ControlsPanel } from "@/components/sims/shared/controls-panel";
import { SliderInput } from "@/components/sims/shared/slider-input";
import { MetricCard } from "@/components/sims/shared/metric-card";
import { SourceAccordion, Formula } from "@/components/sims/shared/source-accordion";
import { InflationChart } from "@/components/sims/bitcoin/inflation-chart";
import { useSimParams } from "@/lib/hooks/use-sim-params";
import { useGhostState } from "@/lib/hooks/use-ghost-state";
import {
    generateChartData,
    calculateMaxSupply,
    calculateInflationRate,
    calculateTotalSupply,
} from "@/lib/math/bitcoin/inflation";
import { BLOCKS_PER_YEAR, DEFAULT_SIM_PARAMS } from "@/lib/constants/bitcoin";

/**
 * Bitcoin Inflation Visualizer - Client Component
 * Handles all interactive state and controls
 */
export function InflationSimClient() {
    const {
        params,
        setBlockReward,
        setHalvingInterval,
        setMaxBlocks,
        resetParams,
        hasChanges,
        limits,
    } = useSimParams();

    const { ghostState, captureGhost, hideGhostDelayed } = useGhostState();

    // Calculate current metrics
    const metrics = useMemo(() => {
        const maxSupply = calculateMaxSupply(params.blockReward, params.halvingInterval);
        const currentSupply = calculateTotalSupply(
            params.maxBlocks,
            params.blockReward,
            params.halvingInterval
        );
        const currentInflation = calculateInflationRate(
            params.maxBlocks,
            params.blockReward,
            params.halvingInterval
        );
        const percentMined = (currentSupply / maxSupply) * 100;

        return {
            maxSupply,
            currentSupply,
            currentInflation,
            percentMined,
        };
    }, [params]);

    // Generate current chart data for ghost capture
    const currentChartData = useMemo(
        () => generateChartData(params.blockReward, params.halvingInterval, params.maxBlocks, 150),
        [params]
    );

    // Handle slider drag start - capture ghost state
    const handleDragStart = useCallback(() => {
        captureGhost(currentChartData, "Previous");
    }, [captureGhost, currentChartData]);

    // Handle slider drag end - hide ghost after delay
    const handleDragEnd = useCallback(() => {
        hideGhostDelayed(2000);
    }, [hideGhostDelayed]);

    // Format helpers
    const formatBlocks = (value: number) => `${(value / 1000).toFixed(0)}K`;
    const formatBTC = (value: number) => `${value} BTC`;

    // Sidebar controls content
    const sidebarContent = (
        <ControlsPanel
            title="Simulation Parameters"
            onReset={resetParams}
            hasChanges={hasChanges}
        >
            <SliderInput
                label="Initial Block Reward"
                value={params.blockReward}
                onChange={setBlockReward}
                min={limits.blockReward.min}
                max={limits.blockReward.max}
                step={limits.blockReward.step}
                formatValue={formatBTC}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            />

            <SliderInput
                label="Halving Interval"
                value={params.halvingInterval}
                onChange={setHalvingInterval}
                min={limits.halvingInterval.min}
                max={limits.halvingInterval.max}
                step={limits.halvingInterval.step}
                formatValue={formatBlocks}
                formatLabel={formatBlocks}
                unit="blocks"
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            />

            <SliderInput
                label="Simulation Length"
                value={params.maxBlocks}
                onChange={setMaxBlocks}
                min={limits.maxBlocks.min}
                max={limits.maxBlocks.max}
                step={limits.maxBlocks.step}
                formatValue={formatBlocks}
                formatLabel={formatBlocks}
                unit="blocks"
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            />

            {/* Quick comparison with defaults */}
            {hasChanges && (
                <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-2">
                        Comparing to Bitcoin defaults:
                    </p>
                    <div className="text-xs space-y-1 text-muted-foreground">
                        <p>
                            Max Supply: {metrics.maxSupply.toLocaleString()} BTC
                            {metrics.maxSupply !== 21_000_000 && (
                                <span className="ml-1 text-accent">
                                    (vs 21M BTC)
                                </span>
                            )}
                        </p>
                    </div>
                </div>
            )}
        </ControlsPanel>
    );

    return (
        <ResponsiveLayout showSidebar sidebarContent={sidebarContent}>
            <SimContainer
                title="Bitcoin Inflation Visualizer"
                description="Explore how Bitcoin's block reward halving creates predictable monetary policy. Adjust parameters to see how different configurations affect supply and inflation over time."
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Simulations", href: "/sims" },
                    { label: "Bitcoin", href: "/sims/bitcoin" },
                    { label: "Inflation" },
                ]}
                embedPath="/embed/bitcoin/inflation"
                embedParams={{
                    reward: params.blockReward,
                    halving: params.halvingInterval,
                    blocks: params.maxBlocks,
                }}
            >
                {/* Main Chart */}
                <InflationChart
                    blockReward={params.blockReward}
                    halvingInterval={params.halvingInterval}
                    maxBlocks={params.maxBlocks}
                    ghostData={ghostState.data}
                    showGhost={ghostState.isVisible}
                    height={450}
                />

                {/* Metric Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <MetricCard
                        label="Max Supply"
                        value={metrics.maxSupply}
                        format="btc"
                    />
                    <MetricCard
                        label="Current Supply"
                        value={metrics.currentSupply}
                        format="btc"
                        description={`${metrics.percentMined.toFixed(1)}% mined`}
                    />
                    <MetricCard
                        label="Inflation Rate"
                        value={metrics.currentInflation}
                        format="percent"
                        trend={metrics.currentInflation > 2 ? "down" : "neutral"}
                    />
                    <MetricCard
                        label="Years Simulated"
                        value={Number((params.maxBlocks / BLOCKS_PER_YEAR).toFixed(1))}
                        format="number"
                    />
                </div>

                {/* Mobile Controls (hidden on desktop where sidebar shows) */}
                <div className="md:hidden">{sidebarContent}</div>

                {/* Source the Math */}
                <SourceAccordion>
                    <Formula
                        name="Block Reward at Height h"
                        formula="reward(h) = initial_reward / 2^(floor(h / halving_interval))"
                        description="The block reward halves every 'halving_interval' blocks. With Bitcoin's parameters (50 BTC initial, 210,000 blocks), the reward halves approximately every 4 years."
                    />
                    <Formula
                        name="Total Supply at Height h"
                        formula="supply(h) = Σ(reward(i) × halving_interval) + reward(current_epoch) × blocks_in_epoch"
                        description="Sum of all complete halving epochs plus partial current epoch. This approaches but never exceeds the maximum supply."
                    />
                    <Formula
                        name="Annual Inflation Rate"
                        formula="inflation(h) = (reward(h) × blocks_per_year / supply(h)) × 100"
                        description="New coins minted per year divided by total supply. Decreases over time as supply grows and rewards halve."
                    />
                    <Formula
                        name="Maximum Supply"
                        formula="max_supply = initial_reward × halving_interval × 2"
                        description="Theoretical limit as halvings continue indefinitely. With Bitcoin's parameters: 50 × 210,000 × 2 = 21,000,000 BTC."
                    />
                </SourceAccordion>
            </SimContainer>
        </ResponsiveLayout>
    );
}
