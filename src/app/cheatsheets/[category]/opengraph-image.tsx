import { ImageResponse } from "next/og";

// Import cheatsheet data for dynamic content
import bitcoinProtocol from "@/content/cheatsheets/bitcoin-protocol.json";
import defiConcepts from "@/content/cheatsheets/defi-concepts.json";

export const runtime = "edge";
export const alt = "Crypto Cheatsheet";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

// Category data map
const categoryMap: Record<string, { name: string; description: string; icon: string; termCount: number }> = {
    "bitcoin-protocol": {
        name: bitcoinProtocol.name,
        description: bitcoinProtocol.description,
        icon: bitcoinProtocol.icon,
        termCount: bitcoinProtocol.terms.length,
    },
    "defi-concepts": {
        name: defiConcepts.name,
        description: defiConcepts.description,
        icon: defiConcepts.icon,
        termCount: defiConcepts.terms.length,
    },
};

/**
 * Dynamic OG image for Cheatsheet category pages
 * Shows category name, icon, and term count
 */
export default async function Image({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    const { category } = await params;
    const data = categoryMap[category] || {
        name: "Crypto Cheatsheet",
        description: "Quick reference for crypto terminology",
        icon: "📚",
        termCount: 0,
    };

    return new ImageResponse(
        (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
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
                            "radial-gradient(circle at 75% 25%, rgba(247, 147, 26, 0.1) 0%, transparent 50%)",
                    }}
                />

                {/* Logo */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        marginBottom: "32px",
                    }}
                >
                    <div
                        style={{
                            width: "64px",
                            height: "64px",
                            borderRadius: "16px",
                            background: "rgba(247, 147, 26, 0.1)",
                            border: "1px solid rgba(247, 147, 26, 0.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#f7931a"
                            strokeWidth="2"
                        >
                            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span
                        style={{
                            fontSize: "32px",
                            fontWeight: "bold",
                            color: "#fafafa",
                        }}
                    >
                        Sim<span style={{ color: "#f7931a" }}>Lab</span>
                    </span>
                </div>

                {/* Category Icon */}
                <div
                    style={{
                        fontSize: "72px",
                        marginBottom: "24px",
                    }}
                >
                    {data.icon}
                </div>

                {/* Title */}
                <h1
                    style={{
                        fontSize: "56px",
                        fontWeight: "bold",
                        color: "#fafafa",
                        margin: "0 0 16px 0",
                        textAlign: "center",
                    }}
                >
                    {data.name}
                </h1>

                {/* Subtitle */}
                <p
                    style={{
                        fontSize: "24px",
                        color: "#a3a3a3",
                        margin: "0 0 40px 0",
                        textAlign: "center",
                        maxWidth: "800px",
                    }}
                >
                    {data.description}
                </p>

                {/* Stats Badge */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "16px 32px",
                        background: "rgba(247, 147, 26, 0.1)",
                        borderRadius: "12px",
                        border: "1px solid rgba(247, 147, 26, 0.2)",
                    }}
                >
                    <span style={{ fontSize: "20px", color: "#a3a3a3" }}>
                        Cheatsheet ·
                    </span>
                    <span style={{ fontSize: "20px", fontWeight: "bold", color: "#f7931a" }}>
                        {data.termCount} terms
                    </span>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
