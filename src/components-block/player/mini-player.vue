<template>
  <div class='mini-box'>
    <div class='mini-wrap container'>
      <div class='pic' @click='onFullScreen' ref='wrapRef'>
        <img
          ref='picRef'
          :src='currentSong.picUrl'
          alt=''>
      </div>
      <div class='desc' @click='onFullScreen'>
        <h4 class='name'>{{ currentSong.name }}</h4>
        <h4 class='sub'>{{ currentSong.singer }}</h4>
      </div>
      <div class='control'>
        <i class='icon-play' @click='togglePlayState' ref='playRef'></i>
        <i class='icon-list' @click='onToggleShow'></i>
      </div>
    </div>
    <mini-play-list @show='onShow' :is-show='isShow'></mini-play-list>
  </div>
</template>

<script>
import MiniPlayList from '@/components-block/player/mini-play-list'
import { nextTick, ref } from 'vue'
import { useStore } from 'vuex'
import usePlayState from '@/components-block/player/use-play-state'
import useCoverAnimation from './use-cover-animation'
import useSongDetail from '@/components-block/player/use-song-detail'

export default {
  name: 'mini-player',
  components: { MiniPlayList },
  setup() {
    const store = useStore()
    const isShow = ref(false)
    const onToggleShow = () => {
      isShow.value = !isShow.value
    }
    const onFullScreen = () => {
      isShow.value = false
      nextTick(() => {
        store.commit('setFullScreen', true)
      })
    }
    // 按钮状态
    const playRef = ref(null)
    const { togglePlayState } = usePlayState({
      playRef
    })
    // 封面旋转
    const wrapRef = ref(null)
    const picRef = ref(null)
    useCoverAnimation(wrapRef, picRef, 'mini')
    // 歌曲信息
    const { currentSong } = useSongDetail()
    //
    const onShow = (flag) => {
      isShow.value = flag
    }
    return {
      isShow,
      onToggleShow,
      onFullScreen,
      playRef,
      togglePlayState,
      wrapRef,
      picRef,
      currentSong,
      onShow
    }
  }
}
</script>

<style scoped lang='scss'>
.mini-box {
  position: relative;
  z-index: 100;
}

.mini-wrap {
  height: 132px;
  width: 100%;
  position: fixed;
  z-index: -11; //需要比list小
  left: 0;
  bottom: 0;
  background: $color-main;
  display: flex;
  align-items: center;
  color: $color-light;
  font-size: $font-size-large;

  .pic {
    width: 82px;
    height: 82px;
    overflow: hidden;
    border-radius: 50%;
    overflow: hidden;
    border-radius: 50%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .desc {
    margin-left: 22px;

    .name {
      width: 70%;
      height: 28px;
      @include clamp(1);
    }

    .sub {
      margin-top: 12px;
      font-size: $font-size-medium;
    }
  }

  .control {
    margin-left: auto;

    .icon-play {
      @include bg-image('~@/assets/imgs/play-bar-btn');

      &.pause {
        @include bg-image('~@/assets/imgs/pause-bar-btn');
      }
    }

    .icon-list {
      margin-left: 34px;
      @include bg-image('~@/assets/imgs/list')
    }

    .icon-play, .icon-list {
      display: inline-block;
      width: 54px;
      height: 54px;
      background-size: cover;
    }
  }
}

.in {
  animation: slide 0.3s;
}

.out {
  animation: slide 0.3s reverse;
}

@keyframes slide {
  0% {
    transform: translate3d(0, 100%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
