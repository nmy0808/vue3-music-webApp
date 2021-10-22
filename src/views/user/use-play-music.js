import { useStore } from 'vuex'
import playingState from '@/store/playing-state'
import { computed, watch } from 'vue'

export default function() {
  const store = useStore()
  const favList = computed(() => store.state.favoriteList)
  const hisList = computed(() => store.state.historyList)
  const setSongs = (songs) => {
    store.commit('setSongs', songs)
  }
  const setPlayState = (flag) => {
    store.commit('setPlayState', flag)
  }
  const setCurrentIndex = (index) => {
    store.commit('setCurrentIndex', index)
  }
  const setFullScreen = (flag) => {
    store.commit('setFullScreen', flag)
  }
  const getMusic = async (id) => {
    return await store.dispatch('getMusicNoEffect', id)
  }
  // 播放的时候加载当前musicUrl
  // 播放收藏列表
  const onPlayFavList = async () => {
    setPlayState(playingState.PAUSE)
    // 更新音乐url, 过一段时间url系统会更新
    await updateMusicUrl(favList)
    setSongs(favList.value)
    setCurrentIndex(0)
    setPlayState(playingState.PLAY)
    setFullScreen(true)
  }
  // 单独点击播放收藏列表里的音乐
  const onPlayFavToId = async (id) => {
    const currentIndex = favList.value.findIndex(item => item.id === id)
    if (currentIndex === -1) return
    setPlayState(playingState.PAUSE)
    // 更新音乐url, 过一段时间url系统会更新
    await updateMusicUrl(favList)
    setSongs(favList.value)
    setCurrentIndex(currentIndex)
    setPlayState(playingState.PLAY)
    setFullScreen(true)
  }
  // 播放历史列表
  const onPlayHisList = async () => {
    setPlayState(playingState.PAUSE)
    // 更新音乐url, 过一段时间url系统会更新
    await updateMusicUrl(hisList)
    setSongs(hisList.value)
    setCurrentIndex(0)
    setPlayState(playingState.PLAY)
    setFullScreen(true)
  }
  // 单独点击播放历史列表里的音乐
  const onPlayHisToId = async (id) => {
    const currentIndex = hisList.value.findIndex(item => item.id === id)
    if (currentIndex === -1) return
    setPlayState(playingState.PAUSE)
    // 更新音乐url, 过一段时间url系统会更新
    await updateMusicUrl(hisList)
    setSongs(hisList.value)
    setCurrentIndex(currentIndex)
    setPlayState(playingState.PLAY)
    setFullScreen(true)
  }

  async function updateMusicUrl(list) {
    for (const song of list.value) {
      const id = song.id
      song.musicUrl = null
      const musicUrl = await getMusic(id)
      song.musicUrl = musicUrl
    }
  }

  return {
    setSongs,
    setPlayState,
    onPlayFavList,
    onPlayHisList,
    onPlayFavToId,
    onPlayHisToId,
    setCurrentIndex
  }
}
