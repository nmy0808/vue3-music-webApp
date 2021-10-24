<template>
  <div>
    <singer-list :list='categoryData' @select='onSelectItem' v-load='isLoading'></singer-list>
    <router-view></router-view>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { getSingerCategory } from '@/api'
import SingerList from '@/components-block/singer/singer-list'
import { useRouter } from 'vue-router'

export default {
  name: 'Singer',
  components: {
    SingerList
  },
  setup() {
    const router = useRouter()
    const categoryData = ref([])
    watchEffect(async () => {
      const data = await getSingerCategory()
      categoryData.value = data
    })
    const isLoading = computed(() => categoryData.value.length === 0)
    //
    const onSelectItem = (id) => {
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
      onSelectItem,
      isLoading
    }
  }
}
</script>

<style scoped>

</style>
