# Prompt Guide: Scroll-Reactive Bionic Bee Website

Use this prompt guide with any AI coding assistant or web developer to reproduce this exact website from scratch.

---

## 🎯 Master Prompt (Copy & Paste Prompt)

```text
Create a vanilla HTML, CSS, and JavaScript single-page website featuring a high-performance scroll-driven background video image sequence. The background is powered by 192 PNG image frames (located at `assets/image_sequence/ezgif-frame-001.png` to `ezgif-frame-192.png`) that play smoothly as the user scrolls down the page.

### 1. Aesthetic & Design System
- Theme: Minimalist editorial & cybernetic bionic showcase.
- Color Palette: Warm honey yellow (#dfac38) background matching the video frames, deep obsidian dark (#0f1013) text/borders, and subtle white glassmorphism cards (`rgba(255, 255, 255, 0.4)` with `backdrop-filter: blur(10px)`).
- Typography: Google Fonts `Inter` for body/headings and `Space Mono` for tech specs and section tags.
- Texture: Overlay a subtle 80px x 80px grid pattern (`.grid-overlay`) over the background.

### 2. CRITICAL LAYOUT RULE: Center Bee Protection Zone
- The 3D mechanical bee operates in the exact center of the screen.
- ALL UI cards and section text MUST be strictly docked to the outer left margin (width: 320px) and outer right margin (width: 320px) using a flex layout (`.side-split-layout`) with a large center gap (`.center-gap`).
- The middle 60%+ of the viewport MUST remain 100% open and clear of any UI cards, text, or elements throughout the entire scroll experience so the bee animation is never obscured.

### 3. Preloader & Canvas Engine (app.js)
- Preloader: Display an elegant preloader screen (`#loader`) with text ("LOADING TELEMETRY 0%") and a progress bar line.
- Immediate Render: Render Frame 0 (`ezgif-frame-001.png`) immediately on a fixed full-bleed `<canvas id="bg-canvas">` so the page never flashes blank while remaining frames load asynchronously in the background.
- Aspect-Ratio Cover Scaling: Implement `object-fit: cover` scaling math inside 2D Canvas `drawImage` so frames cover 100vw and 100vh without distortion or letterboxing on high-DPI screens.
- 60fps LERP Scroll Engine: Calculate scroll fraction (`window.scrollY / maxScroll`), map to target frame index (0 to 239), and use linear interpolation (`currentFrame += (targetFrame - currentFrame) * 0.15`) inside a `requestAnimationFrame` loop for silky smooth frame scrubbing.

### 4. Page Structure & Minimal UI (index.html)
- Top Progress Line: A 2px dark line at the very top (`.scroll-progress-bar`) expanding from 0% to 100% as the user scrolls.
- Header Navbar: Fixed minimalist bar with logo `APIS • IX` on the left and active navigation links (`OVERVIEW`, `PROPULSION`, `MECHANICS`, `EXOSKELETON`) on the right. No audio buttons or timeline scrubbers.
- Content Sections:
  1. Section #hero (Overview): Title "APIS-IX BIONIC POLLINATOR" and subtitle docked in the upper-left corner. Bottom-left scroll cue ("SCROLL TO DISASSEMBLE").
  2. Section #wings (Propulsion): Left column block (`01 // PROPULSION` - `PIEZO WINGS`), right column block (`AERODYNAMICS`). Center is 100% empty.
  3. Section #neural (Mechanics): Left column block (`02 // MECHANICS` - `MICRO GEARBOX`), right column block (`AI VISION SENSOR`). Center is 100% empty.
  4. Section #chassis (Specifications): Left column stacked stats (`03 // SPECIFICATIONS` - `CHASSIS WEIGHT: 1.18G`, `MAX PAYLOAD: 2.40G`), right column stacked stats (`ENVIRONMENT RATING: IP68`, `SWARM NETWORK: 6G UWB`). Center is 100% empty.
- Minimal Footer: Simple line footer at bottom with project branding.
```

---

## 🛠️ Step-by-Step Technical Implementation Breakdown

### File 1: `styles.css`
```css
/* Google Fonts Import */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

:root {
  --color-dark: #0f1013;
  --color-dark-muted: #383a42;
  --color-border: rgba(15, 16, 19, 0.2);
  --color-border-strong: rgba(15, 16, 19, 0.4);
  --bg-card: rgba(255, 255, 255, 0.4);
  --glass-blur: blur(10px);
  --font-sans: 'Inter', sans-serif;
  --font-mono: 'Space Mono', monospace;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html, body {
  width: 100%;
  background-color: #dfac38;
  color: var(--color-dark);
  font-family: var(--font-sans);
}

#bg-canvas {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  z-index: 1; pointer-events: none;
}

