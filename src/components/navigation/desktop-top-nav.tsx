"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";

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
                "border-b border-border"
            )}
        >
            {/* Logo */}
            <Link
                href="/"
                className="flex items-center gap-2 transition-opacity hover:opacity-80"
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
                <span className="text-lg font-bold tracking-tight">
                    Beam<span className="text-accent">Delta</span>
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
                <ThemeToggle className="ml-4" />
            </nav>
        </header>
    );
}
