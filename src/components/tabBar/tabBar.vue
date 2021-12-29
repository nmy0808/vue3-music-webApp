<template>
  <div class="tabBar container" ref="wrap">
    <router-link to="/recommend">推荐</router-link>
    <router-link to="/singer">歌手</router-link>
    <router-link to="/rank">排行</router-link>
    <router-link to="/search">搜索</router-link>
    <div class="bottom-line" ref="line"></div>
  </div>
</template>

<script>
import { ref, watchEffect, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'about.vue',
  props: ['isShadow'],
  setup() {
    const wrap = ref(null)
    const line = ref(null)
    const store = useRoute()
    onMounted(() => {
      let first = true
      const items = wrap.value.querySelectorAll('a')
      const tabs = [...items].map((it) => new URL(it.href).pathname)
      watchEffect(() => {
        const path = store.path
        const index = tabs.findIndex((it) => path.includes(it))
        const currentItem = items[index < 0 ? 0 : index]
        const left = currentItem.offsetLeft
        line.value.style.width = currentItem.clientWidth + 'px'
        line.value.style.transform = `translate3d(${left}px,0,0)`
        first &&
          setTimeout(() => {
            line.value.style.display = 'block'
            first = false
          }, 50)
      })
    })
    return {
      wrap,
      line
    }
  }
}
</script>

<style scoped lang="scss">
.tabBar {
  position: relative;
  height: 88px;
  width: 750px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: $font-size-large;

  a {
    color: $color-sub;
    text-decoration: none;

    &.router-link-active {
      color: $color-light;
      font-weight: bold;
    }
  }

  .bottom-line {
    display: none;
    width: 28px;
    height: 3px;
    background: $color-light;
    position: absolute;
    bottom: 0;
    left: 0;
    transition: all 0.2s;
    border-radius: 2px;
  }
}
</style>
