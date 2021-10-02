<template>
  <div class='header' ref='headerRef'>
    <div class='cover' :style='calcCoverStyleRef'>
      <div class='filter'></div>
    </div>
    <div class='navigator'>
      <i class='icon-back' @click='$router.back()'></i>
      <h1 class='title'>{{ singer.name }}</h1>
    </div>
  </div>
  <scroll class='scroll' ref='scrollRef' :probe-type='3' @scroll='onListScroll'
          v-no-detail='!isLoading && songs.length === 0'
          v-loading='isLoading'>
    <ul>
      <li class='song-item' v-for='item in songs' :key='item.id'>
        <h2>{{ item.name }}</h2>
        <div class='singer'>{{ item.singer }}</div>
      </li>
    </ul>
  </scroll>
</template>

<script>

import Scroll from '@/components/base/scroll/scroll'
import useNavigator from './use-navigator'
import useScroll from './use-scroll'

export default {
  name: 'MusicList',
  components: { Scroll },
  props: {
    songs: {
      type: Array,
      default: () => ([])
    },
    singer: {
      type: Object,
      default: () => ({})
    },
    isLoading: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const { calcCoverStyleRef } = useNavigator(props)
    const {
      scrollRef,
      headerRef,
      onListScroll
    } = useScroll(props)
    return {
      // useNavigator
      calcCoverStyleRef,
      // useScroll
      scrollRef,
      headerRef,
      onListScroll
    }
  }
}
</script>

<style scoped lang='scss'>

.header {
  position: relative;
  height: 0;

  &.small-show {
    position: fixed;
    width: 100%;
    height: 40px;
    padding-bottom: 0;
    z-index: 20;
    overflow: hidden;
    background: #212121;
  }

  .cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding-bottom: 70%;
    background-size: cover;
    transform-origin: top center;
  }

  .filter {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
  }

  .navigator {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 30px;
    height: 40px;
    box-sizing: border-box;
    position: relative;

    .icon-back {
      font-size: $font-size-large-x;
      color: $color-theme;
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translate3d(0, -50%, 0);
    }

    .title {
      color: $color-text;
      font-size: $font-size-large;
    }
  }
}

.scroll {
  position: fixed;
  top: 262px;
  bottom: 0;
  left: 0;
  width: 100%;

  > ul {
    padding-top: 15px;
    background: $color-heightlight-background;
  }

  .song-item {
    width: 100%;
    padding: 15px 30px;
    box-sizing: border-box;

    .singer {
      color: $color-text-d;
      padding-top: 10px;
    }
  }
}

</style>
