<template>
  <div class='circle-cover-wrap  circle-animation' ref='coverRef'>
    <img :src='picUrl'>
  </div>
</template>

<script>
// normal-player的封面
import { ref } from 'vue'
import usePlayState from '@/components-block/player/use-play-state'

export default {
  name: 'big-circle-cover',
  props: ['picUrl'],
  setup() {
    const coverRef = ref(null)
    usePlayState({
      coverRef
    })
    return { coverRef }
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
    height: 100%;
  }
}
</style>
