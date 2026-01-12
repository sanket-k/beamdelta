import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPostPreview } from "@/types/blog";

interface BlogPostCardProps {
    post: BlogPostPreview;
}

/**
 * Blog post card for the blog index page
 * Features gradient placeholder, hover lift animation
 */
export function BlogPostCard({ post }: BlogPostCardProps) {
    const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return (
        <Link href={`/blog/${post.slug}`} className="group block">
            <article className="h-full rounded-xl border border-border bg-card overflow-hidden transition-all duration-[var(--duration-normal)] ease-[var(--ease-standard)] hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1">
                {/* Gradient Header */}
                <div className="h-32 bg-gradient-to-br from-accent/20 via-accent/10 to-background-secondary relative overflow-hidden">
                    {/* Bitcoin pattern overlay */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-4 right-4 text-6xl font-bold text-accent">₿</div>
                    </div>
                    {/* Featured badge */}
                    {post.featured && (
                        <div className="absolute top-3 left-3">
                            <span className="px-2 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full">
                                Featured
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-5">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                        {post.title}
                    </h2>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {post.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formattedDate}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {post.readingTime} min read
                            </span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
            </article>
        </Link>
    );
}
