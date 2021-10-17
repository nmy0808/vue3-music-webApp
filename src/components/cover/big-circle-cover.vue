<template>
  <div class='circle-cover-wrap'>
    <img :src='picUrl'>
  </div>
</template>

<script>
// normal-player的封面
export default {
  name: 'big-circle-cover',
  props: ['picUrl']
}
</script>

<style scoped lang='scss'>
.circle-cover-wrap {
  width: 500px;
  height: 500px;
  border: 10px solid #fff;
  overflow: hidden;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
