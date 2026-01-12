"use client";

import { useState, useCallback, useRef } from "react";
import type { ChartDataPoint } from "@/lib/math/bitcoin/inflation";

/**
 * Ghost state for comparison visualization
 * Shows previous simulation state while adjusting parameters
 */
export interface GhostState {
    /** Whether ghost line is visible */
    isVisible: boolean;
    /** Ghost data points */
    data: ChartDataPoint[] | null;
    /** Label for the ghost line */
    label: string;
}

/**
 * Hook for managing ghost line state in simulations
 * Captures snapshot of current data when user starts adjusting parameters
 */
export function useGhostState() {
    const [ghostState, setGhostState] = useState<GhostState>({
        isVisible: false,
        data: null,
        label: "Previous",
    });

    // Debounce timer for hiding ghost after interaction ends
    const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

    /**
     * Capture current data as ghost state
     */
    const captureGhost = useCallback(
        (data: ChartDataPoint[], label: string = "Previous") => {
            // Clear any pending hide timer
            if (hideTimerRef.current) {
                clearTimeout(hideTimerRef.current);
                hideTimerRef.current = null;
            }

            setGhostState({
                isVisible: true,
                data,
                label,
            });
        },
        []
    );

    /**
     * Hide ghost line immediately
     */
    const hideGhost = useCallback(() => {
        if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current);
            hideTimerRef.current = null;
        }

        setGhostState((prev) => ({
            ...prev,
            isVisible: false,
        }));
    }, []);

    /**
     * Hide ghost line after a delay
     */
    const hideGhostDelayed = useCallback((delayMs: number = 2000) => {
        if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current);
        }

        hideTimerRef.current = setTimeout(() => {
            setGhostState((prev) => ({
                ...prev,
                isVisible: false,
            }));
            hideTimerRef.current = null;
        }, delayMs);
    }, []);

    /**
     * Clear ghost data completely
     */
    const clearGhost = useCallback(() => {
        if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current);
            hideTimerRef.current = null;
        }

        setGhostState({
            isVisible: false,
            data: null,
            label: "Previous",
        });
    }, []);

    return {
        ghostState,
        captureGhost,
        hideGhost,
        hideGhostDelayed,
        clearGhost,
    };
}
