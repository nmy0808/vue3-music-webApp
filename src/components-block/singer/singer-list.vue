<template>
  <div class="singer-scroll">
    <scroll
      class="singer-scroll"
      ref="scrollRef"
      probe-type="3"
      @scroll="onScroll"
    >
      <div class="singer-list-wrap">
        <div class="singer-item" v-for="item in list" :key="item.anchor">
          <div class="singer-anchor-wrap">
            <div class="singer-anchor container">{{ item.anchor }}</div>
          </div>
          <div class="container">
            <user-list
              :list="item.singers"
              @select="onSelectItem"
              :isShowBottomBox="false"
            ></user-list>
          </div>
        </div>
      </div>
      <mini-player-box></mini-player-box>
    </scroll>
    <div
      class="singer-right"
      v-if="list.length !== 0"
      ref="singerRightWrap"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
      <div
        class="singer-right-anchor"
        :class="{ active: currentIndex === index }"
        v-for="(item, index) in list"
        :key="item.anchor"
      >
        {{ item.anchor }}
      </div>
    </div>
    <div class="singer-flex-anchor  container" v-if="list.length !== 0">热</div>
  </div>
</template>

<script>
import { onMounted, watch } from 'vue'
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
    // onMounted(() => {
    //   setTimeout(() => {
    //     console.log(singerRightWrap.value)
    //   }, 69)
    //   // const screenHeight = window.innerHeight
    //   // const disHeight = screenHeight - el.clientHeight
    //   // el.style.top = disHeight / 2 + 'px'
    // })
    watch(singerRightWrap, (el) => {
      if (!el) return
      const screenHeight = document.documentElement.clientHeight
      const disHeight = screenHeight - el.clientHeight
      el.style.top = disHeight / 2 + 'px'
    })
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

<style scoped lang="scss">
.singer-scroll {
  width: 10rem;
  position: fixed;
  left: calc(50% - 5rem);
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
      width: 100%;
      height: 60px;
      background: #000;
      display: flex;
      align-items: center;
      background: #44515a;
      color: #bdbdbd;
    }
  }
}

.singer-flex-anchor {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  background: #44515a;
  color: #bdbdbd;
  position: fixed;
  top: 176px;
  left: calc(50% - 5rem);
  z-index: 100;
}

.singer-right {
  position: fixed;
  right: calc(50% - 5rem + 16px);
  top: 52%;
  // transform: translate3d(0, -50%, 0);
  width: 40px;
  background: rgba(#000000, 30%);
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

    &.active {
      color: $color-main;
    }
  }
}
</style>
