<template>
  <div class='sub-header container'>
    <slot name='left'>
      <i class='back' @click='()=>$router.back()'></i>
    </slot>
    <div>
      <slot></slot>
    </div>
    <div class='right-box'>
      <slot name='right'></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sub-header',
  props: ['title'],
  setup() {
    return {}
  }
}
</script>

<style scoped lang='scss'>
.sub-header {
  height: 88px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: $font-size-large;
  color: $color-light;
  position: fixed;
  top: 0;
  left: 0;
}

.back {
  display: block;
  width: 48px;
  height: 48px;
  @include bg-image('~@/assets/imgs/back');
  background-size: 48px 48px;
  background-position: -10px center;
  background-repeat: no-repeat;
}

.right-box {
  width: 48px;
  height: 48px;
}
</style>
