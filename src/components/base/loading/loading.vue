<template>
  <div class='loading' v-show='isShow'>
    <div><img class='pic' :src='pic'></div>
    <div class='message'>{{ message }}</div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'loading',
  setup() {
    const pic = require('@/assets/images/loading.gif')
    const isShow = ref(true)
    const message = ref('请稍等...')
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
.loading {
  position: absolute;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 90px;
  height: 90px;
  background: #ffffff20;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.pic {
  width: 20px;
  height: 20px;
  margin-bottom: 10px;
}

.message {
  color: $color-text-l;
  font-size: $font-size-small-s;
}
</style>
