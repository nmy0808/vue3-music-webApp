import { useStore } from 'vuex'
import { computed, onMounted, watch } from 'vue'
import playingState from '@/store/playing-state'
// type: mini , full
/** 专门为大封面和mini封面做转动动画的hook
 * @param wrap img外部容器
 * @param pic  img元素
 * @param String 'mini' / 'full'
 * @returns {{}}
 */
export default function(wrap, pic, type) {
  const store = useStore()
  const playState = computed(() => store.getters.isPlayState)
  const matrix = computed(() => store.state.matrix)
  const isFullScreen = computed(() => store.getters.isFullScreen)
  const isMiniPlayer = computed(() => store.getters.isMiniPlayer)
  let wrapEl = null
  let picEl = null
  onMounted(() => {
    watch(playState, (val) => {
      wrapEl = wrap.value
      picEl = pic.value
      if (val === playingState.PAUSE) {
        const picStyle = getComputedStyle(picEl).transform
        const prev = matrix.value || ''
        let curr = ''
        if (prev !== 'none') {
          curr = prev.concat(' ' + picStyle)
        } else {
          curr = picStyle
        }
        picEl.classList.remove('circle-animation')
        setStoreMatrix(curr)
      } else {
        picEl.classList.add('circle-animation')
      }
    }, { immediate: true })
    watch(matrix, (val) => {
      if (val) {
        wrapEl.style.transform = val
      } else {
        wrapEl.style.transform = null
      }
    })
  })
  // 当切换为mini时, 给cover赋值
  type === 'mini' && watch(isMiniPlayer, (flag) => {
    setTimeout(() => {
      if (flag) {
        wrapEl.style.transform = matrix.value
      } else {
        const picStyle = getComputedStyle(picEl).transform
        const prev = matrix.value || ''
        let curr = ''
        if (prev !== 'none') {
          curr = prev.concat(' ' + picStyle)
        } else {
          curr = picStyle
        }
        setStoreMatrix(curr)
      }
    })
  }, { immediate: true })
  // 当切换为全屏时, 给cover赋值
  type === 'full' && watch(isFullScreen, (flag) => {
    setTimeout(() => {
      if (flag) {
        wrapEl.style.transform = matrix.value
      } else {
        const picStyle = getComputedStyle(picEl).transform
        const prev = matrix.value || ''
        let curr = ''
        if (prev !== 'none') {
          curr = prev.concat(' ' + picStyle)
        } else {
          curr = picStyle
        }
        setStoreMatrix(curr)
      }
    })
  }, { immediate: true })

  function setStoreMatrix(val) {
    store.commit('setMatrix', val)
  }

  return {}
}
