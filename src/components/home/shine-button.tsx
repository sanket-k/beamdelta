"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ShineButtonProps {
    href: string;
    children: ReactNode;
    variant?: "primary" | "outline";
    className?: string;
}

/**
 * ShineButton - Premium CTA button with animated gradient shine
 * Primary: Bitcoin orange gradient with flowing shine effect
 * Outline: Transparent with border, subtle glow on hover
 */
export function ShineButton({
    href,
    children,
    variant = "primary",
    className,
}: ShineButtonProps) {
    if (variant === "outline") {
        return (
            <Link
                href={href}
                className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3",
                    "border border-border bg-transparent text-foreground",
                    "font-medium transition-all duration-[var(--duration-normal)]",
                    "hover:border-accent/50 hover:bg-accent/5 hover:text-accent",
                    "active:scale-95",
                    className
                )}
            >
                {children}
            </Link>
        );
    }

    return (
        <Link
            href={href}
            className={cn(
                "shine-button inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3",
                "font-semibold text-white",
                "shadow-lg shadow-accent/25",
                "transition-all duration-[var(--duration-normal)]",
                "hover:scale-[1.02] hover:shadow-xl hover:shadow-accent/30",
                "active:scale-95",
                className
            )}
        >
            {children}
        </Link>
    );
}
