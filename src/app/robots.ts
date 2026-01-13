import type { MetadataRoute } from "next";

/**
 * Generate robots.txt for search engine crawling
 * Next.js automatically generates /robots.txt from this file
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/_next/"],
        },
        sitemap: "https://beamdelta.com/sitemap.xml",
    };
}
