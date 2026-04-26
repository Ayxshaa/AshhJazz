import { reactive, computed } from 'vue'

export const SCENES = [
  {
    src:   '/1stScene.webm',
    label: 'Scene I — Jazz Club Entrance',
    title: 'Jazz Club Entrance',
    vo:    'The rain never bothered those who were already found...'
  },
  {
    src:   '/2Scene.webm',
    label: 'Scene II — Vintage Record Store',
    title: 'Vintage Record Store',
    vo:    'Every groove carved in wax holds a memory that refuses to die.'
  },
  {
    src:   '/3Scene.webm',
    label: 'Scene III — Inside the Jazz Club',
    title: 'Inside the Jazz Club',
    vo:    'Here, in the blue-lit dark, strangers become an audience of one.'
  },
  {
    src:   '/4Scene.webm',
    label: 'Scene IV — Live Performance',
    title: 'Live Performance',
    vo:    'He played like the world owed him nothing — and everything answered back.'
  }
]

/* singleton state — shared across all components that call useScenes() */
const state = reactive({
  isOpen:       false,
  currentIndex: 0,
  audioOn:      false,
})

const currentScene = computed(() => SCENES[state.currentIndex])

function openScene(idx) {
  state.currentIndex = ((idx % 4) + 4) % 4
  state.isOpen = true
}

function closeScene() {
  state.isOpen = false
}

function navScene(dir) {
  state.currentIndex = ((state.currentIndex + dir) % 4 + 4) % 4
}

function toggleAudio() {
  state.audioOn = !state.audioOn
}

export function useScenes() {
  return { state, SCENES, currentScene, openScene, closeScene, navScene, toggleAudio }
}
