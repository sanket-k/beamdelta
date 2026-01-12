---
trigger: always_on
---

# Rules (Core)

> **Extended docs:** See `knowledge-hub/` for detailed guides.

---

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js (App Router) | 15.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| UI | shadcn/ui | latest |
| State | nuqs | 2.x |
| Charts | Recharts | 3.x |
| Math | Decimal.js | latest |
| OG Images | next/og | built-in |

**Critical:** nuqs requires `NuqsAdapter` wrapper in root layout.

---

## Naming Conventions

### Domain Terms → Variable Names

| Term | Variable | Component |
|------|----------|-----------|
| Block Reward | `blockReward` | `BlockRewardSlider` |
| Halving Interval | `halvingInterval` | `HalvingInput` |
| Block Height | `blockHeight` | `BlockHeightDisplay` |
| Ghost Line | `ghostData`, `isGhostVisible` | `GhostLine` |
| OG Image | `ogImageUrl` | `OGImageRoute` |

### File & Component Naming

| Entity | Convention | Example |
|--------|------------|---------|
| Files | `kebab-case.tsx` | `inflation-chart.tsx` |
| Components | `PascalCase` | `InflationChart` |
| Hooks | `use-kebab-case.ts` | `use-sim-params.ts` |
| Types | `PascalCase` | `SimulationParams` |
| CSS vars | `--kebab-case` | `--accent-foreground` |

---

## Design Tokens (CSS Variables)

```css
/* Colors */
--background: 0 0% 4%;           /* #0a0a0a */
--foreground: 0 0% 98%;          /* #fafafa */
--accent: 25 95% 53%;            /* #f7931a - Bitcoin Orange */
--destructive: 0 84% 60%;        /* Red */
--success: 142 76% 36%;          /* Green */

/* Motion */
--duration-fast: 150ms;
--duration-normal: 300ms;
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);

/* Glassmorphism */
--glass-bg: rgba(10, 10, 10, 0.8);
--glass-blur: 12px;
```

---

## Component Rules

1. **Server Components by Default** - Only use `"use client"` when needed
2. **Named Exports** - `export function Component()`, not default exports
3. **Props Interface** - Suffix with `Props`: `interface ButtonProps {}`
4. **No `any` Type** - Use `unknown` + type guards
5. **Import Alias** - Always use `@/` (e.g., `@/components/ui/button`)
6. **JSDoc** - Add comments for exported functions

---

## Key Patterns

### Micro-Interactions

```tsx
// Buttons: hover lift + active press
className="hover:scale-[1.02] active:scale-95 transition-all duration-[var(--duration-fast)]"

// Sliders: thumb scales on grab
className="[&_[role=slider]]:hover:scale-110 [&_[role=slider]]:active:scale-125"
```

### Loading States

- **No spinners** - Use skeleton with shimmer animation
- Create `loading.tsx` per route for automatic loading UI
- Create `error.tsx` per route for graceful error handling

### URL State (nuqs)

```tsx
// All sim params sync to URL for sharing
import { useQueryState } from 'nuqs'
const [reward, setReward] = useQueryState('reward', { defaultValue: '50' })
```

---

## Shadow Elevation

| Level | Class | Usage |
|-------|-------|-------|
| 0 | none | Flat elements |
| 1 | `shadow-sm` | Cards |
| 2 | `shadow-xl ring-1 ring-white/10` | Dropdowns |
| 3 | `shadow-2xl backdrop-blur` | Modals |

---

## Folder Structure (Summary)

```
src/
├── app/
│   ├── (marketing)/page.tsx     # Home
│   ├── sims/bitcoin/inflation/  # Sims by topic
│   ├── blog/[slug]/             # MDX posts
│   └── cheatsheets/[category]/  # SEO pages
├── components/
│   ├── ui/                      # shadcn components
│   ├── sims/shared/             # Reusable sim components
│   └── navigation/              # Nav components
├── lib/
│   ├── math/                    # Calculation logic
│   └── hooks/                   # Custom hooks
└── content/                     # MDX + JSON content
```

**Full structure:** See `knowledge-hub/structure.md`

---

## Quick Reference

```bash
npm run dev          # Start dev server
npm run build        # Production build
npx shadcn-ui add    # Add UI component
```

---

## Extended Documentation

| Topic | File |
|-------|------|
| Full folder structure | `knowledge-hub/structure.md` |
| Component implementations | `knowledge-hub/components.md` |
| SEO guidelines | `knowledge-hub/seo.md` |
| Design system details | `knowledge-hub/design-system.md` |
| PRD | `knowledge-hub/PRD.md` |
|Full rules| `knowledge-hub/rules.md`|

## MCP (use when required)
- Context7 (for updated libraries)

## tasks tracking
**Always update `todo.md`** after completing a task to track progress
[x] Completed task
[ ] Pending task
[/] In progress