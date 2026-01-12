"use client";

import { useQueryStates, parseAsInteger } from "nuqs";
import { DEFAULT_SIM_PARAMS, SIM_LIMITS } from "@/lib/constants/bitcoin";

/**
 * Simulation parameters synced with URL query string
 */
export interface SimParams {
    blockReward: number;
    halvingInterval: number;
    maxBlocks: number;
}

/**
 * Hook for managing Bitcoin inflation simulation parameters
 * Parameters are synced with URL for shareability
 *
 * @example
 * URL: /sims/bitcoin/inflation?reward=50&interval=210000&blocks=840000
 *
 * const { params, setParams, resetParams } = useSimParams();
 */
export function useSimParams() {
    const [params, setParams] = useQueryStates(
        {
            reward: parseAsInteger.withDefault(DEFAULT_SIM_PARAMS.blockReward),
            interval: parseAsInteger.withDefault(DEFAULT_SIM_PARAMS.halvingInterval),
            blocks: parseAsInteger.withDefault(DEFAULT_SIM_PARAMS.maxBlocks),
        },
        {
            history: "replace",
            shallow: true,
        }
    );

    /**
     * Normalize params to SimParams interface with validation
     */
    const normalizedParams: SimParams = {
        blockReward: clamp(
            params.reward,
            SIM_LIMITS.blockReward.min,
            SIM_LIMITS.blockReward.max
        ),
        halvingInterval: clamp(
            params.interval,
            SIM_LIMITS.halvingInterval.min,
            SIM_LIMITS.halvingInterval.max
        ),
        maxBlocks: clamp(
            params.blocks,
            SIM_LIMITS.maxBlocks.min,
            SIM_LIMITS.maxBlocks.max
        ),
    };

    /**
     * Update a single parameter
     */
    const setBlockReward = (value: number) => {
        setParams({ reward: value });
    };

    const setHalvingInterval = (value: number) => {
        setParams({ interval: value });
    };

    const setMaxBlocks = (value: number) => {
        setParams({ blocks: value });
    };

    /**
     * Reset all parameters to defaults
     */
    const resetParams = () => {
        setParams({
            reward: DEFAULT_SIM_PARAMS.blockReward,
            interval: DEFAULT_SIM_PARAMS.halvingInterval,
            blocks: DEFAULT_SIM_PARAMS.maxBlocks,
        });
    };

    /**
     * Check if current params differ from defaults
     */
    const hasChanges =
        normalizedParams.blockReward !== DEFAULT_SIM_PARAMS.blockReward ||
        normalizedParams.halvingInterval !== DEFAULT_SIM_PARAMS.halvingInterval ||
        normalizedParams.maxBlocks !== DEFAULT_SIM_PARAMS.maxBlocks;

    return {
        params: normalizedParams,
        setBlockReward,
        setHalvingInterval,
        setMaxBlocks,
        resetParams,
        hasChanges,
        limits: SIM_LIMITS,
    };
}

/**
 * Clamp a value between min and max
 */
function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}
