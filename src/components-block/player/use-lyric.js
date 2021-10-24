import { computed, nextTick, ref, watch, toRaw } from 'vue'
import { onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default function() {
  const store = useStore()
  const currentLyric = computed(() => {
    const lyric = toRaw(store.state.currentLyric)
    // 如果没有歌词的意外情况
    if (Object.keys(lyric).length === 0) {
      lyric['0'] = '抱歉, 该歌曲暂无歌词, 敬请期待!'
      return lyric
    }
    // 清除为''的歌词
    for (const lyricKey in lyric) {
      const val = lyric[lyricKey]
      if (!val || val.trim() === '') {
        Reflect.deleteProperty(lyric, lyricKey)
      }
    }
    return lyric
  })
  const currentTime = computed(() => store.state.currentTime)
  const playState = computed(() => store.state.playStata)
  const currentSong = computed(() => store.getters.getCurrentSong)
  const rightScrollRef = ref(null)
  let rightScrollEl, rightScrillInnerEl
  onMounted(() => {
    rightScrollEl = rightScrollRef.value.bsWrap
    rightScrillInnerEl = rightScrollEl.querySelector('.scroll-inner')
  })
  // 当前歌词的time位置
  const lyricIndex = ref(null)
  watch([currentSong, currentTime, playState], async () => {
    const times = Object.keys(currentLyric.value)
    const currTime = Math.ceil(currentTime.value)
    let keyIndex = 0
    for (let i = 0; i < times.length; i++) {
      const time = times[i]
      if (time < currTime) {
        keyIndex = time
      }
    }
    // 如果跟上次时间一样, 不必重复执行
    if (lyricIndex.value === keyIndex + '') {
      return
    }

    lyricIndex.value = keyIndex + ''
    // scrollTO
    await nextTick()
    const el = rightScrollEl.querySelector('.lyric-item.active')

    if (!el) return
    const maxTop = rightScrillInnerEl.clientHeight - rightScrollEl.clientHeight
    const top = el.offsetTop
    if (el && top <= maxTop) {
      rightScrollRef.value.bsRef.scrollTo(0, -top, 100)
    } else {
      // 如果滑动进度条滑到了最后的几句歌词, 进度条跳到最大上限
      rightScrollRef.value.bsRef.scrollTo(0, -maxTop, 100)
    }
  })

  return {
    rightScrollRef,
    currentLyric,
    lyricIndex
  }
}
