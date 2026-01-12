import Link from "next/link";
import type { ReactNode } from "react";

interface NavCardProps {
    href: string;
    icon: ReactNode;
    title: string;
    description: string;
}

/**
 * NavCard - Glassmorphic navigation card for homepage
 * Links to main sections: Simulations, Blog, Cheatsheets
 */
export function NavCard({ href, icon, title, description }: NavCardProps) {
    return (
        <Link
            href={href}
            className="group relative flex flex-col gap-3 rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-[var(--duration-normal)] hover:scale-[1.02] hover:border-accent/30 hover:bg-card/80 hover:shadow-[0_0_30px_rgba(247,147,26,0.1)] active:scale-95"
        >
            {/* Icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20 transition-all duration-[var(--duration-fast)] group-hover:bg-accent/20 group-hover:ring-accent/40">
                {icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>

            {/* Description */}
            <p className="text-sm text-foreground-muted">{description}</p>

            {/* Arrow indicator */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-muted opacity-0 transition-all duration-[var(--duration-fast)] group-hover:translate-x-1 group-hover:opacity-100">
                <svg
                    className="h-5 w-5"
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
