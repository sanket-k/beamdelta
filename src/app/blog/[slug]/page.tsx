import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getAllPostSlugs } from "@/lib/blog";
import { getMDXComponents } from "@/components/blog/mdx-components";
import { BlogHeader } from "@/components/blog/blog-header";
import { BlogReferences } from "@/components/blog/blog-references";
import { ResponsiveLayout } from "@/components/layout/responsive-layout";

interface PageProps {
    params: Promise<{ slug: string }>;
}

/**
 * Generate static params for all blog posts
 */
export async function generateStaticParams() {
    const slugs = getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: "Post Not Found | BeamDelta Blog",
        };
    }

    return {
        title: `${post.frontmatter.title} | BeamDelta Blog`,
        description: post.frontmatter.description,
        authors: [{ name: post.frontmatter.author }],
        keywords: post.frontmatter.tags,
        openGraph: {
            title: post.frontmatter.title,
            description: post.frontmatter.description,
            type: "article",
            publishedTime: post.frontmatter.date,
            authors: [post.frontmatter.author],
            tags: post.frontmatter.tags,
        },
        twitter: {
            card: "summary_large_image",
            title: post.frontmatter.title,
            description: post.frontmatter.description,
        },
    };
}

/**
 * Blog Post Page
 * Renders MDX content with custom components
 */
export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // Compile MDX with custom components
    const { content } = await compileMDX({
        source: post.content,
        components: getMDXComponents(),
        options: {
            parseFrontmatter: false, // Already parsed
            mdxOptions: {
                remarkPlugins: [remarkGfm],
            },
        },
    });

    return (
        <ResponsiveLayout>
            <article className="max-w-3xl mx-auto px-4 py-8 md:py-12">
                <BlogHeader
                    frontmatter={post.frontmatter}
                    readingTime={post.readingTime}
                />
                <div className="prose-custom">{content}</div>
                <BlogReferences references={post.frontmatter.references} />
            </article>
        </ResponsiveLayout>
    );
}
