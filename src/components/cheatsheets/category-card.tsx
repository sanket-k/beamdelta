import Link from "next/link";
import { Bitcoin, Landmark, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CategoryMeta } from "@/types/cheatsheet";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
    Bitcoin: Bitcoin,
    Landmark: Landmark,
};

interface CategoryCardProps {
    category: CategoryMeta;
    className?: string;
}

/**
 * Card for cheatsheet category on the landing page.
 * Displays icon, name, description, and term count.
 */
export function CategoryCard({ category, className }: CategoryCardProps) {
    const Icon = iconMap[category.icon] || Bitcoin;

    return (
        <Link
            href={category.href}
            className={cn(
                "group flex flex-col p-6 rounded-xl",
                "border border-border bg-card",
                "transition-all duration-[var(--duration-normal)]",
                "hover:border-accent/40 hover:bg-card/80",
                "hover:shadow-[0_0_30px_rgba(247,147,26,0.15)]",
                "hover:scale-[1.02] active:scale-[0.98]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                className
            )}
        >
            {/* Icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 ring-1 ring-accent/20 transition-colors group-hover:bg-accent/20">
                <Icon className="h-6 w-6 text-accent" />
            </div>

            {/* Content */}
            <div className="mt-4 flex-1">
                <h3 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors">
                    {category.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {category.description}
                </p>
            </div>

            {/* Term count badge */}
            <div className="mt-4 flex items-center justify-between">
                <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                    {category.termCount} terms
                </span>
                <span className="text-sm text-muted-foreground group-hover:text-accent transition-colors">
                    Explore →
                </span>
            </div>
        </Link>
    );
}
