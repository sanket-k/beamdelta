"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils";

/**
 * Desktop top navigation bar with logo and section links.
 * Visible on md+ breakpoints only.
 */
export function DesktopTopNav() {
    const pathname = usePathname();

    return (
        <header
            className={cn(
                "hidden md:flex",
                "fixed top-0 left-0 right-0 z-50",
                "h-16 items-center justify-between px-6",
                "backdrop-blur-xl bg-background/80",
                "border-b border-white/10"
            )}
        >
            {/* Logo */}
            <Link
                href="/"
                className="flex items-center gap-2 transition-opacity hover:opacity-80"
            >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 ring-1 ring-accent/20">
                    <svg
                        className="h-4 w-4 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                    </svg>
                </div>
                <span className="text-lg font-bold tracking-tight">
                    Sim<span className="text-accent">Lab</span>
                </span>
            </Link>

            {/* Navigation Links */}
            <nav className="flex items-center gap-1">
                {NAV_ITEMS.slice(1).map((item) => {
                    // Skip Home since we have logo
                    const isActive =
                        pathname === item.href ||
                        (item.href !== "/" && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "relative px-4 py-2 text-sm font-medium",
                                "transition-colors duration-[var(--duration-fast)]",
                                "hover:text-foreground",
                                isActive ? "text-foreground" : "text-foreground-muted"
                            )}
                        >
                            {item.label}
                            {/* Active underline */}
                            {isActive && (
                                <span
                                    className={cn(
                                        "absolute bottom-0 left-4 right-4 h-0.5 rounded-full",
                                        "bg-accent",
                                        "animate-in fade-in slide-in-from-bottom-1 duration-200"
                                    )}
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>
        </header>
    );
}
