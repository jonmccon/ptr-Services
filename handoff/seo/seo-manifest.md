# PTR Services - Per-Page SEO & Schema Manifest

Preserve these **exactly** when the pages go live. Configure your SEO plugin (Yoast / Rank Math) to output identical values, or disable its auto-generation for these pages so it doesn't overwrite them. The JSON-LD `@graph` for each page is in the source HTML `<head>` - copy it verbatim.

> Note: The landing page OG title is **"Services Archive"** and its schema is **CollectionPage** with a `rel=next` - leftovers from the original WP archive. Decide whether to keep archive semantics or migrate to `WebPage`/`Service`. See the Engineering Ticket, Open Question 5.

## Services (landing)

| Field | Value |
|---|---|
| Source file | `Services Page.html` |
| Canonical | `https://www.prioritytaxrelief.com/services/` |
| `<title>` | Tax Relief Services - Priority Tax Relief |
| Meta description | Priority Tax Relief offers tax relief services to help pay back tax debt to the IRS through consultations, negotiation, application assistance, and more. |
| Robots | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| OG type / title | website / Services Archive |
| JSON-LD @graph | CollectionPage, ImageObject, BreadcrumbList, WebSite, Organization |

## Offer in Compromise

| Field | Value |
|---|---|
| Source file | `Offer in Compromise.html` |
| Canonical | `https://www.prioritytaxrelief.com/services/settle-back-taxes-with-irs-offer-in-compromise/` |
| `<title>` | IRS Offer in Compromise Services - Priority Tax Relief |
| Meta description | Priority Tax Relief's Offer in Compromise program allows qualifying taxpayers to settle their IRS tax debt for less than the full amount owed based on income, expenses, and assets. |
| Robots | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| OG type / title | article / Offer in Compromise |
| JSON-LD @graph | WebPage, ImageObject, BreadcrumbList, WebSite, Organization |

## Penalty Abatement

| Field | Value |
|---|---|
| Source file | `Penalty Abatement.html` |
| Canonical | `https://www.prioritytaxrelief.com/services/settle-back-taxes-with-irs-penalty-abatement/` |
| `<title>` | Penalty Abatement - Priority Tax Relief |
| Meta description | Resolve your IRS back taxes with Penalty Abatement at Priority Tax Relief. Eliminate or reduce penalties, save money, and financial freedom. |
| Robots | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| OG type / title | article / Penalty Abatement |
| JSON-LD @graph | WebPage, BreadcrumbList, WebSite, Organization |

## Innocent Spouse Relief

| Field | Value |
|---|---|
| Source file | `Innocent Spouse Relief.html` |
| Canonical | `https://www.prioritytaxrelief.com/services/innocent-spouse-relief-for-back-taxes/` |
| `<title>` | Innocent Spouse Relief - Priority Tax Relief |
| Meta description | Get help applying for Innocent Spouse Relief to get relief from paying additional taxes, interest, or penalties when jointly filed taxes improperly report income. |
| Robots | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| OG type / title | article / Innocent Spouse Relief |
| JSON-LD @graph | WebPage, BreadcrumbList, WebSite, Organization |

## Currently Not Collectible

| Field | Value |
|---|---|
| Source file | `Currently Not Collectible.html` |
| Canonical | `https://www.prioritytaxrelief.com/services/currently-not-collectible/` |
| `<title>` | Currently Not Collectible (CNC) - Priority Tax Relief |
| Meta description | Our Currently Not Collectible (CNC) program temporarily relieves taxpayers from IRS collections by proving financial hardship, halting collection activities. |
| Robots | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| OG type / title | article / Currently Not Collectible (CNC) |
| JSON-LD @graph | WebPage, BreadcrumbList, WebSite, Organization |

## Installment Agreement

| Field | Value |
|---|---|
| Source file | `Installment Agreement.html` |
| Canonical | `https://www.prioritytaxrelief.com/services/installment-agreement-help-for-back-taxes/` |
| `<title>` | Installment Agreement - Priority Tax Relief |
| Meta description | Priority Tax Relief can help you negotiate an installment agreement with the IRS to help pay back taxes through a monthly payment plan that fits your budget. |
| Robots | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| OG type / title | article / Installment Agreement |
| JSON-LD @graph | WebPage, BreadcrumbList, WebSite, Organization |

