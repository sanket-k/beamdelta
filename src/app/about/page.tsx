import { Metadata } from "next";
import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import { Github, Twitter, Linkedin, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
    title: "About | BeamDelta",
    description: "The engineer behind BeamDelta - building interactive crypto simulations to bridge the gap between memes and whitepapers.",
};

const techStack = [
    { name: "Next.js 16", category: "Framework", color: "bg-foreground text-background" },
    { name: "TypeScript", category: "Language", color: "bg-blue-500/20 text-blue-400" },
    { name: "Tailwind 4", category: "Styling", color: "bg-cyan-500/20 text-cyan-400" },
    { name: "shadcn/ui", category: "Components", color: "bg-rose-500/20 text-rose-400" },
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
                    <p className="mb-3 text-sm uppercase tracking-widest text-accent">
                        Hello, I&apos;m
                    </p>
                    <h1 className="mb-4 text-3xl font-bold md:text-4xl">
                        The Engineer Behind the Screen
                    </h1>
                    <p className="text-xl text-foreground-muted">
                        I turn abstract economics into tangible tools.
                    </p>
                </div>

                {/* Section 1: Mission */}
                <section className="mb-16">
                    <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                        Bridging the Gap
                    </h2>
                    <div className="space-y-4 text-foreground-muted">
                        <p>
                            Most people learn crypto through two extremes: <em>oversimplified memes</em> or{" "}
                            <em>dense academic papers</em>. BeamDelta aims to fill the middle ground.
                        </p>
                        <p>
                            My goal is to let you <strong className="text-foreground">&quot;play&quot; with the variables</strong> so
                            you can own the insights. Drag a slider, watch the halving unfold, and build
                            intuition through interaction.
                        </p>
                    </div>
                </section>

                {/* Section 2: Tech Stack */}
                <section className="mb-16">
                    <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                        Under the Hood
                    </h2>
                    <p className="mb-6 text-foreground-muted">
                        This is a playground for modern web engineering. I&apos;m leveraging{" "}
                        <strong className="text-foreground">Next.js 16</strong> and URL-state management
                        (<strong className="text-foreground">nuqs</strong>) to ensure every simulation
                        you run is shareable and fast.
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
                    <h2 className="mb-3 text-xl font-semibold">Let&apos;s Build Together</h2>
                    <p className="mb-4 text-foreground-muted">
                        I am deeply curious about <strong className="text-foreground">Web3, </strong>
                        <strong className="text-foreground">Macro, </strong> and{" "}
                        <strong className="text-foreground">Bitcoin economics</strong>.
                    </p>
                    {/* <p className="mb-6 text-sm text-foreground-muted">
                        If you&apos;re looking for a developer who can advocate for complex tech
                        through clear UI, let&apos;s connect.
                    </p> */}

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

                    {/* Roles
                    <p className="mt-6 text-sm text-foreground-muted">
                        Open to <span className="text-accent">DevRel</span>,{" "}
                        <span className="text-accent">Product Engineering</span>, and{" "}
                        <span className="text-accent">Educator</span> opportunities.
                    </p> */}
                </section>
            </div>
        </ResponsiveLayout>
    );
}
