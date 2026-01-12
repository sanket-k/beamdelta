"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

/**
 * Error boundary for Bitcoin Inflation simulation
 * Provides graceful error handling with reset option
 */
export default function Error({ error, reset }: ErrorProps) {
    return (
        <div className="min-h-[60vh] flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-6">
                {/* Error Icon */}
                <div className="flex justify-center">
                    <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
                        <AlertTriangle className="h-8 w-8 text-destructive" />
                    </div>
                </div>

                {/* Error Message */}
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Simulation Error</h2>
                    <p className="text-muted-foreground">
                        Something went wrong while running the simulation.
                    </p>
                    <p className="text-sm font-mono text-destructive/80 bg-destructive/10 px-3 py-2 rounded">
                        {error.message || "Unknown error occurred"}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                        onClick={reset}
                        variant="default"
                        className="gap-2"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Reset Simulation
                    </Button>
                    <Button
                        variant="outline"
                        asChild
                        className="gap-2"
                    >
                        <Link href="/sims">
                            <Home className="h-4 w-4" />
                            Back to Simulations
                        </Link>
                    </Button>
                </div>

                {/* Error Digest (for debugging) */}
                {error.digest && (
                    <p className="text-xs text-muted-foreground">
                        Error ID: {error.digest}
                    </p>
                )}
            </div>
        </div>
    );
}
