<template>
  <div>
    <Header />
    <tab />
    <router-view></router-view>
    <Palyer />
  </div>
</template>

<script>
import Palyer from '@/components/player/player'
import Header from './components/header/header.vue'
import Tab from './components/tab/tab.vue'

export default {
  components: {
    Header,
    Tab,
    Palyer
  },
  setup() {
    return {}
  }
}
</script>

<style scoped lang='scss'>
</style>
