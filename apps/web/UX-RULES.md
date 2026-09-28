# UX/UI rules — read before any edit

Distilled from `ux-ui-review.md` (principles) and `ux-review-plan.md` (what was applied).
These are hard rules for `apps/web`. If a change would break one, stop and raise it instead of working around it.

**Tie-breaker:** if a change makes the site more impressive but less understandable, accessible, fast or navigable, usability wins. The interface is a lens on the project, not the subject.

---

## 1. Design system (non-negotiable)

- **No per-page style overrides on UI primitives.** Visual styling for `ui/*` components lives in their `tv()` variants and sizes. If a look is missing, add a named variant (e.g. `Card` `brand` / `featured`) rather than passing classes at the call site. Layout-only classes (`grid`, `col-span`, margins between siblings) at call sites are fine.
- **Width and gutters:** sections use `Container` (`shared/container.svelte`), never their own `max-w-*` / `px-*`. Pages use `PageLayout`.
- **Type:** only the scale in `layout.css` — `text-display`, `text-h1`–`text-h4`, `text-lead`, `text-body`, `text-small`, `text-caption`, `text-micro`, `text-eyebrow`. No `text-[Npx]`, `leading-*` or `tracking-*` one-offs. Don't use `text-micro` for anything a user must read (consent, legal, form help): use `text-caption` or larger.
- **Button sizes:** `sm` (h-8), `default` (h-10), `lg` (h-12), plus the icon sizes. Don't add bespoke heights.
- **Radii:** use the tokens `rounded-sm` … `rounded-4xl`. No `rounded-[Npx]`.
- **Spacing:** the 4/8px scale only. No `gap-[19px]`, `px-[117px]`, `h-[438px]`-style arbitrary values in page components.
- **Colours:** tokens only. A new brand colour gets a CSS variable in `layout.css` with a light and a `.dark` value (as with `--vis-gold`), never a raw hex in a component.
- Don't run `prettier --write` over `components/ui`.

## 2. Accessibility (WCAG 2.2 AA baseline)

- **Contrast:** text ≥ 4.5:1 (large text ≥ 3:1) and UI components ≥ 3:1, in **both themes**. Also check APCA: aim for Lc ≥ 60 on body text and ≥ 45 on large headings.
  - **Brand exception:** `--primary` (the bright orange) is an intentional brand choice and stays as is, including as text (`text-primary`) and as a button or badge background. Don't change its value, don't add a darker "text-safe" variant, and don't flag it as a contrast issue.
  - Every other colour pairing must meet the thresholds above. No thin light-grey "aesthetic" type on grey.
- **Focus:** every interactive element needs a visible focus indicator, at least 2px with 3:1 contrast. Primitives use a solid `focus-visible:ring-ring` `ring-[3px]` with offset. The global `:focus-visible` outline covers everything else.
  - Never use `ring-ring/50`.
  - Never add a bare `outline-none` without a `focus-visible:` replacement on the same element or a wrapping `focus-within`.
- **Target size:** every interactive target is at least 24×24 CSS px. Small visuals such as dots, icons and markers keep a padded hit area around them (see `carousel-dots`, `groups-map` markers).
- **Reading order = visual order.** Never reorder with `order-*`, `flex-row-reverse`, `flex-col-reverse` or `grid-flow-dense`. Render the DOM in the order users should read it; prefer one consistent layout over alternating sides, so mobile stacking stays consistent (see `project-showcase`: text, then photos).
  - Known exceptions: the `dt`/`dd` visual swaps in `about-hero` and `group-details`, where label-then-value is the logical order, and the shadcn `dialog-footer` primitive.
- **Landmarks:** the root layout owns the skip link and `<main id="main">`. Pages must not add another `<main>`.
- **No false affordances:** if something looks clickable, it must be a real `<a>` or `<button>`. If it isn't clickable, it must not look like a link (no arrow icons, no link colour). Missing hrefs render a muted "Coming soon", not a dead link.
- **Icon-only controls** need an `aria-label` (from messages). Overlays such as dialogs, sheets and lightboxes need a visible close button plus Esc.
- **Forms:** use `Field.Label` with the `required` prop for required fields. Errors go through `aria-invalid` and a text message; colour alone isn't enough.

## 3. Motion

