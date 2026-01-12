import { Github, Twitter, Linkedin } from "lucide-react";

interface SocialLink {
    href: string;
    label: string;
    icon: React.ReactNode;
}

const socialLinks: SocialLink[] = [
    {
        href: "https://github.com",
        label: "GitHub",
        icon: <Github className="h-5 w-5" />,
    },
    {
        href: "https://twitter.com",
        label: "X / Twitter",
        icon: <Twitter className="h-5 w-5" />,
    },
    {
        href: "https://linkedin.com",
        label: "LinkedIn",
        icon: <Linkedin className="h-5 w-5" />,
    },
];

/**
 * SocialFooter - "Built in public" conversion section
 * Displays social proof message with links to follow
 */
export function SocialFooter() {
    return (
        <footer className="relative z-10 mt-16 flex flex-col items-center gap-6 pb-8 text-center">
            {/* Divider */}
            <div className="h-px w-16 bg-border" />

            {/* Copy */}
            <div className="max-w-md space-y-2">
                <p className="text-sm text-foreground-muted">
                    Built in public. I ship one new simulation every week.
                </p>
                <p className="text-sm font-medium text-foreground">
                    Follow the engineering journey.
                </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
                {socialLinks.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/50 text-foreground-muted transition-all duration-[var(--duration-fast)] hover:border-accent/50 hover:bg-accent/10 hover:text-accent hover:scale-110 active:scale-95"
                    >
                        {link.icon}
                    </a>
                ))}
            </div>
        </footer>
    );
}
