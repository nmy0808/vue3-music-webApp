// 播放类型
import { useStore } from 'vuex'
import { computed, onMounted, watchEffect } from 'vue'
import playModeType from '@/store/play-mode-type'

export default function({ playModeTypeRef }) {
  const store = useStore()
  // 当前播放类型
  const calcCurrPlayModeType = computed(() => {
    const currType = store.getters.getPlayModeType
    let result = ''
    if (currType === playModeType.SHUNXU) {
      result = '顺序播放'
    }
    if (currType === playModeType.SINGLE) {
      result = '单曲循环'
    }
    if (currType === playModeType.RANDOM) {
      result = '随机播放'
    }
    return result
  })
  // 播放类型
  const PlayModeType = computed(() => store.getters.getPlayModeType)
  // 切换类型
  const togglePlayModeType = () => store.commit('togglePlayModeType')
  // 监听播放类型, 切换dom
  onMounted(() => {
    watchEffect(() => {
      const type = PlayModeType.value
      const el = playModeTypeRef.value
      if (type === playModeType.SHUNXU) {
        clearClassName()
        el.classList.add('shunxu')
      }
      if (type === playModeType.SINGLE) {
        clearClassName()
        el.classList.add('single')
      }
      if (type === playModeType.RANDOM) {
        clearClassName()
        el.classList.add('random')
      }
    })
  })

  // 清空class状态
  function clearClassName() {
    const el = playModeTypeRef.value
    el.classList.remove('xunxu')
    el.classList.remove('single')
    el.classList.remove('random')
  }

  return {
    PlayModeType,
    calcCurrPlayModeType,
    togglePlayModeType
  }
}
