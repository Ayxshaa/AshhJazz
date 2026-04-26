<template>
  <section class="svh" ref="wrapRef">
    <div class="svh__sticky">

      <!-- ── Videos ─────────────────────────────── -->
      <video
        v-for="(scene, i) in SCENES"
        :key="i"
        ref="vidRefs"
        class="svh__video"
        :style="{ opacity: videoOpacities[i] }"
        playsinline
        preload="auto"
        :src="scene.src"
      ></video>

      <!-- ── Atmosphere ──────────────────────────── -->
      <div class="svh__grain"     aria-hidden="true"></div>
      <div class="svh__scanlines" aria-hidden="true"></div>
      <div class="svh__scrim"     aria-hidden="true"></div>
      <div class="svh__leak"      aria-hidden="true"></div>

      <!-- ── Letterbox bars ─────────────────────── -->
      <div class="svh__lbox svh__lbox--t" aria-hidden="true"></div>
      <div class="svh__lbox svh__lbox--b" aria-hidden="true"></div>

      <!-- ── Scene counter ──────────────────────── -->
      <div class="svh__counter" aria-label="Scene counter">
        <span class="counter-cur" :key="activeScene">{{ String(activeScene + 1).padStart(2, '0') }}</span>
        <span class="counter-sep">/</span>
        <span class="counter-total">04</span>
      </div>

      <!-- ── Text layers (computed per scene) ───── -->
      <TransitionGroup name="layer" tag="div" class="svh__layers">
        <div
          v-for="layer in visibleLayers"
          :key="layer.key"
          class="svh__layer"
          :class="`svh__layer--${layer.pos}`"
          :style="{ opacity: layer.opacity }"
        >
          <div class="svh__layer-inner" :style="{ transform: layer.transform }">
            <p          v-if="layer.tag === 'p'"       class="layer-tag" :style="{ letterSpacing: layer.ls }">{{ layer.text }}</p>
            <h1         v-else-if="layer.tag === 'h1'" class="layer-h1" v-html="layer.text"></h1>
            <h2         v-else-if="layer.tag === 'h2'" class="layer-h2" v-html="layer.text"></h2>
            <blockquote v-else-if="layer.tag === 'q'"  class="layer-q">{{ layer.text }}</blockquote>
          </div>
        </div>
      </TransitionGroup>

      <!-- ── Film-strip progress ────────────────── -->
      <div class="svh__progress" aria-hidden="true">
        <div class="svh__progress-track">
          <div class="svh__progress-fill" :style="{ transform: `scaleX(${sectionProgress})` }"></div>
          <div
            v-for="(scene, i) in SCENES"
            :key="i"
            class="svh__tick"
            :class="{ 'is-past': activeScene >= i, 'is-current': activeScene === i }"
            :style="{ left: `${(i / SCENES.length) * 100}%` }"
          ></div>
        </div>
        <div class="svh__progress-labels">
          <span
            v-for="(scene, i) in SCENES"
            :key="i"
            class="progress-label"
            :class="{ 'is-past': activeScene >= i, 'is-current': activeScene === i }"
            :style="{ left: `${(i / SCENES.length) * 100}%` }"
          >{{ String(i + 1).padStart(2, '0') }}</span>
        </div>
      </div>

      <!-- ── Scroll nudge ────────────────────────── -->
      <div class="svh__nudge" :style="{ opacity: sectionProgress < 0.025 ? 1 : 0 }" aria-hidden="true">
        <div class="nudge-line"></div>
        <span class="nudge-label">Scroll</span>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

