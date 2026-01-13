"use client";

import { type ReactNode } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface SourceAccordionProps {
    /** Title of the section */
    title?: string;
    /** Content (formulas, explanations, etc.) */
    children: ReactNode;
    /** Whether to start expanded */
    defaultOpen?: boolean;
    /** Additional className */
    className?: string;
}

/**
 * "Source the Math" collapsible section.
 * Shows formulas and explanations for the simulation calculations.
 */
export function SourceAccordion({
    title = "Source the Math",
    children,
    defaultOpen = false,
    className,
}: SourceAccordionProps) {
    return (
        <Accordion
            type="single"
            collapsible
            defaultValue={defaultOpen ? "source" : undefined}
            className={cn("w-full", className)}
        >
            <AccordionItem
                value="source"
                className="rounded-xl border border-border bg-card px-4 sm:px-6 last:border-b"
            >
                <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-3 text-left">
                        <BookOpen className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-semibold">{title}</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                    <div className="prose prose-sm prose-invert max-w-none">
                        {children}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

/**
 * Formula display component for use inside SourceAccordion
 */
interface FormulaProps {
    /** Formula name */
    name: string;
    /** LaTeX-like formula string */
    formula: string;
    /** Explanation text */
    description?: string;
}

export function Formula({ name, formula, description }: FormulaProps) {
    return (
        <div className="py-3 border-b border-border last:border-0">
            <h4 className="font-medium text-foreground mb-2">{name}</h4>
            <code className="block bg-muted rounded px-3 py-2 font-mono text-sm text-accent">
                {formula}
            </code>
            {description && (
                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            )}
        </div>
    );
}
