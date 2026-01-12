import { type ReactNode } from "react";
import { Breadcrumbs, type BreadcrumbItemType } from "@/components/navigation/breadcrumbs";
import { cn } from "@/lib/utils";

interface HeaderProps {
    /** Breadcrumb items for navigation context */
    breadcrumbs?: BreadcrumbItemType[];
    /** Page title */
    title?: string;
    /** Optional description below the title */
    description?: string;
    /** Right-side actions (buttons, etc.) */
    actions?: ReactNode;
    /** Additional class names */
    className?: string;
}

/**
 * Page header with breadcrumbs, title, and optional actions.
 */
export function Header({
    breadcrumbs,
    title,
    description,
    actions,
    className,
}: HeaderProps) {
    return (
        <header className={cn("mb-6 md:mb-8", className)}>
            {/* Breadcrumbs */}
            {breadcrumbs && breadcrumbs.length > 0 && (
                <div className="mb-4">
                    <Breadcrumbs items={breadcrumbs} />
                </div>
            )}

            {/* Title Row */}
            {(title || actions) && (
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        {title && (
                            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                                {title}
                            </h1>
                        )}
                        {description && (
                            <p className="text-foreground-muted max-w-2xl">{description}</p>
                        )}
                    </div>
                    {actions && <div className="flex items-center gap-2">{actions}</div>}
                </div>
            )}
        </header>
    );
}
