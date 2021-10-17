<template>
  <normal-player v-if='isFullScreen'></normal-player>
  <mini-player v-if='isMiniPlayer'></mini-player>
</template>

<script>

import NormalPlayer from '@/components-block/player/normal-player'
import MiniPlayer from '@/components-block/player/mini-player'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'player',
  components: {
    MiniPlayer,
    NormalPlayer
  },
  setup() {
    const store = useStore()
    const isFullScreen = computed(() => store.getters.isFullScreen)
    const isMiniPlayer = computed(() => store.getters.isMiniPlayer)
    return {
      isFullScreen,
      isMiniPlayer
    }
  }
}
</script>

<style scoped>

</style>
