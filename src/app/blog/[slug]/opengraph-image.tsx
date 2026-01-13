import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BeamDelta Blog";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

// Static post data for edge runtime (add new posts here)
const postData: Record<string, { title: string; description: string; author: string; date: string; tags: string[] }> = {
    "understanding-the-halving": {
        title: "Understanding the Bitcoin Halving",
        description: "A deep dive into Bitcoin's halving mechanism, its impact on inflation, and why it matters.",
        author: "BeamDelta Team",
        date: "2026-01-12",
        tags: ["Bitcoin", "Halving", "Inflation", "Monetary Policy"],
    },
};

/**
 * Dynamic OG image for Blog posts
 * Shows post title, author, date, and tags
 */
export default async function Image({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = postData[slug] || {
        title: "BeamDelta Blog",
        description: "Deep dives into crypto economics and blockchain mechanics.",
        author: "BeamDelta Team",
        date: new Date().toISOString().split("T")[0],
        tags: [],
    };

    // Format date nicely
    const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return new ImageResponse(
        (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "100%",
                    padding: "60px",
                    background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
                    fontFamily: "system-ui, sans-serif",
                    position: "relative",
                }}
            >
                {/* Background pattern */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                            "radial-gradient(circle at 90% 10%, rgba(247, 147, 26, 0.15) 0%, transparent 40%)",
                    }}
                />

                {/* Top section: Logo */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                    }}
                >
                    <div
                        style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "12px",
                            background: "rgba(247, 147, 26, 0.1)",
                            border: "1px solid rgba(247, 147, 26, 0.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <svg
                            width="36"
                            height="36"
                            viewBox="-2 -4 24 24"
                            fill="#f7931a"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M10.528 2.358a1 1 0 0 0-1.377.32l-6.095 9.794A1 1 0 0 0 3.905 14h12.19a1 1 0 0 0 .85-1.528l-6.096-9.794a1 1 0 0 0-.32-.32zm2.019-.737l6.095 9.794A3 3 0 0 1 16.095 16H3.905a3 3 0 0 1-2.547-4.585L7.453 1.62a3 3 0 0 1 5.094 0z" />
                        </svg>
                    </div>
                    <span style={{ fontSize: "24px", fontWeight: "bold", color: "#fafafa" }}>
                        Beam<span style={{ color: "#f7931a" }}>Delta</span>
                        <span style={{ color: "#a3a3a3", fontWeight: "normal" }}> / Blog</span>
                    </span>
                </div>

                {/* Middle section: Title */}
                <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "900px" }}>
                    <h1
                        style={{
                            fontSize: "56px",
                            fontWeight: "bold",
                            color: "#fafafa",
                            margin: 0,
                            lineHeight: 1.2,
                        }}
                    >
                        {post.title}
                    </h1>
                    <p
                        style={{
                            fontSize: "24px",
                            color: "#a3a3a3",
                            margin: 0,
                            lineHeight: 1.4,
                        }}
                    >
                        {post.description}
                    </p>
                </div>

                {/* Bottom section: Meta info */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "24px",
                    }}
                >
                    {/* Author & Date */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "18px",
                            color: "#a3a3a3",
                        }}
                    >
                        <span style={{ color: "#fafafa", fontWeight: "500" }}>{post.author}</span>
                        <span>·</span>
                        <span>{formattedDate}</span>
                    </div>

                    {/* Tags */}
                    <div style={{ display: "flex", gap: "8px" }}>
                        {post.tags.slice(0, 3).map((tag) => (
                            <div
                                key={tag}
                                style={{
                                    padding: "6px 12px",
                                    background: "rgba(247, 147, 26, 0.1)",
                                    borderRadius: "6px",
                                    border: "1px solid rgba(247, 147, 26, 0.2)",
                                    fontSize: "14px",
                                    color: "#f7931a",
                                }}
                            >
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
