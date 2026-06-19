# Epic: Implement the new Services pages on WordPress

Integrate the approved static build of the Services landing page and its service sub-pages into the production WordPress site at `prioritytaxrelief.com`. Two tickets: the landing page ships first; the sub-pages follow on the shared template established here.

- **Project:** PTR Web
- **Source build:** static HTML/CSS/JS (this project)
- **Tickets:** 2 (landing + sub-pages)

> \* Story-point estimates are placeholders pending the WordPress-integration decision (Open Question 1 on PTR-WEB-1), which materially changes effort. Re-estimate at refinement.

---

# PTR-WEB-1 — Build & integrate the Services landing page (`/services/`)

| Field | Value |
|---|---|
| Type | Story |
| Priority | High |
| Component | WordPress / Front-end |
| Estimate | 5–8 pts* |
| Labels | services, landing-page, seo, lead-form |
| Fix version | TBD |
| Blocks | PTR-WEB-2 |

## Description

Take the approved static build of the Services landing page and stand it up as the live `/services/` page on WordPress. The build is a single HTML document plus shared CSS/JS and image assets (manifest below). The page must look and behave identically to the approved build, render correctly on mobile, and preserve the existing SEO metadata exactly.

The decision on **how** it should live in WordPress (custom page template vs. block pattern vs. page-builder layout) is unresolved — see Open Questions. Whatever the approach, the visible output and the interactive behaviors below are the contract.

## Components to build

- **Header** — Logo, primary nav with **Services** and **Tax News** dropdown menus, About, Careers, the Tax Help Hotline link, and a Clients button. Sticky with an on-scroll shadow; collapses to a hamburger + mobile nav panel under the breakpoint.
- **Hero** — Eyebrow, H1 with orange accent span, lead paragraph (with the 3-day money-back emphasis), dual CTA ("Contact us today" / "View our services"), trust badges (BBB, Google, Trustpilot) + "millions saved" callout, and a YouTube embed in the media panel.
- **Our Services carousel** — 9 data-driven service cards (icon, title, description, "Learn More" link) rendered from a JS data array, with prev/next arrows and dot pagination. "Back Sales Tax" is a deliberate dead card — see Open Questions.
- **How we help** — 50/50 split: a single-open accordion (4 steps) beside a "Book your consultation" CTA panel.
- **Why choose us** — Single-open accordion, 3 items, with H3 headings inside each summary.
- **Money-back guarantee** — Badge image + heading + body band.
- **Lead / pre-qualify form** — Name, phone, email, an estimated-tax-debt range slider with a live $ readout, optional message, the TCPA consent block, and submit. Client-side validation today; needs a real backend (see Open Questions).
- **Footer** — "Not a current client?" call row, brand + BBB, and two link columns (About, FAQs, Terms; Privacy, DNC/TCPA), plus the full legal/consent text.
- **Global behaviors** — Reveal-on-scroll entrance fades (additive — never hides content if JS fails), single-open accordion logic, sticky-header shadow, mobile-nav toggle, and a floating dark-mode toggle persisted to `localStorage`.

## Acceptance criteria

- [ ] The live `/services/` page renders visually identical to the approved build at desktop, tablet and mobile widths.
- [ ] All 9 service cards render from the data source in the correct order with working "Learn More" links to their respective sub-page URLs (Back Sales Tax handled per the resolved Open Question).
- [ ] Carousel arrows + dots navigate correctly; arrows disable at the track ends; keyboard and touch/swipe both work.
- [ ] Both accordions enforce single-open behavior and are keyboard-operable.
- [ ] The lead form validates required fields inline and submits to the agreed production backend (not the prototype redirect); a success/confirmation state is shown and the conversion event fires.
- [ ] The estimated-debt slider updates its live dollar readout and submits its value with the form.
- [ ] The YouTube hero embed lazy-loads and is responsive (no layout shift).
- [ ] Header is sticky with on-scroll shadow; mobile nav opens/closes and traps focus appropriately.
- [ ] **All SEO metadata is preserved exactly** (see SEO note) and validates in Google Rich Results / Schema validators.
- [ ] All analytics/tracking and conversion pixels confirmed present and firing (GTM, GA4, Google Ads, Meta Pixel, CallRail, form-submit conversion) — see Open Questions.
- [ ] No console errors; Core Web Vitals are not regressed versus the current page.
- [ ] Page passes the QA and accessibility checklists below.

