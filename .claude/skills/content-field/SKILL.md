---
name: content-field
description: Make an end-to-end Sanity content change that spans the studio and the site, e.g. add or rename a field or document type and show it on the website. Use when a change touches apps/studio-volunteers schemaTypes and/or GROQ in apps/web/src/lib/sanity/queries.ts.
argument-hint: "<what content to add or change>"
---

# Sanity content change (studio → typegen → query → UI)

**Objective:** make `$ARGUMENTS` editable in the Studio and rendered on the site, with correct generated types.

For deeper Sanity questions (schema design, GROQ, Portable Text, images), also load the `sanity-best-practices` skill.

## Steps

1. **Schema**: edit `apps/studio-volunteers/schemaTypes/…`. Follow `.claude/rules/sanity-studio.md`: choose the right localisation kind, use `imageWithAlt` for images, `seo` for pages, and `defineField` with validation for required content.
2. **Query**: update the GROQ in `apps/web/src/lib/sanity/queries.ts` (`defineQuery`). Select only the fields the UI uses. Filter by `language == $locale` for translated types.
3. **Typegen**: `bun run --cwd apps/studio-volunteers typegen`. This rewrites `schema.json` and `sanity.types.ts`. Never edit those by hand; a hook blocks it.
4. **Load + UI**: update the route's `+page.server.ts` (with `?? null` / `?? []` fallbacks) and the component. Images go through `shared/sanity-image.svelte` with a correct `sizes`. Optional content renders only when present.
5. **UI strings** (labels, empty states) go in all five `messages/*.json`.

## Constraints

- A schema merge to `main` deploys the Studio. Renaming or removing a field orphans existing content, so say so and propose a migration instead of doing it silently.
- Don't touch `migrations/import-site-content/`.

## Verify

`bun run --cwd apps/web check` must pass (it catches query/type mismatches), then run the `verify-web` skill.
