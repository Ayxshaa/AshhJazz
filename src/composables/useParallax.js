import { onMounted, onUnmounted } from 'vue'

/**
 * Drives multi-layer parallax on the hero section.
 * @param {() => { video, wordmark, nameL, nameR }} getEls — returns DOM el refs
 */
export function useParallax(getEls) {
  function handler() {
    const y = window.scrollY
    if (y > window.innerHeight * 1.4) return
    const { video, wordmark, nameL, nameR } = getEls()
    if (video)    video.style.transform    = `translateY(${y * 0.22}px)`
    if (wordmark) wordmark.style.transform = `translateY(${y * -0.10}px)`
    if (nameL)    nameL.style.transform    = `translateY(${y * 0.14}px)`
    if (nameR)    nameR.style.transform    = `translateY(${y * 0.14}px)`
  }

  onMounted(()   => window.addEventListener('scroll', handler, { passive: true }))
  onUnmounted(() => window.removeEventListener('scroll', handler))
}
