<template>
  <div class="marquee-wrap" aria-hidden="true">
    <div class="marquee-track">
      <template v-for="_ in 2" :key="_">
        <template v-for="(item, i) in items" :key="i">
          <span class="mq-item">{{ item }}</span>
          <span class="mq-sep">✦</span>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup>
const items = [
  'Jazz Noir',
  'Cinematic Archive',
  'Four Scenes',
  'Nocturne Edition',
  'Film Grain',
  'Light Leaks',
  'Ambient Sound',
  '1964 Era',
]
</script>

<style scoped>
.marquee-wrap {
  overflow: hidden;
  border-top:    1px solid rgba(201,168,76,.07);
  border-bottom: 1px solid rgba(201,168,76,.07);
  padding: 13px 0;
  background: #130808;
  position: relative;
  z-index: 20;
}
.marquee-track {
  display: flex;
  align-items: center;
  width: max-content;
  animation: mq-scroll 38s linear infinite;
}
.marquee-track:hover { animation-play-state: paused; }

.mq-item {
  font-size: 8px;
  font-weight: 700;
  letter-spacing: .55em;
  text-transform: uppercase;
  color: rgba(201,168,76,.35);
  padding: 0 36px;
  flex-shrink: 0;
}
.mq-sep {
  font-size: 10px;
  color: rgba(139,0,0,.7);
  flex-shrink: 0;
  padding: 0 4px;
}

@keyframes mq-scroll {
  0%   { transform: translateX(0);    }
  100% { transform: translateX(-50%); }
}
</style>
