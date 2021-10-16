<template>
  <div class='cover-wrap' :class='{"has-fixed": isFixed}'>
    <div class='header-top'>
      <slot></slot>
    </div>
    <img ref='picRef' :src='pic'>
    <div class='mask' ref='maskRef'></div>
    <h4 class='singer'>{{ singer }}</h4>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'detail-cover',
  props: ['pic', 'singer', 'isFixed'],
  setup() {
    const picRef = ref(null)
    const maskRef = ref(null)
    return {
      picRef,
      maskRef
    }
  }
}
</script>

<style scoped lang='scss'>
.cover-wrap {
  width: 100%;
  height: 100px;
  height: 750px;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;

  &.has-fixed {
    height: 88px;
    z-index: 3;
  }

  .header-top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 88px;
    z-index: 111;
  }

  img {
    width: 100%;
    transform-origin: top;
  }

  .mask {
    width: 100%;
    height: 100%;
    background: #000;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }

  .singer {
    position: absolute;
    top: 300px;
    left: 32px;
    font-size: 64px;
    color: #FFFFFF;
    opacity: 0.6;
  }
}
</style>
