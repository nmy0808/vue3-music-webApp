<template>
  <div class='slider-wrapper'>
    <slider v-if='sliders.length' :sliders='sliders' />
  </div>
</template>

<script>

import { getRecommend } from '../service/recommend'
import slider from '@/components/base/slider/slider'

export default {
  components: {
    slider
  },
  data() {
    return {
      sliders: []
    }
  },
  async created() {
    const res = await getRecommend()
    this.sliders = res.sliders
  }
}
</script>

<style scoped lang='scss'>
</style>
