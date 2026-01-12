/**
 * Loading skeleton for blog post pages
 */
export default function BlogPostLoading() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 animate-pulse">
            {/* Header skeleton */}
            <div className="mb-10 pb-8 border-b border-border">
                {/* Tags */}
                <div className="flex gap-2 mb-4">
                    <div className="h-6 w-16 rounded-full bg-muted" />
                    <div className="h-6 w-20 rounded-full bg-muted" />
                </div>

                {/* Title */}
                <div className="h-12 w-3/4 rounded-lg bg-muted mb-4" />

                {/* Description */}
                <div className="h-6 w-full rounded bg-muted mb-2" />
                <div className="h-6 w-2/3 rounded bg-muted mb-6" />

                {/* Meta */}
                <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-full bg-muted" />
                    <div className="h-4 w-24 rounded bg-muted" />
                    <div className="h-4 w-32 rounded bg-muted" />
                    <div className="h-4 w-20 rounded bg-muted" />
                </div>
            </div>

            {/* Content skeleton */}
            <div className="space-y-4">
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-3/4 rounded bg-muted" />
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-5/6 rounded bg-muted" />
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-8 w-1/2 rounded bg-muted mt-8" />
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-2/3 rounded bg-muted" />
            </div>
        </div>
    );
}
