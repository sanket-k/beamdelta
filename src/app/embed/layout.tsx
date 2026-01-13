import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "@/app/globals.css";

export const metadata: Metadata = {
    title: "SimLab Embed",
    description: "Embeddable SimLab chart",
    robots: "noindex, nofollow",
};

/**
 * Minimal layout for embeddable charts.
 * No navigation, just the chart with attribution footer.
 */
export default function EmbedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="font-sans antialiased bg-background">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
