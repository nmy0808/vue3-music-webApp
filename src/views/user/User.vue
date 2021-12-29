<template>
  <transition name='slide' appear>
    <div class='container user-wrap global-bg'>
      <sub-header>
        <div class='tab-wrap'>
          <div class='item' :class='{active: selected === 0}' @click='onChangeSelect(0)'>我喜欢的</div>
          <div class='item' :class='{active: selected === 1}' @click='onChangeSelect(1)'>最近听的</div>
        </div>
      </sub-header>
      <div class='play-btn' @click='onSelectAll'>
        播放全部
        <i class='icon' :class='playModeTypeClass' ref='playModeTypeRef'></i>
      </div>
      <scroll class='user-scroll-wrap container'>
        <user-list v-if='currentList.length' :list='currentList' @select='onSelectItem'></user-list>
      </scroll>
    </div>
  </transition>
</template>

<script>
import SubHeader from '@/components/header/sub-header'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import playModeType from '@/store/play-mode-type'
import UserList from '@/components-block/user/user-list'
import Scroll from '@/components/scroll/scroll'
import usePlayMusic from '@/views/user/use-play-music'

export default {
  name: 'User',
  components: {
    Scroll,
    UserList,
    SubHeader
  },
  setup() {
    const store = useStore()
    const selected = ref(0)
    const onChangeSelect = (index) => {
      selected.value = index
    }
    // 播放模式
    const currentPlayModeType = computed(() => store.getters.getPlayModeType)
    const playModeTypeClass = computed(() => {
      let className = ''
      if (currentPlayModeType.value === playModeType.SHUNXU) {
        className = 'shunxu'
      }
      if (currentPlayModeType.value === playModeType.SINGLE) {
        className = 'single'
      }
      if (currentPlayModeType.value === playModeType.RANDOM) {
        className = 'random'
      }
      return className
    })
    // 收藏列表
    const favList = computed(() => store.state.favoriteList)
    const hisList = computed(() => store.state.historyList)
    const currentList = computed(() => {
      if (selected.value === 0) {
        return favList.value
      }
      return hisList.value
    })
    // 点击播放
    const {
      onPlayFavList,
      onPlayHisList,
      onPlayFavToId,
      onPlayHisToId
    } = usePlayMusic()
    // 判断当前是历史播放还是收藏播放
    const onSelectItem = (id) => {
      if (selected.value === 0) {
        onPlayFavToId(id)
      } else {
        onPlayHisToId(id)
      }
    }
    const onSelectAll = (id) => {
      if (selected.value === 0) {
        onPlayFavList()
      } else {
        onPlayHisList()
      }
    }
    return {
      selected,
      onChangeSelect,
      playModeType,
      playModeTypeClass,
      currentList,
      onPlayFavList,
      onPlayHisList,
      onPlayFavToId,
      onPlayHisToId,
      onSelectItem,
      onSelectAll
    }
  }
}
</script>

<style scoped lang='scss'>
.user-wrap {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 10;

  .tab-wrap {
    display: flex;
    align-items: center;
    justify-content: center;

    .item:nth-of-type(1) {
      margin-right: 104px;
    }

    .item {
      font-size: $font-size-large;
      color: $color-sub;

      &.active {
        color: $color-light;
      }
    }
  }

  .play-btn {
    width: 256px;
    height: 74px;
    background: #F5F6F7;
    border-radius: 28px;
    margin: 120px auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $color-dark-pro;

    .icon {
      width: 28px;
      height: 28px;
      display: inline-block;
      background-size: cover;
      margin-left: 10px;

      &.shunxu {
        @include bg-image('~@/assets/imgs/mode-type-black-1');
      }

      &.single {
        @include bg-image('~@/assets/imgs/mode-type-black-2');
      }

      &.random {
        @include bg-image('~@/assets/imgs/mode-type-black-3');
      }
    }
  }
}

.user-scroll-wrap {
  position: fixed;
  top: 194px;
  left: calc(50% - 5rem);
  width: 100%;
  bottom: 0;
  overflow: hidden;
}
</style>
