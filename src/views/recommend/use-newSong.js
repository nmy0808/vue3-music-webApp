import { getNewSong } from '@/api'
import { ref, watchEffect } from 'vue'

export default function() {
  const newSong = ref([])
  watchEffect(async () => {
    const data = await getNewSong()
    newSong.value = data.result
  })
  return { newSong }
}
