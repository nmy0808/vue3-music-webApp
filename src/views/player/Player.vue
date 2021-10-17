<template>
  <normal-player></normal-player>
  <mini-player></mini-player>
</template>

<script>

import NormalPlayer from '@/components-block/player/normal-player'
import MiniPlayer from '@/components-block/player/mini-player'
export default {
  name: 'player',
  components: { MiniPlayer, NormalPlayer }
}
</script>

<style scoped>

</style>
