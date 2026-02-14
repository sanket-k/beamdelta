/**
 * Blog Post Types
 * Type definitions for MDX blog posts
 */

/** Frontmatter parsed from MDX files */
export interface BlogFrontmatter {
    title: string;
    description: string;
    date: string;
    author: string;
    tags: string[];
    featured?: boolean;
    image?: string;
    social?: {
        twitter?: string;
        website?: string;
    };
    references?: Array<{
        text: string;
        url: string;
    }>;
}

/** Complete blog post with content */
export interface BlogPost {
    slug: string;
    frontmatter: BlogFrontmatter;
    content: string;
    readingTime: number;
}

/** Blog post preview for cards/lists */
export interface BlogPostPreview {
    slug: string;
    title: string;
    description: string;
    date: string;
    author: string;
    tags: string[];
    readingTime: number;
    featured?: boolean;
    image?: string;
}
