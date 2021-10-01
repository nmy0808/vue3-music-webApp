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
  setup(props) {
    const wrapRef = ref(null)
    const { bScrollRef } = useScroll(wrapRef, {
      click: props.click,
      default: props.probeType
    })
    return {
      wrapRef,
      bScrollRef
    }
  }
}
</script>

<style scoped>

</style>
