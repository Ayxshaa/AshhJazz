<template>
  <div
    class="scene-card"
    :class="`sc-${sceneNum}`"
    @click="openScene(idx)"
  >
    <video class="pv" autoplay muted loop playsinline :style="videoStyle">
      <source :src="videoSrc" type="video/mp4">
    </video>

    <div class="play-ring" aria-hidden="true">
      <svg width="13" height="15" viewBox="0 0 13 15" fill="rgba(201,168,76,.85)">
        <polygon points="0,0 13,7.5 0,15"/>
      </svg>
    </div>

    <div class="scene-scrim" :class="{ 'align-right': alignRight }">
      <span class="sc-num">{{ numLabel }}</span>
      <h3 :class="titleSize === 'lg' ? 'sc-title-lg' : 'sc-title-sm'">
        <span v-html="title"></span>
      </h3>
      <p v-if="description" class="sc-desc" :class="{ 'align-right': alignRight }">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useScenes } from '@/composables/useScenes'
const { openScene } = useScenes()

defineProps({
  videoSrc:    { type: String,  required: true },
  idx:         { type: Number,  required: true },
  sceneNum:    { type: Number,  required: true },
  numLabel:    { type: String,  required: true },
  title:       { type: String,  required: true },
  titleSize:   { type: String,  default: 'lg' },
  description: { type: String,  default: '' },
  alignRight:  { type: Boolean, default: false },
  videoStyle:  { type: String,  default: '' },
})
</script>

<style scoped>
.scene-card {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(201,168,76,.07);
  transform: translateZ(0);
}

/* video */
.pv {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 1.1s cubic-bezier(.25,.46,.45,.94), filter .8s;
}
.scene-card:hover .pv { transform: scale(1.06); }

/* hover grain */
.scene-card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  opacity: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  mix-blend-mode: overlay;
  transition: opacity .5s;
}
.scene-card:hover::before { opacity: .08; }

/* hover light leak */
.scene-card::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 4;
  pointer-events: none;
  opacity: 0;
  background: linear-gradient(135deg, rgba(201,168,76,.06) 0%, transparent 50%, rgba(139,0,0,.05) 100%);
  transition: opacity .4s;
}
.scene-card:hover::after { opacity: 1; }

/* gradient scrim */
.scene-scrim {
  position: absolute;
  inset: 0;
  z-index: 5;
  background: linear-gradient(to top, rgba(8,6,6,.96) 0%, rgba(8,6,6,.4) 35%, transparent 65%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px 22px 24px;
}
.scene-scrim.align-right { text-align: right; align-items: flex-end; }

/* scene number label */
.sc-num {
  display: block;
  font-size: 7px;
  font-weight: 700;
  letter-spacing: .5em;
  text-transform: uppercase;
  margin-bottom: 6px;
}
.sc-1 .sc-num { color: #ffb4a8; }
.sc-2 .sc-num { color: var(--gold); }
.sc-3 .sc-num { color: #ff7055; }
.sc-4 .sc-num { color: #ffe2ab; }

/* titles */
.sc-title-lg {
  font-family: 'Playfair Display', serif;
  font-size: clamp(22px, 3vw, 42px);
  font-weight: 900;
  color: var(--cream);
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: -.02em;
}
.sc-title-sm {
  font-family: 'Playfair Display', serif;
  font-size: clamp(16px, 2.2vw, 28px);
  font-weight: 700;
  color: var(--cream);
  line-height: 1.05;
  text-transform: uppercase;
}

/* description — revealed on hover */
.sc-desc {
  font-size: 11px;
  color: var(--muted);
  line-height: 1.7;
  margin-top: 8px;
  max-width: 340px;
  opacity: 0;
  transform: translateY(5px);
  transition: opacity .55s, transform .55s;
}
.sc-desc.align-right { align-self: flex-end; text-align: right; }
.scene-card:hover .sc-desc { opacity: 1; transform: translateY(0); }

/* play ring */
.play-ring {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%) scale(.8);
  width: 60px; height: 60px;
  border-radius: 50%;
  border: 1px solid rgba(201,168,76,.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 6;
  opacity: 0;
  backdrop-filter: blur(6px);
  background: rgba(8,6,6,.35);
  transition: opacity .4s, transform .4s;
  pointer-events: none;
}
.play-ring svg { margin-left: 4px; }
.scene-card:hover .play-ring { opacity: 1; transform: translate(-50%, -50%) scale(1); }
</style>
