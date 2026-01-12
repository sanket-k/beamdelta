/**
 * LiveMiniChart - Animated SVG curve for the featured Bento card
 * Draws a Bitcoin-style supply curve with animation on load
 * Lightweight (no Recharts) for homepage performance
 */
export function LiveMiniChart() {
    // Bitcoin-like supply curve points (logarithmic growth tapering off)
    const points = [
        { x: 0, y: 100 },
        { x: 20, y: 60 },
        { x: 40, y: 35 },
        { x: 60, y: 22 },
        { x: 80, y: 15 },
        { x: 100, y: 12 },
    ];

    // Create smooth curve path
    const pathD = points.reduce((acc, point, i) => {
        const x = (point.x / 100) * 180 + 10;
        const y = (point.y / 100) * 70 + 10;

        if (i === 0) return `M ${x} ${y}`;

        // Quadratic bezier for smooth curve
        const prev = points[i - 1];
        const prevX = (prev.x / 100) * 180 + 10;
        const prevY = (prev.y / 100) * 70 + 10;
        const cpX = (prevX + x) / 2;

        return `${acc} Q ${cpX} ${prevY} ${x} ${y}`;
    }, "");

    // Area fill path (same curve but closed to bottom)
    const areaPath = `${pathD} L 190 80 L 10 80 Z`;

    return (
        <svg
            viewBox="0 0 200 90"
            className="h-full w-full"
            preserveAspectRatio="xMidYMid meet"
        >
            {/* Gradient definitions */}
            <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(142 76% 36%)" />
                    <stop offset="100%" stopColor="hsl(142 76% 50%)" />
                </linearGradient>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="hsl(142 76% 36%)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="hsl(142 76% 36%)" stopOpacity="0" />
                </linearGradient>
            </defs>

            {/* Grid lines (subtle) */}
            <g stroke="currentColor" strokeOpacity="0.1" strokeWidth="1">
                <line x1="10" y1="30" x2="190" y2="30" />
                <line x1="10" y1="55" x2="190" y2="55" />
                <line x1="10" y1="80" x2="190" y2="80" />
            </g>

            {/* Area fill */}
            <path
                d={areaPath}
                fill="url(#areaGradient)"
                className="mini-chart-area"
            />

            {/* Main curve line */}
            <path
                d={pathD}
                fill="none"
                stroke="url(#chartGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mini-chart-line"
            />

            {/* End point dot */}
            <circle
                cx="190"
                cy="18"
                r="4"
                fill="hsl(142 76% 45%)"
                className="mini-chart-area"
            />
        </svg>
    );
}
