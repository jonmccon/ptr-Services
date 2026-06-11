# Services Migration Audit — Priority Tax Relief

**Scope:** Services hub + 8 individual service pages
**Comparison:** New static pages (workspace root) vs. WordPress exports in `/PTR-Pages-Download`
**Date:** 2026-06-11
**Goals audited:** (1) Written content migration accuracy, (2) SEO functionality & architecture migration

> Per request, every textual difference is flagged — including intentional rewording. This is a **report only**; no pages were modified.

---

## 1. Executive summary

**Written content: essentially complete.** No substantive marketing copy was lost on any of the 9 pages. Every hero intro, feature card, body paragraph, bullet list, and FAQ answer in the old pages is present in the new pages. The hub's 9 service descriptions are migrated verbatim (injected at runtime from `assets/js/site.js`). Differences are mostly **additions** (new section headings, press/review bands, inline lead form) and a few **rewordings/restructurings**.

**SEO: largely preserved at the page level, but with consistent structured-data regressions.** Titles, meta descriptions, canonicals, robots, Open Graph core tags, Twitter card, breadcrumb schema, and H1s all migrated correctly. However, **every sub-page dropped its `Service` JSON‑LD block** (which carried `aggregateRating`, `review`, and `areaServed`), the **hub dropped its services `ItemList` schema**, and several secondary metadata fields (`og:image` dimensions, Twitter reading-time labels, `article:*`) were removed. Each sub-page also **demoted its descriptive subtitle from `<h2>` to a paragraph**.

### Scorecard

| Page | Content migration | SEO / architecture |
|---|---|---|
| Services hub | ⚠️ Complete; placeholder + fine print dropped | ⚠️ Core OK; **`ItemList` schema dropped** |
| Back Payroll Taxes | ✅ Complete | ⚠️ Core OK; **`Service` schema + 2ndary meta dropped** |
| Bank Levy Release | ✅ Complete | ⚠️ Core OK; same schema drops |
| Currently Not Collectible | ✅ Complete (identical body) | ⚠️ Core OK; same schema drops |
| Innocent Spouse Relief | ✅ Complete | ⚠️ Core OK; same schema drops |
| Installment Agreement | ⚠️ Complete; CTA reworded, 2 paras merged | ⚠️ Core OK; same schema drops |
| Offer in Compromise | ✅ Complete | ⚠️ Core OK; same drops (kept dates) |
| Penalty Abatement | ⚠️ Complete; **4 lists rewritten as prose** | ⚠️ Core OK; same schema drops |
| Stop Wage Garnishment | ⚠️ Complete; closing CTA reworded | ⚠️ Core OK; same schema drops |

Legend: ✅ no issues · ⚠️ migrated with differences to review · ❌ content lost

---

## 2. Methodology

- The new pages share chrome (header, footer, lead form) injected by `assets/js/chrome.js`; the hub's 9 service cards are injected by `assets/js/site.js` from a `SERVICES` array (title + description + link). Static HTML therefore omits this runtime content, which was accounted for manually.
- Each old and new page was parsed to extract: `<title>`, meta description, robots, canonical/next/prev, Open Graph, Twitter, JSON‑LD (parsed and compared node-by-node), all headings (H1–H6), image `alt` text, links, and full visible body text.
- Body text was normalized (case, smart quotes, whitespace, punctuation) and shared nav/footer/lead-form boilerplate was filtered so that only genuine page-content differences surfaced.

---

## 3. Goal 1 — Written content migration

### 3.1 Verdict: complete, no copy lost

All primary copy migrated on all 9 pages. The line-level diff produced **zero** "lost from old" results for Back Payroll, Bank Levy, CNC, Innocent Spouse, and Offer in Compromise. Installment, Penalty Abatement, and Stop Wage Garnishment showed only reworded/restructured (not missing) copy. The hub showed only placeholder/duplicate content removed.

### 3.2 Per-page content notes

