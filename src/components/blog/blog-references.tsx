import { ExternalLink } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface Reference {
    text: string;
    url: string;
}

interface BlogReferencesProps {
    references?: Reference[];
}

/**
 * Blog post references section
 */
export function BlogReferences({ references }: BlogReferencesProps) {
    if (!references || references.length === 0) {
        return null;
    }

    return (
        <section className="mt-12 pt-8 border-t border-border">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="references" className="border-none">
                    <AccordionTrigger className="text-xl font-bold tracking-tight text-foreground hover:no-underline py-0">
                        References
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                        <ul className="space-y-3">
                            {references.map((ref, index) => (
                                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent/50 shrink-0" />
                                    <div>
                                        <span>{ref.text} </span>
                                        <a
                                            href={ref.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-accent hover:underline align-baseline"
                                        >
                                            <span className="sr-only">External link</span>
                                            <ExternalLink className="h-3 w-3" />
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    );
}