/* ── Scene definitions ───────────────────────────── */
const SCENES = [
  {
    src: '/1stScene.webm',
    layers: [
      { tag: 'p',  text: 'JAZZ NOIR EDITION  •  1964',     pos: 'top-left',     from: 0.02, to: 0.88 },
      { tag: 'h1', text: 'MONO<br>GRAPH',                  pos: 'center',       from: 0.05, to: 0.80 },
      { tag: 'q',  text: 'A cinematic archive — four scenes, one unbroken nocturne.', pos: 'bottom-left', from: 0.20, to: 0.82 },
    ]
  },
  {
    src: '/2Scene.webm',
    layers: [
      { tag: 'p',  text: 'SCENE II',                        pos: 'top-right',   from: 0.02, to: 0.88 },
      { tag: 'h2', text: 'THE<br>RECORD<br>STORE',          pos: 'right',       from: 0.05, to: 0.78 },
      { tag: 'q',  text: 'Every groove carved in wax holds a memory that refuses to die.', pos: 'bottom-right', from: 0.22, to: 0.82 },
    ]
  },
  {
    src: '/3Scene.webm',
    layers: [
      { tag: 'p',  text: 'SCENE III',                       pos: 'top-left',    from: 0.02, to: 0.88 },
      { tag: 'h2', text: 'INSIDE<br>THE<br>CLUB',           pos: 'left',        from: 0.05, to: 0.78 },
      { tag: 'q',  text: 'Here, in the blue-lit dark, strangers become an audience of one.', pos: 'bottom-left', from: 0.22, to: 0.82 },
    ]
  },
  {
    src: '/4Scene.webm',
    layers: [
      { tag: 'p',  text: 'SCENE IV',                        pos: 'top-right',   from: 0.02, to: 0.88 },
      { tag: 'h2', text: 'LIVE<br>PERFORM<br>ANCE',         pos: 'center',      from: 0.05, to: 0.78 },
      { tag: 'q',  text: 'He played like the world owed him nothing — and everything answered back.', pos: 'bottom-right', from: 0.22, to: 0.80 },
      { tag: 'p',  text: '↓  SCROLL TO EXPLORE THE ARCHIVE', pos: 'bottom-center', from: 0.60, to: 0.96 },
    ]
  },
]

/* ── Refs & state ────────────────────────────────── */
const wrapRef         = ref(null)
const vidRefs         = ref([])
const activeScene     = ref(0)
const sectionProgress = ref(0)
const localProgress   = ref(0)
const videoOpacities  = ref([1, 0, 0, 0])

let lastScrollY = 0
let rafId       = null

/*
 * Crossfade zone: BLEND controls how much of the scroll budget is
 * used for dissolving between adjacent videos. 0.06 = 6% of total
 * scroll height on each side of the scene boundary.
 */
const BLEND = 0.06

function calcVideoOpacity(i, sp) {
  const start = i / 4
  const end   = (i + 1) / 4

  // Fade-in edge (first scene has no fade-in — it starts at full opacity)
  if (i > 0 && sp < start - BLEND) return 0
  const fadeInProgress = i === 0 ? 1 : Math.min((sp - (start - BLEND)) / (2 * BLEND), 1)

  // Fade-out edge (last scene has no fade-out — it stays at full opacity)
  if (i < SCENES.length - 1 && sp > end + BLEND) return 0
  const fadeOutProgress = i === SCENES.length - 1 ? 1 : Math.min(((end + BLEND) - sp) / (2 * BLEND), 1)

  return Math.max(0, Math.min(fadeInProgress, fadeOutProgress))
}

/* ── Scroll handler (rAF-throttled) ─────────────── */
function onScroll() {
  lastScrollY = window.scrollY
  if (!rafId) rafId = requestAnimationFrame(tick)
}

