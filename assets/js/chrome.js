/* ===========================================================
   PTR shared chrome — injects header, footer, and the lead form
   into subpages so markup stays consistent and DRY.
   Load BEFORE site.js. Runs synchronously (scripts sit at end of body).
   Mount points: #chrome-header, #chrome-leadform, #chrome-footer
   =========================================================== */
(function () {
  "use strict";

  var HOME = "https://www.prioritytaxrelief.com/";

  var HEADER = '' +
  '<header class="site-header" id="siteHeader">' +
    '<div class="container header-inner">' +
      '<a class="brand" href="Homepage.html" aria-label="Priority Tax Relief home">' +
        '<img class="brand__logo" src="assets/img/logo/ptr-logo.png" alt="Priority Tax Relief">' +
      '</a>' +
      '<nav class="main-nav" aria-label="Primary">' +
        '<div class="nav-item has-dropdown">' +
          '<a href="Services Page.html" aria-haspopup="true" aria-expanded="false">Services</a>' +
          '<div class="nav-dropdown">' +
            '<div class="nav-dropdown__panel" role="menu" aria-label="Services">' +
              '<a href="Offer in Compromise.html" role="menuitem">Offer in Compromise</a>' +
              '<a href="Penalty Abatement.html" role="menuitem">Penalty Abatement</a>' +
              '<a href="Innocent Spouse Relief.html" role="menuitem">Innocent Spouse Relief</a>' +
              '<a href="Currently Not Collectible.html" role="menuitem">Currently Not Collectible</a>' +
              '<a href="Installment Agreement.html" role="menuitem">Installment Agreement</a>' +
              '<a href="Stop Wage Garnishment.html" role="menuitem">Stop Wage Garnishment</a>' +
              '<a href="Bank Levy Release.html" role="menuitem">Bank Levy Release</a>' +
              '<a href="Back Payroll Taxes.html" role="menuitem">Back Payroll Taxes</a>' +
              '<a href="Services Page.html#services" role="menuitem">Back Sales Tax</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="nav-item has-dropdown">' +
          '<a href="Tax News.html" aria-haspopup="true" aria-expanded="false">Tax News</a>' +
          '<div class="nav-dropdown">' +
            '<div class="nav-dropdown__panel" role="menu" aria-label="Tax News categories">' +
              '<a href="Tax News.html?cat=irs-audit-negotiation" role="menuitem">IRS Audit &amp; Negotiation</a>' +
              '<a href="Tax News.html?cat=irs-forms" role="menuitem">IRS Forms</a>' +
              '<a href="Tax News.html?cat=irs-letters-notices" role="menuitem">IRS Letters &amp; Notices</a>' +
              '<a href="Tax News.html?cat=tax-compliance-and-strategy" role="menuitem">Tax Compliance &amp; Strategy</a>' +
              '<a href="Tax News.html?cat=tax-fraud-legal-issues" role="menuitem">Tax Fraud &amp; Legal Issues</a>' +
              '<a href="Tax News.html?cat=tax-planning" role="menuitem">Tax Planning</a>' +
              '<a href="Tax News.html?cat=tax-relief" role="menuitem">Tax Relief</a>' +
              '<a href="Tax News.html?cat=professional-advice" role="menuitem">Professional Advice</a>' +
              '<a href="Tax News.html?cat=state-taxes" role="menuitem">State Taxes</a>' +
              '<a href="Tax News.html" role="menuitem">View All</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<a href="About.html">About</a>' +
        '<a href="Careers.html">Careers</a>' +
      '</nav>' +
      '<div class="header-actions">' +
        '<div class="header-cta">' +
        '<a class="hotline" href="tel:18667082872">' +
          '<span>Tax Help Hotline<span class="hotline__num"> (866)&nbsp;708-2872</span></span>' +
          '<img class="hotline__icon" src="assets/img/icons8-call.gif" alt="">' +
        '</a>' +
        '<a class="btn" href="clients.html" style="color:#000">Clients</a>' +
        '</div>' +
        '<button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>' +
        '</button>' +
      '</div>' +
    '</div>' +
    '<nav class="mobile-nav" id="mobileNav" aria-label="Mobile">' +
      '<a href="Services Page.html">Services</a>' +
      '<a href="Tax News.html">Tax News</a>' +
      '<a href="About.html">About</a>' +
      '<a href="Careers.html">Careers</a>' +
      '<div class="mobile-nav__actions">' +
        '<a class="hotline" href="tel:18667082872">Tax Help Hotline (866)&nbsp;708-2872</a>' +
        '<a class="btn" href="clients.html" style="color:#000">Clients</a>' +
      '</div>' +
    '</nav>' +
  '</header>';

  var CONSENT = 'By clicking \u201CPre-Qualify Now," I am consenting to and providing my electronic signature as express written consent for Priority Tax Relief to contact me regarding tax payment options by email, text or calls at the phone number and email provided using any automated or automatic telephone dialing device or system, prerecorded/artificial voice and/or artificial technology (Data and msg rates may apply, msg frequency varies: Text HELP for help; STOP to cancel) even if my telephone number is listed on any state or federal Do-Not-Call registry. This consent will not be shared with third parties for their marketing purposes. I may revoke this consent anytime and consent is not required as a condition to speak with Priority Tax, I can email: info@prioritytaxrelief.com';

  var CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  var LEADFORM = '' +
  '<section class="section lead" id="contact">' +
    '<div class="container lead__grid">' +
      '<div class="lead__copy reveal">' +
        '<p class="eyebrow eyebrow--green">Free, confidential consultation</p>' +
        '<h2>See if you pre-qualify for tax relief</h2>' +
        '<p>Tell us a little about your situation and a licensed tax professional will reach out \u2014 usually the same day.</p>' +
        '<ul class="lead__list">' +
          '<li>' + CHECK + ' No cost call with IRS and our tax expert on your first call</li>' +
          '<li>' + CHECK + ' CPAs, tax attorneys &amp; Enrolled Agents on your side</li>' +
          '<li>' + CHECK + ' Money-back guarantee</li>' +
        '</ul>' +
      '</div>' +
      '<form class="lead-form lead-form--steps reveal" data-d="1" id="leadForm" novalidate style="width: 500px">' +
        '<div class="lead-form__fields">' +
          '<h3 class="lead-form__title">Pre-Qualify for Forgiveness Today</h3>' +
          '<div class="form-step is-active" data-step="1">' +
            '<div class="field"><label for="lf-owe">How much do they say you owe?</label>' +
              '<select id="lf-owe" name="owe" required>' +
                '<option value="" disabled selected hidden>Select an amount</option>' +
                '<option>Under $4,999</option>' +
                '<option>$5,000 - $9,999</option>' +
                '<option>$10,000 - $19,999</option>' +
                '<option>$20,000 - $49,999</option>' +
                '<option>$50,000 +</option>' +
              '</select><span class="err">Please select an amount.</span></div>' +
            '<button type="button" class="btn btn--lg" data-step-next style="width:100%">Get Started</button>' +
          '</div>' +
          '<div class="form-step" data-step="2">' +
            '<div class="field"><label>Do you have any Unfiled Tax Returns?</label>' +
              '<div class="toggle-group" role="radiogroup" aria-label="Do you have any Unfiled Tax Returns?">' +
                '<button type="button" class="toggle-btn" data-toggle="unfiled" data-value="No" role="radio" aria-checked="false">No</button>' +
                '<button type="button" class="toggle-btn" data-toggle="unfiled" data-value="Yes" role="radio" aria-checked="false">Yes</button>' +
              '</div>' +
              '<input type="hidden" id="lf-unfiled" name="unfiled" required><span class="err">Please choose one.</span></div>' +
            '<div class="field"><label for="lf-hear">How did you hear about us?</label>' +
              '<select id="lf-hear" name="hear">' +
                '<option value="" disabled selected hidden>Select one</option>' +
                '<option>Google / Bing</option>' +
                '<option>TV</option>' +
                '<option>Radio / Satellite Radio / Podcast</option>' +
                '<option>Billboard</option>' +
                '<option>Friend / Word of Mouth</option>' +
                '<option>AI Chat</option>' +
                '<option>Social Media</option>' +
                '<option>Review or Finance Website</option>' +
                '<option>Email</option>' +
                '<option>Other (Please specify)</option>' +
              '</select><span class="err">Please select an option.</span></div>' +
            '<div class="field" id="lf-hear-other-field" hidden><label for="lf-hear-other">Please specify</label>' +
              '<input id="lf-hear-other" name="hearOther" type="text" placeholder="Tell us how you heard about us"><span class="err">Please tell us how.</span></div>' +
            '<button type="button" class="btn btn--lg" data-step-next style="width:100%">Next</button>' +
          '</div>' +
          '<div class="form-step" data-step="3">' +
            '<div class="field"><label for="lf-first">Contact Information <span class="req">*</span></label><input id="lf-first" name="first" type="text" autocomplete="given-name" placeholder="My Name is" required><span class="err">Please enter your name.</span></div>' +
            '<div class="field"><label for="lf-phone">Phone Number <span class="req">*</span></label><input id="lf-phone" name="phone" type="tel" autocomplete="tel" placeholder="(555) 123-4567" required><span class="err">Please enter a valid phone number.</span></div>' +
            '<div class="field"><label for="lf-email">Email Address</label><input id="lf-email" name="email" type="email" autocomplete="email" placeholder="My Email is"><span class="err">Please enter a valid email.</span></div>' +
            '<p class="consent">' + CONSENT + '</p>' +
            '<button type="submit" class="btn btn--lg" style="width:100%">Prequalify Now</button>' +
          '</div>' +
        '</div>' +
        '<div class="form-success">Thank you \u2014 your request has been received. A tax professional will reach out shortly.</div>' +
      '</form>' +
    '</div>' +
  '</section>';

  var FOOTER = '' +
  '<footer class="site-footer">' +
    '<div class="container footer-call-row">' +
      '<p class="footer-call">Not a current client and need help with your back taxes?<br>Call <a href="tel:18887082872">888-708-2872</a></p>' +
    '</div>' +
    '<div class="container footer-top">' +
      '<div class="footer-brand">' +
        '<a class="brand" href="Homepage.html" aria-label="Priority Tax Relief home">' +
          '<img class="footer-flag" src="assets/img/logo/ptr-flag-footer.png" alt="Priority Tax Relief">' +
        '</a>' +
        '<img class="footer-bbb" src="assets/img/badges/bbb-accredited.svg" alt="BBB A+ Accredited Business" onerror="this.style.display=\'none\'">' +
      '</div>' +
      '<div class="footer-col"><ul>' +
        '<li><a href="About.html">About</a></li>' +
        '<li><a href="Contact.html">Contact</a></li>' +
        '<li><a href="Frequently Asked Questions.html">FAQs</a></li>' +
        '<li><a href="Priority Tax Terms and Conditions.html">Terms &amp; Conditions</a></li>' +
      '</ul></div>' +
      '<div class="footer-col"><ul>' +
        '<li><a href="Priority Tax Terms and Conditions.html">Privacy Policy</a></li>' +
        '<li><a href="DNC TCPA Policy.html">DNC / TCPA</a></li>' +
      '</ul></div>' +
    '</div>' +
    '<div class="container footer-legal"><p>' + CONSENT + '</p></div>' +
  '</footer>';

  function mount(id, html) { var el = document.getElementById(id); if (el) el.outerHTML = html; }
  mount("chrome-header", HEADER);
  mount("chrome-leadform", LEADFORM);
  mount("chrome-footer", FOOTER);

  /* ----- Active nav state -----
     Pages set <body data-page="services|tax-news|about|careers"> so the
     matching top-level nav link gets aria-current="page". */
  var page = document.body.getAttribute("data-page");
  if (page) {
    var map = {
      "services": "Services Page.html",
      "tax-news": "Tax News.html",
      "about": "About.html",
      "careers": "Careers.html"
    };
    var target = map[page];
    if (target) {
      document.querySelectorAll('.main-nav > a, .nav-item.has-dropdown > a').forEach(function (a) {
        if (a.getAttribute("href") === target) a.setAttribute("aria-current", "page");
      });
    }
  }
})();
