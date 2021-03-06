<template>
  <div class='player-wrap'>
    <sub-header class='player-header'>
      <template #left>
        <i class='icon-back' @click='onCloseFullScreen'></i>
      </template>
      <div class='player-box'>
        <div class='name'>{{ currentSong.name }}</div>
        <div class='singer'>{{ currentSong.singer }}</div>
      </div>
    </sub-header>
    <div class='scroll-wrap' ref='scrollWrapRef'>
      <div class='scroll-inner'>
        <div class='item'>
          <big-circle-cover class='big-cover-wrap'
                            :pic-url='currentSong.picUrl'></big-circle-cover>
          <!--左侧歌词-->
          <template v-for='(item, index) in currentLyric' :key='index'>
            <div class='left-lyrics' v-if='lyricIndex === index'>
              <p>{{ item }}</p>
            </div>
          </template>

        </div>
        <div class='item'>
          <!--右侧歌词-->
          <scroll class='right-lyrics' ref='rightScrollRef'>
            <p class='lyric-item' :class='{active:lyricIndex === index}' v-for='(item, index) in currentLyric'
               :key='index'>{{ item }}</p>
            <div class='lyric-item-box'></div>
          </scroll>
        </div>
      </div>
    </div>
    <div class='dot-wrap'>
      <span class='dot-item' :class='{active: index===currentIndex}' v-for='(item,index) in 2' :key='index'></span>
    </div>
    <div class='player-bottom-wrap container'>
      <div class='player-top'>
        <div class='begin-time'>{{ formatCurrentTime }}</div>
        <div class='progress-wrap'>
          <div class='progress-line' :style='{width: formatPercent}'></div>
          <div class='progress-line-touch-wrap' @click='onClickProgress' ref='progressWrapRef'></div>
        </div>
        <div class='over-time'>{{ formatTotalTime }}</div>
      </div>
      <div class='player-control'>
        <i class='icon-type shunxu' ref='playModeTypeRef' @click='togglePlayModeType'></i>
        <i class='icon-pre' @click='prevPlay'></i>
        <i class='icon-playing' @click='togglePlayState' ref='playRef'></i>
        <i class='icon-next' @click='nextPlay'></i>
        <i class='icon-fav' :class='{active: judgeCurrentFavState(currentSong)}'
           @click='toggleFavState(currentSong)'></i>
      </div>
    </div>
    <img class='player-bg'
         :src='currentSong.picUrl'
         alt=''>
    <div class='mask'></div>
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
import usePlayState from './use-play-state'
import usePlayModeType from './use-play-mode-type'
import useSongDetail from '@/components-block/player/use-song-detail'
import useAudioTime from '@/components-block/player/use-audio-time'
import useTouchEvent from './use-touch-event'
import useFavorite from './use-favorite'
import useLyric from './use-lyric'

BScroll.use(Slide)

export default {
  name: 'normal-player',
  components: {
    Scroll,
    BigCircleCover,
    SubHeader
  },
  props: ['prev-play', 'next-play'],
  setup() {
    const store = useStore()
    const scrollWrapRef = ref(null)
    const bsRef = ref(null)
    const currentIndex = ref(0)
    const onCloseFullScreen = () => {
      store.commit('setFullScreen', false)
    }
    // 按钮状态
    const playRef = ref(null)
    const { togglePlayState } = usePlayState({
      playRef
    })
    // 播放类型
    const playModeTypeRef = ref(null)
    const { togglePlayModeType } = usePlayModeType({ playModeTypeRef })
    // 当前歌曲信息
    const { currentSong } = useSongDetail()
    // 当前歌曲时间信息, 比例
    const {
      formatTotalTime,
      formatCurrentTime,
      percent,
      formatPercent,
      setCurrentPercent
    } = useAudioTime()
    // 滚动条事件
    const progressWrapRef = ref(null)
    const { onClickProgress } = useTouchEvent({ progressWrapRef })
    // 收藏
    const {
      toggleFavState,
      judgeCurrentFavState
    } = useFavorite()
    // 歌词
    const {
      rightScrollRef,
      currentLyric,
      lyricIndex
    } = useLyric()
    //
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
      playRef,
      togglePlayState,
      playModeTypeRef,
      togglePlayModeType,
      currentSong,
      formatTotalTime,
      formatCurrentTime,
      percent,
      formatPercent,
      setCurrentPercent,
      onClickProgress,
      progressWrapRef,
      toggleFavState,
      judgeCurrentFavState,
      rightScrollRef,
      currentLyric,
      lyricIndex
    }
  }
}
</script>

<style scoped lang='scss'>
.player-wrap {
  height: 100%;
  width: 750px;
  background: #000;
  position: fixed;
  top: 0;
  left: calc(50% - 5rem);
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

      .begin-time, .over-time {
        width: 90px;
        display: flex;
        justify-content: center;
      }

      .progress-wrap {
        width: 480px;
        height: 3px;
        background: rgba(#fff, 0.3);
        margin: 0 auto;
        position: relative;

        .progress-line {
          position: absolute;
          left: 0;
          top: 0;
          width: 0%;
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

        .progress-line-touch-wrap {
          position: absolute;
          left: 0;
          top: 0;
          transform: translate3d(0, -50%, 0);
          width: 480px;
          height: 80px;
          z-index: 2;
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
        width: 50px;
        height: 50px;

        &.shunxu {
          @include bg-image('~@/assets/imgs/mode-type-1');
          background-size: cover;
        }

        &.single {
          @include bg-image('~@/assets/imgs/mode-type-2');
          background-size: cover;
        }

        &.random {
          @include bg-image('~@/assets/imgs/mode-type-3');
          background-size: cover;
        }
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
        @include bg-image('~@/assets/imgs/play_btn');
        background-color: $color-main;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 40px 40px;
        box-shadow: 0px 2px 28px 4px rgba(242, 95, 9, 0.7);

        &.pause {
          @include bg-image('~@/assets/imgs/pause_btn');
        }
      }

      .icon-next {
        width: 64px;
        height: 64px;
        @include bg-image('~@/assets/imgs/next-btn');
        background-size: cover;
        border-radius: 50%;
      }

      .icon-fav {
        width: 50px;
        height: 50px;
        @include bg-image('~@/assets/imgs/fav-small-main');
        background-size: 40px 40px;
        background-position: center;
        background-repeat: no-repeat;

        &.active {
          @include bg-image('~@/assets/imgs/fav-small-active');
        }
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
    padding:32px;
    box-sizing: border-box;
    .name {
      font-size: $font-size-large;
      color: $color-light;
      @include clamp(1);
    }

    .singer {
      margin-top: 4px;
      font-size: $font-size-large;
      color: $color-light;
      @include clamp(1);
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
    margin: 90px auto 0;
    font-size: $font-size-medium;
    @include clamp(1);
    width: 80vw;
    line-height: 40px;
  }

  .lyric-item-box {
    height: 30vh;
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

  }

  .lyric-item {
    size: $font-size-small;
    height: 80px;
    line-height: 80px;
    @include clamp(1);

    &.active {
      // 当前歌词
      color: $color-main;
      opacity: 1;
      font-weight: bold;
    }
  }
}

.player-bg {
  height: 100vh;
  filter: blur(40px);
  position: fixed;
  top: 0;
  left: calc(50% - 5rem);
  z-index: -2;
  width: 750px;
}

.mask {
  width: 750px;
  height: 100vh;
  background: #000;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.6;
  z-index: -1;
}
</style>
