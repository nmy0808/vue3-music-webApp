import { getPersonalized } from '@/api'
import { ref, watchEffect } from 'vue'

export default function() {
  const personalized = ref([])
  watchEffect(async () => {
    const data = await getPersonalized()
    personalized.value = data.result
  })
  return { personalized }
}
