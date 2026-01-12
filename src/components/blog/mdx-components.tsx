import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { MiniSim } from "./mini-sim";
import { Callout } from "./callout";

/**
 * Custom MDX components for blog posts
 * Provides styled typography and custom embeds
 */
export function getMDXComponents(): MDXComponents {
    return {
        // Headings with anchor links
        h1: ({ children, ...props }) => (
            <h1
                className="text-4xl font-bold tracking-tight text-foreground mt-10 mb-6 first:mt-0"
                {...props}
            >
                {children}
            </h1>
        ),
        h2: ({ children, ...props }) => (
            <h2
                className="text-2xl font-semibold tracking-tight text-foreground mt-10 mb-4 pb-2 border-b border-border"
                {...props}
            >
                {children}
            </h2>
        ),
        h3: ({ children, ...props }) => (
            <h3
                className="text-xl font-semibold text-foreground mt-8 mb-3"
                {...props}
            >
                {children}
            </h3>
        ),
        h4: ({ children, ...props }) => (
            <h4
                className="text-lg font-medium text-foreground mt-6 mb-2"
                {...props}
            >
                {children}
            </h4>
        ),

        // Paragraph with optimal reading line height
        p: ({ children, ...props }) => (
            <p
                className="text-foreground/90 leading-7 mb-6 [&:not(:first-child)]:mt-6"
                {...props}
            >
                {children}
            </p>
        ),

        // Links with accent color
        a: ({ href, children, ...props }) => {
            const isExternal = href?.startsWith("http");
            if (isExternal) {
                return (
                    <a
                        href={href}
                        className="text-accent underline underline-offset-4 hover:text-accent/80 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                    >
                        {children}
                        <span className="ml-1 text-xs">↗</span>
                    </a>
                );
            }
            return (
                <Link
                    href={href || "#"}
                    className="text-accent underline underline-offset-4 hover:text-accent/80 transition-colors"
                    {...props}
                >
                    {children}
                </Link>
            );
        },

        // Code blocks
        code: ({ children, ...props }) => (
            <code
                className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm text-foreground"
                {...props}
            >
                {children}
            </code>
        ),
        pre: ({ children, ...props }) => (
            <pre
                className="mb-6 mt-4 overflow-x-auto rounded-lg bg-background-secondary border border-border p-4"
                {...props}
            >
                {children}
            </pre>
        ),

        // Blockquote with accent border
        blockquote: ({ children, ...props }) => (
            <blockquote
                className="mt-6 border-l-4 border-accent pl-6 italic text-muted-foreground [&>p]:mb-0"
                {...props}
            >
                {children}
            </blockquote>
        ),

        // Lists
        ul: ({ children, ...props }) => (
            <ul
                className="my-6 ml-6 list-disc space-y-2 text-foreground/90 [&>li]:pl-2"
                {...props}
            >
                {children}
            </ul>
        ),
        ol: ({ children, ...props }) => (
            <ol
                className="my-6 ml-6 list-decimal space-y-2 text-foreground/90 [&>li]:pl-2"
                {...props}
            >
                {children}
            </ol>
        ),
        li: ({ children, ...props }) => (
            <li className="leading-7" {...props}>
                {children}
            </li>
        ),

        // Horizontal rule
        hr: () => <hr className="my-8 border-border" />,

        // Strong and emphasis
        strong: ({ children, ...props }) => (
            <strong className="font-semibold text-foreground" {...props}>
                {children}
            </strong>
        ),
        em: ({ children, ...props }) => (
            <em className="italic" {...props}>
                {children}
            </em>
        ),

        // Table
        table: ({ children, ...props }) => (
            <div className="my-6 w-full overflow-x-auto">
                <table className="w-full border-collapse text-sm" {...props}>
                    {children}
                </table>
            </div>
        ),
        th: ({ children, ...props }) => (
            <th
                className="border border-border bg-muted px-4 py-2 text-left font-semibold"
                {...props}
            >
                {children}
            </th>
        ),
        td: ({ children, ...props }) => (
            <td className="border border-border px-4 py-2" {...props}>
                {children}
            </td>
        ),

        // Custom components for MDX
        MiniSim,
        Callout,
    };
}
