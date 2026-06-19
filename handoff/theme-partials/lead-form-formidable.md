# Lead form -> Formidable Forms migration

How to rebuild the **Pre-Qualify** lead form (currently `theme-partials/lead-form.html`,
a front-end demo) as a real **Formidable Forms** form, preserving its behavior, look, and
the data it captures. This closes Open Q3 (where the form submits) and feeds Q4 (conversion
tracking).

> **There is no HTML to paste.** Formidable builds its own markup from a field config set in
> the form editor. This guide is the build spec: the field map, the rules, the CSS that skins
> Formidable to match the current design, and the tracking hook.

## Two ways to build it

**Option A - build by hand** from the field map below (most control, recommended if you want to
understand the form).

**Option B - import the starter XML** (`lead-form-formidable.xml` in this folder) for a head
start, then finish in the editor. Formidable > **Import/Export > Import > XML**. It creates the
form "Pre-Qualify for Forgiveness" with all 10 fields, the two page breaks (Next labels "Get
Started" / "Next"), required flags, dropdown/radio options, placeholders, the submit label, and
the inline success message.

Things the XML deliberately **does not** carry (set them in the editor after import - a few
clicks, and far more reliable than embedding):

- **Conditional logic** on `Please specify` (it references field IDs that get remapped on
  import). Add the rule manually: show `hear_other` when `hear` is `Other (Please specify)`,
  required when visible.
- **Phone input mask** `(999) 999-9999` (set on the Phone field).
- **Form actions** - the email notification / CRM routing, reCAPTCHA, and (if you prefer it over
  the inline message) the redirect to `/thank-you/`.
- **Styling** - enqueue `lead-form-formidable.css` and add the `ptr-lead` form class.

> The XML is a *starting point* - open the form after import and confirm every field against the
> map below before going live.

## Plugin requirements

The form is multi-step with conditional logic, so it needs **Formidable Forms Pro**. Specifically:

- **Page Break** field (multi-step) - Pro
- **Conditional Logic** (the "Please specify" reveal, conditional-required) - Pro
- **Phone** field with input mask - Pro
- Dropdown / Radio / Text / Email / HTML fields, required validation, confirmation message or
  redirect, email actions, reCAPTCHA - available in Lite

---

## Field map

Build the form with these fields **in this order**. "Field key" is what you set under each
field's Advanced tab - keep them stable; the CSS and tracking reference them.

| Step | Field (label) | Field key | Formidable type | Required | Options / settings |
|---|---|---|---|---|---|
| **1** | How much do they say you owe? | `owe` | Dropdown | **Yes** | First option blank, text "Select an amount". Then: `Under $4,999`, `$5,000 - $9,999`, `$10,000 - $19,999`, `$20,000 - $49,999`, `$50,000 +`. |
| - | *(page break)* | - | Page Break | - | Next-button label: **Get Started** |
| **2** | Do you have any Unfiled Tax Returns? | `unfiled` | Radio | **Yes** | Options: `No`, `Yes` (in that order). Skinned as a 2-button toggle via the CSS below - no separate hidden input needed (the build used one; Formidable stores the value directly). |
| **2** | How did you hear about us? | `hear` | Dropdown | Optional* | First option blank "Select one". Options: `Google / Bing`, `TV`, `Radio / Satellite Radio / Podcast`, `Billboard`, `Friend / Word of Mouth`, `AI Chat`, `Social Media`, `Review or Finance Website`, `Email`, `Other (Please specify)`. |
| **2** | Please specify | `hear_other` | Single Line Text | Conditional | Placeholder "Tell us how you heard about us". **Conditional logic:** show only when `hear` **is** `Other (Please specify)`. Set **required when visible** (conditional required). |
| - | *(page break)* | - | Page Break | - | Next-button label: **Next** |
| **3** | Contact Information | `first` | Single Line Text | **Yes** | Placeholder "My Name is". Autocomplete: given-name. |
| **3** | Phone Number | `phone` | Phone | **Yes** | Input mask `(999) 999-9999`. Placeholder "(555) 123-4567". |
| **3** | Email Address | `email` | Email | Optional | Placeholder "My Email is". Built-in email-format validation. |
| **3** | *(TCPA consent)* | `consent` | HTML | - | Paste the consent paragraph (below). Display-only. |

\* **`hear` was optional in the build** (the `<select>` had no `required`). If marketing wants
attribution on every lead, make it required - your call.

### Submit button
Label: **Prequalify Now**. Under the form's button settings add the CSS layout classes
`btn btn--lg` so it inherits the site button style.

### TCPA consent text (HTML field, verbatim)

> By clicking "Pre-Qualify Now," I am consenting to and providing my electronic signature as
> express written consent for Priority Tax Relief to contact me regarding tax payment options
> by email, text or calls at the phone number and email provided using any automated or
> automatic telephone dialing device or system, prerecorded/artificial voice and/or artificial
> technology (Data and msg rates may apply, msg frequency varies: Text HELP for help; STOP to
> cancel) even if my telephone number is listed on any state or federal Do-Not-Call registry.
> This consent will not be shared with third parties for their marketing purposes. I may revoke
> this consent anytime and consent is not required as a condition to speak with Priority Tax, I
> can email: info@prioritytaxrelief.com

> **Legal note:** the build treats clicking submit as consent (no checkbox). That matches the
> source. If legal wants an explicit opt-in, add a **required Checkbox** field instead of (or
> above) the HTML field. Confirm before launch.

---

## Behavior - how it should work

1. **Three steps via Page Breaks.** Formidable validates the required fields on the current
   page before advancing - this reproduces the build's per-step validation automatically. The
   "Get Started" / "Next" button labels are set on each Page Break.
2. **No progress bar.** The build has none. Set the Page Breaks to hide the rootline/progress
   indicator (or hide it with the CSS below) so it stays clean.
3. **Yes/No toggle.** A required Radio renders as two side-by-side buttons (CSS below). Selecting
   one is the step-2 gate.
4. **"Please specify" reveal.** Conditional logic shows `hear_other` only when `hear` =
   `Other (Please specify)`, and makes it required while visible. Matches the build's reveal.
5. **Phone formatting.** The Phone field's input mask formats as `(555) 123-4567` and validates.
6. **Confirmation.** Two valid options - pick one with marketing:
   - **Redirect** to `/thank-you/` on submit (recommended - gives a clean conversion page and a
     fixed URL to fire tags on). The build already has a Thank You page.
   - **Inline message:** "Thank you - your request has been received. A tax professional will
     reach out shortly." (matches the build's success state).
7. **Notifications / CRM (Q3).** Add a Formidable **email action** to the intake inbox. Route to
   the CRM via the CRM's Formidable add-on, a webhook/Zapier action, or the REST API - confirm
   the destination and field mapping with the team.
8. **Spam.** Enable reCAPTCHA v3 (or the honeypot) on the form.
9. **Conversion tracking (Q4).** See the JS hook below.

---

## Styling - skin Formidable to match the design

Formidable outputs its own markup (`.frm_forms`, `.frm_form_field`, `.frm_primary_label`,
`.frm_button_submit`, etc.). Enqueue **`lead-form-formidable.css`** (in this folder) alongside
`site.css` to map that markup onto the existing look - 2px fields, 4px radius, the green button,
the Yes/No toggle, and a hidden progress bar. Adjust the form-ID scope at the top of that file.

If you prefer, most of it can instead be done with per-field "CSS layout classes" in the editor
(e.g. add `btn btn--lg` to the submit button) - but the stylesheet is the lower-effort path.

---

## Conversion tracking hook (Q4)

Formidable fires a JS event when an AJAX submit completes. Wire your tags there (or, if you
chose the redirect confirmation, fire them on the `/thank-you/` page instead):

```js
// Enqueue after Formidable's scripts. Replace 17 with your form's ID.
jQuery(document).on('frmFormComplete', function (event, form) {
  if (!form || form.querySelector('input[name="form_id"]')?.value !== '17') return;
  // GA4 / Google Ads / Meta - example:
  if (window.gtag) gtag('event', 'generate_lead', { form: 'pre_qualify' });
  // fbq('track', 'Lead'); etc.
});
```

If you redirect to `/thank-you/`, drop the conversion tags on that page and you don't need this
hook - simpler and more reliable for Google Ads conversion import.

---

## Acceptance check

- [ ] Three steps; required fields block "Next"; labels read "Get Started" / "Next" / "Prequalify Now".
- [ ] `unfiled` renders as a 2-button toggle and is required.
- [ ] `hear_other` appears only for "Other (Please specify)" and is required when shown.
- [ ] Phone formats/validates; email validates; name required.
- [ ] Visual parity with the demo (fields, buttons, spacing) via the CSS skin; no progress bar.
- [ ] Submit routes to the intake inbox + CRM; spam protection on.
- [ ] Confirmation (redirect to `/thank-you/` **or** inline success message) works.
- [ ] Conversion event fires once per successful submit (verify in GA4 DebugView / Tag Assistant).
