<template>
  <div class='wrapper'>
    <music-list :songs='songs' :singer='calcSinger' :isLoading='isLoading'></music-list>
  </div>
</template>

<script>
import { getSingerDetail } from '@/service/singer'
import { processSongs } from '@/service/song'
import MusicList from '@/components/music-list/music-list'
import goodStorage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant'

export default {
  name: 'SingerDetail',
  components: { MusicList },
  props: {
    singer: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data() {
    return {
      songs: [],
      isLoading: true
    }
  },
  computed: {
    calcSinger() {
      let res
      if (this.singer) {
        return this.singer
      } else {
        res = goodStorage.session.get(SINGER_KEY)
      }
      return res
    }
  },
  async created() {
    if (!this.calcSinger) {
      await this.$router.push({ name: 'Singer' })
      return
    }
    const result = await getSingerDetail(this.calcSinger)
    const songs = await processSongs(result.songs)
    this.isLoading = false
    this.songs = songs
  }
}
</script>

<style scoped lang='scss'>
.wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 5;
  background: $color-heightlight-background;
}
</style>
