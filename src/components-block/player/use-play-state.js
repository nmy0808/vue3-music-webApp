// 获取播放状态
import { useStore } from 'vuex'
import { computed, watch, onMounted } from 'vue'
import playingState from '@/store/playing-state'

/**
 * @param playRef 按钮ref, 用于切换播放状态
 * @param coverRef 封面图片ref, 用于控制旋转动画
 * @returns {any}
 */
export default function({
  playRef = {},
  coverRef = {}
}) {
  const store = useStore()
  // 播放状态
  const playState = computed(() => store.getters.isPlayState)
  // 切换播放状态
  const togglePlayState = () => {
    store.commit('setPlayState', !playState.value)
  }
  // 设置播放状态
  const setPlayState = (flag) => {
    store.commit('setPlayState', flag)
  }
  // 监听播放状态, 切换按钮状态, 封面旋转状态
  onMounted(() => {
    watch(playState, (val) => {
      const playEl = playRef.value
      if (val === playingState.PLAY) {
        playEl && playEl.classList.add('pause')
      } else {
        playEl && playEl.classList.remove('pause')
      }
    }, { immediate: true })
  })
  return {
    playState,
    togglePlayState,
    setPlayState
  }
}
