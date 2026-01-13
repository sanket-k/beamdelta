"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils";

/**
 * Mobile bottom navigation bar with glassmorphic styling.
 * Hidden on md+ breakpoints.
 */
export function MobileBottomBar() {
    const pathname = usePathname();

    return (
        <nav
            className={cn(
                "fixed bottom-0 left-0 right-0 z-50 md:hidden",
                "backdrop-blur-xl bg-background/80",
                "border-t border-border",
                "safe-area-inset-bottom"
            )}
        >
            <div className="flex items-center justify-around h-16 px-2">
                {NAV_ITEMS.map((item) => {
                    const isActive =
                        pathname === item.href ||
                        (item.href !== "/" && pathname.startsWith(item.href));
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1",
                                "w-16 h-full",
                                "transition-all duration-[var(--duration-fast)]",
                                "active:scale-95",
                                isActive
                                    ? "text-accent"
                                    : "text-foreground-muted hover:text-foreground"
                            )}
                        >
                            <Icon
                                className={cn(
                                    "h-5 w-5 transition-transform duration-[var(--duration-fast)]",
                                    isActive && "scale-110"
                                )}
                            />
                            <span className="text-xs font-medium">{item.label}</span>
                            {isActive && (
                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
