import { AlertCircle, Info, Lightbulb, AlertTriangle } from "lucide-react";

interface CalloutProps {
    type?: "info" | "tip" | "warning" | "danger";
    title?: string;
    children: React.ReactNode;
}

const calloutStyles = {
    info: {
        container: "bg-blue-500/10 border-blue-500/30",
        icon: "text-blue-400",
        title: "text-blue-400",
    },
    tip: {
        container: "bg-success/10 border-success/30",
        icon: "text-success",
        title: "text-success",
    },
    warning: {
        container: "bg-accent/10 border-accent/30",
        icon: "text-accent",
        title: "text-accent",
    },
    danger: {
        container: "bg-destructive/10 border-destructive/30",
        icon: "text-destructive",
        title: "text-destructive",
    },
};

const calloutIcons = {
    info: Info,
    tip: Lightbulb,
    warning: AlertTriangle,
    danger: AlertCircle,
};

/**
 * Callout component for tips, warnings, and notes in MDX
 */
export function Callout({ type = "info", title, children }: CalloutProps) {
    const styles = calloutStyles[type];
    const Icon = calloutIcons[type];

    return (
        <div
            className={`my-6 rounded-lg border p-4 ${styles.container}`}
        >
            <div className="flex items-start gap-3">
                <Icon className={`h-5 w-5 mt-0.5 shrink-0 ${styles.icon}`} />
                <div className="flex-1">
                    {title && (
                        <p className={`font-semibold mb-1 ${styles.title}`}>{title}</p>
                    )}
                    <div className="text-sm text-foreground/80 [&>p]:mb-0 [&>p]:mt-0">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
