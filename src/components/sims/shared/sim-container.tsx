import { type ReactNode } from "react";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { EmbedModal } from "@/components/embed/embed-modal";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface SimContainerProps {
    /** Page title */
    title: string;
    /** Page description */
    description?: string;
    /** Breadcrumb navigation items */
    breadcrumbs?: BreadcrumbItem[];
    /** Main content */
    children: ReactNode;
    /** Path to embed route (enables embed button) */
    embedPath?: string;
    /** Current params to pass to embed */
    embedParams?: Record<string, string | number>;
    /** Additional className */
    className?: string;
}

/**
 * Layout wrapper for simulation pages.
 * Provides consistent structure with title, description, and breadcrumbs.
 */
export function SimContainer({
    title,
    description,
    breadcrumbs,
    children,
    embedPath,
    embedParams,
    className,
}: SimContainerProps) {
    return (
        <div className={cn("space-y-6", className)}>
            {/* Header Section */}
            <header className="space-y-4">
                {breadcrumbs && breadcrumbs.length > 0 && (
                    <Breadcrumbs items={breadcrumbs} />
                )}

                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            {title}
                        </h1>
                        {description && (
                            <p className="text-base text-muted-foreground max-w-2xl">
                                {description}
                            </p>
                        )}
                    </div>

                    {/* Embed Button */}
                    {embedPath && (
                        <EmbedModal
                            embedPath={embedPath}
                            currentParams={embedParams}
                        />
                    )}
                </div>
            </header>

            {/* Main Content */}
            <div className="space-y-6">{children}</div>
        </div>
    );
}

