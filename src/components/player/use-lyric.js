import { getLyric } from '@/service/song'
import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'
import LyricParser from 'lyric-parser'

export default function({ currentTime }) {
  const currentLyric = ref('')
  const currentLineNum = ref(0)
  const store = useStore()
  const currentSong = computed(() => {
    return store.getters.currentSong
  })
  watch(currentSong, async (newSong) => {
    if (!newSong.url || !newSong.id) {
      return
    }
    let lyric = newSong.lyric
    if (!lyric) {
      lyric = await getLyric(newSong)
      store.commit('setLyric', {
        song: newSong,
        lyric
      })
    }
    if (newSong.lyric !== lyric) return
    currentLyric.value = new LyricParser(lyric, handleLyric)
    // todo 这里没有加canReady 判断
    playLyric()

    function handleLyric({ lineNum }) {
      currentLineNum.value = lineNum
    }

    function playLyric() {
      const currentLyricVal = currentLyric.value
      if (currentLyricVal) {
        currentLyric.value.seek(currentTime.value)
      }
    }
  })
  return {
    currentLyric,
    currentLineNum
  }
}
