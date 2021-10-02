<template>
  <div class='header' :style='calcCoverStyle'>
    <div class='filter'></div>
    <div class='navigator'>
      <i class='icon-back' @click='$router.back()'></i>
      <h1 class='title'>{{ singer.name }}</h1>
    </div>
  </div>
  <scroll class='scroll'>
    <ul>
      <li class='song-item' v-for='item in songs' :key='item.id'>
        <h2>{{ item.name }}</h2>
        <div class='singer'>{{ item.singer }}</div>
      </li>
    </ul>
  </scroll>
</template>

<script>
import { computed } from 'vue'
import Scroll from '@/components/base/scroll/scroll'

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
    }
  },
  setup(props) {
    console.log(props.songs)
    const calcCoverStyle = computed(() => {
      return {
        backgroundImage: `url(${props.singer.pic})`
      }
    })
    return {
      calcCoverStyle
    }
  }
}
</script>

<style scoped lang='scss'>

.header {
  position: relative;
  height: 0;
  padding-bottom: 70%;
  background-size: cover;

  .filter {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
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
