# PTR Services Rebuild — Content & Issue Log

Source captured from `PTR Services/Tax Relief Services - Priority Tax Relief.html`
(live URL: https://www.prioritytaxrelief.com/services/). All written copy is
preserved **exactly as found**, including typos. Issues noted here for your review —
nothing was silently changed.

## Embedded / added since first pass

- **YouTube video** — `https://www.youtube.com/watch?v=3ePq3v7nxjQ` ("Why hire Priority Tax Relief?") is embedded in the hero as the media panel, matching its placement on the live page.
- **Hero CTA** — "Contact us today" links to `/contact` (as on the live page).

## Live-page elements intentionally NOT reproduced (confirm if wanted)

- **Top-bar "Call for Free Review" + 888-708-2872 button** — a secondary header element on the live page. The header here follows your screenshot (logo + nav + (866) hotline + Clients), so this was omitted.
- **"Millions Saved Monthly" blog image carousel** — a rotating set of blog-post thumbnails near the hero (CP14H Notice, California's Healthy Family Credit, Innocent Spouse Relief, etc.) linking to a blog article. This is blog/promo content, not core Services copy — omitted for now; let me know if you want it back.
- **Removed at your request:** the "Our Services" intro sentence and the "Ready to take back control?" CTA band.

## Issues found (preserved as-is)

1. **Hero paragraph** — The Figma mockup rendered the opening as "...situation.  f you're not satisfied..." (a dropped capital "I"). The **live page** actually reads correctly: "...situation. **If** you're **not satisfied** with our work within the **first three days** after signing an agreement, we'll **refund our services**." with bold + underline emphasis. The page now uses the **live (correct) copy** with that emphasis — the "f" was only a Figma artifact.

2. **Phone number inconsistency** — Header / hotline button reads **(866) 708-2872**,
   while the footer reads **888-708-2872**. Both kept exactly as in the source.
   → Please confirm the correct primary number.

3. **"Back Sales Tax" card mis-links** — In the source, the "Back Sales Tax" service
   card's *Learn More* button points to the **Offer in Compromise** URL
   (`/services/settle-back-taxes-with-irs-offer-in-compromise/`), which appears to be
   a copy/paste error. Per your instruction, the Back Sales Tax page is treated as
   **missing**, so this card is now a **dead link** (`href="#"`, `aria-disabled`).

4. **Two service card sets in source** — The desktop layout uses a 9-item tab/carousel;
   a separate mobile-only widget repeats placeholder cards ("Offer in Compromise /
   Get A Fresh Start with Tax Relief" x N) with no real links. The placeholder/mobile
   duplicate was dropped; the real 9-card content is the single source of truth.

5. **Service icon images are remote** — The 2023/06 service icons (offer-in-compromise,
   penalty-abatement, etc.) live on the live WP media library, not in the saved `_files`
   folder. They are referenced by their real `prioritytaxrelief.com/wp-content/...` URLs
   so they resolve once dropped back into WordPress, and so they are trivial to swap.
   A graceful branded fallback renders if an image fails to load (e.g. offline preview).

## Service inventory (order preserved from source)

| # | Service | Learn More URL |
|---|---------|----------------|
| 1 | Offer in Compromise | /services/settle-back-taxes-with-irs-offer-in-compromise/ |
| 2 | Penalty Abatement | /services/settle-back-taxes-with-irs-penalty-abatement/ |
| 3 | Innocent Spouse Relief | /services/innocent-spouse-relief-for-back-taxes/ |
| 4 | Currently Not Collectible (CNC) | /services/currently-not-collectible/ |
| 5 | Installment Agreement | /services/installment-agreement-help-for-back-taxes/ |
| 6 | Stop Wage Garnishment | /services/stop-wage-garnishment-for-irs-or-state-taxes/ |
| 7 | Bank Levy Release | /services/settle-bank-levy-for-irs-or-state-taxes/ |
| 8 | Back Payroll Taxes | /services/settle-back-payroll-tax/ |
| 9 | Back Sales Tax | **DEAD LINK** (page missing) |

## SEO preserved
- `<title>`, meta description, canonical, `rel=next`, robots
- Open Graph (locale, type, title "Services Archive", description, url, site_name, image)
- Twitter card (summary_large_image, @TaxForgiveness)
- Full Yoast JSON-LD graph: CollectionPage, ImageObject, BreadcrumbList, WebSite, Organization
- Heading hierarchy: one H1 (hero), H2 section titles, H3 accordion/service titles
