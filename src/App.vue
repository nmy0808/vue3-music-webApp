<template>
  <div>
    <Header />
    <tab/>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/header/header.vue'
import Tab from './components/tab/tab.vue'
export default {
  components: { Header, Tab },
  setup() {
    return {}
  }
}
</script>

<style scoped lang="scss">
</style>
