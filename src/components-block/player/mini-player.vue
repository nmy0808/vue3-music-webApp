<template>
  <div class='mini-box'>
    <div class='mini-wrap container'>
      <div class='pic'>
        <img
          src='https://images.unsplash.com/photo-1634370058500-ebaeece3e395?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
          alt=''>
      </div>
      <div class='desc'>
        <h4 class='name'>夜曲</h4>
        <h4 class='sub'>周结论</h4>
      </div>
      <div class='control'>
        <i class='icon-play'></i>
        <i class='icon-list' @click='onToggleShow'>列表</i>
      </div>
    </div>
    <mini-play-list :is-show='isShow'></mini-play-list>
  </div>
</template>

<script>
import MiniPlayList from '@/components-block/player/mini-play-list'
import { ref } from 'vue'

export default {
  name: 'mini-player',
  components: { MiniPlayList },
  setup() {
    const isShow = ref(false)
    const onToggleShow = () => {
      isShow.value = !isShow.value
    }
    return {
      isShow,
      onToggleShow
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
  left: 0;
  bottom: 0;
  z-index: 4;
  background: #24303D;
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
      @include bg-image('~@/assets/imgs/play-bar-btn')
    }

    .icon-list {
      margin-left: 60px;
    }

    .icon-play, .icon-list {
      display: inline-block;
      width: 54px;
      height: 54px;
      background-size: cover;
    }
  }

}
</style>
