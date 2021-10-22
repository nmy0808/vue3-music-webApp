<template>
<div>
  <scroll class='rank-wrap container' v-load='isLoading'>
    <rank-list :list='rankList'></rank-list>
  </scroll>
  <router-view></router-view>
</div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { getRankList } from '@/api'
import RankList from '@/components-block/rank/rank-list'
import Scroll from '@/components/scroll/scroll'

export default {
  name: 'rank.vue',
  components: {
    Scroll,
    RankList
  },
  setup() {
    const rankList = ref([])
    watchEffect(async () => {
      rankList.value = await getRankList()
    })
    const isLoading = computed(() => rankList.value.length === 0)
    return {
      rankList,
      isLoading
    }
  }
}
</script>

<style scoped lang='scss'>
.rank-wrap {
  width: 100%;
  position: fixed;
  left: 0;
  top: 176px;
  bottom: 0;
  overflow: hidden;
}
</style>
