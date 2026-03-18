---
name: portfolio-astro
description: "Use when working on this Astro portfolio: page/layout/component architecture, folder responsibilities, and implementation checklists for scalable, clean project structure."
argument-hint: "Describe the Astro change you want (route, layout, component, styles, or refactor)."
user-invocable: true
disable-model-invocation: false
license: MIT
metadata:
  authors: "Project Team"
  version: "0.0.1"
---

# Portfolio Astro Skill

Skill focused on this repository to keep Astro architecture clean and scalable.

## When To Use

Use this skill when you need to:
- create or edit Astro pages.
- design reusable components.
- decide where files belong in `src/`, `public/`, and config files.
- refactor one-page code into maintainable layout + component composition.

## Current Project Snapshot

Validated from this workspace:
- Astro version: `^6.0.5` in `package.json`.
- Config file: `astro.config.mjs`.
- Entry route exists in `src/pages/index.astro`.
- Minimal root structure with `public/`, `src/`, `tsconfig.json`, and lockfile.

## Procedure

1. Clarify the target outcome in one sentence.
2. Classify the request: route, layout, component, styles, or project config.
3. Review existing files first and prefer reuse before creating new files.
4. Apply responsibility boundaries to choose destination folders.
5. Implement in small increments: shell first, sections second, polish third.
6. Use typed props and slots where reusability is needed.
7. Keep route files thin and move shared UI into layouts/components.
8. Validate with project commands and keep hydration minimal.

## Development Modes

Pick one mode before coding:

1. New Route Mode
  - Goal: add a URL with consistent shell and reusable sections.
  - Primary files: `src/pages/*`, `src/layouts/*`, `src/components/*`.

2. Refactor Mode
  - Goal: split large route files into clean layout + component composition.
  - Primary files: route file first, then extract to `src/layouts/*` and `src/components/*`.

3. Component Expansion Mode
  - Goal: introduce reusable UI without leaking route concerns.
  - Primary files: `src/components/*` and optional shared styles.

4. Styling System Mode
  - Goal: consolidate repeated styles into tokens and global layers.
  - Primary files: `src/styles/*` and component-local styles only when needed.

## References

- Folder responsibilities and architecture rules:
  - [Astro structure guide](./references/astro-structure.md)
- Component and layout patterns:
  - [Component guidelines](./references/component-guidelines.md)
- Implementation and validation checklist:
  - [Execution checklist](./references/checklists.md)
- Task-level development playbooks:
  - [Task playbooks](./references/task-playbooks.md)

## Discovery Keywords

- astro
- layout
- component
- page structure
- folder responsibilities
- architecture refactor
- src/pages
- src/layouts
- src/components
- src/styles

## Success Criteria

- The implementation respects responsibilities of pages, layouts, components, styles, and config.
- Shared UI moves to reusable components or layouts.
- Build and diagnostics commands complete successfully.
- The project remains easy to scale without route-level duplication.
- The chosen development mode is reflected in file placement and commit scope.

## Anti-Patterns

- Monolithic route files with duplicated document markup.
- Route-level decisions hidden inside presentational components.
- Processed source assets stored in `public/`.
- Unnecessary client hydration for static content.

## First Refactor In This Repo

1. Create `src/layouts/BaseLayout.astro` with page shell and `<slot />`.
2. Move `index.astro` into thin composition using `BaseLayout`.
3. Create `src/components/common/Header.astro` and `Footer.astro` once shared sections exist.
4. Create `src/styles/global.css` and import from layout.