function tick() {
  rafId = null
  const wrap = wrapRef.value
  if (!wrap) return

  const sectionTop        = wrap.offsetTop
  const sectionScrollable = wrap.offsetHeight - window.innerHeight
  const scrolledIn        = Math.max(0, lastScrollY - sectionTop)
  const sp                = Math.min(scrolledIn / sectionScrollable, 1)

  sectionProgress.value = sp

  const idx = Math.min(Math.floor(sp * 4), 3)
  const lp  = Math.min((sp * 4) - idx, 1)

  activeScene.value   = idx
  localProgress.value = lp

  /* Per-video opacity — computed directly from scroll position */
  videoOpacities.value = SCENES.map((_, i) => calcVideoOpacity(i, sp))

  /* Play the active scene's video; pause the rest */
  const vids = vidRefs.value
  SCENES.forEach((_, i) => {
    const vid = vids[i]
    if (!vid) return
    if (i === idx) {
      if (vid.paused) vid.play().catch(() => {})
    } else if (!vid.paused) {
      vid.pause()
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  tick()
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  if (rafId) cancelAnimationFrame(rafId)
})

/* ── Text layer calculations ─────────────────────── */
const FADE = 0.08

function layerOpacity(layer, lp) {
  const { from, to } = layer
  if (lp < from || lp > to) return 0
  const fadeInEnd    = from + FADE
  const fadeOutStart = to   - FADE
  if (lp < fadeInEnd)    return (lp - from) / FADE
  if (lp > fadeOutStart) return (to - lp)   / FADE
  return 1
}

function layerTransform(layer, lp) {
  const enterProg = Math.min((lp - layer.from) / 0.18, 1)
  const ty = (1 - enterProg) * 28
  const xMag = (1 - enterProg) * 40
  let tx = 0
  if (['left', 'top-left', 'bottom-left'].includes(layer.pos))    tx = -xMag
  if (['right', 'top-right', 'bottom-right'].includes(layer.pos)) tx =  xMag
  return `translate(${tx}px, ${ty}px)`
}

function layerLS(layer, lp) {
  const enterProg = Math.min((lp - layer.from) / 0.22, 1)
  return `${(0.58 + (1 - enterProg) * 0.55).toFixed(3)}em`
}

/* ── Computed visible layers ─────────────────────── */
const visibleLayers = computed(() => {
  const scene = SCENES[activeScene.value]
  const lp    = localProgress.value
  return scene.layers
    .map((layer, i) => ({
      ...layer,
      key:       `${activeScene.value}-${i}`,
      opacity:   layerOpacity(layer, lp),
      transform: layerTransform(layer, lp),
      ls:        layer.tag === 'p' ? layerLS(layer, lp) : undefined,
    }))
    .filter(l => l.opacity > 0)
})
</script>

<style scoped>
/* ── Scroll container ─────────────────────────── */
.svh {
  height: 600vh;
  position: relative;
}

/* ── Sticky viewport ──────────────────────────── */
.svh__sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  background: #080606;
}

/* ── Videos ───────────────────────────────────── */
/* No CSS transition — opacity is driven frame-by-frame from scroll position */
.svh__video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(.72) saturate(.7);
  will-change: opacity;
}

/* ── Scrim ────────────────────────────────────── */
.svh__scrim {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background:
    linear-gradient(to bottom,
      rgba(8,6,6,.65) 0%,
      transparent 25%,
      transparent 65%,
      rgba(8,6,6,.75) 100%);
}

/* ── Film grain ───────────────────────────────── */
.svh__grain {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  opacity: .055;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  animation: grain .18s steps(1) infinite;
  mix-blend-mode: overlay;
}
@keyframes grain {
  0%   { transform: translate(0,0);      }
  25%  { transform: translate(-2px,1px); }
  50%  { transform: translate(1px,-2px); }
  75%  { transform: translate(-1px,2px); }
  100% { transform: translate(2px,-1px); }
}

/* ── Scanlines ────────────────────────────────── */
.svh__scanlines {
  position: absolute;
  inset: 0;
  z-index: 4;
  pointer-events: none;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 3px,
    rgba(0,0,0,0.045) 3px,
    rgba(0,0,0,0.045) 4px
  );
}

/* ── Light leak ───────────────────────────────── */
.svh__leak {
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  background:
    radial-gradient(ellipse at 0% 0%, rgba(201,168,76,.06) 0%, transparent 40%),
    radial-gradient(ellipse at 100% 100%, rgba(139,0,0,.07) 0%, transparent 40%);
}

/* ── Letterbox bars ───────────────────────────── */
.svh__lbox {
  position: absolute;
  left: 0; right: 0;
  height: 56px;
  background: #080606;
  z-index: 9;
}
.svh__lbox--t { top: 0; }
.svh__lbox--b { bottom: 0; }

