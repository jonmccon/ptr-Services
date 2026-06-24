# PTR Services - WordPress Engineering Handoff

This folder repackages the approved static build so a WordPress developer can lift the pieces
into a theme, page template, or block layout - without reverse-engineering the source HTML. It
**adds to** the build; it doesn't replace it.

**Read alongside:**
- `../Engineering Ticket - Services.md` - the formal tickets, acceptance criteria, QA + a11y
  checklists, and the numbered Open Questions (Q1-Q9) referenced below.
- `../CONTENT-LOG.md` - source-fidelity notes and known content issues.

---

## What's in this folder

```
handoff/
  README.md              <- this guide
  index.html             <- browsable index (start here)
  content-fragments/     <- page CONTENT ONLY - no <html>/<head>, no header, no footer
  theme-partials/        <- the shared chrome, as standalone HTML
    header.html              -> WP theme header (header.php / block)
    footer.html              -> WP theme footer
    lead-form.html           -> ONE reusable form block / shortcode
    lead-form-formidable.md  -> rebuild the lead form in Formidable Forms (guide)
    lead-form-formidable.css -> CSS skin so Formidable matches the design
    lead-form-formidable.xml -> importable starter form
  seo/
    seo-manifest.md        <- per-page title / description / canonical / OG / JSON-LD
```

CSS, JS, and images are **not** copied here - they live at `../assets/` and ship in `../dist/`.
Use those; don't fork them.

---

## The mental model

The build has two layers. Keep them separate in WordPress:

- **Chrome** - the header, footer, and pre-qualify lead form, shared on every page. In the
  static build `assets/js/chrome.js` injects them into `<div id="chrome-*">` mount points (and
  the landing page hand-writes them inline). **In WordPress, build these at the theme level**,
  not via JS: `header.html` and `footer.html` become the theme header/footer; `lead-form.html`
  becomes one reusable block or shortcode.
- **Content** - everything inside `<main>`, unique per page. Each `content-fragments/*.html`
  is exactly that. Paste it into the page body (a Custom HTML block, or `the_content()` in a
  template) and the theme chrome wraps it.

**In short: chrome -> theme. Content -> fragments. Assets -> enqueued once.**

---

## How to integrate a page

1. **Enqueue the assets once** (theme `functions.php`):
   - `assets/css/site.css` - the full visual system (tokens, layout, components, dark mode).
   - `assets/js/site.js` - all interactions (services carousel, single-open accordions,
     reveal-on-scroll, sticky-header shadow, mobile-nav toggle, the multi-step lead form, the
     dark-mode toggle). Load at the end of `<body>`.
   - `assets/css/pages.css` - also needed by **Careers** and **Tax News**.
   - `assets/css/portal.css` + `assets/js/portal.js` - **only** for the client portal.
   - Fonts: Inter, Newsreader, Source Code Pro, Outfit (Google Fonts, or self-host).
   - Move `assets/img/*` into the media library. Service-card icons currently point at live
     `prioritytaxrelief.com/wp-content/uploads/2023/06/*` URLs (Q8).
2. **Build the theme header & footer** from `theme-partials/`. Convert the nav `<a>` lists to
   WP menus, but keep the class names so `site.css` styles them.
3. **Create the page**, set its slug to the canonical in `seo/seo-manifest.md`, and paste the
   matching fragment into the body.
4. **Insert the lead form** wherever a fragment shows
   `<!-- PTR-PARTIAL: insert shared Lead Form here -->`. The form is being rebuilt in
   **Formidable Forms** - follow `theme-partials/lead-form-formidable.md` and enqueue
   `theme-partials/lead-form-formidable.css`.
5. **Set the page SEO** from `seo/seo-manifest.md`, and stop the SEO plugin from overwriting
   the hand-authored JSON-LD (copy it verbatim from the source `<head>`).
6. **Carry over the `<body>` attributes** noted at the top of each fragment. `data-page` drives
   the active-nav state; `data-carousel` / `data-hero` (landing only) drive layout variants.

---

## Page inventory & status

