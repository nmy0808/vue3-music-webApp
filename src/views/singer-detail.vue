<template>
  <div>111</div>
</template>

<script>
import { getSingerDetail } from '@/service/singer'
import { processSongs } from '@/service/song'

export default {
  name: 'singer-detail',
  props: {
    singer: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  async created() {
    console.log(this.singer)
    const result = await getSingerDetail(this.singer)
    const songs = await processSongs(result.songs)
    console.log(songs)
  }
}
</script>

<style scoped>

</style>
