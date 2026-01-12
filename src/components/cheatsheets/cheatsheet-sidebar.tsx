"use client";

import { cn } from "@/lib/utils";

interface CheatsheetSidebarProps {
    subcategories: string[];
    activeSection?: string;
    onSectionClick: (section: string) => void;
    className?: string;
}

/**
 * Sticky sidebar navigation for subcategory sections.
 * Desktop only - hidden on mobile.
 */
export function CheatsheetSidebar({
    subcategories,
    activeSection,
    onSectionClick,
    className,
}: CheatsheetSidebarProps) {
    return (
        <aside
            className={cn(
                "hidden lg:block w-48 shrink-0",
                "sticky top-24 h-fit",
                className
            )}
        >
            <nav className="space-y-1">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Sections
                </p>
                {subcategories.map((subcategory) => (
                    <button
                        key={subcategory}
                        onClick={() => onSectionClick(subcategory)}
                        className={cn(
                            "block w-full text-left px-3 py-2 text-sm rounded-lg",
                            "transition-colors duration-[var(--duration-fast)]",
                            activeSection === subcategory
                                ? "bg-accent/10 text-accent font-medium"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        )}
                    >
                        {subcategory}
                    </button>
                ))}
            </nav>
        </aside>
    );
}
