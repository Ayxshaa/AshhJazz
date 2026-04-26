<template>
  <section class="hero">

    <!-- musical staff bg decoration -->
    <div class="hero-staff" aria-hidden="true">
      <div v-for="n in 5" :key="n" class="hero-staff-line"></div>
    </div>

    <!-- vertical side labels -->
    <span class="hero-vert hero-vert-l" aria-hidden="true">Nocturne &nbsp;—&nbsp; 1964</span>
    <span class="hero-vert hero-vert-r" aria-hidden="true">Jazz &nbsp;&amp;&nbsp; Cinematic Film</span>

    <div class="hero-top">
      <span class="hero-wordmark" ref="wordmarkRef">Monograph</span>
    </div>

    <div class="hero-center">
      <div class="hero-name-left" ref="nameLRef">Jazz&nbsp;Noir</div>

      <div class="hero-video-frame" ref="videoRef">
        <video autoplay muted loop playsinline>
          <source src="/1stScene.webm" type="video/webm">
        </video>
      </div>

      <div class="hero-name-right" ref="nameRRef">Edition</div>
    </div>

    <div class="hero-bottom">
      <span class="hero-edition">
        A Nocturne Edition &copy; 1964 &nbsp;—&nbsp; Four Scenes &nbsp;—&nbsp; Jazz &amp; Film
      </span>
      <button class="hero-scroll" @click="scrollToScenes" aria-label="Scroll to scenes">
        <div class="scroll-line"></div>
        <span class="scroll-label">Scroll</span>
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useParallax } from '@/composables/useParallax'

const wordmarkRef = ref(null)
const videoRef    = ref(null)
const nameLRef    = ref(null)
const nameRRef    = ref(null)

useParallax(() => ({
  video:    videoRef.value,
  wordmark: wordmarkRef.value,
  nameL:    nameLRef.value,
  nameR:    nameRRef.value,
}))

function scrollToScenes() {
  document.getElementById('scenes')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
/* ── Hero shell ───────────────────────────────── */
.hero {
  background: var(--red-dark);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

/* overlay gradients */
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    radial-gradient(ellipse at 0% 0%, rgba(201,168,76,.06) 0%, transparent 45%),
    radial-gradient(ellipse at 100% 100%, rgba(10,0,0,.4) 0%, transparent 55%);
}

/* ── Staff lines ──────────────────────────────── */
.hero-staff {
  position: absolute;
  left: 0; right: 0;
  bottom: 88px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 92px;
  z-index: 3;
  pointer-events: none;
  opacity: .055;
}
.hero-staff-line { height: 1px; background: var(--cream); }

/* ── Vertical edge labels ─────────────────────── */
.hero-vert {
  position: absolute;
  top: 50%;
  z-index: 10;
  font-size: 7px;
  font-weight: 700;
  letter-spacing: .52em;
  text-transform: uppercase;
  color: rgba(201,168,76,.22);
  white-space: nowrap;
  pointer-events: none;
}
.hero-vert-l { left: 68px;  transform: translateY(-50%) rotate(-90deg); }
.hero-vert-r { right: 68px; transform: translateY(-50%) rotate(90deg);  }

/* ── Wordmark ─────────────────────────────────── */
.hero-top {
  padding: 48px 40px 0;
  position: relative;
  z-index: 10;
}
.hero-wordmark {
  font-family: 'Playfair Display', serif;
  font-size: clamp(80px, 13.5vw, 196px);
  font-weight: 900;
  line-height: .88;
  letter-spacing: -.04em;
  text-transform: uppercase;
  display: block;
  white-space: nowrap;
  will-change: transform;
  background: linear-gradient(to bottom, #e8e3de 60%, rgba(232,227,222,.35) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fade-up 1.2s ease .2s both;
}

/* ── Center cluster ───────────────────────────── */
.hero-center {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 40px;
  flex: 1;
  position: relative;
  z-index: 10;
  animation: fade-up 1.2s ease .5s both;
}
.hero-name-left {
  font-family: 'Inter', sans-serif;
  font-size: clamp(32px, 5.2vw, 80px);
  font-weight: 200;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: var(--cream);
  text-align: right;
  padding-right: 36px;
  opacity: .92;
  will-change: transform;
}
.hero-name-right {
  font-family: 'Inter', sans-serif;
  font-size: clamp(32px, 5.2vw, 80px);
  font-weight: 200;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: var(--cream);
  text-align: left;
  padding-left: 36px;
  opacity: .92;
  will-change: transform;
}
.hero-video-frame {
  width: clamp(200px, 24vw, 360px);
  height: clamp(280px, 36vw, 520px);
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(201,168,76,0.22);
  box-shadow:
    0 0 0 1px rgba(201,168,76,.06),
    0 24px 80px rgba(0,0,0,.7),
    inset 0 0 40px rgba(0,0,0,.3);
  will-change: transform;
}
.hero-video-frame video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(.6) brightness(.75);
}
.hero-video-frame::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(61,0,0,.25) 0%, transparent 40%, rgba(61,0,0,.35) 100%);
}

/* ── Bottom bar ───────────────────────────────── */
.hero-bottom {
  padding: 24px 40px 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
  z-index: 10;
  animation: fade-up 1s ease .8s both;
}
.hero-edition {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: .55em;
  text-transform: uppercase;
  color: rgba(201,168,76,.5);
}
.hero-scroll {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  background: none;
  border: none;
}
.scroll-line {
  width: 1px;
  height: 56px;
  background: linear-gradient(to bottom, rgba(201,168,76,.4), transparent);
  animation: pulse-line 2.4s ease-in-out infinite;
}
.scroll-label {
  font-size: 7px;
  font-weight: 600;
  letter-spacing: .5em;
  text-transform: uppercase;
  color: rgba(201,168,76,.3);
}

/* ── Mobile ───────────────────────────────────── */
@media (max-width: 767px) {
  .hero-vert { display: none; }

  .hero-staff { padding: 0 24px; }

  .hero-top { padding: 40px 24px 0; }

  .hero-wordmark { white-space: normal; }

  .hero-center {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    padding: 16px 24px;
    gap: 12px 0;
  }

  .hero-video-frame {
    grid-column: 1 / -1;
    grid-row: 1;
    width: clamp(200px, 65vw, 280px);
    justify-self: center;
  }

  .hero-name-left {
    grid-column: 1;
    grid-row: 2;
    text-align: center;
    padding-right: 0;
  }

  .hero-name-right {
    grid-column: 2;
    grid-row: 2;
    text-align: center;
    padding-left: 0;
  }

  .hero-bottom {
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 16px 24px 28px;
    text-align: center;
  }
}

/* ── Animations ───────────────────────────────── */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0);    }
}
@keyframes pulse-line {
  0%, 100% { opacity: .5; transform: scaleY(1);   }
  50%       { opacity: .2; transform: scaleY(.65); }
}
</style>
