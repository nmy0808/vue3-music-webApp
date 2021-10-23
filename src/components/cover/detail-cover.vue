<template>
  <div class='header-top'>
    <slot></slot>
  </div>
  <div class='cover-wrap' :class='{"has-fixed": isFixed}'>
    <div class='mask' ref='maskRef'></div>
    <img ref='picRef' :src='pic' @load='onImgLoad'>
    <h4 class='singer'>{{ singer }}</h4>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'detail-cover',
  props: ['pic', 'singer', 'isFixed'],
  emits: ['img-load'],
  setup(props, { emit }) {
    const isShow = ref(true)
    const picRef = ref(null)
    const maskRef = ref(null)
    const onImgLoad = (e) => {
      emit('img-load')
      if (maskRef.value) {
        maskRef.value.style.height = e.target.clientHeight + 'px'
      }
    }
    return {
      picRef,
      maskRef,
      isShow,
      onImgLoad
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
  transform-origin: top;
  background: #26303c;

  &.fixed {
    position: fixed;
    left: 0;
    width: 100%;
    height: 88px;
    z-index: 19;
  }

  img {
    width: 100%;
    transform-origin: top;
  }

  .mask {
    width: 100%;
    background: #000;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    opacity: 0.5;
  }

  .singer {
    position: absolute;
    top: 300px;
    left: 32px;
    font-size: 64px;
    color: #FFFFFF;
    opacity: 0.6;
  }

  .header-top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 88px;
    z-index: 111;
  }
}
</style>
