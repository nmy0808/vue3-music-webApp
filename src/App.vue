<template>
  <div class='wrap'>12312</div>
</template>

<script>
import { getBanner } from '@/api'
import { watchEffect } from 'vue'

export default {
  components: {},
  setup() {
    watchEffect(async () => {
      const res = await getBanner()
      console.log(res)
    })
    return {}
  }
}
</script>

<style lang='scss'>
.wrap {
  width: 375px;
  height: 375px;
  border: 1px solid;
  @extend .center-all;
}
</style>
