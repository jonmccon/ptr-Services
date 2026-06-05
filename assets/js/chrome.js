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
      '<a class="brand" href="index.html" aria-label="Priority Tax Relief home">' +
        '<img class="brand__logo" src="assets/img/logo/ptr-logo.png" alt="Priority Tax Relief">' +
      '</a>' +
      '<nav class="main-nav" aria-label="Primary">' +
        '<a href="index.html" aria-current="page">Services</a>' +
        '<a href="#">Tax News</a>' +
        '<a href="#">About</a>' +
        '<a href="#">Careers</a>' +
      '</nav>' +
      '<div class="header-actions">' +
        '<a class="hotline" href="tel:18667082872">' +
          '<span>Tax Help Hotline (866)&nbsp;708-2872</span>' +
          '<img class="hotline__icon" src="assets/img/icons8-call.gif" alt="">' +
        '</a>' +
        '<a class="btn" href="' + HOME + 'client-portal/">Clients</a>' +
        '<button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>' +
        '</button>' +
      '</div>' +
    '</div>' +
    '<nav class="mobile-nav" id="mobileNav" aria-label="Mobile">' +
      '<a href="index.html">Services</a>' +
      '<a href="#">Tax News</a>' +
      '<a href="#">About</a>' +
      '<a href="#">Careers</a>' +
      '<a class="hotline" style="display:inline-flex;margin-top:16px" href="tel:18667082872">Tax Help Hotline (866) 708-2872</a>' +
      '<a class="btn" href="' + HOME + 'client-portal/">Clients</a>' +
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
          '<div class="field"><label for="lf-debt">Estimated tax debt</label>' +
            '<select id="lf-debt" name="debt" required>' +
              '<option value="" selected disabled>Select an amount</option>' +
              '<option>Less than $10,000</option><option>$10,000 \u2013 $25,000</option><option>$25,000 \u2013 $50,000</option><option>$50,000 \u2013 $100,000</option><option>More than $100,000</option>' +
            '</select><span class="err">Please choose an estimate.</span>' +
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
        '<a class="brand" href="index.html" aria-label="Priority Tax Relief home">' +
          '<img class="footer-flag" src="assets/img/logo/ptr-flag-footer.png" alt="Priority Tax Relief">' +
        '</a>' +
        '<img class="footer-bbb" src="assets/img/badges/bbb-accredited.svg" alt="BBB A+ Accredited Business" onerror="this.style.display=\'none\'">' +
      '</div>' +
      '<div class="footer-col"><ul>' +
        '<li><a href="' + HOME + 'about/">About</a></li>' +
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
})();
