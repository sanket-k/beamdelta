"use client";

import { type ReactNode } from "react";
import { ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

interface ChartWrapperProps {
    /** Chart content */
    children: ReactNode;
    /** Height of the chart container */
    height?: number;
    /** Additional className */
    className?: string;
}

/**
 * Responsive wrapper for Recharts charts.
 * Provides consistent sizing and dark theme styling.
 */
export function ChartWrapper({
    children,
    height = 400,
    className,
}: ChartWrapperProps) {
    return (
        <div
            className={cn(
                "w-full rounded-xl border border-border bg-card p-4 sm:p-6",
                className
            )}
        >
            <ResponsiveContainer width="100%" height={height}>
                {children}
            </ResponsiveContainer>
        </div>
    );
}
