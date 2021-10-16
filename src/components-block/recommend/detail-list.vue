<template>
  <scroll class='list-wrap' probe-type='3' :bounce='true' @scroll='onScroll'>
    <div class='wrap-bg'>
      <div class='header'>音乐列表
        <div class='operate'>
          <span class='word'>随机播放</span>
          <i class='icon'>x</i>
        </div>
      </div>
      <div class='content'>
        <div class='item' v-for='item in list' :key='item.id'>
          <div class='pic'>
            <img ref='pic' :src='item.al.picUrl'>
          </div>
          <div class='desc'>
            <h4 class='name'>{{ item.name }}</h4>
            <h4 class='sub-name'>{{ item.ar[0].name }} - {{ item.al.name }}</h4>
          </div>
        </div>
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from '@/components/scroll/scroll'
import { ref } from 'vue'

export default {
  name: 'detail-list',
  props: ['list'],
  emits: ['scroll'],
  components: { Scroll },
  setup(props, { emit }) {
    const pic = ref(null)
    const onScroll = (e) => {
      emit('scroll', e)
    }
    return {
      onScroll,
      pic
    }
  }
}
</script>

<style scoped lang='scss'>
.list-wrap {
  position: fixed;
  top: 496px;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #fff;

  .wrap-bg {
    background: #fff;
    padding: 32px;
    box-sizing: border-box;
  }

  .header {
    font-size: 40px;
    font-weight: 600;
    color: $color-dark;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .operate{
      border: 1px solid $color-dark;
      height: 54px;
      padding: 0 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $color-dark;
      border-radius: 22px;
      font-size: $font-size-medium;
      font-weight: normal;
      .word{
        font-weight: bold;
        margin-right: 10px;
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
        background: #000;

        img {
          width: 100%;
        }
      }

      .desc {
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        padding: 28px 0 28px 32px;
        box-sizing: border-box;

        .name {
          width: 100%;
          color: $color-main;
          font-size: $font-size-medium;
          @include clamp(1);
        }

        .sub-name {
          width: 100%;
          color: $color-dark;
          font-size: $font-size-medium;
          @include clamp(1);
        }
      }
    }
  }
}
</style>
