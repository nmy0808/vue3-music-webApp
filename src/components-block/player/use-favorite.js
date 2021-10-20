import { useStore } from 'vuex'
import { computed } from 'vue'

export default function() {
  const store = useStore()
  const currentFavorite = computed(() => store.getters.getCurrentFavorite)
  const favoriteList = computed(() => store.state.favoriteList)
  const removeFavorite = (id) => {
    store.commit('removeFavorite', id)
  }
  const addFavorite = (song) => {
    store.commit('addFavorite', song)
  }
  const toggleFavState = (song) => {
    const result = favoriteList.value.find(item => item.id === song.id)
    if (result) {
      removeFavorite(song.id)
    } else {
      addFavorite(song)
    }
  }
  // 判断当前歌曲是否收藏
  const judgeCurrentFavState = (song) => {
    const result = favoriteList.value.find(item => item.id === song.id)
    if (result === undefined) {
      return false
    }
    return true
  }

  return {
    toggleFavState,
    currentFavorite,
    judgeCurrentFavState
  }
}
