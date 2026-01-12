/**
 * Bitcoin Protocol Constants
 * These are the fundamental parameters that define Bitcoin's monetary policy.
 */

/** Initial block reward when Bitcoin launched (50 BTC) */
export const INITIAL_BLOCK_REWARD = 50;

/** Number of blocks between each halving event */
export const HALVING_INTERVAL = 210_000;

/** Maximum supply of Bitcoin that will ever exist */
export const MAX_SUPPLY = 21_000_000;

/** Average blocks mined per day (1 block every ~10 minutes) */
export const BLOCKS_PER_DAY = 144;

/** Approximate blocks per year (365.25 days) */
export const BLOCKS_PER_YEAR = Math.floor(BLOCKS_PER_DAY * 365.25);

/** Bitcoin launch date */
export const GENESIS_DATE = new Date("2009-01-03");

/** Current block height (approximately, updated periodically) */
export const CURRENT_BLOCK_HEIGHT = 880_000;

/**
 * Simulation parameter limits
 */
export const SIM_LIMITS = {
    blockReward: { min: 1, max: 100, step: 1 },
    halvingInterval: { min: 50_000, max: 500_000, step: 10_000 },
    maxBlocks: { min: 210_000, max: 2_100_000, step: 210_000 },
} as const;

/**
 * Default simulation parameters
 */
export const DEFAULT_SIM_PARAMS = {
    blockReward: INITIAL_BLOCK_REWARD,
    halvingInterval: HALVING_INTERVAL,
    maxBlocks: 840_000, // ~4 halvings worth
} as const;
