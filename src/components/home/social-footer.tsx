import { Github, Linkedin } from "lucide-react";

interface SocialLink {
    href: string;
    label: string;
    icon: React.ReactNode;
}

const socialLinks: SocialLink[] = [
    {
        href: "https://github.com/sanket-k",
        label: "GitHub",
        icon: <Github className="h-5 w-5" />,
    },
    {
        href: "https://x.com/0xsanketk",
        label: "X (Twitter)",
        icon: (
            <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-5 w-5 fill-current"
            >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        href: "https://www.linkedin.com/in/sanket-k/",
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
                    Built in public. I ship one new simulation/blog/cheatsheet every week.
                </p>
                <p className="text-sm font-medium text-foreground">
                    Follow my engineering journey.
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
