<template>
  <GrainCanvas />
  <AppNav :hidden="navHidden" />
  <main>
    <ScrollVideoHero ref="heroRef" />
    <MarqueeTicker />
    <ContentGrid />
    <AppFooter />
  </main>
  <CinematicOverlay />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import GrainCanvas      from '@/components/GrainCanvas.vue'
import AppNav           from '@/components/AppNav.vue'
import ScrollVideoHero  from '@/components/ScrollVideoHero.vue'
import MarqueeTicker    from '@/components/MarqueeTicker.vue'
import ContentGrid      from '@/components/ContentGrid.vue'
import AppFooter        from '@/components/AppFooter.vue'
import CinematicOverlay from '@/components/CinematicOverlay.vue'

const heroRef   = ref(null)
const navHidden = ref(false)

/* Hide nav while user is deep inside the scroll-video section */
function onScroll() {
  const heroEl = heroRef.value?.$el
  if (!heroEl) return
  const { top, height } = heroEl.getBoundingClientRect()
  // hide when we're more than 5% scrolled in and haven't left yet
  navHidden.value = top < 0 && top > -(height - window.innerHeight)
}

onMounted(()   => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
main { margin-left: 0; }
</style>
