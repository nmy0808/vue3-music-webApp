import { useStore } from 'vuex'
import { computed } from 'vue'

export default function() {
  const store = useStore()
  const currentSong = computed(() => store.getters.getCurrentSong)
  const currentIndex = computed(() => store.state.currentIndex)
  const songs = computed(() => store.state.songs)
  const isPlayState = computed(() => store.getters.isPlayState)
  return {
    currentSong,
    currentIndex,
    songs,
    isPlayState
  }
}
