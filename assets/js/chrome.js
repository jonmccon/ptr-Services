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
      '<a class="brand" href="Services Page.html" aria-label="Priority Tax Relief home">' +
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
        '<a class="hotline" href="tel:18667082872">' +
          '<span>Tax Help Hotline (866)&nbsp;708-2872</span>' +
          '<img class="hotline__icon" src="assets/img/icons8-call.gif" alt="">' +
        '</a>' +
        '<a class="btn" href="clients.html">Clients</a>' +
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
        '<a class="btn" href="clients.html">Clients</a>' +
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
          '<li>' + CHECK + ' No obligation, no upfront commitment</li>' +
          '<li>' + CHECK + ' CPAs, tax attorneys &amp; Enrolled Agents on your side</li>' +
          '<li>' + CHECK + ' 3-day money-back guarantee</li>' +
        '</ul>' +
      '</div>' +
      '<form class="lead-form reveal" data-d="1" id="leadForm" novalidate>' +
        '<div class="lead-form__fields">' +
          '<div class="row">' +
            '<div class="field"><label for="lf-first">First name</label><input id="lf-first" name="first" type="text" autocomplete="given-name" required><span class="err">Please enter your first name.</span></div>' +
            '<div class="field"><label for="lf-last">Last name</label><input id="lf-last" name="last" type="text" autocomplete="family-name" required><span class="err">Please enter your last name.</span></div>' +
          '</div>' +
          '<div class="row">' +
            '<div class="field"><label for="lf-phone">Phone</label><input id="lf-phone" name="phone" type="tel" autocomplete="tel" placeholder="(555) 555-5555" required><span class="err">Please enter a valid phone number.</span></div>' +
            '<div class="field"><label for="lf-email">Email</label><input id="lf-email" name="email" type="email" autocomplete="email" placeholder="you@example.com" required><span class="err">Please enter a valid email.</span></div>' +
          '</div>' +
          '<div class="field field--slider"><div class="field__labelrow"><label for="lf-debt">Estimated tax debt</label><output id="lf-debt-out" for="lf-debt" class="debt-slider__val">$25,000</output></div>' +
            '<div class="debt-slider__wrap"><div class="debt-slider__rule" aria-hidden="true"></div>' +
            '<input type="range" id="lf-debt" name="debt" class="debt-slider" min="0" max="100000" step="500" value="25000" aria-describedby="lf-debt-out"></div>' +
            '<div class="debt-slider__scale"><span>$0</span><span>$25k</span><span>$50k</span><span>$75k</span><span>$100k+</span></div>' +
          '</div>' +
          '<div class="field"><label for="lf-msg">How can we help? <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--color-base-400)">(optional)</span></label>' +
            '<textarea id="lf-msg" name="message" rows="3" placeholder="Briefly describe your tax situation"></textarea>' +
          '</div>' +
          '<p class="consent">' + CONSENT + '</p>' +
          '<button type="submit" class="btn btn--lg" style="width:100%">Pre-Qualify Now</button>' +
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
        '<a class="brand" href="Services Page.html" aria-label="Priority Tax Relief home">' +
          '<img class="footer-flag" src="assets/img/logo/ptr-flag-footer.png" alt="Priority Tax Relief">' +
        '</a>' +
        '<img class="footer-bbb" src="assets/img/badges/bbb-accredited.svg" alt="BBB A+ Accredited Business" onerror="this.style.display=\'none\'">' +
      '</div>' +
      '<div class="footer-col"><ul>' +
        '<li><a href="About.html">About</a></li>' +
        '<li><a href="Contact.html">Contact</a></li>' +
        '<li><a href="' + HOME + 'faqs/">FAQs</a></li>' +
        '<li><a href="' + HOME + 'priority-tax-terms-and-conditions/">Terms &amp; Conditions</a></li>' +
      '</ul></div>' +
      '<div class="footer-col"><ul>' +
        '<li><a href="' + HOME + 'privacy-policy/">Privacy Policy</a></li>' +
        '<li><a href="' + HOME + 'dnc-tcpa/">DNC / TCPA</a></li>' +
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
