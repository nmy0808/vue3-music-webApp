<template>
  <div class='scroll' ref='bsWrap'>
    <div class='scroll-inner' ref='inner'>
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
    },
    bounce: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const bsRef = ref(null)
    const bsWrap = ref(null)
    const inner = ref(null)
    const refresh = () => {
      bsRef.value.refresh()
    }
    onMounted(() => {
      if (props.orient === 'x') {
        const items = inner.value.children
        if (items.length !== 0) {
          const style = getComputedStyle(items[0])
          const width = items[0].offsetWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight)
          inner.value.style.width = width * items.length + 'px'
        }
      }
      bsRef.value = new BScroll(bsWrap.value, {
        observeDOM: true,
        scrollX: props.orient === 'x',
        scrollY: props.orient === 'y',
        probeType: +props.probeType,
        click: true,
        bounce: props.bounce
      })
      if (props.probeType > 0) {
        bsRef.value.on('scroll', (e) => {
          emit('scroll', e)
        })
      }
    })
    return {
      bsRef,
      bsWrap,
      inner,
      refresh
    }
  }
}
</script>
<style scoped>
.scroll-inner {
  width: auto;
}
</style>
