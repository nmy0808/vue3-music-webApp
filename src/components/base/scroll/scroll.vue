<template>
  <div class='wrapper' ref='wrapRef'>
    <slot></slot>
  </div>
</template>

<script>
import useScroll from './use-scroll'
import { ref } from 'vue'

export default {
  name: 'scroll',
  props: {
    click: {
      type: Boolean,
      default: true
    },
    probeType: {
      type: Number,
      default: 0
    }
  },
  setup(props, { emit }) {
    const wrapRef = ref(null)
    const { scrollRef } = useScroll(wrapRef, {
      click: props.click,
      default: props.probeType,
      ...props
    }, emit)
    // onMounted(() => {
    //   console.log(scrollRef.value)
    // })
    return {
      wrapRef,
      scrollRef
    }
  }
}
</script>

<style scoped>

</style>
