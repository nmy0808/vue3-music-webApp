<template>
  <div class='slider' ref='sliderRef'>
    <div class='slider-group'>
      <div class='slider-group-item' v-for='item in sliders' :key='item.id'>
        <img :src='item.pic' alt=''>
      </div>
    </div>
    <div class='dots-group'>
      <span :class='{active: index === currentPage}' v-for='(item,index) in sliders' :key='item.id'></span>
    </div>
  </div>

</template>

<script>
import useSlider from './use-slider'
import { ref } from 'vue'

export default {
  components: {},
  props: {
    sliders: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup() {
    const sliderRef = ref(null)
    const { currentPage } = useSlider(sliderRef)
    return {
      sliderRef,
      currentPage
    }
  }
}
</script>

<style scoped lang='scss'>
.slider {
  height: 150px;
  overflow: hidden;
  position: relative;

  &-group {
    display: flex;
  }

  &-group-item {
    flex-shrink: 0;
    height: 150px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .dots-group {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    height: 14px;
    width: 100%;
    text-align: center;

    > span {
      display: inline-block;
      width: 8px;
      height: 8px;
      background: #ffffff50;
      border-radius: 50%;
      margin: 3px;
    }

    > span.active {
      width: 14px;
      border-radius: 4px;
      background: #fff;
    }
  }
}
</style>
