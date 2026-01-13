"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

/**
 * Mobile header with logo and theme toggle.
 * Hidden on md+ breakpoints where desktop nav is used.
 */
export function MobileHeader() {
    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 md:hidden",
                "backdrop-blur-xl bg-background/80",
                "border-b border-border",
                "safe-area-inset-top"
            )}
        >
            <div className="flex items-center justify-between h-14 px-4">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 text-foreground hover:text-accent transition-colors duration-[var(--duration-fast)]"
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 ring-1 ring-accent/20">
                        <svg
                            className="h-6 w-6 text-accent"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            strokeLinejoin="round"
                            viewBox="-2 -4 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M10 1L18.66 15H1.34L10 1z" />
                        </svg>
                    </div>
                    <span className="font-semibold text-sm">BeamDelta</span>
                </Link>

                {/* Theme Toggle */}
                <ThemeToggle className="h-9 w-9" />
            </div>
        </header>
    );
}
