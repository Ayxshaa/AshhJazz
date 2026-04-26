<template>
  <div class="content-grid" id="scenes" ref="gridRef">

    <!-- ROW A: About + I Create -->
    <div class="cell dark row-a-left sr">
      <span class="cell-tag">About the Monograph</span>
      <h2 class="cell-h">The&nbsp;Art<br>of&nbsp;<em>Noir</em></h2>
      <p class="cell-body">
        A cinematic archive drawn from the smoky interiors and rain-soaked streets of 1960s jazz culture.
        Four scenes. Four moods. One continuous atmosphere — built to be felt rather than watched.
      </p>
      <div class="about-img">
        <video autoplay muted loop playsinline>
          <source src="/2Scene.webm" type="video/webm">
        </video>
      </div>
      <div class="stats">
        <div class="stat"><span>04</span><span>Scenes</span></div>
        <div class="stat"><span>1964</span><span>Era</span></div>
        <div class="stat"><span>∞</span><span>Sessions</span></div>
      </div>
    </div>

    <div class="cell red row-a-right sr sr-d1">
      <span class="cell-tag">What I Create</span>
      <h2 class="cell-h">Cinema<br>in&nbsp;<em>Still</em><br>Life</h2>
      <div class="rule-lines">
        <div class="rule-line"></div>
        <div class="rule-line"></div>
        <div class="rule-line"></div>
      </div>
      <p class="cell-body" style="color:rgba(232,227,222,.4)">
        Each scene is constructed as a modular work — a frame that carries its own weight,
        its own silence, its own breath. Together they form a single, unbroken nocturne.
      </p>
      <p class="cell-body" style="color:rgba(232,227,222,.3); margin-top:16px">
        Film grain. Light leaks. Warm shadows. The imperfection is the point.
      </p>
      <button class="btn" @click.stop="openScene(0)">
        Enter First Scene
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
          <path d="M1 5h12M8 1l5 4-5 4"/>
        </svg>
      </button>
    </div>

    <!-- ROW B: Scenes I & II stacked + Scene III full height -->
    <div class="row-b-left">
      <SceneCard
        video-src="/1stScene.webm"
        :idx="0" :scene-num="1"
        num-label="Scene I"
        title="Jazz Club<br>Entrance"
        description="Neon. Rain. The night opening like a curtain."
        style="height:340px"
      />
      <SceneCard
        video-src="/2Scene.webm"
        :idx="1" :scene-num="2"
        num-label="Scene II"
        title="Vintage Record Store"
        title-size="sm"
        video-style="filter:grayscale(.3) brightness(.7)"
        style="height:340px; border-top:1px solid rgba(201,168,76,.05)"
      />
    </div>

    <div class="row-b-right">
      <SceneCard
        video-src="/3Scene.webm"
        :idx="2" :scene-num="3"
        num-label="Scene III"
        title="Inside<br>Jazz Club"
        description="Intimate. Amber. A room that holds its breath."
        :align-right="true"
        video-style="filter:saturate(.55) brightness(.45)"
        style="height:100%; min-height:680px"
      />
    </div>

    <!-- ROW C: Quote -->
    <div class="cell quote-cell row-c sr">
      <span class="quote-mark">&ldquo;</span>
      <p class="quote-body">
        "Jazz is not just music, it's a way of life,<br>it's a way of being, a way of thinking."
      </p>
      <span class="quote-src">— Nina Simone</span>
    </div>

    <!-- ROW D: Scene IV + Story -->
    <div class="row-d-left">
      <SceneCard
        video-src="/4Scene.webm"
        :idx="3" :scene-num="4"
        num-label="Scene IV"
        title="Live<br>Performance"
        description="The moment everything becomes music."
        style="height:100%; min-height:480px"
      />
    </div>

    <div class="cell surface row-d-right sr sr-d2" id="story">
      <span class="cell-tag">The Story</span>
      <h2 class="cell-h-sm">A Story Told<br>in <em class="gold-em">Four Acts</em></h2>
      <p class="cell-body">
        From the rain-soaked streets of a nocturnal city to the intimate warmth of a stage bathed
        in amber — this is not a portfolio. It is an archive. A preserved fragment of a night that never ended.
      </p>
      <p class="cell-body" style="margin-top:14px">
        Each scene was composed with the precision of a film director and the instinct of a jazz musician.
        Nothing is arranged by accident. Every shadow is placed.
      </p>
      <button class="btn" @click.stop="openScene(3)">
        Watch Final Scene
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
          <path d="M1 5h12M8 1l5 4-5 4"/>
        </svg>
      </button>
      <div class="rule-lines" style="margin-top:44px">
        <div class="rule-line"></div>
        <div class="rule-line"></div>
        <div class="rule-line"></div>
      </div>
    </div>

    <!-- ROW E: Highlights -->
    <div class="cell dark row-e" style="padding:0; border-top:1px solid rgba(201,168,76,.05)">
      <div class="highlights">
        <div v-for="(hl, i) in highlights" :key="i" class="hl-item">
          <div class="hl-num">{{ hl.num }}</div>
          <span class="hl-label">{{ hl.label }}</span>
          <p class="hl-body" v-html="hl.body"></p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import SceneCard from './SceneCard.vue'
import { useScenes } from '@/composables/useScenes'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { openScene } = useScenes()

const gridRef = ref(null)
useScrollReveal(gridRef)

