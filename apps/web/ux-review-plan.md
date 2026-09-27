# UX/UI remediation plan (from `ux-ui-review.md`)

## Context
`apps/web/ux-ui-review.md` sets out 20 UX/UI principles, a checklist and a list of anti-patterns for a showcase site. I checked every route and component in `apps/web/src` against it. The site is already solid in several places: breadcrumbs, a type scale, semantic sections, `motion-safe:` hover effects, and lazy-loaded Leaflet. It also has real failures:

- **Contrast:** the brand orange fails contrast (about 2.5:1 with white).
- **Focus:** focus rings are faint (`ring-ring/50`), and some controls have no focus indicator.
- **Dead ends:** several CTAs lead nowhere.
- **Page titles:** most pages have no `<title>`.
- **Motion:** there is no global reduced-motion handling.
- **Image weight:** images of 1–2 MB.
- **Target size:** targets under 24px.
- **Reading order:** layout is reordered with CSS.
- **Microcopy:** labels are inconsistent or generic.

Decisions already taken with the user:
- Contrast: split the tokens. Keep the bright orange for decoration and add a text-safe orange.
- Dead links: point them to real pages or proper stub pages.
- In scope: microcopy, credibility content, a project impact block, and design-system cleanup.

Guardrails (CLAUDE.md and memory): visual styling lives in component variants and sizes, never in per-page overrides. Use `Container` for width. Use only the type-scale classes.

Work is ordered by severity. Each phase can ship on its own.

---

## Phase 1 — Accessibility blockers (WCAG 2.2 AA; report §12–16, checklist)

**1.1 Contrast tokens** (`src/routes/layout.css`)
- Add `--primary-strong` of about `oklch(0.56 0.17 42)`, targeting ≥4.5:1 on white. Add a matching `.dark` value, and map it as `--color-primary-strong` in `@theme inline`.
- Keep `--primary` (bright) for decoration only: tints (`bg-primary/10`), map markers, timeline dots, and SVG underlines and waves.
- Switch these to the strong token **inside the variants**:
  - `ui/button` → `default` and `soft` variants
  - `ui/badge` → `default` and `outline-primary`
  - the newsletter card background (`newsletter-section.svelte`, via a new `Card` `brand` variant instead of inline classes)
  - `ui/toggle` → chip pressed state
- Replace `text-primary` with `text-primary-strong` on text: title highlights in routes, `about-*`, `stats-section`, eyebrows, footer column titles, mobile menu highlight, and the resource links in `project-resources.svelte`.
- Check APCA as well as WCAG. Aim for Lc ≥ 60 on body text and ≥ 45 on large headings, in both themes.

**1.2 Focus appearance** (§13)
- `--ring` becomes the strong orange. Across the primitives, replace `ring-ring/50` with a solid `ring-ring` at 3px with offset:
  - `ui/button`, `input`, `textarea`, `select-trigger`, `checkbox`, `toggle`, `item`, `dialog-content`
  - `carousel-dots`, `carousel-nav.ts`
  - the `card` `post` variant
- In the `layout.css` base layer, replace `outline-ring/50` with a global `:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px }`. Plain links then get a visible ring.
- Remove the bare `outline-none` from elements that have no replacement:
  - the `language-switcher` trigger
  - the `mobile-navbar` menu trigger
  - `navbar` nav links
  - `post-card` anchor (the card ring covers it)
  - the `group-search` input (the label `focus-within` covers it)

**1.3 Target size ≥24×24** (§12)
- `ui/carousel/carousel-dots.svelte`: give each dot a 24×24 button hit area and keep the 8–10px visual dot inside it.
- Language switcher and mobile "Menu" trigger: add `min-h-6` with padding.
- Footer caption links: add vertical padding so each row is at least 24px.
- Map markers in `groups-map.svelte`: set the `divIcon` to a 24px hit area around the 16px dot.

**1.4 Reduced motion** (§15–16)
- `layout.css`: add a global `@media (prefers-reduced-motion: reduce)` block that shortens animation and transition durations to near zero. This covers tw-animate dialogs and sheets, the nav underline and the chevron.
- `navbar.svelte`: set the `slide` duration from `prefersReducedMotion.current` (`svelte/motion`).
- Carousels: pass the Embla `duration`/instant scroll when reduced motion is set.
- The lightbox drag transition in `photo-lightbox.svelte` follows the same flag.

