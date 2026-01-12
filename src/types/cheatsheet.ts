/**
 * Cheatsheet types for SimLab
 * Defines the structure for crypto terminology cheat sheets
 */

/**
 * A single term in the cheatsheet
 */
export interface CheatsheetTerm {
    /** Unique identifier for the term */
    id: string;
    /** The term/concept name */
    term: string;
    /** Short one-liner definition (visible by default) */
    shortDefinition: string;
    /** Detailed explanation (revealed on expand) */
    fullDefinition: string;
    /** Category ID this term belongs to */
    category: string;
    /** Optional subcategory for grouping */
    subcategory?: string;
    /** Optional code/formula example (displayed in monospace) */
    codeExample?: string;
    /** Optional link to related simulation */
    relatedSimLink?: string;
    /** Tags for search filtering */
    tags?: string[];
}

/**
 * A category containing multiple terms
 */
export interface CheatsheetCategory {
    /** Unique identifier for the category */
    id: string;
    /** Display name */
    name: string;
    /** Short description of the category */
    description: string;
    /** Lucide icon name */
    icon: string;
    /** List of terms in this category */
    terms: CheatsheetTerm[];
    /** List of subcategory names for sidebar navigation */
    subcategories?: string[];
}

/**
 * Metadata for category cards on landing page
 */
export interface CategoryMeta {
    id: string;
    name: string;
    description: string;
    icon: string;
    termCount: number;
    href: string;
}
