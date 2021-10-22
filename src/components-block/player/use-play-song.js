// 播放歌曲
import { useStore } from 'vuex'
import { computed, watchEffect } from 'vue'
import usePlayMusic from '@/views/user/use-play-music'

export default function() {
  const store = useStore()
  const currentSong = computed(() => store.getters.getCurrentSong)
  // 获取歌曲
  const { playList } = usePlayMusic()
  const playSongs = async (list) => {
    // await store.dispatch('getSongDetail', ids)
    list.forEach(song => {
      song.picUrl = song.al.picUrl
      song.singer = song.ar.map(it => it.name).join(' ')
    })
    await playList(list)
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
