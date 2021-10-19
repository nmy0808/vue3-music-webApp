// 获取播放状态
import { useStore } from 'vuex'
import { computed, watch } from 'vue'
import playingState from '@/store/playing-state'
import { onMounted } from '@vue/runtime-core'

/**
 * @param playRef 按钮ref, 用于切换播放状态
 * @returns {any}
 */
export default function({ playRef }) {
  const store = useStore()
  // 播放状态
  const playState = computed(() => store.getters.isPlayState)
  // 切换播放状态
  const togglePlayState = () => {
    store.commit('setPlayState', !playState.value)
  }
  // 监听播放状态, 切换按钮状态
  onMounted(() => {
    watch(playState, (val) => {
      if (val === playingState.PLAY) {
        playRef.value.classList.add('pause')
      } else {
        playRef.value.classList.remove('pause')
      }
    }, { immediate: true })
  })
  return {
    playState,
    togglePlayState
  }
}
