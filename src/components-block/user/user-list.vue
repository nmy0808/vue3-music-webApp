<template>
  <ul class='user-list-wrap'>
    <li class='item' v-for='item in list' :key='item' @click='onSelectItem(item.id)'>
      <div class='pic'>
        <img v-if='item.picUrl' v-lazy='item.picUrl'>
      </div>
      <div class='desc'>
        <h4 class='name'>{{ item.name }}</h4>
        <h4 class='singer'>{{ item.singer }}</h4>
      </div>
    </li>
    <mini-player-box v-if='isShowBottomBox'></mini-player-box>
  </ul>
</template>

<script>

import MiniPlayerBox from '@/components/mini-player-box/mini-player-box'

export default {
  name: 'user-list',
  components: { MiniPlayerBox },
  props: {
    list: {
      type: Array,
      default: () => ([])
    },
    isShowBottomBox: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { emit }) {
    const onSelectItem = (id) => {
      emit('select', id)
    }
    return {
      onSelectItem
    }
  }
}
</script>

<style scoped lang='scss'>
.user-list-wrap {
  .item {
    display: flex;
    justify-content: space-between;
    margin-top: 32px;

    &:last-of-type {
      padding-bottom: 32px;
    }

    .pic {
      width: 120px;
      height: 120px;
      margin-right: 32px;
      border-radius: 30px;
      overflow: hidden;
      box-shadow: 0px 12px 18px 0px rgba(22, 33, 42, 0.5);

      img {
        height: 100%;
        width: 100%;
      }
    }

    .desc {
      height: 120px;
      margin-right: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;

      h4 {
        margin: 6px 0;

        &.name {
          color: $color-light;
          font-size: $font-size-medium;
        }

        &.singer {
          color: $color-sub;
          font-size: $font-size-medium;
        }
      }
    }
  }
}
</style>
