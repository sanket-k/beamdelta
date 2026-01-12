"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CheatsheetSearchProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    resultCount?: number;
    className?: string;
}

/**
 * Search input for filtering cheatsheet terms.
 * Shows result count and has clear button.
 */
export function CheatsheetSearch({
    value,
    onChange,
    placeholder = "Search terms...",
    resultCount,
    className,
}: CheatsheetSearchProps) {
    return (
        <div className={cn("relative", className)}>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={cn(
                    "pl-10 pr-10 h-11",
                    "bg-background-secondary border-border",
                    "focus-visible:ring-accent focus-visible:border-accent"
                )}
            />

            {/* Clear button */}
            {value && (
                <button
                    onClick={() => onChange("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Clear search"
                >
                    <X className="h-4 w-4" />
                </button>
            )}

            {/* Result count */}
            {resultCount !== undefined && value && (
                <div className="absolute right-10 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    {resultCount} {resultCount === 1 ? "result" : "results"}
                </div>
            )}
        </div>
    );
}
