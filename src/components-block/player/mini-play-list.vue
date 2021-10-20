<template>
  <div class='list-box'>
    <transition @enter='onEnter' @leave='onLeave'>
      <div class='mini-list-wrap container' v-show='isShow'>
        <div class='header' @click='togglePlayModeType'>
          <span>{{ calcCurrPlayModeType }}</span>
          <i class='icon-type shunxu' ref='playModeTypeRef'></i>
          <!--          <i class='icon-close' @click='onClose'></i>-->
          <i class='icon-del' @click='onRemoveAllSong'></i>
        </div>
        <scroll class='mini-scroll container' ref='scrollRef' :bounce='true'>
          <div class='item' v-for='item in songs' :key='item.id' @click='onSelectItem(item)'>
            <div class='desc'>
              <h4 class='name' :class='{active: currentSong.id === item.id}'>{{ item.name }}</h4>
              <h4 class='sub'>{{ item.singer }}</h4>
            </div>
            <i class='icon-del' @click.stop='onRemoveSingleSong(item)'></i>
            <i class='icon-fav' :class='{active: judgeCurrentFavState(item)}' @click.stop='toggleFavState(item)'></i>
          </div>
          <mini-player-box></mini-player-box>
        </scroll>
        <div class='btn-close' @click='onClose'>关闭</div>
      </div>
    </transition>
    <div class='mask' v-show='isShow' @click='onClose'></div>
  </div>
</template>

<script>
import Scroll from '@/components/scroll/scroll'
import { gsap } from 'gsap'
import { nextTick, ref, watch } from 'vue'
import usePlayModeType from '@/components-block/player/use-play-mode-type'
import useSongDetail from '@/components-block/player/use-song-detail'
import usePlayState from '@/components-block/player/use-play-state'
import userPlaySong from './use-play-song'
import { useStore } from 'vuex'
import MiniPlayerBox from '@/components/mini-player-box/mini-player-box'
import useFavorite from './use-favorite'

export default {
  name: 'mini-paly-list',
  props: ['isShow'],
  emits: ['show'],
  components: {
    MiniPlayerBox,
    Scroll
  },
  methods: {
    onClose() {
      this.$parent.isShow = false
    }
  },
  setup(props, { emit }) {
    const store = useStore()
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
    const {
      calcCurrPlayModeType,
      togglePlayModeType
    } = usePlayModeType({ playModeTypeRef })
    // 歌曲信息
    const {
      songs,
      currentSong
    } = useSongDetail()
    // 根据songs刷新scroll
    const scrollRef = ref(null)
    watch(() => props.isShow, () => {
      nextTick(() => {
        scrollRef.value.refresh()
      })
    })
    // 播放状态
    const { setPlayState } = usePlayState({})
    // 点击item播放全屏
    const onSelectItem = async (item) => {
      emit('show', false)
      await store.dispatch('getSongDetail', item.id)
      store.commit('setFullScreen', true)
      setPlayState(true)
    }
    // 删除歌曲
    const {
      removeSong,
      clearSong
    } = userPlaySong()
    const onRemoveSingleSong = (item) => {
      removeSong(item.id)
    }
    const onRemoveAllSong = () => {
      emit('show', false)
      setTimeout(() => clearSong(), 100)
    }
    // 收藏
    const {
      toggleFavState,
      judgeCurrentFavState
    } = useFavorite()
    return {
      onEnter,
      onLeave,
      playModeTypeRef,
      togglePlayModeType,
      calcCurrPlayModeType,
      songs,
      scrollRef,
      onSelectItem,
      onRemoveSingleSong,
      onRemoveAllSong,
      currentSong,
      toggleFavState,
      judgeCurrentFavState
    }
  }
}
</script>

<style scoped lang='scss'>
.mini-list-wrap {
  height: 70vh;
  width: 100%;
  position: fixed;
  bottom: 0px;
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

    .icon-del {
      display: inline-block;
      width: 28px;
      height: 28px;
      background-size: cover;
      margin-left: auto;
      @include bg-image('~@/assets/imgs/del-small');
    }

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
        margin-top: 25px;
      }

      padding-bottom: 32px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .name {
        color: $color-light;
        font-size: $font-size-medium;

        &.active {
          color: $color-main;
        }
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

.btn-close {
  height: 100px;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  background: $color-main;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $color-light;
  font-size: $font-size-large;
}
</style>
