---
name: verify-web
description: Run the full definition-of-done for apps/web (type-check, lint, UX rule checks, tests, build) and, for UI changes, a manual accessibility pass. Use before saying web work is done, or when asked to verify, check or test the site.
---

# Verify apps/web

**Objective:** prove, with command output, that the change is done. Don't assert success without it.

## Steps

1. From `apps/web`, run each command and record its exit code. Continue after a failure so you get the full picture:
   - `bun run check` (svelte-check + types)
   - `bun run lint` (prettier + eslint)
   - `bun run check:rules` (UX-RULES mechanical checks + message-key parity)
   - `bun run test` (vitest)
   - `bun run build`
2. Fix anything you caused. If a failure was already there before your change (confirm with `git stash`), report it and don't fix it silently.
3. **UI changes only**: run the dev server (the `run` skill, or `bun run dev`) and on each affected route check:
   - keyboard-only tab order and a visible focus ring on every control
   - `prefers-reduced-motion: reduce` emulation
   - light and dark themes
   - axe via Playwright if available
   - a second locale (e.g. `/it/…`)

## Output

A short table: command → pass/fail, plus the relevant error lines for each failure, then any manual findings with `file:line`.
