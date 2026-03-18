# Astro Structure Guide

## Folder Responsibilities

- `src/pages/`
  - Route files only.
  - Each file maps to a URL.
  - Own route-level metadata and page-specific data fetching.
  - Compose UI from layouts and components; do not keep large markup blocks here.

- `src/layouts/`
  - Shared page shell and wrappers.
  - Own common HTML frame concerns (`<html>`, `<head>`, `<body>`) and shared sections.
  - Accept page-level props (title, description, canonical URL, etc.).

- `src/components/`
  - Reusable presentational units.
  - Keep independent from route concerns.
  - Build with clear props and slot contracts.

- `src/styles/`
  - Global CSS, tokens, and shared style layers.
  - Keep one-off styles local to their component when not reused.

- `public/`
  - Static assets served as-is.
  - Do not store source files expected to be processed by Astro.

## Responsibility Boundaries

- Pages decide what is rendered for a route.
- Layouts decide the shared shell and frame.
- Components decide reusable UI rendering.
- Styles decide visual system and consistency.
- Config files decide build and runtime behavior.

## Suggested Target Structure

```text
src/
  pages/
    index.astro
    about.astro
    projects/
      index.astro
      [slug].astro
  layouts/
    BaseLayout.astro
    ContentLayout.astro
  components/
    common/
      Header.astro
      Footer.astro
      SeoHead.astro
    hero/
      Hero.astro
      HeroStats.astro
    project/
      ProjectCard.astro
      ProjectGrid.astro
  styles/
    global.css
    tokens.css
```

## Notes Aligned With Astro Docs

- `src/pages` is required for routes.
- `src/components`, `src/layouts`, and `src/styles` are conventions but strongly recommended.
- Layouts are standard Astro components with props and slots, and can be nested.
- `src/` files are processed by Astro; `public/` files are copied untouched.