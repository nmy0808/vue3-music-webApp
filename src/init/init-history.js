import { useStore } from 'vuex'
import { computed, watch } from 'vue'
import { getLocalStorage, setLocalStorage } from '@/tool/indxe'
import playingState from '@/store/playing-state'

export default function() {
  const store = useStore()
  const playState = computed(() => store.getters.isPlayState)
  const historyList = computed(() => store.state.historyList)
  const currentSong = computed(() => store.getters.getCurrentSong)
  const setHistoryList = (list) => {
    store.commit('setHistoryList', list)
  }
  // 初始化仓库
  initStoreHistory()

  watch(historyList, () => {
    setLocalStorage('__history__', historyList.value)
  }, { deep: true })
  // 添加历史记录
  watch(playState, (state) => {
    if (state === playingState.PLAY) {
      store.commit('addHistory', currentSong.value)
    }
  })

  function initStoreHistory() {
    const list = getLocalStorage('__history__') || []
    setHistoryList(list)
  }
}
