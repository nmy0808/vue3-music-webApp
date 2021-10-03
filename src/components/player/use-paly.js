import { useStore, mapActions } from 'vuex'
import { FAVORITE_KEY, PLAY_MODE } from '@/assets/js/constant'
import { useState } from '@/assets/js/userStore'
// eslint-disable-next-line no-unused-vars
import { computed, ref, watchEffect, toRaw, watch } from 'vue'
import { remove, save } from '@/assets/js/favorite-store'

export default () => {
  const store = useStore()
  const audioRef = ref(null)
  const isCanplay = ref(false) // 是否缓存了一部分
  const {
    sequenceList,
    playlist,
    playing,
    playMode,
    currentIndex,
    fullScreen,
    favoriteList
  } = useState(['sequenceList', 'playlist', 'playing', 'playMode', 'currentIndex', 'fullScreen', 'favoriteList'])
  // const { currentSong } = useGetters(['currentSong'])
  const currentSongRef = computed(() => store.getters.currentSong)
  // computed
  const currentCover = computed(() => {
    return playlist.value[currentIndex.value].pic
  })
  const currentName = computed(() => {
    return playlist.value[currentIndex.value].name
  })
  const isCurrentFavorite = computed(() => {
    return favoriteList.value.find(item => item.id === currentSongRef.value.id)
  })
  const currentFavoriteClass = computed(() => {
    return isCurrentFavorite.value
      ? 'icon-favorite' : 'icon-not-favorite'
  })
  const currentSinger = computed(() => {
    return playlist.value[currentIndex.value].singer
  })
  const playIconClass = computed(() => {
    return !playing.value ? 'icon-play' : 'icon-pause'
  })
  const playModeIconClass = computed(() => {
    const currMode = playMode.value
    if (currMode === PLAY_MODE.sequence) {
      return 'icon-sequence'
    } else if (currMode === PLAY_MODE.random) {
      return 'icon-random'
    }
    return 'icon-loop'
  })
  const operateStateClass = computed(() => {
    return isCanplay.value ? '' : 'disable'
  })
  // watch
  // 监听当前播放状态
  // watchEffect(() => {
  //   const audioVal = audioRef.value
  //   if (playing.value) {
  //     audioVal.src = currentSongRef.value.url
  //     audioVal.play()
  //   }
  // })
  watch(currentSongRef, () => {
    const audioVal = audioRef.value
    if (playing.value) {
      audioVal.src = currentSongRef.value.url
      audioVal.play()
    }
  })
  watch(currentIndex, () => {
    // 处理缓存bug
    isCanplay.value = false
  })
  // methods
  const onCancelFullScreen = () => {
    store.commit('setFullScreen', false)
  }
  const onSwitchPlayState = () => {
    const audioVal = audioRef.value
    if (playing.value) {
      audioVal.pause()
      store.commit('setPlayingState', false)
    } else {
      audioVal.play()
      store.commit('setPlayingState', true)
    }
  }
  const onNext = () => {
    if (!isCanplay.value) return
    const audioVal = audioRef.value
    let currentIndexVal = currentIndex.value
    const maxNum = playlist.value.length - 1
    if (maxNum === 0) {
      audioVal.currentTime = 0
      store.commit('setPlayingState', true)
      audioVal.play()
      return
    }
    currentIndexVal++
    if (currentIndexVal > maxNum) {
      currentIndexVal = 0
    }
    if (playlist.value.length !== 0) {
      store.commit('setPlayingState', true)
      audioVal.play()
    }
    store.commit('setCurrentIndex', currentIndexVal)
  }
  const onPrev = () => {
    if (!isCanplay.value) return
    const audioVal = audioRef.value
    let currentIndexVal = currentIndex.value
    const maxNum = playlist.value.length - 1
    if (maxNum === 0) {
      audioVal.currentTime = 0
      store.commit('setPlayingState', true)
      audioVal.play()
      return
    }
    currentIndexVal--
    if (currentIndexVal <= 0) {
      currentIndexVal = maxNum
    }
    if (playlist.value.length !== 0) {
      store.commit('setPlayingState', true)
      audioVal.play()
    }
    store.commit('setCurrentIndex', currentIndexVal)
  }
  const onSwitchPlayMode = () => {
    const oldMode = playMode.value
    const currMode = (oldMode + 1) % 3
    store.dispatch('changeMode', currMode)
  }
  const onCanplay = () => {
    if (!isCanplay.value) {
      isCanplay.value = true
    }
  }
  const onPlayPause = () => {
    store.commit('setPlayingState', false)
    audioRef.value.pause()
  }
  const onPlayError = () => {
    store.commit('setPlayingState', false)
    isCanplay.value = false
    audioRef.value.pause()
  }
  const onSwitchFavorite = () => {
    if (!isCurrentFavorite.value) {
      save(FAVORITE_KEY, currentSongRef.value, store)
    } else {
      remove(FAVORITE_KEY, currentSongRef.value, store)
    }
  }
  return {
    audioRef,
    sequenceList,
    playlist,
    playing,
    playMode,
    currentIndex,
    fullScreen,
    favoriteList,
    playIconClass,
    playModeIconClass,
    onSwitchPlayMode,
    onCancelFullScreen,
    onSwitchPlayState,
    onSwitchFavorite,
    onNext,
    onPrev,
    currentFavoriteClass,
    currentName,
    currentSinger,
    currentCover,
    onCanplay,
    onPlayError,
    onPlayPause,
    operateStateClass,
    ...mapActions(['selectPlay', 'randomPlay'])
  }
}
