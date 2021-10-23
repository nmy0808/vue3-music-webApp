<template>
  <div class='circle-cover-wrap ' ref='wrapRef'>
    <img id='big-cover-img' :src='picUrl' ref='picRef' >
  </div>
</template>

<script>
// normal-player的封面
import { ref } from 'vue'
import useCoverAnimation from '@/components-block/player/use-cover-animation'

export default {
  name: 'big-circle-cover',
  props: ['picUrl'],
  setup() {
    const wrapRef = ref(null)
    const picRef = ref(null)
    useCoverAnimation(wrapRef, picRef, 'full')
    return {
      wrapRef,
      picRef
    }
  }
}
</script>

<style scoped lang='scss'>
.circle-cover-wrap {
  width: 500px;
  height: 500px;
  border: 10px solid #fff;
  overflow: hidden;
  border-radius: 50%;

  img {
    width: 100%;
    //height: 100%;
    border-radius: 50%;
  }
}
</style>
