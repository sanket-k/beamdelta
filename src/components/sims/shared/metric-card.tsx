import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type Trend = "up" | "down" | "neutral";
type Format = "number" | "currency" | "percent" | "btc";

interface MetricCardProps {
    /** Label/title for the metric */
    label: string;
    /** Numeric value */
    value: number;
    /** Trend indicator */
    trend?: Trend;
    /** Display format */
    format?: Format;
    /** Additional description */
    description?: string;
    /** Additional className */
    className?: string;
}

/**
 * Format a number with appropriate suffix and formatting
 */
function formatValue(value: number, format: Format): string {
    switch (format) {
        case "currency":
            if (value >= 1_000_000_000) {
                return `$${(value / 1_000_000_000).toFixed(2)}B`;
            }
            if (value >= 1_000_000) {
                return `$${(value / 1_000_000).toFixed(2)}M`;
            }
            if (value >= 1_000) {
                return `$${(value / 1_000).toFixed(1)}K`;
            }
            return `$${value.toLocaleString()}`;

        case "percent":
            if (value < 0.01 && value > 0) {
                return "<0.01%";
            }
            return `${value.toFixed(2)}%`;

        case "btc":
            if (value >= 1_000_000) {
                return `${(value / 1_000_000).toFixed(2)}M BTC`;
            }
            if (value >= 1_000) {
                return `${(value / 1_000).toFixed(1)}K BTC`;
            }
            return `${value.toFixed(2)} BTC`;

        case "number":
        default:
            if (value >= 1_000_000_000) {
                return `${(value / 1_000_000_000).toFixed(2)}B`;
            }
            if (value >= 1_000_000) {
                return `${(value / 1_000_000).toFixed(2)}M`;
            }
            if (value >= 1_000) {
                return `${(value / 1_000).toFixed(1)}K`;
            }
            return value.toLocaleString();
    }
}

/**
 * Auto-formatting metric display card.
 * Shows value with trend indicator and compact number formatting.
 */
export function MetricCard({
    label,
    value,
    trend,
    format = "number",
    description,
    className,
}: MetricCardProps) {
    const formattedValue = formatValue(value, format);

    return (
        <div
            className={cn(
                "rounded-lg border border-border bg-card p-4",
                "transition-all duration-[var(--duration-fast)]",
                "hover:border-accent/30 hover:bg-card/80",
                className
            )}
        >
            <p className="text-sm text-muted-foreground">{label}</p>
            <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold tracking-tight">{formattedValue}</span>
                {trend && <TrendIcon trend={trend} />}
            </div>
            {description && (
                <p className="mt-1 text-xs text-muted-foreground">{description}</p>
            )}
        </div>
    );
}

function TrendIcon({ trend }: { trend: Trend }) {
    switch (trend) {
        case "up":
            return <ArrowUp className="h-4 w-4 text-green-500" />;
        case "down":
            return <ArrowDown className="h-4 w-4 text-red-500" />;
        case "neutral":
        default:
            return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
}
