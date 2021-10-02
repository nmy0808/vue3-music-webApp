<template>
  <scroll
    class='index-list'
    :probe-type='3'
    ref='scrollRef'
    @scroll='onFixedScroll'
    v-loading='!data.length'
  >
    <ul ref='groupRef'>
      <li
        v-for='group in data'
        :key='group.title'
        class='group'
        :data-title='group.title'
      >
        <h2 class='title'>{{ group.title }}</h2>
        <ul>
          <li
            @click='onSingerSelected(item)'
            v-for='item in group.list'
            :key='item.id'
            class='item'
          >
            <img class='avatar' v-lazy='item.pic'>
            <span class='name'>{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class='fixed'
      :style='fixedTitleStyleRef'
      v-show='currentTextRef'
    >
      <div class='fixed-title'>{{ currentTextRef }}</div>
    </div>
    <div
      class='shortcut'
      v-show='shortcutsRef.length'
    >
      <!--      @touchstart.stop.prevent='onShortcutTouchStart'-->
      <!--      @touchmove.stop.prevent='onShortcutTouchMove'-->
      <ul
      >
        <li
          v-for='(item, index) in shortcutsRef'
          :key='item'
          :data-index='index'
          class='item'
          :class="{'current':currentIndexRef===index}">
          {{ item }}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script>
import Scroll from '@/components/base/scroll/scroll'
import useFixed from './use-fixed'
import useShortcut from './use-shortcut'

export default {
  name: 'index-list',
  components: { Scroll },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  emits: ['select'],
  setup(props, { emit }) {
    const onSingerSelected = (singer) => {
      emit('select', singer)
    }
    const {
      groupRef,
      onFixedScroll,
      currentTextRef,
      currentIndexRef,
      fixedTitleStyleRef
    } = useFixed(props)
    const {
      scrollRef,
      shortcutsRef,
      onShortcutTouchStart,
      onShortcutTouchMove
    } = useShortcut(props, groupRef)
    return {
      onSingerSelected,
      // useFixed
      groupRef,
      onFixedScroll,
      currentTextRef,
      currentIndexRef,
      fixedTitleStyleRef,
      // useShortcut
      scrollRef,
      shortcutsRef,
      onShortcutTouchStart,
      onShortcutTouchMove
    }
  }
}
</script>

<style lang='scss' scoped>
.index-list {
  width: 100%;
  position: fixed;
  top: 88px;
  bottom: 0;
  overflow: hidden;
  background: $color-background;

  .group {
    padding-bottom: 30px;

    .title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }

    .item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }

  .fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 222;

    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }

  .shortcut {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translate3d(0, -50%, 1px);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;

    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;

      &.current {
        color: $color-theme
      }
    }
  }
}
</style>
