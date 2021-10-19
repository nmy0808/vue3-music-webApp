<template>
  <div class='list-box'>
    <transition @enter='onEnter' @leave='onLeave'>
      <div class='mini-list-wrap container' v-show='isShow'>
        <div class='header'>
          <span @click='togglePlayModeType'>随机播放</span>
          <i class='icon-type shunxu' ref='playModeTypeRef' @click='togglePlayModeType'></i>
          <i class='icon-close' @click='onClose'></i>
        </div>
        <scroll class='mini-scroll container' :bounce='true'>
          <div class='item'>
            <div class='desc'>
              <h4 class='name'>夜曲</h4>
              <h4 class='sub'>周杰伦</h4>
            </div>
            <i class='icon-del'></i>
            <i class='icon-fav'></i>
          </div>
        </scroll>
      </div>
    </transition>
    <div class='mask' v-show='isShow' @click='onClose'></div>
  </div>
</template>

<script>
import Scroll from '@/components/scroll/scroll'
import { gsap } from 'gsap'
import { ref } from 'vue'
import usePlayModeType from '@/components-block/player/use-play-mode-type'

export default {
  name: 'mini-paly-list',
  props: ['isShow'],
  components: {
    Scroll
  },
  methods: {
    onClose() {
      this.$parent.isShow = false
    }
  },
  setup() {
    const onEnter = (el, next) => {
      gsap.fromTo(el, {
        y: '100%'
      }, {
        y: 0,
        duration: 0.3,
        force3D: true,
        onComplete: next
      })
    }
    const onLeave = (el, next) => {
      gsap.fromTo(el, {
        y: '0'
      }, {
        y: '100%',
        duration: 0.3,
        force3D: true,
        onComplete: next
      })
    }
    // 播放类型
    const playModeTypeRef = ref(null)
    const { togglePlayModeType } = usePlayModeType({ playModeTypeRef })
    return {
      onEnter,
      onLeave,
      playModeTypeRef,
      togglePlayModeType
    }
  }
}
</script>

<style scoped lang='scss'>
.mini-list-wrap {
  height: 55vh;
  width: 100%;
  position: fixed;
  bottom: 132px;
  left: 0;
  z-index: -10;
  background: #26303c;

  .header {
    display: flex;
    align-items: center;
    font-size: 30px;
    color: $color-sub;
    height: 100px;
    box-sizing: border-box;
    margin-top: 10px;

    .icon-type {
      display: block;
      width: 50px;
      height: 50px;
      background-size: cover;
      margin-left: 2px;

      &.shunxu {
        @include bg-image('~@/assets/imgs/mode-sub-type-1');
      }

      &.single {
        @include bg-image('~@/assets/imgs/mode-sub-type-2');
      }

      &.random {
        @include bg-image('~@/assets/imgs/mode-sub-type-3');
      }
    }

    .icon-close {
      display: block;
      width: 32px;
      height: 32px;
      margin-left: auto;
      @include bg-image('~@/assets/imgs/close_btn');
      background-position: 1px center;
      background-size: cover;
    }
  }

  .mini-scroll {
    position: absolute;
    top: 100px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    color: #232F3C;

    .item {
      &:first-of-type {
        margin-top: 15px;
      }

      padding-bottom: 32px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .name {
        color: $color-light;
        font-size: $font-size-medium;
      }

      .sub {
        color: $color-sub;
        font-size: $font-size-medium;
        margin-top: 16px;
      }

      .icon-del {
        margin-left: auto;
        margin-right: 32px;
        @include bg-image('~@/assets/imgs/del-small');
      }

      .icon-fav {
        @include bg-image('~@/assets/imgs/fav-small');

        &.active {
          @include bg-image('~@/assets/imgs/fav-sub-small-active');
        }
      }

      .icon-del, .icon-fav {
        display: inline-block;
        width: 28px;
        height: 28px;
        background-size: cover;
      }
    }
  }
}

.mask {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -12;
  background: #000000;
  opacity: 0.7;
}
</style>
