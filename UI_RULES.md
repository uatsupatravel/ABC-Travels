---
description: Mandatory UI/UX design rules, styling tokens, and component guidelines for all frontend code.
globs: ["src/components/**/*.{tsx,jsx}", "src/app/**/*.{tsx,jsx}", "src/pages/**/*.{tsx,jsx}", "src/styles/**/*.css"]
---

# UI/UX & Design System Rules

## 1. Core Directives (Never Violate)
- **Zero Arbitrary Values:** Never use arbitrary Tailwind values (e.g., `p-[13px]`, `w-[412px]`, `bg-[#121212]`). Always use the closest standard Tailwind scale or defined CSS variables.
- **Component Reuse First:** Before writing a new UI element, check `src/components/ui/` to see if a primitive already exists. Do not rewrite buttons, inputs, modals, or badges.
- **Mobile-First Responsiveness:** Design for mobile screens first using base classes, then layer desktop adjustments using prefixes (`md:`, `lg:`).

## 2. Color Palette & CSS Variables
Always use semantic CSS variables or Tailwind theme colors. Do not hardcode raw hex or RGB values.

- **Backgrounds:** 
  - Main background: `bg-background` (Var: `--background`)
  - Card/Surface: `bg-card` (Var: `--card`)
  - Subdued/Muted surface: `bg-muted` (Var: `--muted`)
- **Text & Typography:**
  - Primary text: `text-foreground` (Var: `--foreground`)
  - Secondary/Muted text: `text-muted-foreground` (Var: `--muted-foreground`)
- **Borders & Dividers:**
  - Standard border: `border-border` (Var: `--border`)
- **Accents:**
  - Primary brand color: `bg-primary` / `text-primary` (Var: `--primary`)

## 3. Typography Scale
Use the standard font weight and size hierarchy:
- **Page Title (H1):** `text-3xl font-bold tracking-tight`
- **Section Heading (H2):** `text-xl font-semibold tracking-tight`
- **Card/Subsection Title (H3):** `text-base font-medium`
- **Body Text:** `text-sm text-foreground`
- **Caption / Metadata:** `text-xs text-muted-foreground`

## 4. Spacing & Layout Rules
- **Padding & Margins:** Use Tailwind spacing increments of 2, 4, 6, 8, etc. (`p-2`, `p-4`, `p-6`, `p-8`). 
- **Containers:** Standard page containers must use `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- **Gaps:** Use `flex gap-4` or `grid gap-6` for component layouts instead of hardcoding margins on child elements.

## 5. Component Interaction Patterns
- **Buttons:** 
  - Must include explicit states for hover, focus, and disabled.
  - Focus rings must use `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`.
- **Transitions:** Use subtle transitions for interactive elements: `transition-colors duration-200`.
- **Accessibility:** Interactive elements must have proper semantic tags (`<button>`, `<a>`) and include `aria-label` where icons are used without text.

## 6. What NOT To Do (Anti-Patterns)
- Do not introduce new third-party icon libraries or CSS frameworks without explicit user approval.
- Do not create custom scrollbars or complex animation libraries unless specifically requested.
- Do not inline styles (`style={{ ... }}`) unless dynamic runtime calculations (like absolute coordinates) require it.