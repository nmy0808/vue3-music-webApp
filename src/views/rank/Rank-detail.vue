<template>
  <transition name='slide' appear>
    <div class='rank-detail-wrap global-bg'>
      <sub-header ref='navRef'>{{ detail.name }}</sub-header>
      <div class='cover-pic' ref='picRef'>
        <img src='../../assets/imgs/bg-hot.png' v-if='detail.coverUrl'>
      </div>
      <scroll class='rank-detail-scroll ' bounce probe-type='3' @scroll='onScroll'>
        <user-list class='inner container ' :list='detail.songs' @select='onSelectItem'></user-list>
      </scroll>
    </div>
  </transition>
</template>

<script>
import { useRoute } from 'vue-router'
import { getRankDetailToId } from '@/api'
import { ref, watchEffect } from 'vue'
import Scroll from '@/components/scroll/scroll'
import UserList from '@/components-block/user/user-list'
import SubHeader from '@/components/header/sub-header'
import usePlayMusic from '@/views/user/use-play-music'
import useDetailCover from './use-detail-cover'

export default {
  name: 'rank-detail',
  components: {
    SubHeader,
    UserList,
    Scroll
  },
  setup() {
    const route = useRoute()
    const detail = ref({})
    watchEffect(async () => {
      const id = route.params.id
      detail.value = await getRankDetailToId(id)
    })
    // 点击item
    const { onPlayRankToId } = usePlayMusic()
    const onSelectItem = async (id) => {
      await onPlayRankToId(detail.value.songs, id)
    }
    // 滑动动画
    const {
      onScroll,
      picRef,
      navRef
    } = useDetailCover()
    return {
      detail,
      onSelectItem,
      onScroll,
      picRef,
      navRef
    }
  }
}
</script>

<style scoped lang='scss'>
.rank-detail-wrap {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 10;

  .sub-header {
    z-index: 20;

    .fixed {
      position: fixed;
      left: -1px;
      right: 0;
      height: 88px;
      z-index: 20;
      background: #000;
    }
  }

  .cover-pic {
    width: 750px;
    height: 472px;
    overflow: hidden;
    transform-origin: top;
    &.fixed {
      position: fixed;
      left: 0;
      width: 100%;
      height: 88px;
      z-index: 19;
    }

    img {
      width: 101%;
      transform: translate3d(0, 0, 0);
    }
  }

  .rank-detail-scroll {
    width: 100%;
    position: fixed;
    left: 0;
    top: 472px;
    bottom: 0;

    .inner {
      padding-top: 16px;
      background: #2c3840;
    }
  }
}
</style>
