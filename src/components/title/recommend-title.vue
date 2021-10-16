<template>
  <div class='title'>
    <h3>
      <slot></slot>
    </h3>
    <div class='line'></div>
  </div>
</template>

<script>
export default {
  name: 'recommend-title'
}
</script>

<style scoped lang='scss'>
.title {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  h3 {
    font-size: $font-size-large;
    color: $color-sub;
  }

  .line {
    width: 114px;
    height: 2px;
    background: $color-main;
    border-radius: 1px;
    opacity: 0.44;
    position: absolute;
    bottom: 10px;
    @extend .center-h;
  }
}
</style>
