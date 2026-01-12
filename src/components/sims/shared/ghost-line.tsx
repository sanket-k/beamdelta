"use client";

import { Line } from "recharts";
import type { ChartDataPoint } from "@/lib/math/bitcoin/inflation";

interface GhostLineProps {
    /** Ghost data points */
    data: ChartDataPoint[] | null;
    /** Whether ghost is visible */
    isVisible: boolean;
    /** Data key to display */
    dataKey: keyof ChartDataPoint;
    /** Y-axis ID */
    yAxisId?: string;
    /** Line color */
    color?: string;
}

/**
 * Ghost line component for showing previous simulation state.
 * Renders as dashed line at 30% opacity.
 *
 * Note: This component should be used inside a ComposedChart
 * and the parent chart needs to merge ghost data with current data.
 */
export function GhostLine({
    data,
    isVisible,
    dataKey,
    yAxisId = "left",
    color = "hsl(0 0% 50%)",
}: GhostLineProps) {
    if (!isVisible || !data) {
        return null;
    }

    return (
        <Line
            data={data}
            type="monotone"
            dataKey={dataKey}
            yAxisId={yAxisId}
            stroke={color}
            strokeWidth={2}
            strokeDasharray="5 5"
            strokeOpacity={0.3}
            dot={false}
            isAnimationActive={false}
            connectNulls
        />
    );
}

/**
 * Utility to merge current and ghost data for chart rendering
 */
export function mergeChartData(
    currentData: ChartDataPoint[],
    ghostData: ChartDataPoint[] | null,
    ghostPrefix: string = "ghost_"
): Array<ChartDataPoint & { [key: string]: number | string }> {
    if (!ghostData) {
        return currentData as Array<ChartDataPoint & { [key: string]: number | string }>;
    }

    // Create a map of ghost data by block height
    const ghostMap = new Map(
        ghostData.map((point) => [point.blockHeight, point])
    );

    // Merge ghost data into current data points
    return currentData.map((point) => {
        const ghostPoint = ghostMap.get(point.blockHeight);
        if (ghostPoint) {
            return {
                ...point,
                [`${ghostPrefix}totalSupply`]: ghostPoint.totalSupply,
                [`${ghostPrefix}inflationRate`]: ghostPoint.inflationRate,
            };
        }
        return point as ChartDataPoint & { [key: string]: number | string };
    });
}
