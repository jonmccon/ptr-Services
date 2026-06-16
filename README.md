# Priority Tax Relief — Static Site (dist)

A self-contained static build of the Priority Tax Relief marketing site,
ready to publish on **GitHub Pages**. No build step, no server, no
dependencies to install — just static HTML, CSS, JS and images.

**Drop-in update:** replace the contents of your published folder/branch with
the contents of this `dist/` folder. Everything is self-contained and uses
relative paths, so it works whether deployed at a domain root or under a
`/<repo>/` project-page path.

## What's in here

```
index.html                  ← site landing (the Services page)
Services Page.html          ← Services (same content; nav links point here)
About.html  Careers.html  Contact.html  Our Team.html  Tax News.html
Offer in Compromise.html  Penalty Abatement.html  Innocent Spouse Relief.html
Currently Not Collectible.html  Installment Agreement.html
Stop Wage Garnishment.html  Bank Levy Release.html  Back Payroll Taxes.html
Uncommon Tax Deductions You Might Be Missing.html   ← Tax News article
clients.html                ← client portal (status lookup)
Thank You.html
404.html                    ← branded not-found page
assets/                     ← css / js / img (logos, badges, photos, icons)
.nojekyll                   ← tells GitHub Pages to skip Jekyll processing
```

## Deploy to GitHub Pages

1. Push the **contents of this folder** to the repo root (so `index.html`
   sits at the top level of the repo).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Pick your branch (e.g. `main`) and folder **`/ (root)`**, then **Save**.
5. Wait ~1 minute. Your site goes live at
   `https://<username>.github.io/<repo>/`.

> The included `.nojekyll` file is important — it stops GitHub from running
> Jekyll, which can otherwise interfere with file serving.

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
- **External links** (the logo, "Contact us today", footer policy links) point
  to the live `prioritytaxrelief.com` site by design.
- The client portal (`clients.html`) and lead forms are **front-end demos** —
  they validate and show success states but don't submit to a backend.
- The preview-only design **"Tweaks"** panel has been stripped from this
  production build; the page renders with its default hero/layout/accent.
- Not included (internal/working files): `Engineering Ticket - Services.html`
  and `Careers (curated openings).html`.
