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
                "relative w-full rounded-xl border border-border bg-card p-4 sm:p-6",
                className
            )}
        >
            <ResponsiveContainer width="100%" height={height}>
                {children}
            </ResponsiveContainer>

            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none opacity-[0.2] grayscale">
                <div className="flex items-center gap-4 scale-150">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/20 ring-2 ring-accent/30">
                        <svg
                            className="h-10 w-10 text-accent"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            strokeLinejoin="round"
                            viewBox="-2 -4 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M10 1L18.66 15H1.34L10 1z" />
                        </svg>
                    </div>
                    <span className="text-5xl font-bold tracking-tight text-foreground">
                        Beam<span className="text-accent">Delta</span>
                    </span>
                </div>
            </div>
        </div>
    );
}
