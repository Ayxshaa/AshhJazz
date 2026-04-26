<template>
  <Teleport to="body">
    <div class="cine" :class="{ open: state.isOpen }">

      <!-- video -->
      <div class="cine-vid-wrap">
        <video ref="vidRef" class="cine-vid" loop playsinline></video>
      </div>

      <!-- atmosphere -->
      <div class="cine-grain"></div>
      <div class="cine-leak"></div>
      <div class="lbox lbox-t"></div>
      <div class="lbox lbox-b"></div>
      <div class="burn" ref="burnRef"></div>

      <!-- top chrome -->
      <div class="cine-top">
        <span class="cine-label">{{ currentScene.label }}</span>
        <button class="cine-x" @click="closeScene">&#10005;&nbsp;&nbsp;Close</button>
      </div>

      <!-- voiceover -->
      <div class="vo">
        <p class="vo-p" :class="{ show: voShow }">{{ voText }}</p>
      </div>

      <!-- bottom chrome -->
      <div class="cine-bot">
        <div class="cine-title">{{ currentScene.title }}</div>
        <div class="cine-dots">
          <div
            v-for="(_, i) in SCENES"
            :key="i"
            class="dot"
            :class="{ on: i === state.currentIndex }"
            @click="openScene(i)"
          ></div>
        </div>
      </div>

      <!-- audio toggle -->
      <div class="cine-aud">
        <button class="aud-btn" title="Toggle Soundtrack" @click="handleAudio">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path v-if="state.audioOn" d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>
          </svg>
        </button>
      </div>

      <!-- arrows -->
      <button class="c-arr c-prev" @click="handleNav(-1)">&#8592;</button>
      <button class="c-arr c-next" @click="handleNav(1)">&#8594;</button>

      <div class="cine-hint">&#8592; &nbsp; Arrow keys to navigate &nbsp;|&nbsp; Esc to exit &nbsp; &#8594;</div>
    </div>

    <!-- src set programmatically so Vite doesn't try to bundle an optional file -->
    <audio ref="jazzRef" loop></audio>
  </Teleport>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useScenes, SCENES } from '@/composables/useScenes'

const { state, currentScene, openScene, closeScene, navScene, toggleAudio } = useScenes()

const vidRef  = ref(null)
const burnRef = ref(null)
const jazzRef = ref(null)

const voShow = ref(false)
const voText = ref('')
let voTimer  = null

/* ── Video update ───────────────────────────── */
function triggerBurn() {
  const el = burnRef.value
  if (!el) return
  el.classList.remove('burning')
  void el.offsetWidth
  el.classList.add('burning')
}

function loadVideo() {
  const vid = vidRef.value
  if (!vid) return
  vid.src = currentScene.value.src
  vid.load()
  vid.play().catch(() => {})
}

/* ── Voiceover ──────────────────────────────── */
function startVo() {
  clearTimeout(voTimer)
  voShow.value = false
  voText.value = ''
  voTimer = setTimeout(() => {
    voText.value = currentScene.value.vo
    voShow.value = true
    setTimeout(() => { voShow.value = false }, 4800)
  }, 2000)
}

/* ── Open / close ───────────────────────────── */
watch(() => state.isOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
    triggerBurn()
    loadVideo()
    startVo()
    if (state.audioOn) jazzRef.value?.play().catch(() => {})
  } else {
    document.body.style.overflow = ''
    clearTimeout(voTimer)
    voShow.value = false
    setTimeout(() => {
      const vid = vidRef.value
      if (vid) { vid.pause(); vid.src = '' }
    }, 700)
    if (!state.audioOn) jazzRef.value?.pause()
  }
})

/* ── Scene navigation ───────────────────────── */
watch(() => state.currentIndex, () => {
  if (!state.isOpen) return
  triggerBurn()
  loadVideo()
  startVo()
})

/* ── Audio ──────────────────────────────────── */
function handleAudio() {
  toggleAudio()
  const jazz = jazzRef.value
  if (!jazz) return
  if (state.audioOn) jazz.play().catch(() => {})
  else jazz.pause()
}

/* ── Navigation with burn ───────────────────── */
function handleNav(dir) {
  triggerBurn()
  setTimeout(() => navScene(dir), 180)
}

/* ── Keyboard ───────────────────────────────── */
function handleKeydown(e) {
  if (!state.isOpen) return
  if (e.key === 'Escape')     closeScene()
  if (e.key === 'ArrowRight') handleNav(1)
  if (e.key === 'ArrowLeft')  handleNav(-1)
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  if (jazzRef.value) jazzRef.value.src = '/jazz.mp3'
})
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<style scoped>
/* ── Overlay shell ────────────────────────────── */
.cine {
  position: fixed;
  inset: 0;
  z-index: 3000;
  background: var(--bg);
  opacity: 0;
  pointer-events: none;
  transition: opacity .65s ease;
}
.cine.open { opacity: 1; pointer-events: all; }

/* ── Video ────────────────────────────────────── */
.cine-vid-wrap { position: absolute; inset: 0; z-index: 1; }
.cine-vid { width: 100%; height: 100%; object-fit: cover; display: block; }

/* ── Letterbox ────────────────────────────────── */
.lbox {
  position: absolute;
  left: 0; right: 0;
  height: 60px;
  background: var(--bg);
  z-index: 2;
  transform: scaleY(0);
  transition: transform .55s cubic-bezier(.4,0,.2,1);
}
.lbox-t { top: 0;    transform-origin: top;    }
.lbox-b { bottom: 0; transform-origin: bottom; }
.cine.open .lbox { transform: scaleY(1); }

