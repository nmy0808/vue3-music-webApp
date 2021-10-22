<template>
  <div class='loading-wrap'>
    <span class='loading'>
      <span class='loading-inner'></span>
    </span>
    <div class='loading-word'>请稍等
      <template v-for='(item , index) in dotNum' :key='index'><span>.</span></template>
    </div>
  </div>

</template>

<script>
export default {
  name: 'loading',
  data() {
    return {
      isShow: false,
      dotNum: 0,
      timer: null
    }
  },
  methods: {
    addDotNum() {
      this.dotNum++
      this.dotNum = this.dotNum % 4
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.addDotNum()
      if (!this.isShow) {
        clearInterval(this.timer)
      }
    }, 500)
  },
  watch: {
    isShow(val) {
      if (!val) {
        clearInterval(this.timer)
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.loading-wrap {
  position: absolute;
  position: absolute;
  left: 50%;
  top: 38%;
  margin-left: -25px;
}

.loading {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 4px solid $color-main;
  animation: loader 4s infinite ease;
}

.loading-word {
  position: absolute;
  bottom: -50px;
  @extend .center-h;
  color: $color-sub;
  width: 108px;
  margin-left: 10px;
}

.loading-inner {
  vertical-align: top;
  display: inline-block;
  width: 100%;
  background-color: $color-main;
  animation: loader-inner 4s infinite ease-in;
}

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loader-inner {
  0% {
    height: 0%;
  }
  25% {
    height: 0%;
  }
  50% {
    height: 100%;
  }
  75% {
    height: 100%;
  }
  100% {
    height: 0%;
  }
}

</style>
