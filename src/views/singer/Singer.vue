<template>
  <div>singer</div>
</template>

<script>
import { watchEffect } from 'vue'
import { getSingerCategory } from '@/api'

export default {
  name: 'Singer',
  setup() {
    watchEffect(async () => {
      const data = await getSingerCategory()
      console.log(data)
    })
    return {}
  }
}
</script>

<style scoped>

</style>
