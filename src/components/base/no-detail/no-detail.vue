<template>
  <div class='no-detail' v-show='isShow'>
    <div><img class='pic' :src='pic'></div>
    <div class='message'>{{ message }}</div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'no-detail',
  setup() {
    const pic = require('@/assets/images/no-detail.png')
    const isShow = ref(true)
    const message = ref('抱歉, 暂无数据')
    const setMessage = (msg) => {
      message.value = msg
    }
    return {
      pic,
      message,
      isShow,
      setMessage
    }
  }
}
</script>

<style scoped lang='scss'>
.no-detail {
  position: absolute;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 190px;
  height: 190px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.pic {
  width: 90px;
  height: 90px;
  margin-bottom: 30px;
  opacity: 0.7;
}

.message {
  color: $color-text-l;
  font-size: $font-size-small-s;
}
</style>
