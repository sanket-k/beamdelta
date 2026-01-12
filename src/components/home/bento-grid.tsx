import type { ReactNode } from "react";

interface BentoGridProps {
    children: ReactNode;
}

/**
 * BentoGrid - Asymmetric grid container for homepage cards
 * Mobile: Single column stack
 * Tablet+: 2 columns with featured card spanning 2 rows
 */
export function BentoGrid({ children }: BentoGridProps) {
    return (
        <div className="grid w-full max-w-4xl grid-cols-1 gap-4 px-4 md:grid-cols-2 md:grid-rows-[auto_auto] lg:gap-5">
            {children}
        </div>
    );
}