- `prefers-reduced-motion` is honoured globally in `layout.css`. Don't bypass it with `!important` or JS-driven animation.
- For JS or Svelte transitions (`slide`, Embla, drag), read `prefersReducedMotion.current` from `svelte/motion` and fall back to instant or zero duration.
- Use `motion-safe:` for decorative hover and entrance effects.
- Anything that moves automatically for more than 5s (carousel autoplay, background video) needs a visible pause control.
- No scroll-jacking. Never change native scroll speed or physics.

## 4. Orientation and navigation (Trunk Test)

- **One source for navigation:** `nav/nav-links.ts`. Header, mobile menu and both footers read from it. Never hardcode a nav or footer link in a component.
- Every route renders `<Seo title description />` from `shared/seo.svelte`, with the text from messages. The browser tab must say what the page is.
- The active nav state matches by section prefix and sets `aria-current="page"`, on desktop and mobile.
- **No dead ends:** every CTA points to a real route. Unfinished pages use `shared/coming-soon-page.svelte` (breadcrumb, explanation, contact CTA). New routes need a breadcrumb unless they're top-level.
- **One action, one label:** the same destination uses the same wording everywhere (e.g. "Find your group" → `/find-a-group`). The header "Join" is the only compact exception.
- Keep utility actions (share, download, language) visually separate from the main story flow.

## 5. Content and microcopy

- The value proposition is readable in the hero within 5 seconds, without scrolling or waiting for an animation.
- **Front-load:** put the key fact in the first sentence or paragraph. Start headings and bullets with information-bearing words.
- **Link and button text** names the destination or action. Never "Learn more", "Click here" or "More" on their own; use `m.what_we_do_cta({ project })`-style messages.
- Use plain language: no marketing superlatives, no jargon. Keep microcopy short, in the present tense, and specific.
- One copy per breakpoint. Don't keep `_short`/`_long` variants of the same message; write one concise version.
- **All user-facing strings go in `messages/{en,es,it,ja,nl}.json`**, with all five locales updated together. No hardcoded strings (brand names excepted).
- Format numbers and dates with `Intl.*` and `getLocale()`, never pre-formatted strings like `"10000+"`.
- **Honest states:** never show "sent", "subscribed" or "done" for something that didn't happen. If there's no backend, disable the control with a "coming soon" note or use a real fallback (`mailto:`), and tell the user about the TODO.

## 6. Credibility and narrative

- Claims carry evidence: an author on posts, "Figures as of {date}" on stats, sources where they exist.
- Project pages follow **problem → process → result → depth**: intro and body → activities → `project-impact` → news, resources and partners.
- **Progressive disclosure:** show the overview first and link to or expand into detail. Don't dump everything at once.
- Optional content (impact, outcomes, resources) renders only when there's data. Never show empty shells.

## 7. Performance

- Static images use `<enhanced:img>`. The LCP/hero image gets `fetchpriority="high"` and no `loading="lazy"`; everything below the fold is lazy.
- Sanity images go through `shared/sanity-image.svelte` with a correct `sizes` prop (`w`-descriptor `srcset`).
- Lazy-load heavy libraries such as Leaflet or media viewers. Interactions must give visual feedback within 200ms (INP), so never block the main thread on open or toggle.
- Avoid layout shift: no sticky-header height changes on scroll, and set intrinsic sizes on media.

## 8. Patterns: use only for a real problem

- FAB menus, bento grids and scroll-driven storytelling are **out of scope** unless a specific problem calls for them. None does today.
- Bento suits scannable overviews only, never linear narrative, and must collapse to one column on mobile.

---

## Pre-edit checklist

Before editing:
1. Does this need a new **variant or token** instead of a call-site class?
2. Does any new text or interactive element meet **contrast, focus, 24px target and label** requirements?
3. Is the **DOM order** the reading order?
4. Are new strings in **all 5 message files**, and are links and CTAs pointing to **real routes** via `nav-links.ts`?
5. Does any motion respect **reduced motion**?

Before calling it done:
- `bun run check`, `bun run lint`, `bun run test`, `bun run build`
- Regression greps in `src`, all of which should return nothing new:
  ```sh
  grep -rn "ring-ring/50\|rounded-\[\|text-\[[0-9#]\|order-last\|flex-row-reverse\|flex-col-reverse\|grid-flow-dense" src
  grep -rn "outline-none" src --include=*.svelte | grep -v "focus-visible\|components/ui"
  ```
- For UI changes: check keyboard-only tab order, reduced-motion emulation, and light and dark themes on the affected routes. Use axe via Playwright when available.
