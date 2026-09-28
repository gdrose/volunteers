# Volunteers

Website for **Volunteers** — *doing good while having fun*. A multilingual SvelteKit site whose content is managed in Sanity.

This is a Bun workspaces monorepo with two apps:

| App | Path | Stack |
| --- | --- | --- |
| Website | [`apps/web`](apps/web) | SvelteKit 2 · Svelte 5 (runes) · Tailwind CSS 4 · shadcn-svelte · Paraglide i18n |
| CMS studio | [`apps/studio-volunteers`](apps/studio-volunteers) | Sanity Studio (project `hkjo1dgo`, dataset `production`) |

## Getting started

Requires [Bun](https://bun.sh).

```sh
bun install
cp apps/web/.env.example apps/web/.env   # Sanity project ID + dataset
bun run dev:web                          # website at http://localhost:5173
bun run --cwd apps/studio-volunteers dev # studio at http://localhost:3333
```

## Website (`apps/web`)

**Routes:** home, `/about`, `/what-we-do` (+ `/what-we-do/[project]`), `/news` (+ `/news/[slug]`), `/find-a-group` (Leaflet map + directory), `/contact`, and stub pages (`/donate`, `/locations`, `/media-kit`, `/privacy`).

**Layout:**

```
src/
├── routes/                # pages; data loaded from Sanity in +page.server.ts
├── lib/components/        # feature components (groups, news, projects, nav, …)
│   ├── shared/            # Container, PageLayout, Seo, SanityImage, …
│   └── ui/                # shadcn-svelte primitives
├── lib/sanity/            # client, image helper, GROQ queries, generated types
├── lib/server/            # locale redirect logic
└── hooks*.ts              # Paraglide middleware + locale redirect
messages/{en,es,it,ja,nl}.json   # UI strings
```

**Languages:** English (base, unprefixed URLs), Spanish, Italian, Japanese and Dutch (`/es/…`, `/it/…`). UI copy lives in `messages/*.json`; page content comes from Sanity per locale. Visitors landing on an unprefixed URL are redirected once to their saved language (cookie) or browser language — never by IP.

**Scripts** (run inside `apps/web`):

| Command | Does |
| --- | --- |
| `bun run dev` | Dev server |
| `bun run build` / `preview` | Production build / preview it |
| `bun run check` | Type-check with `svelte-check` |
| `bun run lint` / `format` | Prettier + ESLint |
| `bun run check:rules` | Mechanical UX-RULES checks + message-key parity |
| `bun run test` | Vitest (server tests in Node, component tests in headless Chromium via Playwright) |

**Before editing UI,** read [`apps/web/UX-RULES.md`](apps/web/UX-RULES.md). The rules are strict: use design-system variants rather than per-page style overrides, `Container` for widths, only the type scale in `layout.css`, WCAG 2.2 AA, a single nav source (`nav/nav-links.ts`), and no dead links.

## CMS (`apps/studio-volunteers`)

**Content model:**

- **Documents:** `project` and `newsPost` (one document per language, linked as translations), and `group` (shared across languages, with per-field translations).
- **Singletons:** `homePage`, `aboutPage` and `newsPage` (one per locale, e.g. `homePage-it`), and `siteSettings` (global).

Locales are defined in `locales.ts` and must match `apps/web/project.inlang/settings.json`.

**Type generation:** GROQ queries live in `apps/web/src/lib/sanity/queries.ts`. After changing a schema or query, run:

```sh
bun run --cwd apps/studio-volunteers typegen
```

This regenerates `schema.json` and `apps/web/src/lib/sanity/sanity.types.ts`.

**Content import:** `migrations/import-site-content/` holds the one-time scripts that moved the site's original hardcoded content into Sanity. They are kept for reference.

## Deployment

- **Studio:** pushes to `main` that touch `apps/studio-volunteers/**` deploy automatically via [GitHub Actions](.github/workflows/deploy-studio.yml). This needs the `SANITY_AUTH_TOKEN` secret.
- **Website:** hosted on Vercel (`@sveltejs/adapter-vercel`). Set `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET` and `PUBLIC_SITE_URL`.

## License

Website code is [MIT](apps/web/LICENSE). The studio is unlicensed/private.
