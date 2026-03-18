# Execution Checklist

## Before Implementing

1. Classify the task type: route, layout, component, styles, or config.
2. Confirm destination folder based on responsibility.
3. Check if an existing component/layout can be reused.

## During Implementation

1. Keep route files orchestration-only when possible.
2. Use typed props for reusable components and layouts.
3. Keep styling strategy consistent (global tokens + local styles).
4. Minimize client hydration.

## After Implementation

1. Run `pnpm run dev` and verify behavior.
2. Run `pnpm run build` for production validation.
3. Run `pnpm astro check` (or add `check` script) for diagnostics.
4. Confirm no duplication of shell-level markup across pages.

## First Refactor Plan For This Repository

1. Create `src/layouts/BaseLayout.astro` with shared shell and `<slot />`.
2. Refactor `src/pages/index.astro` to use `BaseLayout`.
3. Add `src/styles/global.css` and import once at layout level.
4. Add shared `Header.astro` and `Footer.astro` when route count grows.