## SEO — preserve exactly

The build carries the page's existing SEO verbatim. **Do not regenerate or let a plugin overwrite these.** Confirm the WordPress SEO setup (Yoast/Rank Math) outputs identical values:

- [ ] `<title>` "Tax Relief Services - Priority Tax Relief", meta description, and `rel=canonical` → `/services/`
- [ ] `rel="next"` pagination link — confirm whether this is still wanted (the build is a static page, not a paginated archive)
- [ ] `robots` directives (index, follow, max-image-preview:large, etc.)
- [ ] Open Graph (locale, type=website, title "Services Archive", description, url, site_name, image + dimensions) and Twitter card (summary_large_image, @TaxForgiveness)
- [ ] Full JSON-LD `@graph`: CollectionPage, ImageObject, BreadcrumbList, WebSite, Organization
- [ ] Heading hierarchy: exactly one H1 (hero), H2 section titles, H3 card/accordion titles

> **Note:** OG title reads "Services Archive" and the JSON-LD type is `CollectionPage` with a `rel=next` — artifacts of the original WordPress archive. Confirm whether the new page should keep archive semantics or move to a standard `WebPage`/`Service` schema.

## Asset manifest / inventory

| Asset | Path | Notes |
|---|---|---|
| Landing page markup | `Services Page.html` | **Port** — source of truth for structure & copy |
| Site styles | `assets/css/site.css` | **Keep** + `ptr-tokens.css`, `pages.css` |
| Interactions | `assets/js/site.js` | **Keep** — carousel, accordions, form, nav, theme |
| Service card data | inside `site.js` (`SERVICES[]`) | 9 items — consider CMS-driving (see Open Q) |
| Logo + footer flag | `assets/img/logo/` | **Keep** |
| Trust badges | `assets/img/badges/` | BBB, Google, Trustpilot, Authorized Partner |
| Service icons (×9) | `assets/img/services/*.png` | **Remote** — JS references live WP media URLs (2023/06); local copies are fallbacks |
| Money-back badge | `assets/img/money-back-guarantee.png` | **Keep** |
| Favicon | `assets/img/favicon.webp` | **Keep** |
| Hotline icon | `assets/img/icons8-call.gif` | **Confirm** — third-party (icons8), verify license |
| Fonts | Google Fonts (Inter, Newsreader, Source Code Pro, Outfit) | **Keep** — or self-host for performance |
| YouTube embed | `youtube.com/embed/3ePq3v7nxjQ` | "Why hire Priority Tax Relief?" |
| Tweaks panel | `tweaks-panel.jsx` + React/Babel scripts | **Strip** — preview-only, remove for production |
| Dark-mode toggle | built in `site.js` | **Confirm** — keep in production? |

## QA checklist

- [ ] Visual parity with approved build at ≥1280px, ~768px, ~375px
- [ ] Carousel: arrows, dots, swipe, end-of-track disable, resize re-sync
- [ ] Accordions: single-open per group, open/close, keyboard
- [ ] Form: required-field validation, email/phone format, slider readout, success state, real submission + confirmation
- [ ] All links resolve (nav dropdowns, service cards, footer, hotline `tel:`, CTAs)
- [ ] YouTube embed loads and is responsive; no CLS
- [ ] Sticky header shadow; mobile nav open/close
- [ ] Cross-browser: Chrome, Safari, Firefox, Edge; iOS Safari + Android Chrome
- [ ] Tracking events fire (page view, form submit, call click) — verify in GTM preview + GA4 DebugView
- [ ] SEO validators pass; no duplicate/competing meta from plugins
- [ ] Tweaks/preview scaffolding fully removed; no console errors
- [ ] Lighthouse: performance/SEO/a11y not regressed vs. current page

## Accessibility requirements

