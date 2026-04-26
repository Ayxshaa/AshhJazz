<template>
  <div class="grain">
    <canvas ref="cvRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cvRef = ref(null)
let rafId = null

onMounted(() => {
  const cv = cvRef.value
  const cx = cv.getContext('2d')
  let W, H

  const resize = () => {
    W = cv.width  = window.innerWidth
    H = cv.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  function draw() {
    const img = cx.createImageData(W, H)
    const d   = img.data
    for (let i = 0; i < d.length; i += 4) {
      const v = (Math.random() * 255) | 0
      d[i] = d[i + 1] = d[i + 2] = v
      d[i + 3] = 16
    }
    cx.putImageData(img, 0, 0)
    rafId = requestAnimationFrame(draw)
  }
  draw()

  onUnmounted(() => {
    cancelAnimationFrame(rafId)
    window.removeEventListener('resize', resize)
  })
})
</script>

<style scoped>
.grain {
  position: fixed;
  inset: 0;
  z-index: 9000;
  pointer-events: none;
  opacity: 0.04;
}
canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
