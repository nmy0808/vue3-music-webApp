<template>
    <div class='player-wrap'>
      <sub-header class='player-header'>
        <template #left>
          <i class='icon-back' @click='onCloseFullScreen'></i>
        </template>
        <div class='player-box'>
          <div class='name'>一路向北</div>
          <div class='singer'>周杰伦</div>
        </div>
      </sub-header>
      <div class='scroll-wrap' ref='scrollWrapRef'>
        <div class='scroll-inner'>
          <div class='item'>
            <big-circle-cover class='big-cover-wrap'
                              pic-url='https://images.unsplash.com/photo-1634370058500-ebaeece3e395?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'></big-circle-cover>
            <div class='left-lyrics'>我是一段歌词</div>
          </div>
          <div class='item'>
            <!--右侧歌词-->
            <scroll class='right-lyrics'>
              我是歌词...
            </scroll>
          </div>
        </div>
      </div>
      <div class='dot-wrap'>
        <span class='dot-item' :class='{active: index===currentIndex}' v-for='(item,index) in 2' :key='index'></span>
      </div>
      <div class='player-bottom-wrap container'>
        <div class='player-top'>
          <div class='begin-time'>00:00</div>
          <div class='progress-wrap'>
            <div class='progress-line'></div>
          </div>
          <div class='over-time'>04:00</div>
        </div>
        <div class='player-control'>
          <i class='icon-type'>随机</i>
          <i class='icon-pre'></i>
          <i class='icon-playing'></i>
          <i class='icon-next'></i>
          <i class='icon-fav'>收藏</i>
        </div>
      </div>
      <img class='player-bg'
           src='https://images.unsplash.com/photo-1634370058500-ebaeece3e395?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
           alt=''>
    </div>
</template>

<script>
// 常规播放界面
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import { ref, onMounted } from 'vue'
import SubHeader from '@/components/header/sub-header'
import BigCircleCover from '@/components/cover/big-circle-cover'
import Scroll from '@/components/scroll/scroll'
import { useStore } from 'vuex'

BScroll.use(Slide)

export default {
  name: 'normal-player',
  components: {
    Scroll,
    BigCircleCover,
    SubHeader
  },
  setup() {
    const store = useStore()
    const scrollWrapRef = ref(null)
    const bsRef = ref(null)
    const currentIndex = ref(0)
    const onCloseFullScreen = () => {
      store.commit('setFullScreen', false)
    }

    onMounted(() => {
      bsRef.value = new BScroll(scrollWrapRef.value, {
        scrollX: true,
        scrollY: false,
        probeType: 3,
        slide: {
          loop: false,
          autoplay: false
        }
      })
      bsRef.value.on('slideWillChange', ({ pageX }) => {
        currentIndex.value = pageX
      })
    })
    return {
      scrollWrapRef,
      currentIndex,
      onCloseFullScreen,
    }
  }
}
</script>

<style scoped lang='scss'>
.player-wrap {
  height: 100%;
  width: 100vw;
  background: #000;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  .dot-wrap {
    position: fixed;
    left: 0;
    bottom: 26%;
    text-align: center;
    width: 100%;

    .dot-item {
      display: inline-block;
      width: 10px;
      height: 10px;
      background: #fff;
      border-radius: 50%;
      margin: 5px;

      &.active {
        width: 20px;
        border-radius: 4px;
        background: $color-main;
      }
    }
  }

  .player-bottom-wrap {
    position: absolute;
    bottom: 7%;
    left: 0;

    .player-top {
      display: flex;
      height: 10px;
      justify-content: space-between;
      align-items: center;
      color: #ffffff50;
      font-size: $font-size-small;

      .progress-wrap {
        width: 70%;
        height: 3px;
        background: rgba(#fff,0.3);
        margin: 0 auto;
        position: relative;

        .progress-line {
          position: absolute;
          left: 0;
          top: 0;
          width: 10%;
          height: 100%;
          background: $color-main;

          &::after {
            content: '';
            position: absolute;
            @extend .center-v;
            right: 0;
            margin-right: -6.5;
            background: $color-main;
            width: 13px;
            height: 13px;
            border-radius: 50%;
            box-shadow: 0px 0px 8px 0px #E35807;
          }
        }
      }
    }

    .player-control {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 50px;

      .icon-type {
        width: 29px;
        height: 29px;
      }

      .icon-type {
        width: 29px;
        height: 29px;
      }

      .icon-pre {
        width: 64px;
        height: 64px;
        @include bg-image('~@/assets/imgs/prev-btn');
        background-size: cover;
        border-radius: 50%;
      }

      .icon-playing {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: $color-main;
        box-shadow: 0px 2px 28px 4px rgba(242, 95, 9, 0.7);
      }

      .icon-next {
        width: 64px;
        height: 64px;
        @include bg-image('~@/assets/imgs/next-btn');
        background-size: cover;
        border-radius: 50%;
      }

      .icon-fav {
        width: 29px;
        height: 29px;
      }
    }
  }
}

.player-header {
  z-index: 10;

  .icon-back {
    display: inline-block;
    width: 40px;
    height: 40px;
    background: url("~@/assets/imgs/icon-bottom.png");
    background-size: cover;
  }

  .player-box {
    text-align: center;

    .name {
      font-size: $font-size-large;
      color: $color-light;
    }

    .singer {
      margin-top: 4px;
      font-size: $font-size-large;
      color: $color-light;
    }
  }
}

.scroll-wrap {
  position: fixed;
  top: 180px;
  bottom: 400px;
  left: 0;
  right: 0;
  z-index: 4;
  overflow: hidden;
}

.scroll-inner {
  display: flex;
  flex-wrap: nowrap;

  .big-cover-wrap {
    margin: 0 auto;
  }

  .left-lyrics {
    color: $color-light;
    opacity: 0.5;
    text-align: center;
    margin-top: 90px;
    font-size: $font-size-medium;
  }
}

.item {
  flex-shrink: 0;
  width: 100vw;
  height: 100%;
  overflow: hidden;

  .right-lyrics {
    height: 660px;
    width: 100%;
    color: $color-light;
    opacity: 0.5;
    text-align: center;
    margin-top: 90px;
    font-size: $font-size-medium;
    // 当前歌词
    .active {
      color: $color-main;
      opacity: 1;
    }
  }
}

.player-bg {
  width: 100vw;
  height: 100vh;
  filter: blur(20px);
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;

}

.xxx {
  width: 100%;
  border: 1px solid;
  height: 100px;
}
</style>
