import { computed } from 'vue'
import { useStore } from 'vuex'
import { formatTime } from '@/tool/indxe'

export default function() {
  const store = useStore()
  const totalTime = computed(() => store.state.currentTotalTime)
  const currentTime = computed(() => store.state.currentTime)
  const percent = computed(() => store.state.currentPercent)
  const formatTotalTime = computed(() => {
    const {
      minute,
      second
    } = formatTime(totalTime.value)
    return minute + ':' + second
  })
  const formatCurrentTime = computed(() => {
    const {
      minute,
      second
    } = formatTime(currentTime.value)
    return minute + ':' + second
  })
  const formatPercent = computed(() => {
    return percent.value * 100 + '%'
  })
  // 提供修改比例方法 设置当前比例和当前时间
  const setCurrentPercent = (val) => {
    store.commit('setCurrentPercent', val)
    store.commit('setCurrentTime', totalTime.value * val)
  }

  return {
    totalTime,
    currentTime,
    percent,
    formatTotalTime,
    formatCurrentTime,
    formatPercent,
    setCurrentPercent,
  }
}
