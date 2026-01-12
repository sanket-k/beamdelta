import Decimal from "decimal.js";
import {
    BLOCKS_PER_YEAR,
    INITIAL_BLOCK_REWARD,
    HALVING_INTERVAL,
} from "@/lib/constants/bitcoin";

/**
 * Chart data point for the inflation visualization
 */
export interface ChartDataPoint {
    /** Block height */
    blockHeight: number;
    /** Approximate year since genesis */
    year: number;
    /** Total BTC mined up to this block */
    totalSupply: number;
    /** Annual inflation rate as percentage */
    inflationRate: number;
    /** Current block reward at this height */
    blockReward: number;
    /** Halving epoch (0-indexed) */
    halvingEpoch: number;
}

/**
 * Calculate the block reward at a given block height
 * Reward halves every `halvingInterval` blocks
 */
export function calculateBlockReward(
    blockHeight: number,
    initialReward: number = INITIAL_BLOCK_REWARD,
    halvingInterval: number = HALVING_INTERVAL
): number {
    const halvings = Math.floor(blockHeight / halvingInterval);

    // After ~33 halvings, reward becomes negligible (effectively 0)
    if (halvings >= 64) return 0;

    const reward = new Decimal(initialReward).div(new Decimal(2).pow(halvings));
    return reward.toNumber();
}

/**
 * Calculate the total supply mined up to a given block height
 * Uses the geometric series formula for efficiency
 */
export function calculateTotalSupply(
    blockHeight: number,
    initialReward: number = INITIAL_BLOCK_REWARD,
    halvingInterval: number = HALVING_INTERVAL
): number {
    const halvings = Math.floor(blockHeight / halvingInterval);
    const blocksInCurrentEpoch = blockHeight % halvingInterval;

    let totalSupply = new Decimal(0);

    // Sum up complete halving epochs
    for (let i = 0; i < halvings; i++) {
        const epochReward = new Decimal(initialReward).div(new Decimal(2).pow(i));
        totalSupply = totalSupply.plus(epochReward.times(halvingInterval));
    }

    // Add blocks in current epoch
    const currentReward = new Decimal(initialReward).div(
        new Decimal(2).pow(halvings)
    );
    totalSupply = totalSupply.plus(currentReward.times(blocksInCurrentEpoch));

    return totalSupply.toNumber();
}

/**
 * Calculate the theoretical maximum supply with given parameters
 */
export function calculateMaxSupply(
    initialReward: number = INITIAL_BLOCK_REWARD,
    halvingInterval: number = HALVING_INTERVAL
): number {
    // Sum of geometric series: a * n * (1 + 1/2 + 1/4 + ...) ≈ a * n * 2
    // where a = initial reward, n = halving interval
    const maxSupply = new Decimal(initialReward)
        .times(halvingInterval)
        .times(2);
    return maxSupply.toNumber();
}

/**
 * Calculate annual inflation rate at a given block height
 * Inflation = (new coins per year / total supply) * 100
 */
export function calculateInflationRate(
    blockHeight: number,
    initialReward: number = INITIAL_BLOCK_REWARD,
    halvingInterval: number = HALVING_INTERVAL,
    blocksPerYear: number = BLOCKS_PER_YEAR
): number {
    const blockReward = calculateBlockReward(
        blockHeight,
        initialReward,
        halvingInterval
    );
    const totalSupply = calculateTotalSupply(
        blockHeight,
        initialReward,
        halvingInterval
    );

    if (totalSupply === 0 || blockReward === 0) return 0;

    const newCoinsPerYear = new Decimal(blockReward).times(blocksPerYear);
    const inflationRate = newCoinsPerYear.div(totalSupply).times(100);

    return inflationRate.toNumber();
}

/**
 * Generate chart data points for visualization
 * Creates evenly distributed data points with extra points at halving boundaries
 */
export function generateChartData(
    initialReward: number = INITIAL_BLOCK_REWARD,
    halvingInterval: number = HALVING_INTERVAL,
    maxBlocks: number = 840_000,
    dataPoints: number = 100
): ChartDataPoint[] {
    const data: ChartDataPoint[] = [];
    const step = Math.max(1, Math.floor(maxBlocks / dataPoints));

    // Set of halving boundary blocks
    const halvingBlocks = new Set<number>();
    for (let h = 0; h <= Math.floor(maxBlocks / halvingInterval); h++) {
        const halvingBlock = h * halvingInterval;
        if (halvingBlock <= maxBlocks) {
            halvingBlocks.add(halvingBlock);
            // Also add point just before halving
            if (halvingBlock > 0) {
                halvingBlocks.add(halvingBlock - 1);
            }
        }
    }

    // Generate regular data points + halving boundaries
    const allBlocks = new Set<number>();

    for (let block = 0; block <= maxBlocks; block += step) {
        allBlocks.add(block);
    }

    // Ensure last block is included
    allBlocks.add(maxBlocks);

    // Add halving boundaries
    halvingBlocks.forEach((block) => allBlocks.add(block));

    // Sort and generate data
    const sortedBlocks = Array.from(allBlocks).sort((a, b) => a - b);

    for (const blockHeight of sortedBlocks) {
        const blockReward = calculateBlockReward(
            blockHeight,
            initialReward,
            halvingInterval
        );
        const totalSupply = calculateTotalSupply(
            blockHeight,
            initialReward,
            halvingInterval
        );
        const inflationRate = calculateInflationRate(
            blockHeight,
            initialReward,
            halvingInterval
        );

        data.push({
            blockHeight,
            year: blockHeight / BLOCKS_PER_YEAR,
            totalSupply,
            inflationRate,
            blockReward,
            halvingEpoch: Math.floor(blockHeight / halvingInterval),
        });
    }

    return data;
}

/**
 * Format a large number with appropriate suffix (K, M, B)
 */
export function formatSupply(value: number): string {
    if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(2)}M`;
    }
    if (value >= 1_000) {
        return `${(value / 1_000).toFixed(1)}K`;
    }
    return value.toFixed(0);
}

/**
 * Format inflation rate as percentage
 */
export function formatInflationRate(value: number): string {
    if (value < 0.01) {
        return "<0.01%";
    }
    return `${value.toFixed(2)}%`;
}
