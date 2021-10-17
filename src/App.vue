<template>
  <div class='navigator' ref='nav' :style='{top: top+"px"}' :class='{active: isBgClass, "has-shadow" : isShadow}'>
    <Header :top='top'></Header>
    <TabBar></TabBar>
  </div>
<!--  @scroll: navigation滑动动效-->
  <router-view @scroll='onscroll'></router-view>
  <player></player>
</template>

<script>
import Header from '@/components/header/header'
import TabBar from '@/components/tabBar/tabBar'
import useNavScroll from './use-nav-scroll'
import Player from '@/views/player/Player'

export default {
  components: {
    Player,
    Header,
    TabBar
  },
  setup() {
    const {
      onscroll,
      isShadow,
      top,
      nav,
      isBgClass
    } = useNavScroll()
    return {
      onscroll,
      isShadow,
      top,
      nav,
      isBgClass
    }
  }
}
</script>

<style lang='scss' scoped>
.navigator {
  position: relative;
  top: 0;
  z-index: 1;

  &.active {
    background: #334049;
  }

  &.has-shadow {
    box-shadow: 0px 2px 4px 0px rgba(22, 33, 42, 0.3);
  }
}
</style>