.grid-overlay {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  z-index: 2; pointer-events: none;
  background-size: 80px 80px;
  background-image: 
    linear-gradient(to right, rgba(15, 16, 19, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(15, 16, 19, 0.03) 1px, transparent 1px);
}

.scroll-progress-bar {
  position: fixed; top: 0; left: 0; height: 2px; width: 0%;
  background: var(--color-dark); z-index: 100;
}

.side-split-layout {
  width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 40px;
}
.side-column { width: 320px; max-width: 320px; display: flex; flex-direction: column; gap: 24px; flex-shrink: 0; }
.side-column.left-dock { align-items: flex-start; }
.side-column.right-dock { align-items: flex-end; text-align: right; }
.center-gap { flex: 1; pointer-events: none; }

.side-block-item, .metric-stat-item {
  background: var(--bg-card);
  backdrop-filter: var(--glass-blur);
  border-left: 2px solid var(--color-dark);
  padding: 16px 20px; width: 100%;
}
.side-column.right-dock .side-block-item, .side-column.right-dock .metric-stat-item {
  border-left: none; border-right: 2px solid var(--color-dark);
}
```

---

### File 2: `app.js` (Core Canvas & LERP Scrubbing Logic)
```javascript
document.addEventListener('DOMContentLoaded', () => {
  const TOTAL_FRAMES = 240;
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  
  const loader = document.getElementById('loader');
  const loaderText = document.getElementById('loaderText');
  const loaderBar = document.getElementById('loaderBar');
  const progressBar = document.getElementById('progressBar');

  let images = [];
  let loadedCount = 0;
  let currentFrameIndex = 0;
  let targetFrameIndex = 0;
  let isLoaded = false;

  function getFrameUrl(i) {
    return `assets/image_sequence/ezgif-frame-${String(i + 1).padStart(3, '0')}.png`;
  }

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
    renderCurrentFrame();
  }

  function drawImageCover(img) {
    if (!img || !img.complete || img.naturalWidth === 0) return;
    const cw = window.innerWidth, ch = window.innerHeight;
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const cr = cw / ch, ir = iw / ih;
    let dw, dh, dx, dy;
    if (cr > ir) { dw = cw; dh = cw / ir; dx = 0; dy = (ch - dh) / 2; }
    else { dw = ch * ir; dh = ch; dx = (cw - dw) / 2; dy = 0; }
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }

  function renderCurrentFrame() {
    const img = images[Math.round(currentFrameIndex)] || images[0];
    if (img) drawImageCover(img);
  }

  function preloadImages() {
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    firstImg.onload = () => { images[0] = firstImg; renderCurrentFrame(); };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        images[i] = img;
        loadedCount++;
        const pct = Math.min(100, Math.floor((loadedCount / TOTAL_FRAMES) * 100));
        loaderText.innerText = `LOADING TELEMETRY ${pct}%`;
        loaderBar.style.width = `${pct}%`;
        if (loadedCount >= TOTAL_FRAMES || (loadedCount > 20 && !isLoaded)) {
          isLoaded = true;
          setTimeout(() => loader.classList.add('loaded'), 200);
        }
      };
    }
  }

  function updateScrollTarget() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const fraction = maxScroll > 0 ? Math.min(1, Math.max(0, scrollTop / maxScroll)) : 0;
    targetFrameIndex = fraction * (TOTAL_FRAMES - 1);
    progressBar.style.width = `${fraction * 100}%`;
  }

  function animate() {
    const diff = targetFrameIndex - currentFrameIndex;
    if (Math.abs(diff) > 0.001) {
      currentFrameIndex += diff * 0.15;
      renderCurrentFrame();
    }
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('scroll', updateScrollTarget, { passive: true });
  resizeCanvas();
  preloadImages();
  animate();
});
```

---

## Key Quality Checkpoints

| Requirement | Implementation Verification |
| :--- | :--- |
| **Zero Center Overlap** | Verify `.center-gap` flex space leaves middle 60% of screen empty. |
| **No Flash on Load** | Preloader loads frame 0 immediately before background preloading starts. |
| **Smooth 60fps Scrub** | LERP formula `current += (target - current) * 0.15` in `requestAnimationFrame`. |
| **High DPI Support** | Canvas dimensions multiplied by `window.devicePixelRatio`. |
| **Minimal Elements** | No timeline scrubbers, no audio buttons, no heavy dark vignettes. |
