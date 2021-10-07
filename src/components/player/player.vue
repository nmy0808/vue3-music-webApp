<template>
  <div
    class='player'
    v-if='playlist.length'
  >
    <transition
      @enter='onEnter'
      @after-enter='onAfterEnter'
      @leave='onLeave'
      @after-leave='onAfterLeave'
      name='normal'
    >
      <div
        v-show='fullScreen'
        class='normal-player'
      >
        <div class='background'>
          <!--          封面-->
          <img :src='currentCover'>
        </div>
        <div class='top'>
          <div
            class='back'
          >
            <i class='icon-back' @click='onCancelFullScreen'></i>
          </div>
          <h1 class='title'>{{ currentName }}</h1>
          <h2 class='subtitle'>{{ currentSinger }}</h2>
        </div>
        <div
          class='middle'
          @touchstart='onMiddleTouchStart'
          @touchmove='onMiddleTouchMove'
          @touchend='onMiddleTouchEnd'
          :style='middleLeftStyle'
        >
          <div
            class='middle-l'
            dddddd='暂时隐藏'
          >
            <div
              ref='cdWrapperRef'
              class='cd-wrapper'
              :style='cdWrapStyle'
              cd-wrapper
            >
              <div
                :key='currentIndex'
                ref='cdRef'
                class='cd'
              >
                <img
                  ref='cdImageRef'
                  class='image'
                  :src='currentCover'>
              </div>
            </div>
            <div class='playing-lyric-wrapper'>
              <div class='playing-lyric'>{{ currentlyricLine }}</div>
            </div>
          </div>
          <scroll
            @scroll='onLyricScroll'
            @scroll-end='onLyricScrollEnd'
            :probe-type='3'
            class='middle-r'
            ref='lyricScrollRef'
          >
            <div dddddd='scroll包裹元素'>
              <div class='lyric-wrapper'>
                <div v-if='currentLyric' ref='lyricListRef'>
                  <p
                    class='text'
                    :class='{current : index === currentLineNum}'
                    v-for='(line,index) in currentLyric.lines'
                    :key='line.num'
                  >
                    {{ line.txt }}
                  </p>
                </div>
                <!--              <div class='pure-music' v-show='pureMusicLyric'>-->
                <!--                <p>{{ pureMusicLyric }}</p>-->
                <!--              </div>-->
              </div>
            </div>
          </scroll>
        </div>
        <div class='bottom'>
          <div class='dot-wrapper'>
            <span class='dot' :class='{active: currentMiddleShow==="cover"}'></span>
            <span class='dot' :class='{active: currentMiddleShow==="lyric"}'></span>
          </div>
          <div class='progress-wrapper'>
            <span class='time time-l'>{{ currentPlayingTime }}</span>
            <div class='progress-bar-wrapper'>
              <!--              @progress-click='onProgressClick' progress-click-->
              <progress-bar
                ref='barRef'
                :progress='currentProgress'
                @progress-changing='onProgressChanging'
                @progress-changed='onProgressChanged'
                @progress-click='onProgressClick'
              ></progress-bar>
            </div>
            <span class='time time-r'>{{ currentTotalTime }}</span>
          </div>
          <div class='operators'>
            <div class='icon i-left'>
              <i :class='playModeIconClass' @click='onSwitchPlayMode'></i>
            </div>
            <div class='icon i-left'>
              <i class='icon-prev' @click='onPrev'></i>
            </div>
            <div class='icon i-center'>
              <i :class='playIconClass' @click='onSwitchPlayState'></i>
            </div>
            <div class='icon i-right'>
              <i class='icon-next' @click='onNext'></i>
            </div>
            <div class='icon i-right'>
              <i :class='currentFavoriteClass' @click='onSwitchFavorite'></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <mini-player :progress='currentProgress' :toggle-play='onSwitchPlayState'
                 :prev-play='onPrev' :next-play='onNext' />
    <audio ref='audioRef'
           @timeupdate='onUpdateTime'
           @canplay='onCanplay'
           @error='onPlayError'
           @pause='onPlayPause'
           @ended='onPlayEnded'
    ></audio>
  </div>
</template>
<script>
import progressBar from './progress-bar'
import usePlay from './use-paly'
import useCd from './use-cd'
import useLyric from './use-lyric'
import useMiddleSwitchAni from './use-middle-switch-animation'
import useCoverAni from './use-cover-animation'
import Scroll from '@/components/base/scroll/scroll'
import MiniPlayer from './mini-player'

