# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**fy-system** is a business club management dashboard ("Biznes Klub") built with React 19, TypeScript, Vite 7, and Tailwind CSS 4. The UI language is Uzbek. It features a multi-theme system, sidebar navigation, and data-rich pages (dashboard charts, customer management table).

## Commands

- `npm run dev` — Start dev server on port 5001 (auto-opens browser)
- `npm run build` — Type-check with `tsc -b` then build with Vite
- `npm run lint` — Run ESLint across the project
- `npm run preview` — Preview the production build locally

There is no test runner configured.

## Architecture

### Entry Point & Routing

The app uses **manual routing via state** — no router library. `App.tsx` holds an `activeItem` state string that determines which page component renders via a `switch` statement in `renderContent()`. The `Sidebar` component drives navigation by calling `onNavigate(itemName)`.

Only two pages have implementations: `Dashboard` and `Mijozlar`. All other sidebar items render a placeholder.

### Theme System

Theming is a two-layer system:

1. **React context** (`src/context/ThemeContext.tsx`): `ThemeProvider` wraps the app and sets a `data-theme` attribute on `<html>`. The `useTheme()` hook exposes `themeId` and `setThemeId`. Five themes: `neutral`, `dark`, `orange`, `black-orange`, `light-orange`.

2. **CSS custom properties** (`src/index.css`, starting around line 482): Each `[data-theme="..."]` selector defines ~30 CSS variables (prefixed `--sidebar-*`, `--header-*`, `--main-*`, `--dropdown-*`, `--accent`). Components consume these via inline `style={{ color: 'var(--header-text)' }}` rather than Tailwind classes for theme-dependent colors.

When adding new themed UI, use the existing `var(--*)` custom properties inline. Do not use hardcoded color values for anything that should respond to theme changes.

### UI Component Library

- **shadcn/ui** is configured via `components.json` (style: `base-nova`, icon library: `lucide`). Generated components go in `src/components/ui/`. The `Button` component uses `@base-ui/react` primitives with `class-variance-authority`.
- Add new shadcn components with: `npx shadcn@latest add <component>`
- The `cn()` utility in `src/lib/utils.ts` merges Tailwind classes via `clsx` + `tailwind-merge`.

### Key Libraries

- **@heroicons/react** — primary icon set used throughout sidebar and header
- **recharts** — charting library (AreaChart, BarChart, PieChart on Dashboard)
- **@tanstack/react-table** — data table with sorting and row selection (Mijozlar page)
- **framer-motion** — animations, page transitions, sidebar collapse/expand

### Path Aliases

`@/*` maps to `./src/*` (configured in both `tsconfig.json` and `vite.config.ts`). Use `@/components/...`, `@/lib/...`, `@/context/...` etc. in imports.

### Styling Conventions

- Tailwind CSS 4 via `@tailwindcss/vite` plugin (no `tailwind.config` file — config is in CSS)
- Font: Geist Variable (imported via `@fontsource-variable/geist`)
- Border radius: consistently `rounded-[8px]` (or utility classes `apple-sq-10`, `apple-sq-12`)
- Hover states on interactive elements use inline `onMouseEnter`/`onMouseLeave` style manipulation with CSS variables
- Hidden scrollbars via `.no-scrollbar` utility class
