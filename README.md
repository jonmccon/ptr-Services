# What's in here

Basically I downloaded the rendered pages from the existing website, dragged them through claude, added a design component system, and tried to keep all the exisiting page architecture and content as consistent as I could. Then output a bunch of static html files that are this repo. Implementation plan is stil TBD on whether we're going to rebuild this all in WP or drop in the completed page into a WP container. BUT the goal is to carry through the existing work from Rise either way. There is a migration analysis document available to provide a starting point for what was changed. 

[Eng Handoff for Wordpress integration](/handoff/)

[Content / SEO Migration Audit](migration-audit-services.md)

[Original rendered WP pages](/PTR-Pages-Download/)

If there are any questions or just want to talk through this lemme know jmcconnell@taxresolutionteam.com

cheers, 
J


```
index.html                  ← site landing (the Services page)
Services Page.html          ← Services (same content; nav links point here)
About.html  Careers.html  Contact.html  Our Team.html  Tax News.html
Offer in Compromise.html  Penalty Abatement.html  Innocent Spouse Relief.html
Currently Not Collectible.html  Installment Agreement.html
Stop Wage Garnishment.html  Bank Levy Release.html  Back Payroll Taxes.html
Uncommon Tax Deductions You Might Be Missing.html   ← Tax News article
Frequently Asked Questions.html   Priority Tax Terms and Conditions.html
DNC TCPA Policy.html        ← footer policy pages (linked from every page)
clients.html                ← Client Services (case-process timeline)
Thank You.html
404.html                    ← branded not-found page
assets/                     ← css / js / img (logos, badges, photos, icons)
handoff/                    ← WordPress engineering handoff (published at /handoff/)
                              open handoff/index.html — content fragments, theme
                              partials, SEO manifest, Formidable form guide + XML
Engineering Ticket - Services.html / .md   ← the WordPress build tickets (handoff ref)
CONTENT-LOG.md              ← source-fidelity + known-issue log (handoff ref)
.nojekyll                   ← tells GitHub Pages to skip Jekyll processing
```

The whole package deploys as one folder: the live marketing demo at the root,
and the engineering handoff under `/handoff/`. Open `handoff/index.html` for the
integration guide; all of its links resolve within this build.


## Notes

- **Filenames contain spaces** (e.g. `Offer in Compromise.html`). This is
  intentional and works on GitHub Pages — every internal link already matches.
  Don't rename files unless you also update the links.
- **Online-only pieces:** the homepage/service-page hero videos (YouTube
  embeds), the team photos on *Our Team*, and the Leaflet map on *About* load
  from the internet, so they appear only when the visitor is online. Everything
  else is bundled locally.
- **Service-card icons** reference the live `prioritytaxrelief.com` media
  library (so they resolve once dropped back into WordPress); a branded
  fallback renders if an image fails to load.
- **External links** (the logo, "Contact us today") point to the live
  `prioritytaxrelief.com` site by design. The footer policy links (FAQs,
  Terms & Conditions, Privacy Policy, DNC/TCPA) now resolve to the **local**
  pages bundled in this folder.
- `clients.html` is the **Client Services** page — a case-process timeline.
  Lead forms throughout the site are **front-end demos** — they validate and
  show success states but don't submit to a backend.
- The preview-only design **"Tweaks"** panel has been stripped from this
  production build; the page renders with its default hero/layout/accent.
- **Engineering handoff** lives under `handoff/` and is published alongside the
  demo (e.g. `https://<username>.github.io/<repo>/handoff/`). It links to the
  Engineering Ticket and Content Log, which are therefore included here too — if
  this build is public and those should stay internal, remove `handoff/`, the
  two `Engineering Ticket - Services.*` files, and `CONTENT-LOG.md` before publishing.
- Not included (internal/working file): `Careers (curated openings).html`.
