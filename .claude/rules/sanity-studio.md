---
paths:
  - "apps/studio-volunteers/**"
---

# Sanity Studio conventions

- `locales.ts` defines the three kinds of localisation. Pick the right one for a new type, add it to the matching array there, and add its sidebar item in `deskStructure/index.ts` (helpers `translatedList`, `localizedSingleton`):
  - **One document per language** (`TRANSLATED_TYPES`): add `languageField` and use `isUniqueInLanguage` for slugs (`schemaTypes/shared/`). Translations share a slug.
  - **Localized singleton** (`LOCALIZED_SINGLETONS`): fixed id `${type}-${locale}`.
  - **Shared across languages** (e.g. `group`): translate individual fields with `internationalizedArray`.
- Images use the `imageWithAlt` object. Pages expose the `seo` object.
- After any schema change, run `bun run typegen` in this app, then update the GROQ in `apps/web/src/lib/sanity/queries.ts` and the web components that read it.
- `migrations/import-site-content/` holds one-time scripts that have already run. Don't copy their patterns for new code, and don't rerun them.
- Merging to `main` deploys the Studio automatically.
