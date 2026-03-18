# Component Guidelines

## Astro Component Design

- Prefer explicit props over hidden global assumptions.
- Define `interface Props` in frontmatter for type-safe contracts.
- Use `<slot />` to enable composition and flexible children.
- Keep components focused and small.
- Promote repeated sections into reusable components.

## Layout Patterns

- Create a base layout for shared document shell concerns.
- Use layout props for per-page metadata and title.
- Nest layouts when content types need additional wrappers.
- Keep page files concise by delegating structure to layouts.

## Hydration Guidance

- Default to static rendering.
- Add client directives only when interaction is required.
- Avoid hydrating purely presentational components.

## File Placement Rules

- If used by multiple routes, move to `src/components/`.
- If it controls shell-level structure, move to `src/layouts/`.
- If it is route orchestration, keep it in `src/pages/`.

## Anti-Patterns

- Duplicating full page shell across route files.
- Embedding route-specific logic deep in shared components.
- Creating one-use components that obscure simple route markup.
- Adding client behavior where static HTML is enough.