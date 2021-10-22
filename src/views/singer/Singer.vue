<template>
  <div>
    <scroll class='singer-scroll'>
      <singer-list :list='categoryData' @select='onSelectItem'></singer-list>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import { getSingerCategory } from '@/api'
import SingerList from '@/components-block/singer/singer-list'
import Scroll from '@/components/scroll/scroll'
import { useRouter } from 'vue-router'

export default {
  name: 'Singer',
  components: {
    Scroll,
    SingerList
  },
  setup() {
    const router = useRouter()
    const categoryData = ref([])
    watchEffect(async () => {
      const data = await getSingerCategory()
      categoryData.value = data
    })
    //
    const onSelectItem = (id) => {
      console.log(id)
      router.push({
        name: 'singer-detail',
        params: {
          id,
          type: 'singer'
        }
      })
    }
    return {
      categoryData,
      onSelectItem
    }
  }
}
</script>

<style scoped>
.singer-scroll {
  width: 100%;
  position: fixed;
  left: 0;
  top: 176px;
  bottom: 0;
  overflow: hidden;
}
</style>
