import { onMounted, onUnmounted } from 'vue'

/**
 * Observes all .sr elements and adds .in when they enter the viewport.
 * @param {import('vue').Ref<HTMLElement|null>} [rootRef] — optional container to scope query
 */
export function useScrollReveal(rootRef = null) {
  let observer

  onMounted(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          observer.unobserve(e.target)
        }
      })
    }, { threshold: 0.1 })

    const container = rootRef?.value ?? document
    container.querySelectorAll('.sr').forEach(el => observer.observe(el))
  })

  onUnmounted(() => observer?.disconnect())
}
