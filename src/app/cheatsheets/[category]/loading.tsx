import { cn } from "@/lib/utils";

/**
 * Skeleton loading state for category page.
 * Shows header skeleton and grid of card placeholders.
 */
export default function CategoryLoading() {
    return (
        <div className="container mx-auto px-4 py-6 max-w-6xl animate-pulse">
            {/* Breadcrumbs skeleton */}
            <div className="flex gap-2 mb-6">
                <div className="h-4 w-12 rounded bg-secondary" />
                <div className="h-4 w-4 rounded bg-secondary" />
                <div className="h-4 w-24 rounded bg-secondary" />
                <div className="h-4 w-4 rounded bg-secondary" />
                <div className="h-4 w-32 rounded bg-secondary" />
            </div>

            {/* Header skeleton */}
            <div className="mb-8">
                <div className="h-8 w-48 rounded bg-secondary" />
                <div className="mt-2 h-5 w-96 max-w-full rounded bg-secondary" />
            </div>

            {/* Search skeleton */}
            <div className="h-11 w-full max-w-md rounded-lg bg-secondary mb-8" />

            {/* Content skeleton */}
            <div className="flex gap-8">
                {/* Sidebar skeleton (desktop) */}
                <div className="hidden lg:block w-48 shrink-0 space-y-2">
                    <div className="h-4 w-16 rounded bg-secondary mb-4" />
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-9 w-full rounded-lg bg-secondary" />
                    ))}
                </div>

                {/* Grid skeleton */}
                <div className="flex-1 space-y-10">
                    {/* Section 1 */}
                    <div>
                        <div className="h-6 w-24 rounded bg-secondary mb-4" />
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                            {[1, 2, 3, 4].map((i) => (
                                <SkeletonCard key={i} />
                            ))}
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div>
                        <div className="h-6 w-32 rounded bg-secondary mb-4" />
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                            {[1, 2, 3, 4].map((i) => (
                                <SkeletonCard key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SkeletonCard() {
    return (
        <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex gap-3">
                <div className="h-5 w-5 rounded bg-secondary shrink-0" />
                <div className="flex-1 space-y-2">
                    <div className="h-5 w-32 rounded bg-secondary" />
                    <div className="h-4 w-full rounded bg-secondary" />
                </div>
            </div>
        </div>
    );
}
