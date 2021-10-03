import { ref, watchEffect } from 'vue'

export const useLocalStorage = (key) => {
  const storageRef = ref(window.localStorage.getItem(key) || [])
  const stop = watchEffect(() => {
    window.localStorage.setItem(key, storageRef.value) // storageRef在外部改动时, 或触发存储
  })

  return {
    storage: storageRef,
    stop
  }
}
