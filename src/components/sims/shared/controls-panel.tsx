"use client";

import { type ReactNode } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ControlsPanelProps {
    /** Panel title */
    title?: string;
    /** Control elements */
    children: ReactNode;
    /** Reset callback */
    onReset?: () => void;
    /** Whether reset is available */
    hasChanges?: boolean;
    /** Additional className */
    className?: string;
}

/**
 * Generic controls panel for simulations.
 * Provides consistent layout with optional reset functionality.
 */
export function ControlsPanel({
    title = "Parameters",
    children,
    onReset,
    hasChanges = false,
    className,
}: ControlsPanelProps) {
    return (
        <div
            className={cn(
                "rounded-xl border border-border bg-card p-4 sm:p-6",
                "space-y-6",
                className
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{title}</h2>
                {onReset && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onReset}
                        disabled={!hasChanges}
                        className={cn(
                            "gap-2 text-muted-foreground",
                            "hover:text-foreground hover:bg-secondary",
                            "transition-all duration-[var(--duration-fast)]",
                            hasChanges && "text-accent hover:text-accent"
                        )}
                    >
                        <RotateCcw className="h-4 w-4" />
                        <span className="hidden sm:inline">Reset</span>
                    </Button>
                )}
            </div>

            {/* Controls */}
            <div className="space-y-6">{children}</div>
        </div>
    );
}