/* ── Film grain ───────────────────────────────── */
.cine-grain {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  opacity: .055;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  animation: grain-anim .18s steps(1) infinite;
}
@keyframes grain-anim {
  0%   { transform: translate(0,0);      }
  25%  { transform: translate(-2px,1px); }
  50%  { transform: translate(1px,-2px); }
  75%  { transform: translate(-1px,2px); }
  100% { transform: translate(2px,-1px); }
}

/* ── Light leak ───────────────────────────────── */
.cine-leak {
  position: absolute;
  inset: 0;
  z-index: 4;
  pointer-events: none;
  background:
    radial-gradient(ellipse at 0% 0%, rgba(201,168,76,.06) 0%, transparent 40%),
    radial-gradient(ellipse at 100% 100%, rgba(139,0,0,.07) 0%, transparent 40%);
}

/* ── Film burn ────────────────────────────────── */
.burn {
  position: absolute;
  inset: 0;
  z-index: 10;
  pointer-events: none;
  opacity: 0;
  background: radial-gradient(ellipse at 50% 50%, rgba(240,120,20,.92) 0%, rgba(180,40,0,.55) 22%, transparent 60%);
}
.burn.burning {
  animation: do-burn .7s ease-out forwards;
}
@keyframes do-burn {
  0%   { opacity: .9; transform: scale(.15);  filter: brightness(2.2); }
  40%  { opacity: .5; transform: scale(1.1);  filter: brightness(1.4); }
  100% { opacity: 0;  transform: scale(2.8);  filter: brightness(1);   }
}

/* ── Top chrome ───────────────────────────────── */
.cine-top {
  position: absolute;
  top: 0; left: 0; right: 0;
  z-index: 20;
  padding: 26px 44px;
  background: linear-gradient(to bottom, rgba(8,6,6,.88), transparent);
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity .4s, transform .4s;
}
.cine.open .cine-top,
.cine:hover .cine-top { opacity: 1; transform: translateY(0); }

.cine-label {
  font-size: 8px;
  font-weight: 700;
  letter-spacing: .55em;
  text-transform: uppercase;
  color: rgba(201,168,76,.6);
}
.cine-x {
  font-size: 8px;
  font-weight: 700;
  letter-spacing: .38em;
  text-transform: uppercase;
  color: rgba(232,227,222,.45);
  background: none;
  border: 1px solid rgba(201,168,76,.15);
  padding: 9px 20px;
  cursor: pointer;
  transition: color .3s, border-color .3s, background .3s;
}
.cine-x:hover {
  color: var(--cream);
  border-color: rgba(201,168,76,.4);
  background: rgba(201,168,76,.05);
}

/* ── Voiceover ────────────────────────────────── */
.vo {
  position: absolute;
  bottom: 18%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  text-align: center;
  width: 88%;
  max-width: 620px;
}
.vo-p {
  font-family: 'Playfair Display', serif;
  font-size: clamp(17px, 2.1vw, 23px);
  font-style: italic;
  color: rgba(232,227,222,.88);
  line-height: 1.65;
  text-shadow: 0 2px 24px rgba(0,0,0,.9), 0 0 60px rgba(0,0,0,.5);
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 1.1s, transform 1.1s;
}
.vo-p.show { opacity: 1; transform: translateY(0); }

/* ── Bottom chrome ────────────────────────────── */
.cine-bot {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  z-index: 20;
  padding: 0 44px 40px;
  background: linear-gradient(to top, rgba(8,6,6,.9), transparent);
  opacity: 0;
  transform: translateY(10px);
  transition: opacity .4s, transform .4s;
}
.cine.open .cine-bot,
.cine:hover .cine-bot { opacity: 1; transform: translateY(0); }

.cine-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(30px, 5vw, 66px);
  font-weight: 900;
  color: var(--cream);
  text-transform: uppercase;
  letter-spacing: -.03em;
  line-height: 1;
}
.cine-dots {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 18px;
  opacity: 0;
  transition: opacity .4s;
}
.cine.open .cine-dots,
.cine:hover .cine-dots { opacity: 1; }

.dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: rgba(201,168,76,.22);
  cursor: pointer;
  transition: background .3s, transform .3s;
}
.dot.on { background: var(--gold); transform: scale(1.5); }

/* ── Audio ────────────────────────────────────── */
.cine-aud {
  position: absolute;
  bottom: 42px; right: 44px;
  z-index: 20;
  opacity: 0;
  transition: opacity .4s;
}
.cine.open .cine-aud,
.cine:hover .cine-aud { opacity: 1; }
.aud-btn {
  background: none;
  border: 1px solid rgba(201,168,76,.15);
  color: rgba(232,227,222,.4);
  width: 42px; height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color .3s, border-color .3s;
}
.aud-btn:hover { color: var(--gold); border-color: rgba(201,168,76,.4); }

/* ── Arrows ───────────────────────────────────── */
.c-arr {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  background: none;
  border: 1px solid rgba(201,168,76,.1);
  color: rgba(232,227,222,.28);
  width: 52px; height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  opacity: 0;
  transition: opacity .4s, color .3s, border-color .3s, background .3s;
}
.cine.open .c-arr,
.cine:hover .c-arr { opacity: 1; }
.c-arr:hover {
  color: var(--gold);
  border-color: rgba(201,168,76,.4);
  background: rgba(8,6,6,.4);
}
.c-prev { left: 24px; }
.c-next { right: 24px; }

/* ── Keyboard hint ────────────────────────────── */
.cine-hint {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  font-size: 7px;
  font-weight: 600;
  letter-spacing: .45em;
  text-transform: uppercase;
  color: rgba(201,168,76,.2);
  white-space: nowrap;
  opacity: 0;
  transition: opacity .4s;
}
.cine.open .cine-hint,
.cine:hover .cine-hint { opacity: 1; }
</style>
