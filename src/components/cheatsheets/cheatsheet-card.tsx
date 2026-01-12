"use client";

import { useState } from "react";
import { ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { CheatsheetTerm } from "@/types/cheatsheet";

interface CheatsheetCardProps {
    term: CheatsheetTerm;
    className?: string;
    /** Whether to start expanded */
    defaultOpen?: boolean;
}

/**
 * Interactive cheatsheet card with click-to-expand pattern.
 * Shows term and short definition by default, expands to reveal full details.
 */
export function CheatsheetCard({ term, className, defaultOpen = false }: CheatsheetCardProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <div
                className={cn(
                    "group rounded-xl border border-border bg-card",
                    "transition-all duration-[var(--duration-normal)]",
                    "hover:border-accent/40 hover:shadow-[0_0_20px_rgba(247,147,26,0.1)]",
                    isOpen && "border-accent/30 bg-card/80",
                    className
                )}
            >
                <CollapsibleTrigger asChild>
                    <button
                        className={cn(
                            "flex w-full items-start gap-3 p-4 text-left",
                            "transition-colors duration-[var(--duration-fast)]",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                            "rounded-xl"
                        )}
                    >
                        {/* Expand indicator */}
                        <ChevronRight
                            className={cn(
                                "mt-0.5 h-5 w-5 shrink-0 text-muted-foreground",
                                "transition-transform duration-[var(--duration-fast)]",
                                isOpen && "rotate-90 text-accent"
                            )}
                        />

                        <div className="flex-1 min-w-0">
                            {/* Term name */}
                            <h3 className="font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors">
                                {term.term}
                            </h3>
                            {/* Short definition */}
                            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                {term.shortDefinition}
                            </p>
                        </div>
                    </button>
                </CollapsibleTrigger>

                <CollapsibleContent>
                    <div className="px-4 pb-4 pt-0 pl-12">
                        {/* Divider */}
                        <div className="mb-4 h-px bg-border" />

                        {/* Full definition */}
                        <p className="text-sm text-foreground/90 leading-relaxed">
                            {term.fullDefinition}
                        </p>

                        {/* Code example */}
                        {term.codeExample && (
                            <pre className="mt-4 rounded-lg bg-background-secondary p-3 text-sm font-mono text-accent overflow-x-auto">
                                <code>{term.codeExample}</code>
                            </pre>
                        )}

                        {/* Related simulation link */}
                        {term.relatedSimLink && (
                            <Link
                                href={term.relatedSimLink}
                                className={cn(
                                    "mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent",
                                    "hover:underline underline-offset-4",
                                    "transition-colors duration-[var(--duration-fast)]"
                                )}
                            >
                                <ExternalLink className="h-4 w-4" />
                                Explore in Simulator
                            </Link>
                        )}

                        {/* Tags */}
                        {term.tags && term.tags.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {term.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </CollapsibleContent>
            </div>
        </Collapsible>
    );
}
