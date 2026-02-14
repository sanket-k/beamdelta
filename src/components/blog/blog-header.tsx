import { Calendar, Clock, User } from "lucide-react";
import type { BlogFrontmatter } from "@/types/blog";

interface BlogHeaderProps {
    frontmatter: BlogFrontmatter;
    readingTime: number;
}

/**
 * Blog post header with title, meta info, and tags
 */
export function BlogHeader({ frontmatter, readingTime }: BlogHeaderProps) {
    const formattedDate = new Date(frontmatter.date).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <header className="mb-10 pb-8 border-b border-border">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
                {frontmatter.tags.map((tag) => (
                    <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                {frontmatter.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                {frontmatter.description}
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {/* Author */}
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
                        <User className="h-4 w-4 text-accent" />
                    </div>
                    <span className="font-medium text-foreground">{frontmatter.author}</span>
                    {frontmatter.social?.twitter && (
                        <a
                            href={frontmatter.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-accent transition-colors ml-1"
                            aria-label="Author's X (Twitter)"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="h-4 w-4 fill-current"
                            >
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                    )}
                </div>

                <span className="text-border">•</span>

                {/* Date */}
                <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {formattedDate}
                </span>

                <span className="text-border">•</span>

                {/* Reading time */}
                <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {readingTime} min read
                </span>
            </div>
        </header>
    );
}
