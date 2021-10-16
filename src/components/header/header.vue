<template>
  <div class='header container'>
    <div class='logo'></div>
    <i class='iconfont'></i>
  </div>
</template>

<script>

export default {
  name: 'c-header',
  setup(props) {
    // const calcTop = computed(() => {
    //   return props.top + 'px'
    // })
    // return { calcTop }
  }
}
</script>

<style scoped lang='scss'>
.header {
  position: relative;
  height: 88px;
  width: 100%;
  //z-index: 2;
}

.logo {
  width: 240px;
  height: 44px;
  @include bg-image('../../assets/imgs/logo');
  background-size: cover;
  @extend .center-all;
}

i {
  width: 32px;
  height: 32px;
  display: inline-block;
  background: #000;
  position: absolute;
  right: 32px;
  @extend .center-v;
}
</style>
