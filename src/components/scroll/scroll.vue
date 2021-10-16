<template>
  <div class='scroll' ref='bsWrap'>
    <div class='scroll-inner'>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import { ref, onMounted } from 'vue'

BScroll.use(ObserveDOM)
export default {
  name: 'scroll',
  emits: ['scroll'],
  props: {
    probeType: {
      type: [String, Number],
      default: 0
    },
    orient: {
      type: String,
      default: 'y'
    }
  },
  setup(props, { emit }) {
    const bsRef = ref(null)
    const bsWrap = ref(null)
    onMounted(() => {
      bsRef.value = new BScroll(bsWrap.value, {
        observeDOM: true,
        scrollX: props.orient === 'x',
        scrollY: props.orient === 'y',
        probeType: +props.probeType,
        click: true,
        bounce: false
      })
      if (props.probeType > 0) {
        bsRef.value.on('scroll', (e) => {
          emit('scroll', e)
        })
      }
    })
    return {
      bsRef,
      bsWrap
    }
  }
}
</script>
<style scoped>
.scroll-inner {
  width: auto;
}
</style>
