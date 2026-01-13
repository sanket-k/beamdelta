import type { MetadataRoute } from "next";

/**
 * Generate sitemap.xml for search engine indexing
 * Next.js automatically generates /sitemap.xml from this file
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://beamdelta.com";

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/sims`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/sims/bitcoin/inflation`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/cheatsheets`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
    ];

    // Cheatsheet pages (high SEO priority)
    const cheatsheetCategories = ["bitcoin-protocol", "defi-concepts"];
    const cheatsheetPages: MetadataRoute.Sitemap = cheatsheetCategories.map((category) => ({
        url: `${baseUrl}/cheatsheets/${category}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.9,
    }));

    // Blog posts (high SEO priority)
    const blogSlugs = ["understanding-the-halving"];
    const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    return [...staticPages, ...cheatsheetPages, ...blogPages];
}
