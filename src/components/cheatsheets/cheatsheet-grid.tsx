"use client";

import { CheatsheetCard } from "./cheatsheet-card";
import type { CheatsheetTerm } from "@/types/cheatsheet";
import { cn } from "@/lib/utils";

interface CheatsheetGridProps {
    terms: CheatsheetTerm[];
    className?: string;
}

/**
 * Responsive grid layout for cheatsheet cards.
 * - Mobile: Single column
 * - Tablet: 2 columns  
 * - Desktop: 3 columns
 */
export function CheatsheetGrid({ terms, className }: CheatsheetGridProps) {
    if (terms.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-lg text-muted-foreground">No terms found</p>
                <p className="mt-1 text-sm text-muted-foreground/70">
                    Try adjusting your search query
                </p>
            </div>
        );
    }

    return (
        <div
            className={cn(
                "grid gap-4",
                "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
                className
            )}
        >
            {terms.map((term) => (
                <CheatsheetCard key={term.id} term={term} />
            ))}
        </div>
    );
}
