import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "About BeamDelta - The Engineer Behind the Screen";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

/**
 * Dynamic OG image for About page
 */
export default async function Image() {
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
                            width="48"
                            height="48"
                            viewBox="-2 -4 24 24"
                            fill="#f7931a"
                            stroke="#f7931a"
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M10 1L18.66 15H1.34L10 1z" />
                        </svg>
                    </div>
                    <span
                        style={{
                            fontSize: "32px",
                            fontWeight: "bold",
                            color: "#fafafa",
                        }}
                    >
                        Beam<span style={{ color: "#f7931a" }}>Delta</span>
                    </span>
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
                    The Engineer Behind the Screen
                </h1>

                {/* Description */}
                <p
                    style={{
                        fontSize: "24px",
                        color: "#a3a3a3",
                        margin: "0 0 40px 0",
                        textAlign: "center",
                        maxWidth: "800px",
                    }}
                >
                    Building interactive crypto simulations to bridge the gap between memes and whitepapers.
                </p>

                {/* Tech Stack Pills */}
                <div
                    style={{
                        display: "flex",
                        gap: "12px",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        maxWidth: "600px",
                    }}
                >
                    {["Next.js 16", "TypeScript", "Tailwind", "Recharts"].map((tech) => (
                        <div
                            key={tech}
                            style={{
                                padding: "8px 16px",
                                background: "rgba(255, 255, 255, 0.05)",
                                borderRadius: "8px",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                fontSize: "18px",
                                color: "#fafafa",
                            }}
                        >
                            {tech}
                        </div>
                    ))}
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