**Services hub (`Services Page.html`)**
- ✅ Migrated: H1 "US Tax Relief Services. Done Right."; hero lead paragraph (verbatim); all 9 service titles + descriptions (via `site.js`, identical text and order); "How we help" 4 items; "Why Choose Us?" 3 items; Money-Back Guarantee paragraph — all verbatim.
- ➕ Added: hero eyebrow "Nationwide IRS & State Tax Resolution"; hero YouTube video; CTA "View our services"; section headline "A clear path from first call to resolution"; consultation line "Talk to a real tax professional… just straight answers."; inline lead form + consent text.
- ➖ Dropped: the placeholder testimonial carousel repeated 5× ("Offer in Compromise / Get A Fresh Start with Tax Relief"); a second service-tab list containing labels "Innocent Spouse Release", "Lien Release", "Bank Payroll Release"; the "Call for Free Review" callout and hero phone number; the **"Cancellation" fine-print paragraph** (note: this fine print is retained on all 8 sub-pages but not on the hub).

**Back Payroll Taxes**
- ✅ Verbatim: intro paragraph; all 4 capability cards; full "Consequences of Unpaid Payroll Taxes" section (intro + Penalties & Interest, Liens & Levies, TFRP, Criminal Charges); closing contact line.
- ✏️ Reworded: capability card descriptions gained trailing periods; money-back CTA link "Click here to learn more about our money-back guarantee policy" → "Learn about our money-back guarantee".
- ➕ Added: eyebrow "How we help"; section heading "How Priority Tax Relief Can Help".

**Bank Levy Release** — ✅ All copy verbatim (intro, 6 feature cards, "How Long Does It Take to Release a Bank Levy?" section, closing). Only addition: eyebrow "What we do".

**Currently Not Collectible (CNC)** — ✅ Body text **identical** (no additions or losses in main content).

**Innocent Spouse Relief** — ✅ All copy verbatim (4 capability cards, "What Qualifies…", "How to Apply…", "Preventing Tax Issues in Marriage"). Additions: eyebrow "How we help" + heading "How Priority Tax Relief Can Help".

**Installment Agreement**
- ✅ Verbatim: capability cards, "Eligibility", "Types of IRS Payment Plans", "Should I Apply…".
- ✏️ Reworded/restructured: two adjacent paragraphs ("The IRS offers several types of payment plans…" + "The types of IRS payment plans are:") were **merged into one paragraph** — text preserved; money-back CTA reworded ("Learn more about our money-back guarantee policy" → "Learn about our money-back guarantee").
- ➕ Added: "How we help" / "How Priority Tax Relief Can Help".

**Offer in Compromise** — ✅ All copy verbatim (service cards, "How to Qualify…"). This page renders the lead form inline. Addition: eyebrow "What we do".

**Penalty Abatement** — ⚠️ Most significant content restructuring:
- The information is fully preserved, but **four bulleted lists were rewritten as flowing prose paragraphs**:
  1. First-Time Penalty Abatement (FTA) eligibility criteria
  2. Types of penalties that can be abated (Failure-to-File, Failure-to-Pay, Accuracy-Related, Estimated Tax)
  3. How to request abatement (written request, Form 843, calling the IRS)
  4. How Priority Tax Relief assists (consultation, filing, representation, preventative strategies)
- ➕ Added: a "Good to know" callout label.
- ✅ FAQ section (8 Q&As) migrated verbatim and is now marked up with `<h3>` question headings (old rendered them as non-heading accordion text — a structural upgrade).
- ⚠️ SEO note: converting lists to prose removes list markup that can support featured snippets / "How-to" style results. Consider keeping `<ul>/<ol>` for the eligibility, penalty-type, and request-method content.

**Stop Wage Garnishment** — ✅ All copy verbatim (6 "How Can I Stop…" methods). Only change: closing CTA reworded — old "…learn more about **Wage Garnishment** and schedule a consultation." → new "…learn more about **Stop Wage Garnishment** and schedule a consultation."

---

## 4. Goal 2 — SEO functionality & architecture

### 4.1 What migrated correctly (all 9 pages) ✅

| Element | Status |
|---|---|
| `<title>` | ✅ Identical to source on every page |
| Meta description | ✅ Identical on every page |
| `robots` (`index, follow, max-image-preview:large…`) | ✅ Identical |
| `canonical` (production URLs) | ✅ Identical — correctly preserved |
| `link rel="next"` (hub pagination) | ✅ Preserved |
| Open Graph core (`og:locale/type/title/description/url/site_name/image`) | ✅ Preserved |
| `twitter:card`, `twitter:site` | ✅ Preserved |
| BreadcrumbList JSON‑LD | ✅ Preserved on every page |
| Organization + WebSite JSON‑LD nodes | ✅ Present (trimmed, see below) |
| H1 | ✅ Matches source on all 9 pages |