**1.5 Reading order equals visual order** (§8, anti-pattern "CSS visual reordering")
- `project-showcase.svelte`: drop `lg:order-last`. Render the photos and text snippets in DOM order according to `reverse`.
- `group-details.svelte`: drop `order-last lg:order-none`, so the contact block has one order at every breakpoint.
- `group-finder.svelte`: drop `order-last lg:order-none` on the stats list.
- The `dt`/`dd` visual swaps in `about-hero` and `group-details` stay, because label-then-value is the logical reading order there.

**1.6 Landmarks and skip link**
- `+layout.svelte`: add a visually-hidden-until-focused "Skip to content" link, and wrap `children` in `<main id="main">`.
- Remove the page-level `<main>` elements (about, article, project detail). `PageLayout` uses `Container as="div"`.
- The home page gets a landmark automatically.

**1.7 False affordances**
- `hero.svelte`: the social icons are `<span>`s that look like links. Make them real links through the shared `socialLinks()`, with `aria-label` and 24px targets.
- `contacts-section.svelte`: remove the arrow-up-right icon from cards that aren't links. The email stays the link.
- `project-resources.svelte`: a resource with no `href` shows a muted "Coming soon" instead of a fake link.
- `photo-lightbox.svelte`: add a visible close button (the `overlay` icon button, as in `group-details`), and keep tap-to-close and Esc.

## Phase 2 — Orientation and dead ends (report §1–2, Trunk Test)

**2.1 Single source for navigation.** Create `lib/components/nav/nav-links.ts` with the main links, CTAs and footer columns. `navbar`, `mobile-navbar`, `footer` and `mobile-footer` all use it; today there are four copies, one of which links to `/volunteer`, a 404.

**2.2 Wire every CTA.**
- Header "Join" → `/find-a-group`
- "Donate" (desktop and mobile), plus the mobile "DONATE NOW" banner as an `<a>` → `/donate`
- Footer "Become a volunteer" → `/find-a-group`

**2.3 Active state.** In `navbar` and `mobile-navbar`:
- Match by section prefix (`/news/x` highlights News) rather than by exact path.
- Set `aria-current="page"`.
- Show the active style in the mobile sheet as well.

**2.4 Stub pages.** `donate`, `locations`, `media-kit` and a new `privacy` page use `PageLayout` with a breadcrumb, a short "coming soon" explanation and a contact CTA; today they are a bare `<h1>`. Add `src/routes/+error.svelte` with `PageLayout`, a plain-language message, and links to Home, What we do and Find your group.

**2.5 Page titles and meta.** Add `lib/components/shared/seo.svelte` with `title`, `description` and an optional `image`. The article page already does this inline; move that code into the component and reuse it. Use it on every route, and pull the text from the existing `*_description` messages. The browser tab then passes the Trunk Test's "what page is this?" check.

## Phase 3 — Microcopy and content (§3, §17–19)

- **One action, one label:**
  - `hero_cta`: "Become a Volunteer" → "Find your group", matching the nav and the stats CTA.
  - The header keeps the compact "Join".
- **Descriptive link text:** `projects-section` uses "Learn more" four times. Replace it with `m.what_we_do_cta({ project })`, which already exists.
- **Consent label:**
  - `text-micro` (10px) → `text-caption`
  - add a privacy-policy link to `/privacy`
  - split the message into before/link/after keys
- **Required fields:** add a `required` prop to `ui/field` `Field.Label` that renders the marker, and use it in `contact-form.svelte`.
- **Honest form states:** `contact-form` shows "sent" without sending anything, and the newsletter does nothing. Until endpoints exist:
  - contact: submit opens a prefilled `mailto:`, and the copy reflects that
  - newsletter: subscribe stays disabled, with a "coming soon" note
  - flag both TODOs to the user
- **One copy per breakpoint:**
  - `stats_description` vs `_short`: keep one concise version.
  - Newsletter description short/long: keep one concise version.
  - `project-resources`: use `shortDescription ?? description` everywhere.
- **Number formatting:** `stats.ts` value "10000+" is formatted with `Intl.NumberFormat(getLocale())`.
- **Editorial notes, not code:** flag the "act of rebellion / Artificial Intelligence" stats copy for a plain-language review.
- Every message change covers `messages/{en,es,it,ja,nl}.json`.

**Credibility (§19)** — schemas live in `apps/studio-volunteers/schemaTypes/`:
- Post: add an `author` field (a name, or a reference to a `person` doc). Extend the post query in `lib/sanity/queries.ts`, regenerate `sanity.types.ts`, and show the author in `post-meta.svelte`.
- Stats: add "Figures as of {date}" under `stats-section` and the `about-hero` stats. Keep the date in `stats.ts` as a constant, or move stats into a Sanity singleton if one exists in `singletons/`.

