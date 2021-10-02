<template>
  <div>
    <div class='navigator'>
      <i class='icon-back' @click='$router.back()'></i>
      <h1 class='title'>{{ singer.name }}</h1>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'MusicList',
  props: {
    songs: {
      type: Array,
      default: () => ([])
    },
    singer: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped lang='scss'>
.navigator {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
  height: 40px;
  box-sizing: border-box;
  position: relative;

  .icon-back {
    font-size: $font-size-large-x;
    color: $color-theme;
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translate3d(0, -50%, 0);
  }

  .title {
    color: $color-text;
    font-size: $font-size-large;
  }
}

</style>
