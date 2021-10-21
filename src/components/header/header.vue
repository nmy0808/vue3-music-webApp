<template>
  <div class='header container'>
    <div class='logo'></div>
    <i class='icon-user' @click='()=>$router.push("/user")'></i>
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

.icon-user {
  width: 30px;
  height: 30px;
  display: inline-block;
  position: absolute;
  right: 32px;
  @include bg-image('~@/assets/imgs/icon-user');
  @extend .center-v;
  background-size: cover;
}
</style>
