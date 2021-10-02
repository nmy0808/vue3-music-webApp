import { onMounted, ref } from 'vue'
import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'

BScroll.use(ObserveDOM)

export default function(wrapRef, options, emit) {
  const scrollRef = ref(null)
  onMounted(() => {
    scrollRef.value = new BScroll(wrapRef.value, {
      ...options,
      observeDOM: true
    })
    if (options.probeType) {
      scrollRef.value.on('scroll', (position) => {
        emit('scroll', position)
      })
    }
  })
  return {
    scrollRef
  }
}
