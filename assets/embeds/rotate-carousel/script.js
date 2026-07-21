/* =============================================================
   ROTATE VIDEO CAROUSEL — logic (vanilla JS, no dependencies)
   ============================================================= */
(function () {
  'use strict';

  /* -----------------------------------------------------------
     1. CONFIG — edit these to swap videos / behaviour
     ----------------------------------------------------------- */
  const VIDEOS = [
    { id: 'OuIS6H7y40c', title: 'Short 01' },
    { id: '7LOwQBEuYMw', title: 'Short 02' },
    { id: 'ANDcdraQc_c', title: 'Short 03' },
    { id: 'YDGs8lDET0I', title: 'Short 04' },
    { id: 'f5_FljsGp1Y', title: 'Short 05' },
  ];

  const SETTINGS = {
    autoplay: true,      // auto-advance through the carousel
    speedSeconds: 3.5,   // seconds between auto-advances (also the slider default)
    startIndex: 0,       // which video is centered on load (0-based)
  };

  /* -----------------------------------------------------------
     2. INTERNALS — no need to edit below here
     ----------------------------------------------------------- */
  const FADE_MS = 220;          // wrap-around fade duration (matches styles.css)
  const TRANSITION_MS = 700;    // rotate transition duration (matches styles.css)
  const DRAG_THRESHOLD = 80;    // px before a drag counts as a swipe

  const root = document.getElementById('vc-root');
  if (!root) return;

  const track = root.querySelector('#vc-track');
  const dotsWrap = root.querySelector('#vc-dots');
  const prevBtn = root.querySelector('#vc-prev');
  const nextBtn = root.querySelector('#vc-next');
  const carousel = root.querySelector('.vc-carousel');
  const speed = root.querySelector('#vc-speed');
  const speedValue = root.querySelector('#vc-speed-value');

  const n = VIDEOS.length;
  const state = {
    active: clampIndex(SETTINGS.startIndex),
    speedSec: SETTINGS.speedSeconds,
    timer: null,
    playingIndex: -1,
  };

  function clampIndex(i) { return ((i % n) + n) % n; }
  function pad(num) { return String(num).padStart(2, '0'); }
  function thumb(id) { return 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg'; }

  /* ---- Build the cards ---- */
  VIDEOS.forEach((video, i) => {
    const card = document.createElement('div');
    card.className = 'vc-card';
    card.dataset.index = String(i);
    card.innerHTML =
      '<div class="vc-card__media">' +
        '<img class="vc-card__thumb" src="' + thumb(video.id) + '" alt="' + escapeHtml(video.title) + '" />' +
      '</div>' +
      '<button class="vc-card__play" type="button" aria-label="Play ' + escapeHtml(video.title) + '">' +
        '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>' +
      '</button>' +
      '<div class="vc-card__chrome">' +
        '<div class="vc-card__num">' + pad(i + 1) + ' / ' + pad(n) + '</div>' +
        '<div class="vc-card__name">' + escapeHtml(video.title) + '</div>' +
      '</div>';

    card.addEventListener('click', (e) => {
      if (e.target.closest('iframe')) return;           // let the player handle its own clicks
      const pos = Number(card.dataset.pos);
      if (pos === 0) {
        if (e.target.closest('.vc-card__play')) playActive();
      } else {
        setActive(Number(card.dataset.index));
        restartAutoplay();
      }
    });

    track.appendChild(card);
  });
  const cards = Array.from(track.children);

  /* ---- Build the dots ---- */
  VIDEOS.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'vc-dot';
    dot.type = 'button';
    dot.setAttribute('aria-label', 'Go to video ' + (i + 1));
    dot.addEventListener('click', () => { setActive(i); restartAutoplay(); });
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  /* ---- Position math (shortest path around the loop) ---- */
  function shortestOffset(i, active) {
    let d = (i - active) % n;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  }

  /* ---- Layout: assign every card its position slot ---- */
  function layout() {
    cards.forEach((card) => {
      const i = Number(card.dataset.index);
      const newPos = shortestOffset(i, state.active);
      const oldPos = card.dataset.pos === undefined ? newPos : Number(card.dataset.pos);
      const travels = Math.abs(newPos - oldPos);

      card.dataset.hidden = Math.abs(newPos) > 2 ? 'true' : 'false';

      if (travels > 2) {
        // Wrap-around: would visually fly across the stage.
        // Fade out in place, snap to the new slot, fade back in.
        card.classList.add('vc-fade-out');
        setTimeout(() => {
          card.classList.add('vc-no-anim');
          card.dataset.pos = String(newPos);
          void card.offsetHeight;                 // commit the snap without animating
          card.classList.remove('vc-no-anim');
          requestAnimationFrame(() => card.classList.remove('vc-fade-out'));
        }, FADE_MS);
      } else {
        card.dataset.pos = String(newPos);
      }
    });

    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === state.active));
  }

  /* ---- Video playback (only the centered card can play) ---- */
  function stopPlayback(index) {
    if (index < 0 || index >= n) return;
    const card = cards[index];
    const video = VIDEOS[index];
    card.querySelector('.vc-card__media').innerHTML =
      '<img class="vc-card__thumb" src="' + thumb(video.id) + '" alt="' + escapeHtml(video.title) + '" />';
    card.querySelector('.vc-card__play').style.display = '';
  }

  function playActive() {
    if (state.playingIndex === state.active) return;
    if (state.playingIndex !== -1) stopPlayback(state.playingIndex);

    const index = state.active;
    const video = VIDEOS[index];
    const card = cards[index];
    card.querySelector('.vc-card__media').innerHTML =
      '<iframe src="https://www.youtube.com/embed/' + video.id +
        '?autoplay=1&playsinline=1&rel=0&modestbranding=1" title="' + escapeHtml(video.title) + '" ' +
        'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ' +
        'allowfullscreen></iframe>';
    card.querySelector('.vc-card__play').style.display = 'none';
    state.playingIndex = index;

    setAutoplay(false);   // don't yank the video away mid-watch
  }

  /* ---- Navigation ---- */
  function setActive(i, opts) {
    opts = opts || {};
    const newIndex = clampIndex(i);
    if (newIndex === state.active && !opts.force) return;

    if (state.playingIndex !== -1 && state.playingIndex !== newIndex) {
      stopPlayback(state.playingIndex);
      state.playingIndex = -1;
    }
    state.active = newIndex;
    layout();
  }
  function next() { setActive(state.active + 1); }
  function prev() { setActive(state.active - 1); }

  prevBtn.addEventListener('click', () => { prev(); restartAutoplay(); });
  nextBtn.addEventListener('click', () => { next(); restartAutoplay(); });

  /* ---- Autoplay ---- */
  function setAutoplay(on) {
    SETTINGS.autoplay = on;
    if (state.timer) { clearInterval(state.timer); state.timer = null; }
    if (on) state.timer = setInterval(next, state.speedSec * 1000);
  }
  function restartAutoplay() { if (SETTINGS.autoplay) setAutoplay(true); }

  /* ---- Speed slider (optional — markup may omit it) ---- */
  if (speed && speedValue) {
    speed.value = String(state.speedSec);
    speedValue.textContent = state.speedSec.toFixed(1) + 's';
    speed.addEventListener('input', () => {
      state.speedSec = Number(speed.value);
      speedValue.textContent = state.speedSec.toFixed(1) + 's';
      if (SETTINGS.autoplay) setAutoplay(true);   // apply new cadence immediately
    });
  }

  /* ---- Drag / swipe ---- */
  let dragging = false;
  let dragStartX = 0;
  let dragDX = 0;

  track.addEventListener('pointerdown', (e) => {
    if (e.target.closest('iframe')) return;   // don't hijack player interactions
    dragging = true;
    dragStartX = e.clientX;
    dragDX = 0;
    carousel.classList.add('vc-dragging');
    track.setPointerCapture(e.pointerId);
  });
  track.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    dragDX = e.clientX - dragStartX;
    track.style.transform = 'translateX(' + dragDX * 0.4 + 'px)';
  });
  function endDrag() {
    if (!dragging) return;
    dragging = false;
    carousel.classList.remove('vc-dragging');
    track.style.transform = '';
    if (Math.abs(dragDX) > DRAG_THRESHOLD) {
      const steps = Math.min(2, Math.round(Math.abs(dragDX) / 140));
      if (dragDX < 0) setActive(state.active + steps);
      else setActive(state.active - steps);
      restartAutoplay();
    }
  }
  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', endDrag);
  track.addEventListener('pointerleave', endDrag);

  /* ---- Small helper ---- */
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
  }

  /* ---- Init ---- */
  layout();
  if (SETTINGS.autoplay) setAutoplay(true);
})();
