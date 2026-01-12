"use client";

import Link from "next/link";
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
    error: Error;
    reset: () => void;
}

/**
 * Error boundary for blog post pages
 */
export default function BlogPostError({ error, reset }: ErrorProps) {
    return (
        <div className="max-w-3xl mx-auto px-4 py-16">
            <div className="flex flex-col items-center justify-center text-center">
                <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                </div>

                <h1 className="text-2xl font-bold text-foreground mb-2">
                    Failed to Load Post
                </h1>

                <p className="text-muted-foreground mb-6 max-w-md">
                    Sorry, we couldn&apos;t load this blog post. This might be a temporary issue.
                </p>

                {process.env.NODE_ENV === "development" && (
                    <pre className="text-xs text-destructive bg-destructive/5 p-4 rounded-lg mb-6 max-w-full overflow-x-auto">
                        {error.message}
                    </pre>
                )}

                <div className="flex gap-3">
                    <Button variant="outline" onClick={reset}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Try Again
                    </Button>
                    <Link href="/blog">
                        <Button variant="ghost">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Blog
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
