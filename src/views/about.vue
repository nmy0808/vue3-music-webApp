<template>
  <div>
    about
    <div class='box' v-if='isShow'></div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'about.vue',
  setup() {
    const store = useStore()
    const isShow = computed(() => store.state.isShow)
    return {
      isShow
    }
  }
}
</script>

<style scoped>
.box {
  width: 100px;
  height: 100px;
  background: #000;
  position: fixed;
  left: 100px;
  top: 100px;
  z-index: 1;
}
</style>
