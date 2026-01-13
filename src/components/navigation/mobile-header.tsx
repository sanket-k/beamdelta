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
                            viewBox="-2 -4 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M10.528 2.358a1 1 0 0 0-1.377.32l-6.095 9.794A1 1 0 0 0 3.905 14h12.19a1 1 0 0 0 .85-1.528l-6.096-9.794a1 1 0 0 0-.32-.32zm2.019-.737l6.095 9.794A3 3 0 0 1 16.095 16H3.905a3 3 0 0 1-2.547-4.585L7.453 1.62a3 3 0 0 1 5.094 0z" />
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
