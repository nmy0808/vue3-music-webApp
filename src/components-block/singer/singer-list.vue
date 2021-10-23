<template>
  <div class='singer-scroll'>
    <scroll class='singer-scroll' ref='scrollRef' probe-type='3' @scroll='onScroll'>
      <div class='singer-list-wrap'>
        <div class='singer-item' v-for='item in list' :key='item.anchor'>
          <div class='singer-anchor-wrap'>
            <div class='singer-anchor container'>{{ item.anchor }}</div>
          </div>
          <div class='container'>
            <user-list :list='item.singers' @select='onSelectItem' :isShowBottomBox='false'></user-list>
          </div>
        </div>
      </div>
      <mini-player-box></mini-player-box>
    </scroll>
    <div class='singer-right' ref='singerRightWrap' @touchstart='onTouchStart'  @touchmove='onTouchMove' @touchend='onTouchEnd'>
      <div class='singer-right-anchor' :class='{active:currentIndex===index}' v-for='(item,index) in list' :key='item.anchor'>{{ item.anchor }}</div>
    </div>
    <div class='singer-flex-anchor  container'></div>
  </div>
</template>

<script>
import UserList from '@/components-block/user/user-list'
import Scroll from '@/components/scroll/scroll'
import MiniPlayerBox from '@/components/mini-player-box/mini-player-box'
import userScroll from './use-scroll'

export default {
  name: 'singer-list',
  components: {
    MiniPlayerBox,
    UserList,
    Scroll
  },
  props: ['list'],
  emits: ['select'],
  setup(props, { emit }) {
    const onSelectItem = (id) => {
      emit('select', id)
    }
    // scroll
    const {
      scrollRef,
      singerRightWrap,
      onScroll,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      currentIndex
    } = userScroll(props)
    return {
      onSelectItem,
      scrollRef,
      onScroll,
      singerRightWrap,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      currentIndex
    }
  }
}
</script>

<style scoped lang='scss'>
.singer-scroll {
  width: 100%;
  position: fixed;
  left: 0;
  top: 176px;
  bottom: 0;
  overflow: hidden;
}

.singer-list-wrap {
  .singer-item {
    width: 750px;

    .singer-anchor-wrap {
      width: 750px;
      height: 60px;
    }

    .singer-anchor {
      width: 750px;
      height: 60px;
      background: #000;
      display: flex;
      align-items: center;
      background: #44515A;
      color: #BDBDBD;
    }
  }
}

.singer-flex-anchor {
  width: 750px;
  height: 60px;
  display: flex;
  align-items: center;
  background: #44515A;
  color: #BDBDBD;
  position: fixed;
  top: 176px;
  left: 0;
  z-index: 100;
}

.singer-right {
  position: fixed;
  right: 16px;
  @extend .center-v;
  width: 40px;
  background: rgba(#000000,50%);
  z-index: 300;
  border-radius: 20px;
  padding: 15px 0;
  .singer-right-anchor {
    width: 40px;
    height: 34px;
    font-size: $font-size-small;
    color: $color-sub;
    display: flex;
    align-items: center;
    justify-content: center;
    &.active{
      color: $color-main;
    }
  }
}
</style>
