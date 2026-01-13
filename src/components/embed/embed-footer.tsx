import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmbedFooterProps {
    /** The full URL to the simulation page */
    sourceUrl: string;
    /** Additional className */
    className?: string;
}

/**
 * Attribution footer for embedded charts.
 * Provides a "Powered by BeamDelta" link back to the source.
 */
export function EmbedFooter({ sourceUrl, className }: EmbedFooterProps) {
    return (
        <footer
            className={cn(
                "flex items-center justify-center gap-2 py-2 px-4",
                "bg-background/80 backdrop-blur-sm border-t border-border",
                "text-xs text-muted-foreground",
                className
            )}
        >
            <span>Interactive chart by</span>
            <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-accent hover:text-accent/80 transition-colors"
            >
                BeamDelta
                <ExternalLink className="h-3 w-3" />
            </a>
        </footer>
    );
}
