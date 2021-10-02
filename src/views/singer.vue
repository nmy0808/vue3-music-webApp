<template>
  <div>
    <index-list :data='singers' @select='onSingerSelected'></index-list>
  </div>
  <router-view :singer='singerSelected'></router-view>
</template>

<script>
import { getSingerList } from '@/service/singer'
import IndexList from '@/components/index-list/index-list'

export default {
  components: { IndexList },
  data() {
    return {
      singers: [],
      singerSelected: null
    }
  },
  async created() {
    const data = await getSingerList()
    this.singers = data.singers
  },
  methods: {
    onSingerSelected: function(slider) {
      this.singerSelected = slider
      this.$router.push({
        name: 'SingerDetail',
        params: { mid: slider.mid }
      })
    }
  }

}
</script>

<style scoped lang='scss'>
</style>
