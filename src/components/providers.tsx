"use client";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

interface ProvidersProps {
    children: React.ReactNode;
}

/**
 * Client-side providers wrapper for the application.
 * Includes NuqsAdapter for URL state management and NProgress for route transitions.
 */
export function Providers({ children }: ProvidersProps) {
    return (
        <NuqsAdapter>
            {children}
            <ProgressBar
                height="3px"
                color="hsl(25 95% 53%)"
                options={{ showSpinner: false }}
                shallowRouting
            />
        </NuqsAdapter>
    );
}
