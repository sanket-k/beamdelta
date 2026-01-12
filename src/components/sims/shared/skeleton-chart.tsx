import { cn } from "@/lib/utils";

interface SkeletonChartProps {
    /** Height of the skeleton */
    height?: number | string;
    /** Additional className */
    className?: string;
}

/**
 * Loading skeleton for charts with shimmer animation.
 */
export function SkeletonChart({
    height = 400,
    className,
}: SkeletonChartProps) {
    return (
        <div
            className={cn(
                "w-full rounded-xl border border-border bg-card p-4 sm:p-6",
                className
            )}
        >
            <div
                className="relative overflow-hidden rounded-lg bg-muted"
                style={{ height }}
            >
                {/* Shimmer effect */}
                <div
                    className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]"
                    style={{
                        background:
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
                    }}
                />

                {/* Fake chart lines */}
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <div className="flex items-end gap-1 h-full">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div
                                key={i}
                                className="flex-1 bg-muted-foreground/10 rounded-t"
                                style={{
                                    height: `${30 + Math.sin(i * 0.5) * 20 + Math.random() * 30}%`,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Skeleton controls */}
            <div className="mt-4 flex gap-4">
                <div className="h-8 w-24 rounded bg-muted animate-pulse" />
                <div className="h-8 w-24 rounded bg-muted animate-pulse" />
                <div className="h-8 w-24 rounded bg-muted animate-pulse" />
            </div>
        </div>
    );
}
