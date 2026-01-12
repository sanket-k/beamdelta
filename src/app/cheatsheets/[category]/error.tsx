"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

/**
 * Error boundary for cheatsheet category pages.
 * Shows error message with retry and back options.
 */
export default function CategoryError({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Cheatsheet category error:", error);
    }, [error]);

    return (
        <div className="container mx-auto px-4 py-16 max-w-2xl">
            <div className="flex flex-col items-center text-center">
                {/* Error icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 ring-1 ring-destructive/20">
                    <AlertCircle className="h-8 w-8 text-destructive" />
                </div>

                {/* Error message */}
                <h1 className="mt-6 text-2xl font-bold tracking-tight">
                    Something went wrong
                </h1>
                <p className="mt-2 text-muted-foreground">
                    We couldn&apos;t load this cheatsheet. This might be a temporary issue.
                </p>

                {/* Error details (development only) */}
                {process.env.NODE_ENV === "development" && (
                    <pre className="mt-4 max-w-full overflow-x-auto rounded-lg bg-secondary p-4 text-left text-sm text-muted-foreground">
                        {error.message}
                    </pre>
                )}

                {/* Actions */}
                <div className="mt-8 flex flex-wrap gap-4">
                    <Button onClick={reset} variant="default">
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Try again
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/cheatsheets">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Cheatsheets
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
