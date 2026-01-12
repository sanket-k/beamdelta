import { Metadata } from "next";
import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import { Github, Twitter, Linkedin, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
    title: "About | SimLab",
    description: "The engineer behind SimLab - building interactive crypto simulations to bridge the gap between memes and whitepapers.",
};

const techStack = [
    { name: "Next.js 16", category: "Framework", color: "bg-foreground text-background" },
    { name: "TypeScript", category: "Language", color: "bg-blue-500/20 text-blue-400" },
    { name: "Tailwind 4", category: "Styling", color: "bg-cyan-500/20 text-cyan-400" },
    { name: "shadcn/ui", category: "Components", color: "bg-zinc-500/20 text-zinc-300" },
    { name: "Recharts", category: "Charts", color: "bg-green-500/20 text-green-400" },
    { name: "nuqs", category: "URL State", color: "bg-purple-500/20 text-purple-400" },
    { name: "Decimal.js", category: "IEEE 754 Safe", color: "bg-amber-500/20 text-amber-400" },
    { name: "Vercel", category: "Edge Network", color: "bg-foreground/10 text-foreground" },
];

const socialLinks = [
    { href: "https://github.com", label: "GitHub", icon: Github },
    { href: "https://twitter.com", label: "Twitter", icon: Twitter },
    { href: "https://linkedin.com", label: "LinkedIn", icon: Linkedin },
];

export default function AboutPage() {
    return (
        <ResponsiveLayout>
            <div className="mx-auto max-w-3xl px-4 py-12 md:py-20">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-3xl font-bold md:text-4xl">
                        The Engineer Behind the Screen
                    </h1>
                    <p className="text-foreground-muted">
                        Building tools for the curious. Not satisfied until the math is touchable.
                    </p>
                </div>

                {/* Section 1: Mission */}
                <section className="mb-16">
                    <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                        Why I built this
                    </h2>
                    <div className="space-y-4 text-foreground-muted">
                        <p>
                            Most crypto education is either too simple (memes) or too complex
                            (whitepapers). I built SimLab to bridge that gap.
                        </p>
                        <p>
                            I believe you shouldn&apos;t just <em>read</em> about the Halving &mdash;
                            you should toggle the variables and <strong className="text-foreground">see the supply shock yourself</strong>.
                        </p>
                        <p>
                            Every simulation here is designed to turn abstract concepts into
                            tactile understanding. Drag a slider. Watch the chart update.
                            Build intuition through interaction.
                        </p>
                    </div>
                </section>

                {/* Section 2: Tech Stack */}
                <section className="mb-16">
                    <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                        The Stack
                    </h2>
                    <p className="mb-6 text-foreground-muted">
                        Engineering choices made for performance, precision, and developer experience.
                    </p>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {techStack.map((tech) => (
                            <div
                                key={tech.name}
                                className={`rounded-lg px-3 py-2 text-center ${tech.color}`}
                            >
                                <div className="text-sm font-medium">{tech.name}</div>
                                <div className="text-xs opacity-70">{tech.category}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 3: Call to Connection */}
                <section className="rounded-xl border border-border bg-card/50 p-6 text-center">
                    <h2 className="mb-3 text-xl font-semibold">Let&apos;s Connect</h2>
                    <p className="mb-2 text-foreground-muted">
                        I&apos;m a <strong className="text-foreground">Frontend Engineer</strong> exploring
                        the intersection of Finance and UI.
                    </p>
                    <p className="mb-6 text-sm text-foreground-muted">
                        Currently open to roles in <span className="text-accent">DevRel</span> or{" "}
                        <span className="text-accent">Product Engineering</span>.
                    </p>

                    {/* Social Links */}
                    <div className="flex justify-center gap-3">
                        {socialLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-background text-foreground-muted transition-all duration-[var(--duration-fast)] hover:border-accent/50 hover:bg-accent/10 hover:text-accent hover:scale-110"
                            >
                                <link.icon className="h-5 w-5" />
                            </a>
                        ))}
                    </div>

                    {/* Hook */}
                    <p className="mt-6 text-sm text-foreground-muted">
                        Connect with me if you want to discuss React performance or Bitcoin economics.
                    </p>
                </section>
            </div>
        </ResponsiveLayout>
    );
}
