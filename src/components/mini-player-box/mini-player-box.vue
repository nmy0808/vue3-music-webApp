<template>
  <div v-show='isMiniPlayer' class='box-wrap'></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'mini-player-box',
  computed: {
    ...mapGetters(['isMiniPlayer'])
  }
}
</script>

<style scoped>
.box-wrap {
  width: 100%;
  height: 132px;
}
</style>
