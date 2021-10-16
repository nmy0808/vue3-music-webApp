import { getAlbum } from '@/api'
import { ref, watchEffect } from 'vue'

export default function() {
  const albums = ref([])
  watchEffect(async () => {
    const data = await getAlbum()
    albums.value = data.albums
  })
  return { albums }
}
