import { getLyric } from '@/service/song'
import { useStore } from 'vuex'
import { computed, nextTick, ref, watch } from 'vue'
import LyricParser from 'lyric-parser'
import bus from '@/assets/js/bus'

export default function({ currentTime }) {
  const lyricScrollRef = ref(null)
  const lyricListRef = ref(null)
  const currentLyric = ref('')
  const currentLineNum = ref(0)
  const store = useStore()
  let isLyricScroll = true // 歌词可以自动校准
  const currentSong = computed(() => {
    return store.getters.currentSong
  })
  const currentIndex = computed(() => {
    return store.state.currentIndex
  })
  // const currentTime = computed(() => {
  //   return store.state.currentTime
  // })
  const palying = computed(() => {
    return store.state.playing
  })

  watch(currentIndex, () => {
    stopLyric()
    lyricScrollRef.value && lyricScrollRef.value.scrollRef.scrollTo(0, 0)
  })
  // 校准歌词(处理边缘)
  watch(currentTime, () => {
    isLyricScroll && scrollAutoHandle()
  })
  watch(currentSong, async (newSong) => {
    stopLyric()
    currentLyric.value = null
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
    lyricScrollRef.value.scrollRef.scrollTo(0, 0)
    currentLyric.value = new LyricParser(lyric, handleLyric)
    // todo 这里没有加canReady 判断
    playLyric()
  })
  watch(palying, (newState) => {
    if (newState) {
      playLyric()
    } else {
      stopLyric()
    }
  })
  // watch(currentTime, (newVal) => {
  //
  // })
  bus.on('progress-click', () => {
    stopLyric()
    playLyric()
  })
  bus.on('play-canplay', (flag) => {
    if (flag) {
      stopLyric()
      playLyric()
    } else {
      // stopLyric()
    }
  })

  bus.on('progress-changing', () => {
    playLyric()
    stopLyric()
  })
  bus.on('progress-changed', () => {
    playLyric()
  })

  function handleLyric({ lineNum }) {
    // const lyricScrollCom = lyricScrollRef.value
    // const lyricListEl = lyricListRef.value
    currentLineNum.value = lineNum
    // if (!lyricListEl) return
    // const lyricItems = lyricListEl.children
    // if (lineNum > 4 && isLyricScroll) {
    //   lyricItems.length > 0 && lyricScrollCom.scrollRef.scrollToElement(lyricItems[lineNum - 4], 200, 0, 0)
    // }
  }

  // 自动校准scroll滚动距离
  function scrollAutoHandle() {
    const lyricScrollCom = lyricScrollRef.value
    const lyricListEl = lyricListRef.value
    if (!lyricListEl || !lyricScrollCom) return
    const lyricItems = lyricListEl.children
    const activeItem = Array.from(lyricItems).find(item => item.classList.contains('current'))
    activeItem && lyricScrollCom.scrollRef.scrollToElement(activeItem, 200, 0, -activeItem.clientHeight * 4)
  }

  function playLyric() {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyric.value.seek(currentTime.value * 1000)
    }
  }

  function stopLyric() {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.stop()
    }
  }
  // 手指滑动歌词的时候上锁, 不自动校准
  let lyricScrollTimer = null
  const onLyricScroll = () => {
    clearTimeout(lyricScrollTimer)
    isLyricScroll = false
  }
  const onLyricScrollEnd = () => {
    lyricScrollTimer = setTimeout(() => {
      isLyricScroll = true
    }, 500)
  }

  return {
    lyricScrollRef,
    lyricListRef,
    currentLyric,
    currentLineNum,
    onLyricScroll,
    onLyricScrollEnd
  }
}