Canonicals correctly point at the live production URLs (e.g., `…/services/settle-bank-levy-for-irs-or-state-taxes/`), so the static rebuild will not create competing/duplicate canonicals.

### 4.2 Structured-data regressions (HIGH priority)

**A. `Service` schema dropped on all 8 sub-pages.**
Each old service page included a second JSON‑LD block of `@type: Service` containing `serviceType`, `provider`, `availableChannel` (phone), `areaServed` (United States + ~6 states + ~4 cities), an `aggregateRating` (e.g., Payroll: `4.9/5`, `reviewCount 267`), and a featured `review`. **None of the new sub-pages contain this block** (`Service`/`aggregateRating`/`areaServed`/`review` count = 0 across all 8). This removes eligibility for review/rating rich results and local service signals — the single most impactful SEO regression in this migration.

**B. Hub `ItemList` schema dropped.**
The old hub had a second JSON‑LD block: a `CollectionPage` with `mainEntity` = `ItemList` of **14 services** (with names + URLs). The new hub keeps only the Yoast `@graph` block; the `ItemList` is gone.

**C. JSON‑LD `@graph` trimmed on sub-pages.**
The retained block is valid but slimmer than source. Dropped from sub-pages: `primaryImageOfPage`, `image`, `thumbnailUrl`, the `ImageObject` node, `WebPage.potentialAction` (`ReadAction`), `WebSite.description`, and `WebSite.potentialAction` (`SearchAction`). `datePublished`/`dateModified` were dropped on all sub-pages **except Offer in Compromise**, which still carries both (inconsistency to standardize).

### 4.3 Secondary metadata dropped (MEDIUM/LOW)

| Field | Old | New | Pages affected |
|---|---|---|---|
| `og:image:width` / `og:image:height` / `og:image:type` | present | removed | all 8 sub-pages (hub retains them) |
| `twitter:label1` ("Est. reading time") / `twitter:data1` | present | removed | sub-pages that had them |
| `article:publisher` / `article:modified_time` | present | removed | all sub-pages |

`og:image` dimensions help social platforms render large image cards reliably; worth restoring.

### 4.4 Heading hierarchy changes

- **Subtitle demotion (all 8 sub-pages):** the descriptive subtitle under the H1 was an `<h2>` in the old pages and is now a plain paragraph (`subhero__sub`). Examples now lost as headings: "Lift a Freeze on Your Bank Account Before Funds Are Seized", "Protect from the Consequences of Unpaid Payroll Taxes", "Set Up an IRS Payment Plan with Priority Tax Relief", "Settle Tax Debt for Less Than the Full Amount Owed", "Stop Involuntary Wage Deductions Caused by Unpaid Tax Debt", "Temporarily Halt Collections Through a CNC Status", "Protect Against IRS Penalties for Your Spouse's Tax Errors".
- **CTA heading reworded:** old `<h2>` "GET YOUR FREE CONSULTATION" → new `<h2>` "Book your free consultation now".
- **Hub service cards:** old `<h2>` per service → new `<h3>` (injected by `site.js`).
- **Additions (generally positive):** new section headings such as "How Priority Tax Relief Can Help" and Penalty Abatement's 8 FAQ `<h3>`s add useful semantic structure.

### 4.5 Internal linking & URL architecture

- New internal links are **relative `.html` files** (e.g., `Bank Levy Release.html`); breadcrumbs link "Home" and "Services" both to `Services Page.html`.
- **"Back Sales Tax" has no dedicated page** in the new build. The hub card and nav point to `Services Page.html#services` (intentional dead link — `site.js` sets its `url: null`). The old site had a real page (`/services/settle-unpaid-back-sales-tax/`). This is a content/architecture gap if that service should remain.
- **Footer simplified** (via `chrome.js`): dropped the extended services list, "Help", "Review", social links (Facebook/LinkedIn), and the "© All rights Reserved" line. Retained: About, Contact, FAQs, Terms & Conditions, Privacy Policy, DNC/TCPA.
- **Contact URL inconsistency:** some CTAs use `https://www.prioritytaxrelief.com/contact` (no trailing slash) while others use `https://prioritytaxrelief.com/contact/` (no `www`). Worth standardizing.
- Off-site policy links (FAQs, Terms, Privacy, DNC/TCPA, money-back-guarantee) still point to the production domain.

