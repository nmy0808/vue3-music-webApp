import { useStore } from 'vuex'
import { computed, watch } from 'vue'
import { getLocalStorage, setLocalStorage } from '@/tool/indxe'

export default function() {
  const store = useStore()
  const favList = computed(() => store.state.favoriteList)
  const setFavList = (list) => {
    store.commit('setFavoriteList', list)
  }
  // 初始化仓库
  initStoreFav()

  watch(favList, () => {
    setLocalStorage('__fav__', favList.value)
  }, { deep: true })

  function initStoreFav() {
    const list = getLocalStorage('__fav__') || []
    setFavList(list)
  }
}