const highlights = [
  { num: '01', label: 'Film Grain',  body: 'Analog noise rendered live. Every frame breathes.' },
  { num: '02', label: 'Light Leaks', body: 'Warm amber bleeds at the corners. The stage is always lit from somewhere off-screen.' },
  { num: '03', label: 'Voiceover',   body: 'A deep, deliberate narration surfaces in each scene. Then fades.' },
  { num: '04', label: 'Soundtrack',  body: 'Drop <code>jazz.mp3</code> into the public folder and the audio toggle unlocks.' },
]
</script>

<style scoped>
/* ── Grid shell ───────────────────────────────── */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

/* ── Shared cell ──────────────────────────────── */
.cell {
  padding: 52px 44px;
  border: 1px solid rgba(201,168,76,0.05);
  position: relative;
  overflow: hidden;
}
.cell.dark    { background: var(--bg); }
.cell.surface { background: var(--surface); }
.cell.red     { background: var(--red-dark); }
.cell.quote-cell { background: #200a0a; }

/* ── Cell typography ──────────────────────────── */
.cell-tag {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: .5em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 28px;
}
.cell-tag::before {
  content: '';
  width: 24px; height: 1px;
  background: var(--gold);
  opacity: .4;
}
.cell-h {
  font-family: 'Playfair Display', serif;
  font-size: clamp(32px, 4vw, 54px);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -.025em;
  text-transform: uppercase;
  color: var(--cream);
}
.cell-h em { font-style: italic; color: var(--gold); }

.cell-h-sm {
  font-family: 'Playfair Display', serif;
  font-size: clamp(22px, 2.8vw, 36px);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -.02em;
  text-transform: uppercase;
  color: var(--cream);
}
.gold-em { font-style: italic; color: var(--gold); }

.cell-body {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.85;
  margin-top: 20px;
  max-width: 420px;
}

/* ── Rule lines ───────────────────────────────── */
.rule-lines {
  margin: 32px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.rule-line { height: 3px; background: var(--red-mid); }
.rule-line:nth-child(1) { width: 90%; opacity: .9; }
.rule-line:nth-child(2) { width: 68%; opacity: .65; }
.rule-line:nth-child(3) { width: 44%; opacity: .4; }

/* ── Stats ────────────────────────────────────── */
.stats {
  display: flex;
  gap: 36px;
  margin-top: 36px;
}
.stat span:first-child {
  display: block;
  font-family: 'Playfair Display', serif;
  font-size: 40px;
  font-weight: 900;
  color: var(--gold);
  line-height: 1;
}
.stat span:last-child {
  display: block;
  font-size: 7px;
  font-weight: 600;
  letter-spacing: .45em;
  text-transform: uppercase;
  color: #3a3634;
  margin-top: 5px;
}

/* ── Ghost button ─────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: .4em;
  text-transform: uppercase;
  padding: 11px 24px;
  border: 1px solid rgba(201,168,76,.2);
  color: var(--cream);
  background: none;
  cursor: pointer;
  margin-top: 32px;
  transition: background .3s, border-color .3s, box-shadow .3s;
}
.btn:hover {
  background: rgba(201,168,76,.07);
  border-color: rgba(201,168,76,.4);
  box-shadow: 0 0 28px rgba(201,168,76,.07);
}
.btn svg { transition: transform .3s; }
.btn:hover svg { transform: translateX(4px); }

/* ── About image ──────────────────────────────── */
.about-img {
  margin-top: 32px;
  width: 100%;
  height: 220px;
  overflow: hidden;
  position: relative;
}
.about-img video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(.45) brightness(.55);
}
.about-img::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px solid rgba(201,168,76,.1);
  pointer-events: none;
}

/* ── Row layout classes ───────────────────────── */
.row-a-left  { grid-column: 1; }
.row-a-right { grid-column: 2; }

.row-b-left {
  grid-column: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
}
.row-b-right { grid-column: 2; padding: 0; }

.row-c { grid-column: 1 / -1; }

.row-d-left  { grid-column: 1; padding: 0; }
.row-d-right { grid-column: 2; }

.row-e { grid-column: 1 / -1; }

/* ── Quote ────────────────────────────────────── */
.quote-mark {
  font-family: 'Playfair Display', serif;
  font-size: 96px;
  font-weight: 900;
  color: var(--red-mid);
  opacity: .3;
  line-height: .6;
  display: block;
  margin-bottom: 16px;
}
.quote-body {
  font-family: 'Playfair Display', serif;
  font-size: clamp(24px, 3.4vw, 46px);
  font-style: italic;
  font-weight: 400;
  color: #9a9592;
  line-height: 1.5;
}
.quote-src {
  font-size: 8px;
  font-weight: 700;
  letter-spacing: .45em;
  text-transform: uppercase;
  color: #3a3634;
  margin-top: 20px;
  display: block;
}

/* ── Highlights ───────────────────────────────── */
.highlights {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.hl-item {
  padding: 36px 32px;
  border-right: 1px solid rgba(201,168,76,.05);
  position: relative;
  overflow: hidden;
}
.hl-item:last-child { border-right: none; }
.hl-num {
  font-family: 'Playfair Display', serif;
  font-size: 52px;
  font-weight: 900;
  color: var(--red-mid);
  line-height: 1;
  opacity: .25;
}
.hl-label {
  font-size: 8px;
  font-weight: 700;
  letter-spacing: .4em;
  text-transform: uppercase;
  color: var(--muted);
  margin-top: 8px;
  display: block;
}
.hl-body {
  font-size: 12px;
  color: #3a3634;
  line-height: 1.7;
  margin-top: 10px;
}
</style>
