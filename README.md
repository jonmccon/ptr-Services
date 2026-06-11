# What is this

Basically I downloaded the rendered pages from the existing website, dragged them through claude, added a design component system, and tried to keep all the exisiting page architecture and content as consistent as I could. Then output a bunch of static html files that are this repo. Implementation plan is stil TBD on whether we're going to rebuild this all in WP or drop in the completed page into a WP container. BUT the goal is to carry through the existing work from Rise either way. There is a migration analysis document available to provide a starting point for what was changed. 

[Original rendered WP pages](/PTR-Pages-Download/)

[Migration doc](migration-audit-services.md)

If there are any questions or just want to talk through this lemme know jmcconnell@taxresolutionteam.com

cheers, 
J

---




#### Priority Tax Relief — Static Site

A self-contained static build of the Priority Tax Relief marketing site


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

#### Notes

- **Filenames contain spaces** (e.g. `Offer in Compromise.html`). This is
  intentional and works on GitHub Pages — every internal link already matches.
  Don't rename files unless you also update the links.
- **Online-only pieces:** the homepage/service-page hero videos (YouTube
  embeds), the team photos on *Our Team*, and the Leaflet map on *About* load
  from the internet, so they appear only when the visitor is online. Everything
  else is bundled locally.
- **External links** (the logo, "Contact us today", footer policy links) point
  to the live `prioritytaxrelief.com` site by design.
- The client portal (`clients.html`) and lead forms are **front-end demos** —
  they validate and show success states but don't submit to a backend.
- A preview-only design "Tweaks" panel that existed during design has been
  removed from this production build.
