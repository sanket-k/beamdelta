"use client";

import Link from "next/link";
import { useRef } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BentoCardProps {
    href: string;
    variant?: "featured" | "standard";
    label?: string; // Single label (backward compatibility)
    labels?: string[]; // Multiple labels (takes priority if provided)
    title: string;
    description: string;
    children?: ReactNode;
    action: string;
}

/**
 * BentoCard - Glassmorphic card for homepage Bento grid
 * Featured: Larger, spans 2 rows on desktop, contains visual element
 * Standard: Regular size for secondary sections
 */
export function BentoCard({
    href,
    variant = "standard",
    label,
    labels,
    title,
    description,
    children,
    action,
}: BentoCardProps) {
    const cardRef = useRef<HTMLAnchorElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        cardRef.current.style.setProperty("--mouse-x", `${x}%`);
        cardRef.current.style.setProperty("--mouse-y", `${y}%`);
    };

    return (
        <Link
            ref={cardRef}
            href={href}
            onMouseMove={handleMouseMove}
            className={cn(
                "bento-card group flex flex-col p-6",
                variant === "featured" && "min-h-[280px] md:row-span-2 md:min-h-[320px]",
                variant === "standard" && "min-h-[140px]"
            )}
        >
            {/* Label badge(s) */}
            <div className="mb-3 flex flex-wrap gap-2">
                {labels ? (
                    // Multiple labels
                    labels.map((l, i) => (
                        <span
                            key={i}
                            className="inline-flex items-center rounded-md bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent ring-1 ring-accent/20"
                        >
                            {l}
                        </span>
                    ))
                ) : label ? (
                    // Single label (backward compatibility)
                    <span className="inline-flex items-center rounded-md bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent ring-1 ring-accent/20">
                        {label}
                    </span>
                ) : null}
            </div>

            {/* Title */}
            <h3 className="mb-2 text-xl font-semibold text-foreground md:text-2xl">
                {title}
            </h3>

            {/* Description */}
            <p className="mb-4 text-sm text-foreground-muted md:text-base">
                {description}
            </p>

            {/* Visual content area (for featured cards) */}
            {children && (
                <div className="mt-auto flex-1 rounded-lg bg-secondary/30 p-3">
                    {children}
                </div>
            )}

            {/* Action link */}
            <div className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-medium text-accent transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1">
                {action}
                <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </div>
        </Link>
    );
}
