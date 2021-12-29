<template>
  <scroll class='list-wrap' probe-type='3' ref='scrollRef' :bounce='true' @scroll='onScroll'>
    <div class='wrap-bg'>
      <div class='header'>音乐列表
        <div class='operate' @click='onPlayModeType'>
          <span class='word'>{{ calcCurrPlayModeType }}</span>
          <i class='icon shunxu' ref='playModeTypeRef'></i>
        </div>
      </div>
      <div class='content'>
        <div class='item' v-for='item in list' :key='item.id' @click='onSelectItem(item)'>
          <div class='pic' v-if='isPic'>
            <img ref='pic' v-lazy='item.al.picUrl'>
          </div>
          <div class='desc'>
            <h4 class='name' :class='{active: currentSong.id === item.id}'>{{ item.name }}</h4>
            <h4 class='sub-name'>{{ item.ar[0].name }} - {{ item.al.name }}</h4>
          </div>
        </div>
      </div>
    </div>
    <mini-player-box></mini-player-box>
  </scroll>
</template>

<script>
import Scroll from '@/components/scroll/scroll'
import { ref } from 'vue'
import { useStore } from 'vuex'
import MiniPlayerBox from '@/components/mini-player-box/mini-player-box'
import usePlayModeType from '@/components-block/player/use-play-mode-type'
import usePlaySong from '@/components-block/player/use-play-song'
import usePlayState from '@/components-block/player/use-play-state'
import useSongDetail from '@/components-block/player/use-song-detail'
import usePlayMusic from '@/views/user/use-play-music'

export default {
  name: 'detail-list',
  props: ['list', 'isPic'],
  emits: ['scroll'],
  components: {
    MiniPlayerBox,
    Scroll
  },
  setup(props, { emit }) {
    const store = useStore()
    const pic = ref(null)
    const onScroll = (e) => {
      emit('scroll', e)
    }
    // 播放状态
    usePlayState({})
    const { playListToId } = usePlayMusic()
    const onSelectItem = async (item) => {
      const copyList = JSON.parse(JSON.stringify(props.list))
      copyList.forEach(song => {
        song.picUrl = song.al.picUrl
        song.singer = song.ar.map(it => it.name).join(' ')
      })
      await playListToId(copyList, item.id)
    }
    // 当前播放类型
    const playModeTypeRef = ref(null)
    const {
      calcCurrPlayModeType
    } = usePlayModeType({ playModeTypeRef })
    const { playSongs } = usePlaySong()
    const onPlayModeType = async () => {
      await playSongs(props.list)
      store.commit('setFullScreen', true)
    }
    // 当前播放信息
    const { currentSong } = useSongDetail()
    return {
      onScroll,
      pic,
      onSelectItem,
      playModeTypeRef,
      calcCurrPlayModeType,
      onPlayModeType,
      currentSong
    }
  }
}
</script>

<style scoped lang='scss'>
.list-wrap {
  position: fixed;
  top: 496px;
  // left: 0;
  left: calc(50% - 5rem);
  width: 10rem;
  bottom: 0;

  .wrap-bg {
    background: #26303c;
    padding: 32px;
    min-height: calc(100vh - 496px);
    box-sizing: border-box;
  }

  .header {
    font-size: 30px;
    color: $color-sub;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .operate {
      border: 1px solid #9fa2ac;
      height: 54px;
      padding: 0 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $color-light;
      border-radius: 22px;
      font-size: $font-size-medium;
      font-weight: normal;

      .word {
        font-weight: bold;
        margin-right: 10px;
      }

      .icon {
        width: 28px;
        height: 28px;
        display: inline-block;
        background-size: cover;

        &.shunxu {
          @include bg-image('~@/assets/imgs/mode-type-1');
        }

        &.single {
          @include bg-image('~@/assets/imgs/mode-type-2');
        }

        &.random {
          @include bg-image('~@/assets/imgs/mode-type-3');
        }
      }
    }
  }

  .content {
    margin-top: 16px;

    .item {
      display: flex;
      padding: 16px 0;

      .pic {
        flex-shrink: 0;
        width: 120px;
        height: 120px;
        border-radius: 30px;
        overflow: hidden;
        margin-right: 16px;

        img {
          width: 100%;
        }
      }

      .desc {
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        height: 120px;
        align-content: center;

        .name {
          width: 100%;
          height: 24px;
          color: $color-light;
          font-size: $font-size-medium;
          @include clamp(1);
          &.active {
            color: $color-main;
          }
        }

        .sub-name {
          margin-top: 16px;
          width: 100%;
          height: 24px;
          color: $color-sub;
          font-size: $font-size-medium;
          @include clamp(1);
        }
      }
    }
  }
}
</style>
