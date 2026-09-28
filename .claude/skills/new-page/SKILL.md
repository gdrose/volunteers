---
name: new-page
description: Add a new route/page to the SvelteKit site in apps/web, either a real page or a "coming soon" stub. Use when asked to create, add or scaffold a page, route or section URL.
argument-hint: "<path, e.g. /volunteer-stories> [stub]"
---

# Add a page to apps/web

**Objective:** add the route `$ARGUMENTS` so that it follows UX-RULES: it has SEO, is translated, is reachable from the nav, and is in the sitemap.

Read `apps/web/UX-RULES.md` before you start.

## Steps

1. **Route files** in `apps/web/src/routes/<path>/`:
   - A stub is just `+page.svelte` rendering `<ComingSoonPage name={m.nav_<x>()} />` (see `routes/donate/+page.svelte`).
   - A real page with CMS content gets `+page.server.ts`. Fetch with `client.fetch<QUERY_RESULT>(QUERY, { locale: getLocale() })` and return plain fields with `?? []` / `?? null` fallbacks (see `routes/about/+page.server.ts`). For the query itself, use the `content-field` skill.
2. **`+page.svelte`**: start with `<Seo title description cms={data.seo} />` from `$lib/components/shared`. A page that isn't top-level uses `PageLayout` with `crumbs`. Every section uses `Container`. Don't add another `<main>`.
3. **Strings**: add each new key to all five `apps/web/messages/{en,es,it,ja,nl}.json` (`nav_<x>`, `meta_<x>_description`, …). No hardcoded copy.
4. **Navigation**: if the page is linked from the header or footer, add it only in `src/lib/components/nav/nav-links.ts`. Header, mobile menu, footers and the sitemap all read from there.
5. **Sitemap** (`src/routes/sitemap.xml/+server.ts`): nav paths are included automatically. Add stubs to `COMING_SOON`. Add a CMS singleton with a "hide from search" switch to `SINGLETON_PATHS`, and a new slugged document type to `DOCUMENT_PATHS` plus `SITEMAP_QUERY`.
6. **CTAs** that point at the page use the same label everywhere ("one action, one label").

## Constraints

- No dead links. Until the page is real, it stays a `ComingSoonPage`.
- Optional sections render only when there's data (`{#if data.x.length}`).

## Verify

Run the `verify-web` skill. Then open the page in two locales (e.g. `/about`, `/it/about`) and confirm that the tab title, breadcrumb and active nav state (`aria-current`) are correct.
