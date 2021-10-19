import { useStore } from 'vuex'
import { computed, onMounted, watch } from 'vue'
import playingState from '@/store/playing-state'

export default function(wrap, pic) {
  const store = useStore()
  const playState = computed(() => store.getters.isPlayState)
  onMounted(() => {
    let wrapEl = null
    let picEl = null
    const matrix = computed(() => store.state.matrix)
    watch(playState, (val) => {
      wrapEl = wrap.value
      picEl = pic.value
      if (val === playingState.PAUSE) {
        const picStyle = getComputedStyle(picEl).transform
        const prev = store.state.matrix
        let curr = ''
        if (prev) {
          curr = prev.concat(picStyle)
        } else {
          curr = picStyle
        }
        setStoreMatrix(curr)
      }else{

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

  function setStoreMatrix(val) {
    store.commit('setMatrix', val)
  }

  return {}
}
