<template>
  <div class='slider' ref='slider'>
    <div class='content'>
      <div class='item' v-for='banner in banners' :key='banner.bannerId'>
        <img :src='banner.pic'>
      </div>
    </div>
    <div class='dots'>
      <div class='dot' :class='{active:index === currentIndex}' v-for='(banner,index) in banners'
           :key='banner.bannerId'></div>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import { ref, onMounted } from 'vue'

BScroll.use(Slide)
export default {
  name: 'banner',
  props: {
    banners: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  setup() {
    const bsRef = ref(null)
    const slider = ref(null)
    const currentIndex = ref(0)
    onMounted(() => {
      bsRef.value = new BScroll(slider.value, {
        scrollX: true,
        scrollY: false,
        slide: true,
        momentum: false,
        bounce: false,
        probeType: 3,
        stopPropagation: true,
        eventPassthrough: 'vertical'
      })
      bsRef.value.on('slideWillChange', ({ pageX }) => {
        currentIndex.value = pageX
      })
    })
    return {
      bsRef,
      slider,
      currentIndex
    }
  }
}
</script>

<style scoped lang='scss'>
.slider {
  width: 100%;
  height: 350px;
  position: relative;
  overflow-x: hidden;

  .content {
    width: 100%;
    height: 100%;
    display: flex;
  }
}

.item {
  padding: 0 32px;
  box-sizing: border-box;
  height: 100%;


  img {
    width: 100%;
    border-radius: 30px;
    box-shadow: 0px 20px 44px -2px rgba(16, 25, 33, 0.4);
  }
}

.dots {
  position: absolute;
  bottom: 60px;
  @extend .center-h;

  .dot {
    width: 8px;
    height: 8px;
    background: rgba(255, 255, 255, 0.7);
    display: inline-block;
    margin: 3px;
    border-radius: 50%;

    &.active {
      background: #F15C00;
      width: 16px;
      border-radius: 7px;
    }
  }
}

</style>
