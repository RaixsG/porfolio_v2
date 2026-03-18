# Task Playbooks

Use these playbooks to execute changes with consistent architecture decisions.

## Playbook A: Create A New Route

1. Create the route in `src/pages/`.
2. Wrap route content in an existing layout; create one only if responsibilities differ.
3. Build each section as a reusable component when reuse is likely.
4. Keep route file focused on composition and route-level metadata.
5. Validate with dev and build commands.

## Playbook B: Refactor A Large Page

1. Identify blocks that repeat or are conceptually standalone.
2. Extract shared shell to layout if duplicated.
3. Extract visual sections to `src/components/` with explicit props.
4. Leave route file as orchestration of imported pieces.
5. Re-check behavior and compare resulting markup.

## Playbook C: Add Shared Header Or Footer

1. Create component in `src/components/common/`.
2. Place composition in the base layout to avoid route duplication.
3. Keep route-specific variants configurable through props if required.
4. Confirm all target routes inherit behavior as expected.

## Playbook D: Introduce Global Styling Tokens

1. Add shared tokens in `src/styles/tokens.css`.
2. Import tokens from the global style entrypoint.
3. Replace repeated hardcoded values incrementally.
4. Keep one-off styles local when they are not reused.

## Playbook E: Reduce Unnecessary Hydration

1. Audit components using client directives.
2. Keep hydration only where interaction is required.
3. Convert static sections to pure Astro rendering.
4. Re-test user interactions that remain hydrated.

## Output Checklist Per Playbook

1. Correct files in correct folders.
2. Clear boundary between route, layout, and component concerns.
3. No duplicate shell markup across routes.
4. Build passes and diagnostics are clean.