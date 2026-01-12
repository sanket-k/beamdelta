"use client";

import { useState, useMemo, useCallback } from "react";
import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import {
    CheatsheetCard,
    CheatsheetSearch,
    CheatsheetSidebar,
} from "@/components/cheatsheets";
import type { CheatsheetCategory, CheatsheetTerm } from "@/types/cheatsheet";

interface CategoryPageClientProps {
    category: CheatsheetCategory;
}

export function CategoryPageClient({ category }: CategoryPageClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeSection, setActiveSection] = useState<string | undefined>(
        category.subcategories?.[0]
    );

    // Filter terms based on search query
    const filteredTerms = useMemo(() => {
        if (!searchQuery.trim()) return category.terms;

        const query = searchQuery.toLowerCase();
        return category.terms.filter(
            (term) =>
                term.term.toLowerCase().includes(query) ||
                term.shortDefinition.toLowerCase().includes(query) ||
                term.fullDefinition.toLowerCase().includes(query) ||
                term.tags?.some((tag) => tag.toLowerCase().includes(query))
        );
    }, [category.terms, searchQuery]);

    // Group terms by subcategory
    const termsBySubcategory = useMemo(() => {
        const grouped: Record<string, CheatsheetTerm[]> = {};

        for (const term of filteredTerms) {
            const subcategory = term.subcategory || "Other";
            if (!grouped[subcategory]) {
                grouped[subcategory] = [];
            }
            grouped[subcategory].push(term);
        }

        return grouped;
    }, [filteredTerms]);

    // Handle section click (scroll to section)
    const handleSectionClick = useCallback((section: string) => {
        setActiveSection(section);
        const element = document.getElementById(`section-${section}`);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, []);

    // Breadcrumb items
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Cheatsheets", href: "/cheatsheets" },
        { label: category.name },
    ];

    return (
        <ResponsiveLayout>
            <div className="container mx-auto px-4 py-6 max-w-6xl">
                {/* Breadcrumbs */}
                <Breadcrumbs items={breadcrumbItems} className="mb-6" />

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        {category.name}
                    </h1>
                    <p className="mt-2 text-muted-foreground">{category.description}</p>
                </div>

                {/* Search */}
                <CheatsheetSearch
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder={`Search ${category.terms.length} terms...`}
                    resultCount={searchQuery ? filteredTerms.length : undefined}
                    className="mb-8 max-w-md"
                />

                {/* Main content with sidebar */}
                <div className="flex gap-8">
                    {/* Sidebar (desktop only) */}
                    {category.subcategories && category.subcategories.length > 0 && (
                        <CheatsheetSidebar
                            subcategories={category.subcategories}
                            activeSection={activeSection}
                            onSectionClick={handleSectionClick}
                        />
                    )}

                    {/* Terms grid grouped by subcategory */}
                    <div className="flex-1 min-w-0">
                        {Object.keys(termsBySubcategory).length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <p className="text-lg text-muted-foreground">No terms found</p>
                                <p className="mt-1 text-sm text-muted-foreground/70">
                                    Try adjusting your search query
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-10">
                                {(category.subcategories || Object.keys(termsBySubcategory)).map(
                                    (subcategory) => {
                                        const terms = termsBySubcategory[subcategory];
                                        if (!terms || terms.length === 0) return null;

                                        return (
                                            <section
                                                key={subcategory}
                                                id={`section-${subcategory}`}
                                                className="scroll-mt-24"
                                            >
                                                {/* Subcategory header */}
                                                <h2 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
                                                    {subcategory}
                                                </h2>

                                                {/* Terms grid */}
                                                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                                                    {terms.map((term) => (
                                                        <CheatsheetCard key={term.id} term={term} />
                                                    ))}
                                                </div>
                                            </section>
                                        );
                                    }
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ResponsiveLayout>
    );
}
