<template>
  <div class='mini-list-wrap container'>
    <div class='header'>
      <span>随机播放</span>
      <i class='icon-type'></i>
      <i class='icon-close'></i>
    </div>
    <scroll class='mini-scroll container' :bounce='true'>
      <div class='item'>
        <div class='desc'>
          <h4 class='name'>夜曲</h4>
          <h4 class='sub'>周杰伦</h4>
        </div>
        <i class='icon-del'></i>
        <i class='icon-fav'></i>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@/components/scroll/scroll'

export default {
  name: 'mini-paly-list',
  components: {
    Scroll
  }
}
</script>

<style scoped lang='scss'>
.mini-list-wrap {
  height: 50vh;
  width: 100%;
  position: fixed;
  bottom: 132px;
  left: 0;
  z-index: 4;
  background: #fff;

  .header {
    display: flex;
    align-items: center;
    font-size: 40px;
    color: $color-dark;
    height: 100px;
    box-sizing: border-box;

    .icon-type {
      margin-left: 10px;
      display: block;
      width: 40px;
      height: 40px;
      background: #000;
    }

    .icon-close {
      display: block;
      width: 40px;
      height: 40px;
      background: #000;
      margin-left: auto;
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
      padding-bottom: 32px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .name {
        color: $color-main;
        font-size: $font-size-large;
      }

      .sub {
        color: $color-dark;
        font-size: $font-size-medium;
        margin-top: 14px;
      }

      .icon-del {
        margin-left: auto;
        margin-right: 32px;
      }

      .icon-del, .icon-fav {
        display: inline-block;
        width: 28px;
        height: 28px;
        background: #000;
        background-size: cover;
      }
    }
  }
}
</style>