/* ── Scene counter ────────────────────────────── */
.svh__counter {
  position: absolute;
  top: 72px;
  right: 44px;
  z-index: 10;
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: .45em;
  text-transform: uppercase;
}
.counter-cur {
  color: var(--gold);
  font-size: 13px;
  font-weight: 700;
  animation: counter-in 0.45s cubic-bezier(.25,.46,.45,.94);
}
@keyframes counter-in {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.counter-sep   { color: rgba(201,168,76,.25); }
.counter-total { color: rgba(201,168,76,.25); }

/* ── Text layers wrapper ──────────────────────── */
.svh__layers {
  position: absolute;
  inset: 0;
  z-index: 8;
  pointer-events: none;
}

/* ── Individual layer — outer handles positioning ── */
.svh__layer {
  position: absolute;
  will-change: opacity;
  transition: opacity .06s linear;
}

.svh__layer--center {
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.svh__layer--left {
  top: 50%; left: 7vw;
  transform: translateY(-50%);
}
.svh__layer--right {
  top: 50%; right: 7vw;
  transform: translateY(-50%);
  text-align: right;
}
.svh__layer--top-left  { top: 72px; left: 44px; }
.svh__layer--top-right { top: 72px; right: 44px; text-align: right; }
.svh__layer--bottom-left  { bottom: 80px; left: 44px; }
.svh__layer--bottom-right { bottom: 80px; right: 44px; text-align: right; }
.svh__layer--bottom-center {
  bottom: 80px; left: 50%;
  transform: translateX(-50%);
  text-align: center;
  white-space: nowrap;
}

/* ── Layer inner — animation transforms ────────── */
.svh__layer-inner {
  will-change: transform;
}

/* ── Typography ───────────────────────────────── */
.layer-tag {
  font-size: 8px;
  font-weight: 700;
  letter-spacing: .58em;
  text-transform: uppercase;
  color: rgba(201,168,76,.7);
}

.layer-h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(80px, 14vw, 220px);
  font-weight: 900;
  line-height: .88;
  letter-spacing: -.04em;
  text-transform: uppercase;
  background: linear-gradient(to bottom, #e8e3de 55%, rgba(232,227,222,.28) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.layer-h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(52px, 9vw, 150px);
  font-weight: 900;
  line-height: .9;
  letter-spacing: -.03em;
  text-transform: uppercase;
  background: linear-gradient(to bottom, #e8e3de 55%, rgba(232,227,222,.28) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.layer-q {
  font-family: 'Playfair Display', serif;
  font-size: clamp(13px, 1.4vw, 19px);
  font-style: italic;
  font-weight: 400;
  color: rgba(232,227,222,.6);
  line-height: 1.6;
  max-width: 420px;
  margin-top: 10px;
}

/* ── Film-strip progress ──────────────────────── */
.svh__progress {
  position: absolute;
  bottom: 58px;
  left: 44px;
  right: 44px;
  z-index: 10;
}

.svh__progress-track {
  position: relative;
  height: 1px;
  background: rgba(201,168,76,.06);
  overflow: visible;
}

.svh__progress-fill {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, var(--red-mid), var(--gold));
  transform-origin: left;
  will-change: transform;
}

.svh__tick {
  position: absolute;
  top: -5px;
  width: 1px;
  height: 11px;
  background: rgba(201,168,76,.18);
  transform: translateX(-50%);
  transition: background 0.35s ease, box-shadow 0.35s ease;
}
.svh__tick.is-past    { background: rgba(201,168,76,.45); }
.svh__tick.is-current {
  background: var(--gold);
  box-shadow: 0 0 8px rgba(201,168,76,.55);
}

.svh__progress-labels {
  position: relative;
  height: 18px;
  margin-top: 8px;
}
.progress-label {
  position: absolute;
  transform: translateX(-50%);
  font-size: 6.5px;
  letter-spacing: .42em;
  font-weight: 700;
  text-transform: uppercase;
  color: rgba(201,168,76,.18);
  transition: color 0.35s ease;
  white-space: nowrap;
}
.progress-label.is-past    { color: rgba(201,168,76,.45); }
.progress-label.is-current { color: var(--gold); }

/* ── Scroll nudge ─────────────────────────────── */
.svh__nudge {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transition: opacity .6s ease;
}
.nudge-line {
  width: 1px;
  height: 48px;
  background: linear-gradient(to bottom, rgba(201,168,76,.5), transparent);
  animation: nudge-pulse 2.2s ease-in-out infinite;
}
.nudge-label {
  font-size: 7px;
  font-weight: 700;
  letter-spacing: .55em;
  text-transform: uppercase;
  color: rgba(201,168,76,.35);
}
@keyframes nudge-pulse {
  0%, 100% { opacity: .6; transform: scaleY(1);   }
  50%       { opacity: .2; transform: scaleY(.6); }
}

@media (max-width: 600px) {
  .layer-q {
    max-width: calc(100vw - 88px);
  }

  .svh__layer--bottom-center {
    white-space: normal;
    width: 80vw;
  }
}
</style>