| Page | Slug | Fragment | Notes |
|---|---|---|---|
| Services (landing) | `/services/` | `services.html` | Carousel cards render from `SERVICES[]` in `site.js`. Header/footer inline in source. |
| Offer in Compromise | `/services/settle-back-taxes-with-irs-offer-in-compromise/` | `offer-in-compromise.html` | |
| Penalty Abatement | `/services/settle-back-taxes-with-irs-penalty-abatement/` | `penalty-abatement.html` | |
| Innocent Spouse Relief | `/services/innocent-spouse-relief-for-back-taxes/` | `innocent-spouse-relief.html` | |
| Currently Not Collectible | `/services/currently-not-collectible/` | `currently-not-collectible.html` | |
| Installment Agreement | `/services/installment-agreement-help-for-back-taxes/` | `installment-agreement.html` | |
| Stop Wage Garnishment | `/services/stop-wage-garnishment-for-irs-or-state-taxes/` | `stop-wage-garnishment.html` | |
| Bank Levy Release | `/services/settle-bank-levy-for-irs-or-state-taxes/` | `bank-levy-release.html` | |
| Back Payroll Taxes | `/services/settle-back-payroll-tax/` | `back-payroll-taxes.html` | |
| **Back Sales Tax** | - | - | **Missing** - no page in build; landing card mis-linked -> dead link (Q7). |
| About | `/about/` | `about.html` | Leaflet map loads from CDN (online only); inline map-init kept in fragment. |
| Careers | `/careers/` | `careers.html` | Needs `pages.css`. |
| Contact | `/contact/` | `contact.html` | Contact form is a front-end demo. |
| Our Team | `/our-team/` | `our-team.html` | Redesigned as the "ace team" radial halo (was the org-chart roster, now archived). Roster comes from an inline data script (kept); B&W SVG filter kept. Page-specific CSS travels at the top of the fragment—move it into the theme stylesheet. |
| Tax News | `/tax-news/` | `tax-news.html` | Needs `pages.css`. In WP this is a real post archive. |
| Tax News article | (blog post) | `uncommon-tax-deductions.html` | Sample article; uses a build-only `<image-slot>` - swap for the real featured image. |
| Thank You | `/thank-you/` | `thank-you.html` | Lead-form redirect target in the prototype. |
| FAQs | `/faqs/` | `faqs.html` | Footer-linked. Has **FAQPage** JSON-LD (Q/A rich-result schema) - preserve it. |
| Terms & Conditions | `/priority-tax-terms-and-conditions/` | `priority-tax-terms-and-conditions.html` | Footer-linked. The footer "Privacy Policy" link also points here (no separate privacy page in the build). |
| DNC / TCPA Policy | `/dnc-tcpa-policy/` | `dnc-tcpa.html` | Footer-linked compliance page. |
| Client Services | `/clients/` | `client-services.html` | Case-process timeline (content page). Replaces the old login-style "Client portal" demo, now archived. Page-specific CSS travels at the top of the fragment—move it into the theme stylesheet. |

---

## Likely CMS-driven content (Q2)

The build hardcodes these lists in JS - flag them for the editability decision:

- **Services carousel** - 9 cards from `SERVICES[]` in `site.js` (title, icon, description,
  link, order). `Back Sales Tax` is `url: null` (dead) by design.
- **Our Team roster** - inline data array (the "ace team" halo design).
- **Tax News** - front-end article list / category filter; a real post archive in WP.

---

## Don't-break list

- **SEO is hand-authored.** Titles, descriptions, canonicals, OG, and the full JSON-LD `@graph`
  must survive verbatim - configure Yoast/Rank Math to match or to leave them alone. The
  landing page keeps archive semantics (`CollectionPage` + `rel=next`, OG "Services Archive");
  confirm keep vs. migrate (Q5).
- **Phone numbers differ:** header `(866) 708-2872`, footer `888-708-2872`. Both from source - 
  confirm the primary (Q6).
- **Reveal animations are additive** - content shows if JS fails. Never invert that.
- **Accordions are native `<details>`** with single-open enforced in `site.js`.
- **Forms are demos** - the lead form and portal don't submit. The lead form is being rebuilt
  in **Formidable Forms** (see `theme-partials/lead-form-formidable.md`); wire real submission +
  conversion tracking before launch (Q3, Q4).
- **Strip preview-only scaffolding** - the Tweaks panel (landing) and any `image-slot.js`
  placeholders. Already excluded from the fragments and from `dist/`.
- **`assets/img/icons8-call.gif`** is third-party - verify the license (Q9).

---

## Previewing

Open the full pages from the project root (or `../dist/`) to see them styled with the real
chrome. The `content-fragments/` files are **unstyled on their own** by design - no `<head>`,
no CSS link - and render correctly only once pasted under a theme that enqueues `site.css`.
Start from `index.html` in this folder.
