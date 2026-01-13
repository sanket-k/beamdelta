import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
    title: "Blog | BeamDelta",
    description:
        "Deep dives into Bitcoin, crypto economics, and blockchain mechanics. Learn through interactive simulations and clear explanations.",
    openGraph: {
        title: "Blog | BeamDelta",
        description:
            "Deep dives into Bitcoin, crypto economics, and blockchain mechanics.",
        type: "website",
    },
};

/**
 * Blog Index Page
 * Displays all blog posts in a grid
 */
export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <ResponsiveLayout>
            <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-accent" />
                        </div>
                        <h1 className="text-3xl font-bold text-foreground">Blog</h1>
                    </div>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Deep dives into Bitcoin, crypto economics, and blockchain mechanics.
                        Each post features interactive simulations to help you understand complex concepts.
                    </p>
                </div>

                {/* Posts Grid */}
                {posts.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <BlogPostCard key={post.slug} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 border border-dashed border-border rounded-xl">
                        <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">
                            No blog posts yet. Check back soon!
                        </p>
                    </div>
                )}
            </div>
        </ResponsiveLayout>
    );
}
