<template>
  <div class='mini-box'>
    <div class='mini-wrap container'>
      <div class='pic' @click='onFullScreen'>
        <img
          src='https://images.unsplash.com/photo-1634370058500-ebaeece3e395?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
          alt=''>
      </div>
      <div class='desc' @click='onFullScreen'>
        <h4 class='name'>夜曲</h4>
        <h4 class='sub'>周结论</h4>
      </div>
      <div class='control'>
        <i class='icon-play'></i>
        <i class='icon-list' @click='onToggleShow'></i>
      </div>
    </div>
    <mini-play-list :is-show='isShow'></mini-play-list>
  </div>
</template>

<script>
import MiniPlayList from '@/components-block/player/mini-play-list'
import { nextTick, ref } from 'vue'
import { useStore } from 'vuex'

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

    return {
      isShow,
      onToggleShow,
      onFullScreen
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
  z-index: 100;
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

    img {
      width: 100%;
    }
  }

  .desc {
    margin-left: 22px;

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