**Project impact block (§4–5, problem → process → result):**
- Project schema: add `startedYear` and `impact: [{ value, label, description? }]`, plus an optional `outcomes` portable text.
- Update the project query and types.
- Add `projects/detail/project-impact.svelte`. It reuses `stats/stat-item.svelte` inside a `dl`, and renders after the activities section in `what-we-do/[project]/+page.svelte`, only when there is data.
- The page then reads as intro and body (the problem) → activities (the process) → impact (the result) → news, resources and partners (the depth).

## Phase 4 — Performance (§11, INP/LCP)

- Story images are 1.3–2.3 MB PNGs, and the hero and about images are about 444 KB each.
  - Add `@sveltejs/enhanced-img` and switch to `<enhanced:img>` in `hero.svelte`, `about-hero.svelte`, `story-timeline.svelte` and `group-card`/`group-details`. This produces AVIF/WebP, a `srcset` and intrinsic sizes.
  - The hero gets `fetchpriority="high"` and no lazy loading.
- `sanity-image.svelte`: switch from `1x/2x` to `w`-descriptor `srcset` plus a `sizes` prop, so small cards don't download images twice as large as needed. `urlFor` already uses `auto('format')`.
- Navbar: the top bar collapses on scroll and changes the sticky header height, which risks layout shift. Once the height change is removed, check again with the Lighthouse CLS audit.

## Phase 5 — Design-system rhythm (§6–7, CLAUDE.md)

- **Button sizes:** `ui/button` has 7 bespoke sizes (heights of 36, 38, 44, 49, 51 and 52px). Collapse them to `sm` h-8, `default` h-10, `lg` h-12, plus the icon sizes.
  - Map `cta`, `form` → default.
  - Map `xl`, `cta-xl`, `download`, `load-more`, `2xl` → lg.
  - Keep uppercase only if it's intended as a named variant.
  - Update the call sites.
- **Radii:** define the radius tokens to match the real set (8, 12, 16, 20, 24px). Replace `rounded-[Npx]` in the `card` variants, `featured-post`, `project-showcase`, `project-overview`, `about-hero`, `newsletter`, `groups-map` and `project-partners`.
- **Spacing:** snap arbitrary px values to the 4/8px scale, for example `lg:gap-[50px]`, `gap-[19px]`, `lg:gap-[7px]`, `lg:px-[117px]`, `pt-[49px]`, the `project` card variant `pt-[13px] pr-1 pb-[26px] pl-2.5`, `h-[173px]` and `h-[438px]`. Styling that repeats per page moves into variants, for example a `Card` `featured` variant for `featured-post` and a `partners` item variant.
- **Leftover one-offs:** fix remaining type-scale violations, such as `text-[#ffbf00]` in the footers. Make that a token, e.g. `--vis-gold`.

---

## Out of scope / not recommended
- FAB menus, a Bento-grid redesign and scroll-driven storytelling. The report says to use these only when they solve a specific problem, and none of those problems exist here.
- Real newsletter or contact back-ends, and a donation provider. These need a decision from the user.

## Verification
1. Run `bun run check`, `bun run lint`, `bun run test` and `bun run build` in `apps/web`.
2. `bun run dev`, then on each route (`/`, `/about`, `/what-we-do`, `/what-we-do/<slug>`, `/news`, `/news/<slug>`, `/find-a-group`, `/contact`, the stubs, and a 404):
   - Run axe through Playwright (it's already a dependency; add `@axe-core/playwright` as a dev dependency). The target is zero serious or critical violations.
   - Walk every interactive element with the keyboard only. Focus must always be visible, and tab order must match visual order, including the reversed showcases.
   - In DevTools, emulate `prefers-reduced-motion` and check that dialogs, sheets and the nav collapse have no animation.
   - Measure contrast of the tokens with an APCA checker, in both light and dark.
3. Run Lighthouse at mobile and desktop for Home, About and a project page. Targets: LCP < 2.5s, CLS < 0.1, and Accessibility ≥ 95. Check INP in DevTools while opening the lightbox, a news filter and the group dialog.
4. Use greps as a regression check: no `ring-ring/50`, no `outline-none` without a `focus-visible` partner outside the primitives, and no `rounded-[`/`-[NNpx]` in page components.
5. Report §20: once everything passes, do a final agent-driven walkthrough in the browser. Check the five-second hero read, find a group, read an article, and switch the language.
