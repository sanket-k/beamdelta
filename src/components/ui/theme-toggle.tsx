"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
    className?: string;
}

/**
 * Theme toggle button with Sun/Moon icons.
 * Switches between light and dark mode using next-themes.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch by only rendering after mount
    useEffect(() => setMounted(true), []);

    if (!mounted) {
        // Return placeholder to avoid layout shift
        return <div className={cn("h-9 w-9", className)} aria-hidden />;
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={cn(
                "h-9 w-9 flex items-center justify-center rounded-lg",
                "bg-secondary hover:bg-accent/10",
                "transition-all duration-[var(--duration-fast)]",
                "hover:scale-105 active:scale-95",
                "ring-1 ring-border hover:ring-accent/30",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                className
            )}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
            {isDark ? (
                <Sun className="h-4 w-4 text-accent" />
            ) : (
                <Moon className="h-4 w-4 text-accent" />
            )}
        </button>
    );
}