## Stop Wage Garnishment

| Field | Value |
|---|---|
| Source file | `Stop Wage Garnishment.html` |
| Canonical | `https://www.prioritytaxrelief.com/services/stop-wage-garnishment-for-irs-or-state-taxes/` |
| `<title>` | Stop Wage Garnishment - Priority Tax Relief |
| Meta description | Priority Tax Relief communicates directly with the IRS and state agencies to stop wage garnishments and negotiate on your behalf to protect your income. |
| Robots | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| OG type / title | article / Stop Wage Garnishment |
| JSON-LD @graph | WebPage, BreadcrumbList, WebSite, Organization |

## Bank Levy Release

| Field | Value |
|---|---|
| Source file | `Bank Levy Release.html` |
| Canonical | `https://www.prioritytaxrelief.com/services/settle-bank-levy-for-irs-or-state-taxes/` |
| `<title>` | Bank Levy Release Services - Priority Tax Relief |
| Meta description | Priority Tax Relief helps taxpayers stop IRS and state bank levies from seizing their funds, with expert negotiation and hardship relief to protect your bank account. |
| Robots | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| OG type / title | article / Bank Levy Release |
| JSON-LD @graph | WebPage, BreadcrumbList, WebSite, Organization |

## Back Payroll Taxes

| Field | Value |
|---|---|
| Source file | `Back Payroll Taxes.html` |
| Canonical | `https://www.prioritytaxrelief.com/services/settle-back-payroll-tax/` |
| `<title>` | Payroll Tax Debt Relief - Priority Tax Relief |
| Meta description | Priority Tax Relief helps businesses get payroll tax debt relief, reduce penalties, and protect from unpaid payroll taxes. Call 888-708-2872. |
| Robots | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| OG type / title | article / Back Payroll Tax |
| JSON-LD @graph | WebPage, BreadcrumbList, WebSite, Organization |

## FAQs

| Field | Value |
|---|---|
| Source file | `Frequently Asked Questions.html` |
| Fragment | `faqs.html` |
| Canonical | `https://www.prioritytaxrelief.com/faqs/` |
| `<title>` | Frequently Asked Questions - Priority Tax Relief |
| Meta description | Answers to common questions about Priority Tax Relief - free consultations, money-back guarantee, qualifying for tax relief, our experience, and how to reach us. |
| Robots | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| OG type / title | website / Frequently Asked Questions |
| JSON-LD @graph | **FAQPage** (Question/Answer pairs) - copy verbatim from the source `<head>`; lets Google show FAQ rich results. |

## Terms & Conditions

| Field | Value |
|---|---|
| Source file | `Priority Tax Terms and Conditions.html` |
| Fragment | `priority-tax-terms-and-conditions.html` |
| Canonical | `https://www.prioritytaxrelief.com/priority-tax-terms-and-conditions/` |
| `<title>` | Priority Tax Terms and Conditions - Priority Tax Relief |
| Meta description | Priority Tax Relief Terms of Use Agreement, including service scope, eligibility, prohibited use, warranty disclaimers, limitation of liability, and the binding arbitration agreement and class action waiver. |
| Robots | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| OG type / title | article / Priority Tax Terms and Conditions |
| JSON-LD @graph | - |
| Note | The footer **Privacy Policy** link also points here - the build has no separate privacy page. |

## DNC / TCPA Policy

| Field | Value |
|---|---|
| Source file | `DNC TCPA Policy.html` |
| Fragment | `dnc-tcpa.html` |
| Canonical | `https://www.prioritytaxrelief.com/dnc-tcpa-policy/` |
| `<title>` | DNC/TCPA Policy - Priority Tax Relief |
| Meta description | Priority Tax Relief's Do Not Call and TCPA compliance policy - how we obtain consent, honor opt-outs, observe calling-time limits, and protect consumer communication preferences. |
| Robots | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| OG type / title | article / DNC/TCPA Policy |
| JSON-LD @graph | - |

## Client Services

