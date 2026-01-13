"use client";

import { useState, useCallback } from "react";
import { Code2, Check, Copy } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmbedModalProps {
    /** Path to the embed route (e.g., "/embed/bitcoin/inflation") */
    embedPath: string;
    /** Current URL params to include in embed */
    currentParams?: Record<string, string | number>;
    /** Button className */
    className?: string;
}

const HEIGHT_OPTIONS = [
    { label: "Small", value: 300 },
    { label: "Medium", value: 400 },
    { label: "Large", value: 500 },
];

/**
 * Modal for generating and copying embed code.
 * Provides height customization and copy-to-clipboard functionality.
 */
export function EmbedModal({ embedPath, currentParams = {}, className }: EmbedModalProps) {
    const [selectedHeight, setSelectedHeight] = useState(400);
    const [copied, setCopied] = useState(false);

    // Build embed URL
    const baseUrl = typeof window !== "undefined"
        ? window.location.origin
        : "https://simlab.dev";

    const embedUrl = (() => {
        const url = new URL(embedPath, baseUrl);
        // Add current params
        Object.entries(currentParams).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                url.searchParams.set(key, String(value));
            }
        });
        // Add height param
        url.searchParams.set("height", String(selectedHeight - 50)); // Account for footer
        return url.toString();
    })();

    // Generate iframe code
    const iframeCode = `<iframe
  src="${embedUrl}"
  width="100%"
  height="${selectedHeight}"
  frameborder="0"
  style="border-radius: 8px; overflow: hidden;"
  loading="lazy"
></iframe>`;

    // Copy to clipboard
    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(iframeCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    }, [iframeCode]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                        "gap-2",
                        className
                    )}
                >
                    <Code2 className="h-4 w-4" />
                    Embed
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Code2 className="h-5 w-5 text-accent" />
                        Embed This Chart
                    </DialogTitle>
                    <DialogDescription>
                        Copy the code below to embed this interactive chart on your website.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 overflow-hidden">
                    {/* Height Selector */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Height</label>
                        <div className="flex gap-2 max-w-full">
                            {HEIGHT_OPTIONS.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => setSelectedHeight(option.value)}
                                    className={cn(
                                        "flex-1 basis-0 py-2 px-2 text-sm rounded-md border transition-all text-center truncate",
                                        "hover:border-accent/50",
                                        selectedHeight === option.value
                                            ? "border-accent bg-accent/10 text-accent"
                                            : "border-border text-muted-foreground"
                                    )}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Code Preview */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Embed Code</label>
                        <div className="relative">
                            <pre className="p-4 rounded-lg bg-muted/50 border border-border overflow-x-auto text-xs font-mono text-muted-foreground">
                                {iframeCode}
                            </pre>
                        </div>
                    </div>

                    {/* Copy Button */}
                    <Button
                        onClick={handleCopy}
                        className="w-full gap-2"
                        variant={copied ? "default" : "outline"}
                    >
                        {copied ? (
                            <>
                                <Check className="h-4 w-4" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Copy className="h-4 w-4" />
                                Copy to Clipboard
                            </>
                        )}
                    </Button>

                    {/* Note */}
                    <p className="text-xs text-muted-foreground text-center">
                        The embed includes a "Powered by SimLab" attribution link.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
