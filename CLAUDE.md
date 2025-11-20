# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 frontend project using:
- **React 19.2** with React Compiler enabled
- **TypeScript** with strict mode
- **Tailwind CSS v4** with PostCSS
- **App Router** architecture (Next.js App Directory)

## Development Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:3000

# Production
npm run build        # Build for production (uses Turbopack)
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Architecture & Key Conventions

### Font System

Two custom fonts are configured via `next/font/local`:
- **Pretendard Variable** (`--font-pretendard`): Primary font, variable weight 45-920
- **Gmarket Sans** (`--font-gmarket`): Secondary font, 3 weights (300/500/700)

Font files are in `public/fonts/` with specific naming:
- `PretendardVariable.woff2`
- `GmarketSansTTFLight.ttf` (weight 300)
- `GmarketSansTTFMedium.ttf` (weight 500)
- `GmarketSansTTFBold.ttf` (weight 700)

### Typography System

**Based on Figma design system** with structured type scale and utilities.

**Location**: Typography definitions are split across:
- `src/types/typography.ts` - TypeScript types for all variants
- `src/styles/typography.ts` - JS utility functions
- `src/app/globals.css` - CSS custom properties and utility classes
- `src/components/Typography.tsx` - React components

**CSS Variables** (defined in `globals.css`):
```css
/* Sizes: --font-size-{10,12,14,16,18,20,24,28,32} */
/* Weights: --font-weight-{regular,medium,semibold,bold,heavy} */
/* Line Heights: --line-height-{tight,snug,relaxed} (1.25/1.3/1.4) */
```

**Typography Categories**:
1. **Headline** (Heavy 800): `headline-{l,m,s}` - 32/28/24px, 125% line-height
2. **Title** (SemiBold 600 or Bold 700): `title-{l,m,s}-{semibold,bold}` - 24/20/18px, 125%
3. **Subtitle** (Medium 500 or SemiBold 600): `subtitle-{l,m}-{medium,semibold}` - 20/18px, 130%
4. **Body** (Regular 400, Medium 500, SemiBold 600): `body-{xl,l,m,s}-{regular,medium,semibold}` - 18/16/14/12px, 140%
5. **Caption** (Regular 400): `caption-{l,m}-regular` - 12/10px, 140%

**Usage Patterns**:
```tsx
// CSS classes (preferred)
<h1 className="headline-l">Title</h1>
<p className="body-m-regular">Text</p>

// React components
import { Headline, Title, Body, Caption } from '@/components/Typography';
<Headline size="l">Title</Headline>
<Body size="m" weight="regular">Text</Body>

// Utility functions
import { getTypographyClass, getTypographyStyle } from '@/styles/typography';
```

### Styling System

- **Tailwind v4** with inline `@theme` configuration in `globals.css`
- **Dark mode** supported via `prefers-color-scheme` media query
- CSS variables for colors: `--background`, `--foreground` (light/dark adaptive)
- Typography utilities defined in `@layer utilities`

### Path Aliases

TypeScript path mapping configured:
- `@/*` → `./src/*`

All imports from src should use this alias pattern.

### React Compiler

Enabled in `next.config.ts` with `reactCompiler: true`. This automatically optimizes React components without manual memoization.

## Project Structure

```
src/
├── app/              # Next.js App Router
│   ├── layout.tsx    # Root layout with font configuration
│   ├── page.tsx      # Homepage
│   └── globals.css   # Global styles + typography utilities
├── components/       # Reusable React components
│   └── Typography.tsx
├── styles/          # Style utilities and helpers
│   └── typography.ts
└── types/           # TypeScript type definitions
    └── typography.ts
```

## Important Notes

- **Font file paths**: When referencing fonts in `layout.tsx`, use exact filenames from `public/fonts/`
- **Typography consistency**: Always use the predefined typography system from Figma design specs
- **Type safety**: All typography variants are strictly typed via `TypographyVariant` union type
- **JSX types**: Use `React.ElementType` instead of `keyof JSX.IntrinsicElements` for `as` prop polymorphism
