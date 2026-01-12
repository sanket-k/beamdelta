import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DesktopSidebarProps {
    children?: ReactNode;
    className?: string;
}

/**
 * Desktop sidebar for simulation controls.
 * Positioned on the left, sticky below the top nav.
 * Hidden on mobile - controls use bottom sheet instead.
 */
export function DesktopSidebar({ children, className }: DesktopSidebarProps) {
    return (
        <aside
            className={cn(
                "hidden md:block",
                "w-80 shrink-0",
                "sticky top-16 h-[calc(100vh-4rem)]",
                "overflow-y-auto",
                "border-r border-white/10",
                "bg-background/50 backdrop-blur-sm",
                className
            )}
        >
            <div className="p-6">{children}</div>
        </aside>
    );
}