- [ ] One H1; logical, sequential heading order (no skipped levels)
- [ ] All interactive controls keyboard-reachable with a visible focus ring (2px primary, never the orange)
- [ ] Carousel arrows/dots have `aria-label`s; accordions use native `<details>` semantics
- [ ] Form inputs have associated `<label>`s; errors announced (not color-only)
- [ ] Mobile nav toggle exposes `aria-expanded`; focus managed when open
- [ ] All images have meaningful `alt` (or empty alt if decorative); YouTube iframe has a `title`
- [ ] Color contrast ≥ WCAG AA in both light and dark themes
- [ ] Respect `prefers-reduced-motion` for reveal animations
- [ ] Content fully usable with JavaScript disabled (reveals are additive, not hiding)

## Open questions — needs decision before / during build

1. **How should this live in WordPress?** Custom page template in the theme, a block / Gutenberg pattern, a page-builder (Elementor/Divi) layout, or keep the custom `Services` archive? This drives the whole approach — needs a call before estimating firmly.
2. **What needs to be content-team editable vs. hardcoded?** Dev to recommend. Likely candidates: hero copy/CTAs, the 9 service cards (add/edit/reorder), accordion items, the guarantee band. Form fields and SEO/schema can stay developer-managed. Confirm the editing surface (ACF, blocks, theme options).
3. **Where does the lead form submit?** Production should use the existing WP form plugin (Gravity Forms / CF7 / etc.) — confirm which, the notification routing/CRM, and the spam protection. Prototype currently just redirects to `Thank You.html`.
4. **Confirm tracking & conversion scripts.** Audit and wire/preserve: GTM container, GA4, Google Ads conversion, Meta Pixel, CallRail (dynamic number insertion vs. the hardcoded `tel:` links), and a form-submit conversion event. Confirm consent/cookie handling.
5. **SEO structure — archive or standard page?** OG title is "Services Archive", schema is `CollectionPage`, and there's a `rel=next`. Decide whether to retain archive semantics or migrate to `WebPage`/`Service` and drop pagination. Avoid plugin overwrites either way.
6. **Which phone number is primary?** Header/hotline shows **(866) 708-2872**; footer shows **888-708-2872**. Both preserved from source — confirm the correct number(s).
7. **"Back Sales Tax" card.** Its source "Learn More" pointed (erroneously) at the Offer in Compromise URL and the page appears missing, so it's currently a dead card. Provide the correct destination or confirm it stays disabled. Ties to PTR-WEB-2.
8. **Service icons hosted remotely.** Cards reference live WP media-library URLs (`2023/06/…`). Confirm those stay or migrate to managed local assets.
9. **Keep the dark-mode toggle and the icons8 call GIF in production?** Both are build conveniences — confirm before shipping (and verify the GIF's license).

---

# PTR-WEB-2 — Build & integrate the Services sub-pages (`/services/…`)

| Field | Value |
|---|---|
| Type | Story |
| Priority | High |
| Component | WordPress / Front-end |
| Estimate | 8–13 pts* |
| Labels | services, sub-pages, template, seo |
| Fix version | TBD |
| Depends on | PTR-WEB-1 |

## Description

Stand up the individual service sub-pages from the approved build. They share a single template — a sub-hero (breadcrumb, H1, subtitle, dual CTA, per-page YouTube embed), an intro prose block, supporting content sections, and the same lead form — with shared header/footer chrome injected globally (`chrome.js`) rather than hand-written per page. Build the template once; populate the 8 pages' content. Each page carries its own SEO (title, description, canonical, OG `type=article`, and a per-page JSON-LD `WebPage`/`BreadcrumbList` graph) preserved exactly.

## Pages in scope

| # | Service | Canonical slug | Status |
|---|---|---|---|
| 1 | Offer in Compromise | `/services/settle-back-taxes-with-irs-offer-in-compromise/` | Build |
| 2 | Penalty Abatement | `/services/settle-back-taxes-with-irs-penalty-abatement/` | Build |
| 3 | Innocent Spouse Relief | `/services/innocent-spouse-relief-for-back-taxes/` | Build |
| 4 | Currently Not Collectible (CNC) | `/services/currently-not-collectible/` | Build |
| 5 | Installment Agreement | `/services/installment-agreement-help-for-back-taxes/` | Build |
| 6 | Stop Wage Garnishment | `/services/stop-wage-garnishment-for-irs-or-state-taxes/` | Build |
| 7 | Bank Levy Release | `/services/settle-bank-levy-for-irs-or-state-taxes/` | Build |
| 8 | Back Payroll Taxes | `/services/settle-back-payroll-tax/` | Build |
| 9 | Back Sales Tax | — not present in build — | **Missing** |

> **Back Sales Tax is missing.** There is no sub-page for it in the build, and its card on the landing page mis-linked to the Offer in Compromise URL in the source. Decision needed: author a new Back Sales Tax page (provide copy + slug + video), or keep the landing-page card disabled. This is the key dependency between the two tickets.

## Template components

- **Shared chrome** — Header + footer injected via `chrome.js` (the sub-pages use `<div id="chrome-header">` rather than hand-written markup). Confirm whether to keep JS-injected chrome or render it server-side in the WP template.
- **Sub-hero** — Breadcrumb (Home › Services › [page]), H1, subtitle, dual CTA (free consultation + call), and a per-page YouTube embed.
- **Intro prose** — Lead paragraph with inline internal links (e.g. glossary terms).
- **Content sections** — Per-page supporting copy / qualification info (varies by page — content-managed).
- **Lead form** — Same pre-qualify form + behaviors as the landing page (single shared implementation).

## Acceptance criteria

- [ ] A single reusable sub-page template renders all 8 services; adding a service requires only content, not new markup.
- [ ] Each page matches its approved build visually at desktop/tablet/mobile.
- [ ] Breadcrumbs link correctly back to `/services/` and Home, and match the BreadcrumbList schema.
- [ ] Each page's SEO is preserved exactly: title, description, canonical (unique per page), OG `type=article`, Twitter card, and per-page JSON-LD (`WebPage` + `ImageObject` + `BreadcrumbList`), including `datePublished`/`dateModified`.
- [ ] Per-page YouTube embeds load lazily and responsively.
- [ ] Shared header/footer chrome renders on every sub-page (decide injected vs. server-rendered).
- [ ] The lead form on each sub-page submits to the same production backend and fires conversion tracking.
- [ ] Landing-page service cards link to the correct, live sub-page URLs (closes the loop with PTR-WEB-1).
- [ ] Back Sales Tax resolved per the Open Question (page authored, or card stays disabled — no broken/mis-linked card).
- [ ] Pages pass the QA + accessibility checklists (same standard as PTR-WEB-1).

## Asset manifest / inventory

| Asset | Path | Notes |
|---|---|---|
| Sub-page markup (×8) | e.g. `Offer in Compromise.html` | **Port** — per-page content + SEO |
| Shared chrome injector | `assets/js/chrome.js` | Header/footer injection |
| Shared styles / interactions | `assets/css/site.css`, `assets/css/pages.css`, `assets/js/site.js` | **Shared with PTR-WEB-1** |
| Per-page hero videos | YouTube embeds (unique per page) | e.g. OIC → `1BR4fTL_RMw` |
| OG / primary images | **Remote** — live WP media (`2023/06/*.jpg`) | Per-page; confirm retention |
| Internal links | glossary + cross-service links | Verify all resolve post-migration |
| Back Sales Tax page | — | **To author or drop** |

## QA & accessibility

Apply the same QA and accessibility checklists as PTR-WEB-1 to every sub-page, plus:

- [ ] Each page has a unique, correct canonical URL and title
- [ ] Breadcrumb UI matches BreadcrumbList schema on every page
- [ ] Per-page video is the correct one for that service
- [ ] No two pages share duplicate meta/schema; `dateModified` values are sane
- [ ] Shared chrome renders consistently; the active nav state reflects the current page

## Open questions

1. **Author the Back Sales Tax page, or drop the card?** Need copy, slug, hero video and SEO if it's to be built — otherwise confirm the landing-page card stays disabled.
2. **Injected vs. server-rendered chrome.** Sub-pages inject header/footer via `chrome.js`. In WP this is likely better as the theme header/footer — confirm the approach.
3. **Same WordPress integration + editability decisions as PTR-WEB-1.** Template approach, what's content-managed (hero copy, intro, video ID, body sections), and where the form submits should be resolved once and applied to both tickets.
4. **Per-page media — keep remote WP URLs?** Hero/OG images resolve to the live media library; confirm retention vs. managed assets.
