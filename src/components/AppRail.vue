<template>
  <aside class="rail" :class="{ off: state.isOpen }">
    <span class="rail-tag">Session</span>

    <div class="rail-btns">
      <button
        v-for="(btn, i) in railButtons"
        :key="i"
        class="rail-btn"
        :class="{ on: state.currentIndex === i && state.isOpen }"
        :title="btn.title"
        @click="openScene(i)"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
          <path v-for="(d, j) in btn.paths" :key="j" :d="d"/>
          <circle v-for="(c, j) in btn.circles" :key="'c'+j" :cx="c.cx" :cy="c.cy" :r="c.r"/>
          <line v-for="(l, j) in btn.lines" :key="'l'+j" :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2"/>
        </svg>
      </button>
    </div>

    <div class="rail-foot">
      <span>Legal</span>
      <span>Credits</span>
    </div>
  </aside>
</template>

<script setup>
import { useScenes } from '@/composables/useScenes'
const { state, openScene } = useScenes()

const railButtons = [
  {
    title:   'Jazz Club Entrance',
    paths:   ['M3 21h18', 'M5 21V7l7-4 7 4v14', 'M9 21v-5h6v5'],
    circles: [], lines: []
  },
  {
    title:   'Vintage Record Store',
    paths:   [],
    circles: [{ cx: 12, cy: 12, r: 9 }, { cx: 12, cy: 12, r: 3 }],
    lines:   [
      { x1: 12, y1: 3,  x2: 12, y2: 6  },
      { x1: 12, y1: 18, x2: 12, y2: 21 },
      { x1: 3,  y1: 12, x2: 6,  y2: 12 },
      { x1: 18, y1: 12, x2: 21, y2: 12 }
    ]
  },
  {
    title:   'Inside Jazz Club',
    paths:   ['M9 18V5l12-2v13'],
    circles: [{ cx: 6, cy: 18, r: 3 }, { cx: 18, cy: 16, r: 3 }],
    lines:   []
  },
  {
    title:   'Live Performance',
    paths:   ['M12 10v11', 'M5 20c1.5-3 7-5 7-5s5.5 2 7 5'],
    circles: [{ cx: 12, cy: 7, r: 3 }],
    lines:   []
  }
]
</script>

<style scoped>
.rail {
  position: fixed;
  left: 0; top: 0; bottom: 0;
  width: 52px;
  z-index: 790;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0 32px;
  background: var(--bg);
  border-right: 1px solid rgba(201,168,76,0.05);
  transition: opacity .6s, transform .6s;
}
.rail.off { opacity: 0; pointer-events: none; transform: translateX(-100%); }

.rail-tag {
  font-size: 7px;
  font-weight: 600;
  letter-spacing: .5em;
  text-transform: uppercase;
  color: #3a1010;
  writing-mode: vertical-lr;
  transform: rotate(180deg);
  margin-bottom: 32px;
}
.rail-btns {
  display: flex;
  flex-direction: column;
  gap: 28px;
  flex: 1;
}
.rail-btn {
  background: none;
  border: none;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--dim);
  transition: color .3s, filter .3s, transform .3s;
  position: relative;
}
.rail-btn::before {
  content: '';
  position: absolute;
  left: -4px;
  top: 50%;
  width: 2px;
  height: 18px;
  background: var(--gold);
  transform: translateY(-50%) scaleY(0);
  transition: transform .3s;
}
.rail-btn.on { color: var(--gold); filter: drop-shadow(0 0 8px rgba(201,168,76,.45)); }
.rail-btn.on::before { transform: translateY(-50%) scaleY(1); }
.rail-btn:hover { color: var(--muted); transform: scale(1.1); }

.rail-foot {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  opacity: .15;
}
.rail-foot span {
  font-size: 7px;
  letter-spacing: .3em;
  writing-mode: vertical-lr;
  text-transform: uppercase;
  color: var(--muted);
}
</style>