export default {
  name: 'MPlayer',
  components: {
    Scroll,
    progressBar,
    MiniPlayer
  },
  setup() {
    const {
      audioRef,
      sequenceList,
      playlist,
      playing,
      playMode,
      currentIndex,
      fullScreen,
      favoriteList,
      currentName,
      currentSinger,
      currentCover,
      currentTime,
      currentTotalTime,
      currentFavoriteClass,
      currentPlayingTime,
      currentProgress,
      playIconClass,
      playModeIconClass,
      onSwitchPlayMode,
      onCancelFullScreen,
      onSwitchPlayState,
      onSwitchFavorite,
      onNext,
      onPrev,
      onCanplay,
      onPlayError,
      onPlayPause,
      onUpdateTime,
      onProgressChanging,
      onProgressChanged,
      onProgressClick,
      onPlayEnded,
      operateStateClass,
      isCanplay
    } = usePlay()
    const {
      cdRef,
      cdImageRef
    } = useCd()
    const {
      currentLyric,
      currentlyricLine,
      lyricScrollRef,
      lyricListRef,
      currentLineNum,
      onLyricScroll,
      onLyricScrollEnd
    } = useLyric({ currentTime , isCanplay})
    const {
      currentMiddleShow,
      onMiddleTouchStart,
      onMiddleTouchMove,
      onMiddleTouchEnd,
      middleLeftStyle
    } = useMiddleSwitchAni()
    const {
      cdWrapStyle,
      cdWrapperRef,
      onEnter,
      onAfterEnter,
      onLeave,
      onAfterLeave
    } = useCoverAni()
    return {
      audioRef,
      sequenceList,
      playlist,
      playing,
      playMode,
      currentIndex,
      fullScreen,
      favoriteList,
      currentFavoriteClass,
      currentName,
      currentSinger,
      currentCover,
      currentTime,
      currentTotalTime,
      currentProgress,
      currentPlayingTime,
      playIconClass,
      playModeIconClass,
      onSwitchPlayMode,
      onCancelFullScreen,
      onSwitchPlayState,
      onSwitchFavorite,
      onNext,
      onPrev,
      onCanplay,
      onPlayError,
      onPlayPause,
      onUpdateTime,
      onProgressChanging,
      onProgressChanged,
      onProgressClick,
      onPlayEnded,
      operateStateClass,
      cdRef,
      cdImageRef,
      currentLyric,
      currentlyricLine,
      currentLineNum,
      lyricScrollRef,
      lyricListRef,
      onLyricScroll,
      onLyricScrollEnd,
      currentMiddleShow,
      onMiddleTouchStart,
      onMiddleTouchMove,
      onMiddleTouchEnd,
      middleLeftStyle,
      onEnter,
      onAfterEnter,
      onLeave,
      onAfterLeave,
      cdWrapperRef,
      cdWrapStyle
    }
  }
}
</script>

<style lang='scss' scoped>
.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;

    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);

      img {
        width: 100%;
        height: 100%;
      }
    }

    .top {
      position: relative;
      margin-bottom: 25px;

      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
      }

      .icon-back {
        display: block;
        padding: 9px;
        font-size: $font-size-large-x;
        color: $color-theme;
        transform: rotate(-90deg);
      }

      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        @include no-wrap();
        font-size: $font-size-large;
        color: $color-text;
      }

      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
      }
    }

    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;

      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;

        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          box-sizing: border-box;
          height: 100%;

          .cd {
            width: 100%;
            height: 100%;
            border-radius: 50%;

            img {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border-radius: 50%;
              border: 10px solid rgba(255, 255, 255, 0.1);
            }

            .playing {
              animation: rotate 20s linear infinite
            }
          }
        }

        .playing-lyric-wrapper {
          width: 80%;
          margin: 30px auto 0 auto;
          overflow: hidden;
          text-align: center;

          .playing-lyric {
            height: 20px;
            line-height: 20px;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
        }
      }

      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;

          .text {
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;

            &.current {
              color: $color-text;
            }
          }

          .pure-music {
            padding-top: 50%;
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;
          }
        }
      }
    }

    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;

      .dot-wrapper {
        text-align: center;
        font-size: 0;

        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: $color-text-l;

          &.active {
            width: 20px;
            border-radius: 5px;
            background: $color-text-ll;
          }
        }
      }

      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;

        .time {
          color: $color-text;
          font-size: $font-size-small;
          flex: 0 0 40px;
          line-height: 30px;
          width: 40px;

          &.time-l {
            text-align: left;
          }

          &.time-r {
            text-align: right;
          }
        }

        .progress-bar-wrapper {
          flex: 1;
        }
      }

      .operators {
        display: flex;
        align-items: center;

        .icon {
          flex: 1;
          color: $color-theme;

          &.disable {
            color: $color-theme-d;
          }

          i {
            font-size: 30px;
          }
        }

        .i-left {
          text-align: right;
        }

        .i-center {
          padding: 0 20px;
          text-align: center;

          i {
            font-size: 40px;
          }
        }

        .i-right {
          text-align: left
        }

        .icon-favorite {
          color: $color-sub-theme;
        }
      }
    }

    &.normal-enter-active, &.normal-leave-active {
      transition: all .6s;

      .top, .bottom {
        transition: all .6s cubic-bezier(0.45, 0, 0.55, 1);
      }
    }

    &.normal-enter-from, &.normal-leave-to {
      opacity: 0;

      .top {
        transform: translate3d(0, -100px, 0);
      }

      .bottom {
        transform: translate3d(0, 100px, 0)
      }
    }
  }
}
</style>
