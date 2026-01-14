import { Home, Play, BookOpen, List, User, type LucideIcon } from "lucide-react";

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
    { label: "Simulations", href: "/sims", icon: Play },
    { label: "Research", href: "/blog", icon: BookOpen },
    { label: "Cheatsheets", href: "/cheatsheets", icon: List },
    { label: "About", href: "/about", icon: User },
] as const;

