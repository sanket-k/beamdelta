import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost, BlogPostPreview, BlogFrontmatter } from "@/types/blog";

const BLOG_CONTENT_PATH = path.join(process.cwd(), "src/content/blog");

/**
 * Calculate estimated reading time based on word count
 * Assumes average reading speed of 200 words per minute
 */
export function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Get all blog post previews, sorted by date (newest first)
 */
export function getAllPosts(): BlogPostPreview[] {
    // Ensure directory exists
    if (!fs.existsSync(BLOG_CONTENT_PATH)) {
        return [];
    }

    const files = fs.readdirSync(BLOG_CONTENT_PATH).filter((file) => file.endsWith(".mdx"));

    const posts = files.map((filename) => {
        const slug = filename.replace(".mdx", "");
        const filePath = path.join(BLOG_CONTENT_PATH, filename);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(fileContent);
        const frontmatter = data as BlogFrontmatter;

        return {
            slug,
            title: frontmatter.title,
            description: frontmatter.description,
            date: frontmatter.date,
            author: frontmatter.author,
            tags: frontmatter.tags || [],
            readingTime: calculateReadingTime(content),
            featured: frontmatter.featured,
            image: frontmatter.image,
        };
    });

    // Sort by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single blog post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
    const filePath = path.join(BLOG_CONTENT_PATH, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const frontmatter = data as BlogFrontmatter;

    return {
        slug,
        frontmatter,
        content,
        readingTime: calculateReadingTime(content),
    };
}

/**
 * Get all post slugs for static generation
 */
export function getAllPostSlugs(): string[] {
    if (!fs.existsSync(BLOG_CONTENT_PATH)) {
        return [];
    }

    return fs
        .readdirSync(BLOG_CONTENT_PATH)
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => file.replace(".mdx", ""));
}
