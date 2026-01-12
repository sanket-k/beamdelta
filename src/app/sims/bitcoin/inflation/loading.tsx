import { SkeletonChart } from "@/components/sims/shared/skeleton-chart";

/**
 * Loading skeleton for Bitcoin Inflation simulation
 * Shown during navigation while page is loading
 */
export default function Loading() {
    return (
        <div className="min-h-screen p-4 md:p-6 lg:p-8">
            <div className="space-y-6 animate-pulse">
                {/* Breadcrumbs skeleton */}
                <div className="flex gap-2">
                    <div className="h-4 w-12 rounded bg-muted" />
                    <div className="h-4 w-4 rounded bg-muted" />
                    <div className="h-4 w-20 rounded bg-muted" />
                    <div className="h-4 w-4 rounded bg-muted" />
                    <div className="h-4 w-14 rounded bg-muted" />
                </div>

                {/* Title skeleton */}
                <div className="space-y-2">
                    <div className="h-8 w-72 rounded bg-muted" />
                    <div className="h-4 w-96 max-w-full rounded bg-muted" />
                </div>

                {/* Chart skeleton */}
                <SkeletonChart height={450} />

                {/* Metric cards skeleton */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="rounded-lg border border-border bg-card p-4">
                            <div className="h-4 w-20 rounded bg-muted mb-2" />
                            <div className="h-8 w-24 rounded bg-muted" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
