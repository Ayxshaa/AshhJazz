<template>
  <nav class="nav" :class="{ off: state.isOpen || hidden }">
    <div class="nav-logo">Monograph</div>
    <ul class="nav-links">
      <li><a href="#" class="on">Archive</a></li>
      <li><a href="#scenes">Scenes</a></li>
      <li><a href="#story">Journal</a></li>
    </ul>
    <button class="nav-cta">Contact</button>
  </nav>
</template>

<script setup>
import { useScenes } from '@/composables/useScenes'
const { state } = useScenes()

defineProps({
  hidden: { type: Boolean, default: false }
})
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 800;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 40px;
  background: rgba(10,8,8,0.75);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(201,168,76,0.08);
  transition: opacity .5s, transform .5s;
}
.nav.off { opacity: 0; pointer-events: none; transform: translateY(-100%); }

.nav-logo {
  font-family: 'Pinyon Script', cursive;
  font-size: 26px;
  color: var(--cream);
  letter-spacing: .02em;
}
.nav-links {
  display: flex;
  gap: 36px;
  list-style: none;
}
.nav-links a {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: .38em;
  text-transform: uppercase;
  color: var(--muted);
  text-decoration: none;
  transition: color .3s;
}
.nav-links a:hover,
.nav-links a.on { color: var(--gold); }
.nav-cta {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: .36em;
  text-transform: uppercase;
  color: #4a1010;
  background: none;
  border: none;
  cursor: pointer;
  transition: color .3s;
}
.nav-cta:hover { color: var(--gold); }

@media (max-width: 600px) {
  .nav {
    padding: 16px 20px;
  }

  .nav-links,
  .nav-cta {
    display: none;
  }
}
</style>