### 4.6 Image `alt` text

- ✅ New pages provide `alt` on all content images: logo ("Priority Tax Relief"), trust badges (BBB/Google/Trustpilot), press logos (Forbes, USA Today, Money, BestGuide, Fortune, Consumers Advocate), money-back badge, and injected service icons ("<service> icon").
- ✅ Decorative hotline icon correctly uses empty `alt`.
- No missing-alt issues found on the in-scope pages.

---

## 5. Prioritized issue list & recommendations

**High**
1. Restore the per-page `Service` JSON‑LD (with `aggregateRating`, `review`, `areaServed`) on all 8 sub-pages — biggest rich-results loss.
2. Restore the hub `ItemList`/`CollectionPage` services schema (14 items).
3. Decide the fate of **Back Sales Tax**: build the page or intentionally retire the service (and remove/adjust the dead `#services` link).

**Medium**
4. Re-add `og:image:width`/`:height`/`:type` to the 8 sub-pages.
5. Standardize JSON‑LD across sub-pages (either keep or drop `datePublished`/`dateModified` consistently — currently only Offer in Compromise has them).
6. Penalty Abatement: consider restoring `<ul>/<ol>` markup for the four lists that were converted to prose (featured-snippet friendliness).
7. Consider keeping each sub-page's descriptive subtitle as an `<h2>` (or `<p>` with the section heading retained) so the secondary keyword phrase remains a heading.

**Low**
8. Re-add `twitter:label1/data1` and `article:modified_time` if reading-time/freshness signals are desired.
9. Standardize the contact URL format (`www` + trailing slash).
10. Confirm the hub's dropped "Cancellation" fine print is intentional (it is retained on all sub-pages).
11. Confirm footer reductions (social links, Help/Review, services list, copyright) are intentional.

---

## 6. Appendix — title / canonical / H1 verification

| Page (new → old) | Title | Canonical | H1 |
|---|---|---|---|
| Services Page → Tax Relief Services | ✅ match | ✅ `/services/` | ✅ "US Tax Relief Services. Done Right." |
| Back Payroll Taxes → Payroll Tax Debt Relief | ✅ | ✅ `/services/settle-back-payroll-tax/` | ✅ "Back Payroll Tax Help" |
| Bank Levy Release → Bank Levy Release Services | ✅ | ✅ `/services/settle-bank-levy-for-irs-or-state-taxes/` | ✅ "Bank Levy Release Services" |
| Currently Not Collectible → CNC | ✅ | ✅ `/services/currently-not-collectible/` | ✅ "Currently Not Collectible (CNC)" |
| Innocent Spouse Relief → Innocent Spouse Relief | ✅ | ✅ `/services/innocent-spouse-relief-for-back-taxes/` | ✅ "Innocent Spouse Relief" |
| Installment Agreement → Installment Agreement | ✅ | ✅ `/services/installment-agreement-help-for-back-taxes/` | ✅ "Installment Agreement Help" |
| Offer in Compromise → IRS Offer in Compromise Services | ✅ | ✅ `/services/settle-back-taxes-with-irs-offer-in-compromise/` | ✅ "Offer In Compromise Services" |
| Penalty Abatement → Penalty Abatement | ✅ | ✅ `/services/settle-back-taxes-with-irs-penalty-abatement/` | ✅ "Penalty Abatement" |
| Stop Wage Garnishment → Stop Wage Garnishment | ✅ | ✅ `/services/stop-wage-garnishment-for-irs-or-state-taxes/` | ✅ "Stop Wage Garnishment" |

*Title tags intentionally retain the original WordPress titles (e.g., the hub is titled "Tax Relief Services - Priority Tax Relief" despite the `Services Page.html` filename), which is correct for SEO preservation.*
