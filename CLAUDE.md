# Volunteers monorepo

Bun workspaces: `apps/web` (SvelteKit site) and `apps/studio-volunteers` (Sanity Studio). The README has the layout and content model; don't restate it here.

## Commands

- Bun only: `bun install`, `bun run …`, `bunx …`. Never npm/pnpm/yarn (one `bun.lock` at the root).
- Web scripts run inside `apps/web`, or from the root with `bun run --cwd apps/web <script>`.
- **Definition of done for `apps/web`:** `bun run check && bun run lint && bun run check:rules && bun run test && bun run build`. Report the real output; don't call something done without it. The `verify-web` skill runs all of these.

## Gotchas

- **Generated files. Never edit them by hand:**
  - `apps/web/src/lib/sanity/sanity.types.ts` and `apps/studio-volunteers/schema.json`: regenerate with `bun run --cwd apps/studio-volunteers typegen` after any schema change or any GROQ change in `apps/web/src/lib/sanity/queries.ts`.
  - `apps/web/src/lib/paraglide/**` is compiled from `apps/web/messages/*.json` by the Vite plugin.
- **Locales are defined in two places** and must match: `apps/studio-volunteers/locales.ts` and `apps/web/project.inlang/settings.json`. Message files: all five (`en es it ja nl`) change together.
- **Web UI rules:** `apps/web/UX-RULES.md` is loaded through `apps/web/CLAUDE.md`. Subagents (Explore, Plan, general-purpose) don't load CLAUDE.md, so when you delegate web UI work, tell them to read `apps/web/UX-RULES.md` first, or use the `ux-reviewer` agent.
- **Studio deploys itself:** a push to `main` that touches `apps/studio-volunteers/**` runs `sanity deploy` (`.github/workflows/deploy-studio.yml`). Schema changes go live for editors on merge.
- **Site hosting:** Vercel (`adapter-vercel`). Non-production deploys send `X-Robots-Tag: noindex` based on `VERCEL_ENV` (`hooks.server.ts`).
- Studio code uses its own prettier style (no semicolons, no bracket spacing, width 100; see its `package.json`), which differs from web's.

## Enforcement

Hooks in `.claude/settings.json` block edits to generated files, format and rule-check every edited web file, and run `check:rules` before a turn ends. If a hook reports a violation, fix the code. Don't work around the hook. Real exceptions go in the allowlist in `apps/web/scripts/check-rules.ts`, with a reason.
