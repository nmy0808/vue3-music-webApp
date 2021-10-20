// 播放歌曲
import { useStore } from 'vuex'
import { computed, watchEffect } from 'vue'

export default function() {
  const store = useStore()
  const currentSong = computed(() => store.getters.getCurrentSong)
  // 获取歌曲
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
  // 删除歌曲
  const removeSong = (id) => {
    store.commit('removeSong', id)
  }
  // 清空歌曲列表
  const clearSong = () => {
    store.commit('clearSongs')
  }
  return {
    playSongs,
    removeSong,
    clearSong
  }
}
