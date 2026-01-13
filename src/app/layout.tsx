import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://beamdelta.dev"),
  title: {
    default: "BeamDelta - Interactive Crypto Simulations",
    template: "%s | BeamDelta",
  },
  description:
    "Master blockchain concepts through interactive visualizations. Explore Bitcoin inflation, halving events, and crypto economics.",
  keywords: [
    "Bitcoin",
    "cryptocurrency",
    "simulation",
    "inflation",
    "halving",
    "blockchain",
    "visualization",
  ],
  authors: [{ name: "BeamDelta" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "BeamDelta",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
