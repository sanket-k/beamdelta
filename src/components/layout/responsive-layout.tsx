import { type ReactNode } from "react";
import { MobileBottomBar } from "@/components/navigation/mobile-bottom-bar";
import { MobileHeader } from "@/components/navigation/mobile-header";
import { DesktopTopNav } from "@/components/navigation/desktop-top-nav";
import { DesktopSidebar } from "@/components/navigation/desktop-sidebar";
import { cn } from "@/lib/utils";

interface ResponsiveLayoutProps {
    children: ReactNode;
    /** Whether to show the desktop sidebar (for sim pages with controls) */
    showSidebar?: boolean;
    /** Content to render in the sidebar */
    sidebarContent?: ReactNode;
    /** Additional classes for the main content area */
    className?: string;
}

/**
 * Responsive layout wrapper that orchestrates navigation components.
 *
 * Mobile: Header + Content + fixed bottom bar
 * Desktop: Top nav + optional sidebar + content
 */
export function ResponsiveLayout({
    children,
    showSidebar = false,
    sidebarContent,
    className,
}: ResponsiveLayoutProps) {
    return (
        <div className="min-h-screen">
            {/* Mobile Header */}
            <MobileHeader />

            {/* Desktop Top Navigation */}
            <DesktopTopNav />

            {/* Main Layout */}
            <div className="flex pt-14 md:pt-16">
                {/* Desktop Sidebar (optional) */}
                {showSidebar && <DesktopSidebar>{sidebarContent}</DesktopSidebar>}

                {/* Main Content */}
                <main
                    className={cn(
                        "flex-1 min-w-0",
                        "pb-20 md:pb-8", // Bottom padding for mobile nav
                        "px-4 md:px-6 lg:px-8",
                        "pt-4 md:pt-6",
                        className
                    )}
                >
                    {children}
                </main>
            </div>

            {/* Mobile Bottom Navigation */}
            <MobileBottomBar />
        </div>
    );
}

