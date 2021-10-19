// 播放歌曲
import { useStore } from 'vuex'
import { computed, watchEffect } from 'vue'

export default function() {
  const store = useStore()
  const currentSong = computed(() => store.getters.getCurrentSong)
  const playSongs = async (ids) => {
    await store.dispatch('getSongDetail', ids)
    // await store.dispatch('getLyrics', ids)
  }
  watchEffect(async () => {
    const { id } = currentSong.value
    if (id === undefined) return
    await store.dispatch('getLyric', id)
    await store.dispatch('getMusicUrl', id)
  })
  return {
    playSongs
  }
}