| Field | Value |
|---|---|
| Source file | `clients.html` |
| Fragment | `client-services.html` |
| Canonical | `https://www.prioritytaxrelief.com/clients/` |
| `<title>` | Client Services - Priority Tax Relief |
| Meta description | Meet the full lineup of specialists working your tax-resolution case, what drives your timeline, and how to reach our client services team for a real-time update. |
| Robots | - (no robots meta in source; set per launch decision) |
| OG type / title | - / - |
| JSON-LD @graph | - |
| Note | Replaces the earlier login-style "Client portal" demo (now archived). This is a content/marketing page - a normal drop-in fragment. |

## About

| Field | Value |
|---|---|
| Source file | `About.html` |
| Canonical | `https://www.prioritytaxrelief.com/about/` |
| `<title>` | About Priority Tax Relief - Trusted Tax Resolution Services |
| Meta description | Introducing Priority Tax Relief: Your trusted partner for tax solutions. Meet our expert team and see how we've helped thousands. Visit us for details. |
| Robots | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| OG type / title | article / About |
| JSON-LD @graph | WebPage, ImageObject, BreadcrumbList, WebSite, Organization |

## Careers

| Field | Value |
|---|---|
| Source file | `Careers.html` |
| Canonical | `https://www.prioritytaxrelief.com/careers-new/` |
| `<title>` | careers new - Priority Tax Relief |
| Meta description | Be Part of Priority Tax Relief - a team of highly qualified Tax Attorneys, Tax Negotiators, Certified Public Accountants and Associates making tax relief accessible to the average American. |
| Robots | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| OG type / title | article / careers new |
| JSON-LD @graph | WebPage, ImageObject, BreadcrumbList, WebSite, Organization |

## Contact

| Field | Value |
|---|---|
| Source file | `Contact.html` |
| Canonical | `https://www.prioritytaxrelief.com/contact/` |
| `<title>` | Contact Priority Tax Relief |
| Meta description | Reach out to Priority Tax Relief for tax help. Call 888-708-2872, email info@prioritytaxrelief.com, or use our contact form for a prompt response. |
| Robots | - |
| OG type / title | - / - |
| JSON-LD @graph | - |

## Our Team

| Field | Value |
|---|---|
| Source file | `Our Team.html` |
| Canonical | `https://www.prioritytaxrelief.com/our-team/` |
| `<title>` | Our Team - Priority Tax Relief |
| Meta description | Meet your ace team at Priority Tax Relief - the seven specialists who surround and support you on every case, from first call to final resolution. |
| Robots | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| OG type / title | article / Our Team |
| JSON-LD @graph | - |

## Tax News

| Field | Value |
|---|---|
| Source file | `Tax News.html` |
| Canonical | `https://www.prioritytaxrelief.com/category/tax-news/` |
| `<title>` | Tax News Archives - Priority Tax Relief |
| Meta description | Learn how prioritizing tax relief can optimize your financial planning and enhance your overall financial well-being. Dive into our comprehensive guide today! |
| Robots | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| OG type / title | article / Tax News Archives |
| JSON-LD @graph | CollectionPage, BreadcrumbList, WebSite, Organization |

## Tax News article: Uncommon Deductions

| Field | Value |
|---|---|
| Source file | `Uncommon Tax Deductions You Might Be Missing.html` |
| Canonical | `https://www.prioritytaxrelief.com/uncommon-tax-deductions-you-might-be-missing/` |
| `<title>` | Uncommon Tax Deductions You Might Be Missing - Priority Tax Relief |
| Meta description | Discover overlooked tax deductions that can lower your IRS bill and how Priority Tax Relief can help you claim them. |
| Robots | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| OG type / title | article / Uncommon Tax Deductions You Might Be Missing |
| JSON-LD @graph | Article, WebPage, BreadcrumbList, Organization |

## Thank You

| Field | Value |
|---|---|
| Source file | `Thank You.html` |
| Canonical | `https://www.prioritytaxrelief.com/thank-you-13/` |
| `<title>` | Thank You - Priority Tax Relief |
| Meta description | Thank you from Priority Tax Relief. A tax professional will reach out shortly. Call us now for a free consultation to assist you with your tax needs. |
| Robots | noindex, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| OG type / title | article / Thank You 13 |
| JSON-LD @graph | WebPage, BreadcrumbList, WebSite, Organization |

