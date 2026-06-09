/* ===========================================================
   PTR Client Portal — interactions
   Screen flow (Login → PIN → Dashboard), 6-box PIN entry,
   mock document upload (click + drag/drop), updates show-all,
   send-note confirmation. Runs after chrome.js + site.js.
   =========================================================== */
(function () {
  "use strict";

  var screens = Array.prototype.slice.call(document.querySelectorAll(".pscreen"));
  function showScreen(name) {
    screens.forEach(function (s) {
      if (s.getAttribute("data-screen") === name) {
        s.hidden = false;
        // reflow so the .show transition runs from the hidden base
        void s.offsetWidth;
        s.classList.add("show");
      } else {
        s.classList.remove("show");
        s.hidden = true;
      }
    });
    window.scrollTo({ top: 0, behavior: "auto" });
  }
  // first screen visible on load
  showScreen("login");

  function maskEmail(raw) {
    raw = (raw || "").trim();
    if (!raw) return "j\u2022\u2022\u2022@email.com";
    var at = raw.indexOf("@");
    if (at > 0) {
      var local = raw.slice(0, at), domain = raw.slice(at + 1);
      var head = local.slice(0, 1);
      return head + "\u2022\u2022\u2022@" + domain;
    }
    // no @ — still mask something readable
    return raw.slice(0, 1) + "\u2022\u2022\u2022@email.com";
  }

  /* ---------- Screen 1: Login ---------- */
  var loginForm = document.getElementById("loginForm");
  var loginEmail = document.getElementById("login-email");
  var loginBtn = document.getElementById("loginBtn");
  var maskedEl = document.getElementById("maskedEmail");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = (loginEmail.value || "").trim();
      if (!v) { // only block on truly empty — any text is accepted for the demo
        loginEmail.classList.add("invalid");
        return;
      }
      if (maskedEl) maskedEl.textContent = maskEmail(v);
      loginBtn.classList.add("is-loading");
      loginBtn.disabled = true;
      setTimeout(function () {
        loginBtn.classList.remove("is-loading");
        loginBtn.disabled = false;
        showScreen("pin");
        startResendCooldown(30);
        var first = document.querySelector(".pin-box");
        if (first) first.focus();
      }, 900);
    });
    loginEmail.addEventListener("input", function () { loginEmail.classList.remove("invalid"); });
  }

  /* ---------- Screen 2: Email PIN ---------- */
  var pinForm = document.getElementById("pinForm");
  var pinRow = document.getElementById("pinRow");
  var pinBoxes = pinRow ? Array.prototype.slice.call(pinRow.querySelectorAll(".pin-box")) : [];
  var pinErr = document.getElementById("pinErr");
  var verifyBtn = document.getElementById("verifyBtn");
  var pinBack = document.getElementById("pinBack");

  function pinValue() { return pinBoxes.map(function (b) { return b.value; }).join(""); }
  function clearPinError() {
    if (pinRow) pinRow.classList.remove("error", "shake");
    if (pinErr) pinErr.hidden = true;
  }

  pinBoxes.forEach(function (box, i) {
    box.addEventListener("input", function () {
      // keep only the last typed digit
      box.value = box.value.replace(/[^0-9]/g, "").slice(-1);
      box.classList.toggle("filled", !!box.value);
      clearPinError();
      if (box.value && i < pinBoxes.length - 1) pinBoxes[i + 1].focus();
    });
    box.addEventListener("keydown", function (e) {
      if (e.key === "Backspace" && !box.value && i > 0) {
        pinBoxes[i - 1].focus();
        pinBoxes[i - 1].value = "";
        pinBoxes[i - 1].classList.remove("filled");
        e.preventDefault();
      } else if (e.key === "ArrowLeft" && i > 0) { pinBoxes[i - 1].focus(); e.preventDefault(); }
      else if (e.key === "ArrowRight" && i < pinBoxes.length - 1) { pinBoxes[i + 1].focus(); e.preventDefault(); }
    });
    box.addEventListener("paste", function (e) {
      e.preventDefault();
      var txt = (e.clipboardData || window.clipboardData).getData("text").replace(/[^0-9]/g, "").slice(0, pinBoxes.length);
      if (!txt) return;
      txt.split("").forEach(function (ch, k) {
        if (pinBoxes[k]) { pinBoxes[k].value = ch; pinBoxes[k].classList.add("filled"); }
      });
      clearPinError();
      var next = Math.min(txt.length, pinBoxes.length - 1);
      pinBoxes[next].focus();
    });
  });

  if (pinForm) {
    pinForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var code = pinValue();
      if (code.length < pinBoxes.length) {
        // error state — any 6 digits are accepted, but an incomplete code shows the error/retry path
        pinRow.classList.add("error", "shake");
        if (pinErr) { pinErr.hidden = false; pinErr.textContent = "Please enter all 6 digits to continue."; }
        setTimeout(function () { pinRow.classList.remove("shake"); }, 420);
        var firstEmpty = pinBoxes.filter(function (b) { return !b.value; })[0];
        if (firstEmpty) firstEmpty.focus();
        return;
      }
      verifyBtn.classList.add("is-loading");
      verifyBtn.disabled = true;
      setTimeout(function () {
        verifyBtn.classList.remove("is-loading");
        verifyBtn.disabled = false;
        showScreen("dashboard");
        initTracker();
      }, 900);
    });
  }

  if (pinBack) pinBack.addEventListener("click", function () {
    showScreen("login");
    if (loginEmail) loginEmail.focus();
  });

  /* Resend code — cooldown timer */
  var resendBtn = document.getElementById("resendBtn");
  var resendTimer = document.getElementById("resendTimer");
  var resendInt = null;
  function startResendCooldown(secs) {
    if (!resendBtn || !resendTimer) return;
    var left = secs;
    resendBtn.disabled = true;
    resendTimer.hidden = false;
    resendTimer.classList.remove("resend-note");
    resendTimer.textContent = "Resend in " + left + "s";
    clearInterval(resendInt);
    resendInt = setInterval(function () {
      left -= 1;
      if (left <= 0) {
        clearInterval(resendInt);
        resendBtn.disabled = false;
        resendTimer.hidden = true;
      } else {
        resendTimer.textContent = "Resend in " + left + "s";
      }
    }, 1000);
  }
  if (resendBtn) resendBtn.addEventListener("click", function () {
    // clear any expired/old code and start a fresh cooldown
    pinBoxes.forEach(function (b) { b.value = ""; b.classList.remove("filled"); });
    clearPinError();
    resendTimer.hidden = false;
    resendTimer.classList.add("resend-note");
    resendTimer.textContent = "New code sent \u2713";
    if (pinBoxes[0]) pinBoxes[0].focus();
    setTimeout(function () { startResendCooldown(30); }, 1400);
  });

  /* ---------- Screen 3: Dashboard ---------- */
  function initTracker() {
    var tracker = document.querySelector(".tracker");
    if (tracker && !tracker.classList.contains("is-filled")) {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { tracker.classList.add("is-filled"); });
      });
    }
  }

  /* Sign out → back to login */
  var signout = document.getElementById("signOut");
  if (signout) signout.addEventListener("click", function () {
    pinBoxes.forEach(function (b) { b.value = ""; b.classList.remove("filled"); });
    clearPinError();
    showScreen("login");
    if (loginEmail) loginEmail.focus();
  });

  /* Updates: show all / show less */
  var feedToggle = document.getElementById("feedToggle");
  if (feedToggle) feedToggle.addEventListener("click", function () {
    var hidden = document.querySelectorAll(".feed__item.is-hidden, .feed__item.was-hidden");
    var expanded = feedToggle.getAttribute("data-expanded") === "true";
    document.querySelectorAll(".feed__item[data-extra]").forEach(function (it) {
      if (expanded) { it.classList.add("is-hidden"); it.classList.remove("was-hidden"); }
      else { it.classList.remove("is-hidden"); it.classList.add("was-hidden"); }
    });
    feedToggle.setAttribute("data-expanded", expanded ? "false" : "true");
    feedToggle.textContent = expanded ? "Show all updates" : "Show fewer updates";
  });

  /* Documents: mock upload (click button or drag-drop onto the row) */
  var CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  function fmtNow() { return "Received just now"; }

  function completeUpload(doc) {
    var submittedList = document.getElementById("docsSubmitted");
    var mark = doc.querySelector(".doc__mark");
    var meta = doc.querySelector(".doc__meta");
    var name = doc.querySelector(".doc__name");
    var btn = doc.querySelector(".doc__upload");
    var input = doc.querySelector('input[type="file"]');

    // uploading state
    doc.classList.add("is-uploading");
    doc.classList.remove("is-drag");
    if (btn) btn.remove();
    if (input) input.remove();
    if (mark) mark.innerHTML = '<span class="doc__spin"></span>';
    if (meta) meta.textContent = "Uploading\u2026";

    setTimeout(function () {
      doc.classList.remove("is-uploading", "doc--needed");
      doc.classList.add("doc--done");
      if (mark) mark.innerHTML = CHECK;
      if (meta) meta.textContent = fmtNow();
      // move into the submitted group
      if (submittedList) submittedList.appendChild(doc);
      updateDocState();
    }, 1100);
  }

  function updateDocState() {
    var needed = document.querySelectorAll("#docsNeeded .doc--needed");
    var emptyMsg = document.getElementById("docsEmpty");
    var neededCount = document.getElementById("neededCount");
    var submittedCount = document.getElementById("submittedCount");
    var n = needed.length;
    if (neededCount) neededCount.textContent = n + (n === 1 ? " item" : " items");
    if (submittedCount) {
      var done = document.querySelectorAll("#docsSubmitted .doc--done").length;
      submittedCount.textContent = done + (done === 1 ? " item" : " items");
    }
    if (emptyMsg) emptyMsg.hidden = n !== 0;
    if (n === 0) flipActionToCalm();
  }

  function flipActionToCalm() {
    var action = document.getElementById("actionBanner");
    if (!action) return;
    action.classList.add("action--calm");
    action.innerHTML =
      '<span class="action__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>' +
      '<div class="action__body">' +
        '<span class="action__chip">All caught up</span>' +
        '<p class="action__title">No action needed right now.</p>' +
        '<p class="action__sub">We\u2019ve got everything we need \u2014 we\u2019ll let you know the moment something changes.</p>' +
      '</div>';
  }

  document.querySelectorAll(".doc--needed").forEach(function (doc) {
    var btn = doc.querySelector(".doc__upload");
    var input = doc.querySelector('input[type="file"]');
    if (btn && input) {
      btn.addEventListener("click", function () { input.click(); });
      input.addEventListener("change", function () { if (input.files && input.files.length) completeUpload(doc); });
    }
    // drag + drop
    ["dragenter", "dragover"].forEach(function (ev) {
      doc.addEventListener(ev, function (e) { e.preventDefault(); doc.classList.add("is-drag"); });
    });
    ["dragleave", "dragend"].forEach(function (ev) {
      doc.addEventListener(ev, function (e) { e.preventDefault(); doc.classList.remove("is-drag"); });
    });
    doc.addEventListener("drop", function (e) {
      e.preventDefault();
      completeUpload(doc);
    });
  });

  /* Action banner button → trigger the matching upload */
  var actionBtn = document.getElementById("actionUpload");
  if (actionBtn) actionBtn.addEventListener("click", function () {
    var target = document.querySelector('.doc--needed[data-key="auth"]') || document.querySelector(".doc--needed");
    if (target) {
      var input = target.querySelector('input[type="file"]');
      target.scrollTo; // no-op guard
      if (input) input.click();
    }
  });

  /* Send-note contact form */
  var noteForm = document.getElementById("noteForm");
  if (noteForm) noteForm.addEventListener("submit", function (e) {
    e.preventDefault();
    noteForm.classList.add("sent");
  });

})();
