import { CLICK_PROGRESS_PERCENT } from '@/bus-event/bus-event-type'
import busEvent from '@/bus-event'
import useAudioTime from '@/components-block/player/use-audio-time'
import { onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
import playingState from '@/store/playing-state'

export default function({ progressWrapRef }) {
  const store = useStore()
  const { setCurrentPercent } = useAudioTime()
  const onClickProgress = (e) => {
    const el = progressWrapRef.value
    const total = el.clientWidth
    const distance = e.pageX - el.offsetLeft
    const percent = distance / total
    setCurrentPercent(percent)
    busEvent.emit(CLICK_PROGRESS_PERCENT, percent)
  }
  onMounted(() => {
    // 处理手指滑动
    const el = progressWrapRef.value
    const elTotal = el.clientWidth
    const total = el.clientWidth
    let startX = 0
    let prePercent
    let currPercent
    el.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX
      const distance = startX - el.offsetLeft
      prePercent = distance / total
      setCurrentPercent(prePercent)
      store.commit('setPlayState', playingState.PAUSE)
    })
    el.addEventListener('touchmove', (e) => {
      const distance = e.touches[0].pageX - startX
      currPercent = distance / elTotal + prePercent
      if (currPercent < 0) {
        currPercent = 0
      }
      if (currPercent > 1) {
        currPercent = 1
      }
      setCurrentPercent(currPercent)
      store.commit('setPlayState', playingState.PAUSE)
    })
    el.addEventListener('touchend', (e) => {
      setCurrentPercent(currPercent)
      busEvent.emit(CLICK_PROGRESS_PERCENT, currPercent)
      store.commit('setPlayState', playingState.PLAY)
    })
  })
  return {
    onClickProgress
  }
}
