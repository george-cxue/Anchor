# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 application using the App Router architecture with TypeScript, React 19, and Tailwind CSS 4.

## Development Commands

```bash
# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

### Next.js App Router Structure
- Uses the `app/` directory structure (not `pages/`)
- `app/layout.tsx` - Root layout with Geist font configuration
- `app/page.tsx` - Home page component
- `app/globals.css` - Global styles with Tailwind directives

### TypeScript Configuration
- Path alias: `@/*` maps to project root (e.g., `@/app/components`)
- Target: ES2017
- JSX mode: `react-jsx` (React 19 uses automatic JSX runtime)
- Strict mode enabled

### Styling
- Uses Tailwind CSS 4 with PostCSS
- Configured for dark mode support (class-based)
- Geist Sans and Geist Mono fonts loaded via `next/font/google`

### ESLint
- Configured with Next.js core web vitals and TypeScript rules
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`
