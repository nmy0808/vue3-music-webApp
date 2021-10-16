import { getBanner } from '@/api'
import { ref, watchEffect } from 'vue'

export default function() {
  const banners = ref([])
  watchEffect(async () => {
    const data = await getBanner()
    banners.value = data.banners
  })
  return { banners }
}
