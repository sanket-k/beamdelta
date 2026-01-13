import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Bitcoin Inflation Visualizer";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

/**
 * Dynamic OG image for Bitcoin Inflation simulation
 * Reads URL parameters to customize the preview
 */
export default async function Image({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedParams = await searchParams;
    const reward = resolvedParams.reward ?? "50";
    const interval = resolvedParams.interval ?? "210000";

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
                            "radial-gradient(circle at 25% 25%, rgba(247, 147, 26, 0.1) 0%, transparent 50%)",
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
                    Bitcoin Inflation Visualizer
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
                    Interactive visualization of Bitcoin&apos;s supply and inflation rate
                </p>

                {/* Parameters */}
                <div
                    style={{
                        display: "flex",
                        gap: "24px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "24px 40px",
                            background: "rgba(255, 255, 255, 0.05)",
                            borderRadius: "16px",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                    >
                        <span style={{ fontSize: "16px", color: "#a3a3a3" }}>
                            Block Reward
                        </span>
                        <span
                            style={{ fontSize: "32px", fontWeight: "bold", color: "#f7931a" }}
                        >
                            {reward} BTC
                        </span>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "24px 40px",
                            background: "rgba(255, 255, 255, 0.05)",
                            borderRadius: "16px",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                    >
                        <span style={{ fontSize: "16px", color: "#a3a3a3" }}>
                            Halving Interval
                        </span>
                        <span
                            style={{ fontSize: "32px", fontWeight: "bold", color: "#f7931a" }}
                        >
                            {Number(interval).toLocaleString()} blocks
                        </span>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
