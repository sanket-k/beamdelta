"use client";

import { useEffect, useRef, useState } from "react";

/**
 * SpotlightGrid - Linear/Vercel style interactive grid background
 * Mouse acts as a "flashlight" revealing grid lines with a blue glow
 * Mobile: Static pulsing glow in center with no mouse tracking
 */
export function SpotlightGrid() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detect mobile/touch devices - disable mouse tracking
        const checkMobile = () => {
            setIsMobile(
                window.matchMedia("(max-width: 768px)").matches ||
                "ontouchstart" in window
            );
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            container.style.setProperty("--mouse-x", `${x}px`);
            container.style.setProperty("--mouse-y", `${y}px`);
        };

        const handleMouseEnter = () => {
            container.style.setProperty("--spotlight-opacity", "1");
        };

        const handleMouseLeave = () => {
            container.style.setProperty("--spotlight-opacity", "0");
        };

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseenter", handleMouseEnter);
        container.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseenter", handleMouseEnter);
            container.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [isMobile]);

    return (
        <div
            ref={containerRef}
            className="spotlight-grid-container absolute -inset-[10%] overflow-hidden"
            style={
                {
                    "--mouse-x": "50%",
                    "--mouse-y": "50%",
                    "--spotlight-opacity": isMobile ? "1" : "0",
                } as React.CSSProperties
            }
        >
            {/* Base grid pattern - very low opacity */}
            <div className="spotlight-grid absolute inset-0" />

            {/* Spotlight glow that follows mouse (desktop) or pulses (mobile) */}
            <div
                className={`spotlight-glow absolute inset-0 ${isMobile ? "spotlight-glow-pulse" : ""}`}
            />
        </div>
    );
}
