/* ===========================================================
   PTR Services — interactions
   =========================================================== */
(function () {
  "use strict";

  /* ----- Service data (order + copy + links preserved from source) ----- */
  var ICON = "https://www.prioritytaxrelief.com/wp-content/uploads/2023/06/";
  var SERVICES = [
    { title: "Offer in Compromise", icon: "assets/img/services/offer-in-compromise.png",
      desc: "Are you drowning in tax debt and feeling overwhelmed by the burden? Take the first step towards financial freedom with our Offer in Compromise service. This program is designed to help you settle your tax liabilities for less than the full amount you owe, providing a fresh start and peace of mind. Don\u2019t let tax debt control your life any longer",
      url: "Offer in Compromise.html" },
    { title: "Penalty Abatement", icon: "assets/img/services/penalty-abatement.png",
      desc: "Are you overwhelmed by mounting tax penalties and struggling to find a way out? Our Penalty Abatement service is here to provide the relief you need. We specialize in helping individuals and businesses reduce or eliminate tax penalties, saving you money and reducing stress.",
      url: "Penalty Abatement.html" },
    { title: "Innocent Spouse Relief", icon: "assets/img/services/innocent-spouse-relief.png",
      desc: "Are you facing tax issues due to your spouse's actions or inaccuracies? Our Innocent Spouse Relief service is here to help you find the financial peace you deserve. We specialize in relieving innocent spouses from the burden of tax liabilities they were unaware of or did not contribute to, ensuring you aren't unfairly penalized for mistakes that aren't yours.",
      url: "Innocent Spouse Relief.html" },
    { title: "Currently Not Collectible (CNC)", icon: "assets/img/services/currently-not-collectible.png",
      desc: "Feeling overwhelmed by tax debt and unable to make payments? Our Currently Not Collectible (CNC) service is designed to help you find immediate relief from IRS collections. By proving your financial hardship, our experienced team can help you temporarily halt all IRS collection activities, giving you the breathing room you need to get back on your feet.",
      url: "Currently Not Collectible.html" },
    { title: "Installment Agreement", icon: "assets/img/services/installment-agreement.png",
      desc: "Are you struggling to manage your tax debt all at once? Our Installment Agreement service offers a practical solution by allowing you to break down your tax payments into manageable monthly installments. Our team of tax experts will work with the IRS on your behalf to secure a payment plan that fits your financial situation, ensuring you stay on track without overwhelming your budget.",
      url: "Installment Agreement.html" },
    { title: "Stop Wage Garnishment", icon: "assets/img/services/stop-wage-garnishment.png",
      desc: "Are you facing wage garnishment and struggling to make ends meet? Our Stop Wage Garnishment service is here to provide you with immediate relief. Our experienced team will work tirelessly on your behalf to negotiate with the IRS and put an end to the garnishment of your wages, allowing you to regain control of your finances.",
      url: "Stop Wage Garnishment.html" },
    { title: "Bank Levy Release", icon: "assets/img/services/bank-levy-release.png",
      desc: "Is your bank account frozen due to an IRS levy, leaving you struggling to access your funds? Our Bank Levy Release service is here to provide you with immediate relief. Our team of skilled tax professionals will negotiate directly with the IRS to release the levy on your bank account, helping you regain control of your finances quickly and efficiently.",
      url: "Bank Levy Release.html" },
    { title: "Back Payroll Taxes", icon: "assets/img/services/back-payroll-taxes.png",
      desc: "Are you overwhelmed by the complexity of managing payroll taxes for your business? Our Back Payroll Taxes service is designed to simplify the process and ensure compliance, saving you time and reducing stress. Our team of experts will handle all aspects of your payroll taxes, from accurate calculations to timely submissions, allowing you to focus on what you do best\u2014running your business.",
      url: "Back Payroll Taxes.html" },
    { title: "Back Sales Tax", icon: "assets/img/services/back-sales-tax.png",
      desc: "Are overdue sales taxes putting your business at risk and causing unnecessary stress? Our Back Sales Taxes service is here to help you get back on track. Our team of tax experts will work diligently to resolve your outstanding sales tax issues, negotiate with tax authorities on your behalf, and implement a strategy to prevent future liabilities. Don\u2019t let back sales taxes jeopardize your business\u2014contact us today to learn how we can help you settle your debt and secure a stable financial future. Take the first step towards peace of mind and financial stability with our expert assistance!",
      url: null /* page missing — dead link */ }
  ];

  function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

  /* ----- Render service cards ----- */
  var track = document.getElementById("servicesTrack");
  var arrowSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
  var flagSvg = '<svg viewBox="0 0 98 140" fill="currentColor"><path d="M89.5 89.4 0 0c1 2.9 3.5 10.5 6.8 20.1.4 1.3 1.1 2.4 2 3.3l64.1 64.1-4.1 2.9L11.1 32.7c2 6 4.1 12.2 6.2 18.3.8 2.5 2.2 4.7 4 6.5l38.9 38.9-4.1 2.9-33.9-33.9c2.2 6.5 4.1 12.2 5.5 16.2 1.3 3.8 3.4 7.2 6.2 10l1.1 1.1c7.7 7.7 10.5 19 7.3 29.4l-5.5 17.6 34.6-31.3c4.7-4.1 11.8-3.9 16.2.5l7.2 7.2c5-7.6 4-17.6-2.4-24l-2.9-2.9z"/></svg>';

  if (track) {
    track.innerHTML = SERVICES.map(function (s) {
      var dead = !s.url;
      var link = dead
        ? '<span class="s-card__link" aria-disabled="true">Learn More</span>'
        : '<a class="s-card__link" href="' + s.url + '">Learn More ' + arrowSvg + '</a>';
      return '' +
        '<article class="s-card">' +
          '<div class="s-card__media">' +
            '<img src="' + s.icon + '" alt="' + esc(s.title) + ' icon" loading="lazy" ' +
              'onerror="this.closest(\'.s-card__media\').classList.add(\'img-error\')">' +
            '<div class="fallback">' + flagSvg + '<span>' + esc(s.title) + '</span></div>' +
          '</div>' +
          '<div class="s-card__body">' +
            '<h3>' + esc(s.title) + '</h3>' +
            '<p>' + esc(s.desc) + '</p>' +
            link +
          '</div>' +
        '</article>';
    }).join("");
  }

  /* ----- Carousel ----- */
  var cPrev = document.getElementById("servicesPrev");
  var cNext = document.getElementById("servicesNext");
  var dotsWrap = document.getElementById("servicesDots");
  var cards = track ? Array.prototype.slice.call(track.children) : [];

  function cardStep() {
    if (cards.length < 2) return cards.length ? cards[0].offsetWidth + 24 : 300;
    return cards[1].offsetLeft - cards[0].offsetLeft;
  }
  function activeIndex() {
    var mode = document.body.getAttribute("data-carousel");
    var ref = track.scrollLeft + (mode === "coverflow" ? track.clientWidth / 2 : 8);
    var best = 0, bestD = Infinity;
    cards.forEach(function (c, i) {
      var center = mode === "coverflow" ? c.offsetLeft + c.offsetWidth / 2 : c.offsetLeft;
      var d = Math.abs(center - ref);
      if (d < bestD) { bestD = d; best = i; }
    });
    return best;
  }
  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = cards.map(function (_, i) {
      return '<button class="carousel__dot" aria-label="Go to slide ' + (i + 1) + '"></button>';
    }).join("");
  }
  function syncUI() {
    if (!track) return;
    var idx = activeIndex();
    if (dotsWrap) Array.prototype.forEach.call(dotsWrap.children, function (d, i) {
      d.classList.toggle("is-active", i === idx);
    });
    if (document.body.getAttribute("data-carousel") === "coverflow") {
      cards.forEach(function (c, i) { c.classList.toggle("is-focus", i === idx); });
    }
    if (cPrev && cNext) {
      var max = track.scrollWidth - track.clientWidth - 2;
      cPrev.disabled = track.scrollLeft <= 2;
      cNext.disabled = track.scrollLeft >= max;
    }
  }
  function scrollToCard(i) {
    if (!cards[i]) return;
    var mode = document.body.getAttribute("data-carousel");
    var left = mode === "coverflow"
      ? cards[i].offsetLeft - (track.clientWidth - cards[i].offsetWidth) / 2
      : cards[i].offsetLeft - track.offsetLeft;
    track.scrollTo({ left: left, behavior: "smooth" });
  }
  if (track) {
    buildDots();
    var raf;
    track.addEventListener("scroll", function () {
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(syncUI);
    });
    if (cPrev) cPrev.addEventListener("click", function () { scrollToCard(Math.max(0, activeIndex() - 1)); });
    if (cNext) cNext.addEventListener("click", function () { scrollToCard(Math.min(cards.length - 1, activeIndex() + 1)); });
    if (dotsWrap) dotsWrap.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      scrollToCard(Array.prototype.indexOf.call(dotsWrap.children, b));
    });
    window.addEventListener("resize", syncUI);
    setTimeout(syncUI, 60);
  }

  /* ----- Accordions: single-open per group ----- */
  document.querySelectorAll(".accordion[data-single]").forEach(function (group) {
    var items = group.querySelectorAll("details.acc-item");
    items.forEach(function (d) {
      d.addEventListener("toggle", function () {
        if (d.open) items.forEach(function (o) { if (o !== d) o.open = false; });
      });
    });
  });

  /* ----- Entrance fade (one-time, additive — never hides content) ----- */
  document.documentElement.classList.add("js");
  // Trigger the fade as elements scroll into view; if the observer is
  // unavailable/throttled, content is already visible (no hidden base).
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.04, rootMargin: "0px 0px -3% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ----- Sticky header shadow ----- */
  var header = document.getElementById("siteHeader");
  function onScroll() { if (header) header.classList.toggle("is-stuck", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ----- Mobile nav ----- */
  var navToggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");
  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mobileNav.addEventListener("click", function (e) {
      if (e.target.closest("a")) { mobileNav.classList.remove("open"); navToggle.setAttribute("aria-expanded", "false"); }
    });
  }

  /* ----- Lead form: 3-step pre-qualify ----- */
  var form = document.getElementById("leadForm");
  if (form) {
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var phoneRe = /[0-9]{7,}/;
    var steps = Array.prototype.slice.call(form.querySelectorAll(".form-step"));

    function showStep(n) {
      steps.forEach(function (s) {
        s.classList.toggle("is-active", +s.getAttribute("data-step") === n);
      });
    }

    function fieldBad(f) {
      var v = (f.value || "").trim();
      var bad = !v;
      if (!bad && f.type === "email") bad = !emailRe.test(v);
      if (!bad && f.type === "tel") bad = !phoneRe.test(v.replace(/\D/g, ""));
      return bad;
    }

    function validateStep(stepEl) {
      var ok = true;
      stepEl.querySelectorAll("input[required], select[required]").forEach(function (f) {
        var bad = fieldBad(f);
        f.classList.toggle("invalid", bad);
        if (f.type === "hidden") {
          var grp = stepEl.querySelector('.toggle-group');
          if (grp) grp.classList.toggle("invalid", bad);
        }
        if (bad) ok = false;
      });
      return ok;
    }

    /* Toggle buttons (e.g. Unfiled returns Yes/No) feed a hidden input */
    form.querySelectorAll(".toggle-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var name = btn.getAttribute("data-toggle");
        form.querySelectorAll('.toggle-btn[data-toggle="' + name + '"]').forEach(function (b) {
          var on = b === btn;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-checked", on ? "true" : "false");
        });
        var hidden = document.getElementById("lf-" + name);
        if (hidden) { hidden.value = btn.getAttribute("data-value"); hidden.classList.remove("invalid"); }
        var grp = btn.closest(".toggle-group");
        if (grp) grp.classList.remove("invalid");
      });
    });

    /* Next buttons validate the current step, then advance */
    form.querySelectorAll("[data-step-next]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var cur = btn.closest(".form-step");
        if (!validateStep(cur)) return;
        showStep(+cur.getAttribute("data-step") + 1);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validateStep(steps[steps.length - 1])) return;
      form.classList.add("sent");
      window.location.assign("Thank You.html");
    });

    function clearInvalid(e) {
      if (e.target.classList && e.target.classList.contains("invalid")) e.target.classList.remove("invalid");
    }
    form.addEventListener("input", clearInvalid);
    form.addEventListener("change", clearInvalid);

    /* "How did you hear about us?" — reveal a text field when "Other" is picked */
    var hearSel = document.getElementById("lf-hear");
    var hearOtherField = document.getElementById("lf-hear-other-field");
    var hearOtherInput = document.getElementById("lf-hear-other");
    if (hearSel && hearOtherField && hearOtherInput) {
      hearSel.addEventListener("change", function () {
        var isOther = hearSel.value === "Other (Please specify)";
        hearOtherField.hidden = !isOther;
        if (isOther) {
          hearOtherInput.setAttribute("required", "");
          hearOtherInput.focus();
        } else {
          hearOtherInput.removeAttribute("required");
          hearOtherInput.value = "";
          hearOtherInput.classList.remove("invalid");
        }
      });
    }

    showStep(1);
  }

  /* ----- Dark-mode floating toggle -----
     Built here so it works on every page regardless of whether the header is
     hand-written (Services Page) or injected by chrome.js. Floats at top-right,
     just below the header (the Clients button), per design. */
  (function () {
    var root = document.documentElement;
    function theme() { return root.getAttribute("data-theme") === "dark" ? "dark" : "light"; }
    var legacy = document.getElementById("themeToggle");
    if (legacy) legacy.remove(); /* drop any in-header instance to avoid duplicates */
    var btn = document.createElement("button");
    btn.id = "themeToggle";
    btn.type = "button";
    btn.className = "theme-toggle";
    btn.setAttribute("aria-label", "Toggle dark mode");
    btn.innerHTML =
      '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>' +
      '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><line x1="12" y1="2" x2="12" y2="4"></line><line x1="12" y1="20" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="6.34" y2="6.34"></line><line x1="17.66" y1="17.66" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="4" y2="12"></line><line x1="20" y1="12" x2="22" y2="12"></line><line x1="6.34" y1="17.66" x2="4.93" y2="19.07"></line><line x1="19.07" y1="4.93" x2="17.66" y2="6.34"></line></svg>';
    function syncPressed() { btn.setAttribute("aria-pressed", theme() === "dark" ? "true" : "false"); }
    btn.addEventListener("click", function () {
      var next = theme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("ptr-theme", next); } catch (e) {}
      syncPressed();
    });
    document.body.appendChild(btn);
    syncPressed();
  })();

})();
