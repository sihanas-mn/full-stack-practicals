/**
 * APIS-IX Bionic Pollinator — Canvas & LERP Scroll Engine (app.js)
 * Follows prompt_guide.md specification exactly.
 *
 * Key implementation points:
 *  1. TOTAL_FRAMES = 192 (actual files ezgif-frame-001.jpg to 192.jpg)
 *  2. Render Frame 0 immediately; remaining frames load async
 *  3. object-fit: cover math inside drawImage (2D Canvas)
 *  4. LERP 0.15 inside requestAnimationFrame for 60fps scrubbing
 *  5. Preloader shows "LOADING TELEMETRY N%" and progress bar
 *  6. Scroll fraction maps to frame index 0 → TOTAL_FRAMES-1
 *  7. Navbar active link updates on scroll
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────────────────
     CONFIG
  ───────────────────────────────────────────────────── */
  const TOTAL_FRAMES = 240;
  const FRAME_DIR = 'assets/image-sequence/';
  const FRAME_PREFIX = 'ezgif-frame-';
  const FRAME_EXT = '.png';      // actual files are .jpg
  const LERP_SPEED = 0.15;        // from prompt guide §3

  /* ─────────────────────────────────────────────────────
     DOM
  ───────────────────────────────────────────────────── */
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  const loader = document.getElementById('loader');
  const loaderText = document.getElementById('loaderText');
  const loaderBar = document.getElementById('loaderBar');
  const progressBar = document.getElementById('progressBar');
  const navbar = document.getElementById('navbar');
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));

  /* Section elements & their scroll-fraction thresholds */
  const sections = [
    { id: 'hero', navIdx: 0, start: 0.00, end: 0.25 },
    { id: 'wings', navIdx: 1, start: 0.25, end: 0.50 },
    { id: 'neural', navIdx: 2, start: 0.50, end: 0.75 },
    { id: 'chassis', navIdx: 3, start: 0.75, end: 1.00 },
  ];

  /* ─────────────────────────────────────────────────────
     STATE
  ───────────────────────────────────────────────────── */
  const images = new Array(TOTAL_FRAMES).fill(null);
  let loadedCount = 0;
  let currentFrame = 0;       // float, lerped
  let targetFrame = 0;       // float, set by scroll
  let isLoaded = false;

  /* ─────────────────────────────────────────────────────
     UTILS
  ───────────────────────────────────────────────────── */
  function getFrameUrl(i) {
    // i is 0-based; files are 001-indexed
    return `${FRAME_DIR}${FRAME_PREFIX}${String(i + 1).padStart(3, '0')}${FRAME_EXT}`;
  }

  /* ─────────────────────────────────────────────────────
     CANVAS SIZING (HiDPI-aware)
  ───────────────────────────────────────────────────── */
  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
    renderCurrentFrame();
  }

  /* ─────────────────────────────────────────────────────
     DRAW — object-fit: cover math
  ───────────────────────────────────────────────────── */
  function drawImageCover(img) {
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = window.innerWidth;
    const ch = window.innerHeight;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const cr = cw / ch;
    const ir = iw / ih;

    let dw, dh, dx, dy;
    if (cr > ir) {
      // viewport is wider than image → fit width, crop height
      dw = cw;
      dh = cw / ir;
      dx = 0;
      dy = (ch - dh) / 2;
    } else {
      // viewport is taller than image → fit height, crop width
      dw = ch * ir;
      dh = ch;
      dx = (cw - dw) / 2;
      dy = 0;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }

  function renderCurrentFrame() {
    const idx = Math.round(currentFrame);
    const img = images[idx] || images[0];
    if (img) drawImageCover(img);
  }

  /* ─────────────────────────────────────────────────────
     PRELOADING
     - Load frame 0 immediately so canvas never flashes blank
     - Load remaining frames asynchronously, update progress
     - Show loader until >20 frames ready (feels instant)
  ───────────────────────────────────────────────────── */
  function preloadImages() {
    // ── Priority: frame 0 first ──
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    firstImg.onload = () => {
      images[0] = firstImg;
      renderCurrentFrame();
    };

    // ── All frames (including 0 again, harmless) ──
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.decoding = 'async';
      img.src = getFrameUrl(i);

      img.onload = () => {
        images[i] = img;
        loadedCount++;

        const pct = Math.min(100, Math.floor((loadedCount / TOTAL_FRAMES) * 100));
        loaderText.innerText = `LOADING TELEMETRY ${pct}%`;
        loaderBar.style.width = `${pct}%`;

        // Hide loader once enough frames are ready for smooth play
        if (!isLoaded && (loadedCount >= TOTAL_FRAMES || loadedCount > 20)) {
          isLoaded = true;
          setTimeout(() => loader.classList.add('loaded'), 200);
        }
      };

      img.onerror = () => {
        // Count missing frames to avoid stall
        loadedCount++;
      };
    }
  }

  /* ─────────────────────────────────────────────────────
     SCROLL → TARGET FRAME
  ───────────────────────────────────────────────────── */
  function updateScrollTarget() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const fraction = maxScroll > 0
      ? Math.min(1, Math.max(0, scrollTop / maxScroll))
      : 0;

    targetFrame = fraction * (TOTAL_FRAMES - 1);

    // Scroll progress bar
    progressBar.style.width = `${fraction * 100}%`;
    progressBar.setAttribute('aria-valuenow', Math.round(fraction * 100));

    // Navbar scrolled state
    navbar.classList.toggle('has-scrolled', scrollTop > 10);

    // Active nav link
    sections.forEach((sec, i) => {
      const isActive = fraction >= sec.start && fraction < sec.end;
      navLinks[i]?.classList.toggle('active', isActive);
    });
  }

  /* ─────────────────────────────────────────────────────
     RAF ANIMATE — LERP frame scrubbing (60fps)
     Formula from prompt guide: current += (target - current) * 0.15
  ───────────────────────────────────────────────────── */
  function animate() {
    const diff = targetFrame - currentFrame;
    if (Math.abs(diff) > 0.001) {
      currentFrame += diff * LERP_SPEED;
      renderCurrentFrame();
    }
    requestAnimationFrame(animate);
  }

  /* ─────────────────────────────────────────────────────
     NAV ANCHOR CLICKS — smooth jump
  ───────────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const targetId = a.getAttribute('href');
      const el = document.querySelector(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ─────────────────────────────────────────────────────
     INIT
  ───────────────────────────────────────────────────── */
  window.addEventListener('resize', resizeCanvas, { passive: true });
  window.addEventListener('scroll', updateScrollTarget, { passive: true });

  resizeCanvas();      // set up canvas + DPR scale
  preloadImages();     // start loading all frames
  animate();           // start RAF loop
  updateScrollTarget(); // sync initial state
});
