import { Home, Play, BookOpen, List, type LucideIcon } from "lucide-react";

export interface NavItem {
    label: string;
    href: string;
    icon: LucideIcon;
}

/**
 * Main navigation items used across mobile bottom bar and desktop nav
 */
export const NAV_ITEMS: NavItem[] = [
    { label: "Home", href: "/", icon: Home },
    { label: "Sims", href: "/sims", icon: Play },
    { label: "Blog", href: "/blog", icon: BookOpen },
    { label: "Cheatsheets", href: "/cheatsheets", icon: List },
] as const;
