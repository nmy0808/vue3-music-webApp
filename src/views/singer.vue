<template>
  <div>
    <index-list :data='singers'></index-list>
  </div>
</template>

<script>
import { getSingerList } from '@/service/singer'
import IndexList from '@/components/index-list/index-list'

export default {
  components: { IndexList },
  data() {
    return {
      singers: []
    }
  },
  async created() {
    const data = await getSingerList()
    this.singers = data.singers
  },
  setup() {
    return {}
  }
}
</script>

<style scoped lang='scss'>
</style>
