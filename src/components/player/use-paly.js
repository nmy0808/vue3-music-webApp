import { useStore, mapActions } from 'vuex'
import { FAVORITE_KEY, PLAY_MODE } from '@/assets/js/constant'
import { useState } from '@/assets/js/userStore'
// eslint-disable-next-line no-unused-vars
import { computed, ref, watchEffect, toRaw, watch, nextTick } from 'vue'
import { remove, save } from '@/assets/js/favorite-store'
import { formatTime } from '@/assets/js/util'
import bus from '@/assets/js/bus'

export default () => {
  const store = useStore()
  const audioRef = ref(null)
  const isCanplay = ref(false) // 是否缓存了一部分
  const currentTime = ref(0)
  let isProgressChanging = false // 滑动动作判断
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
  const currentPlayingTime = computed(() => {
    return formatTime(currentTime.value)
  })
  const currentTotalTime = computed(() => {
    return formatTime(currentSongRef.value.duration)
  })
  const currentProgress = computed(() => {
    return currentTime.value / currentSongRef.value.duration
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
  watch(currentSongRef, () => {
    currentTime.value = 0
    isCanplay.value = false
    const audioVal = audioRef.value
    if (playing.value && isCanplay) {
      audioVal.src = currentSongRef.value.url
      audioVal.play()
    }
  })
  // watch(currentIndex, () => {
  //   // 处理缓存bug
  //   currentTime.value = 0
  // })
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
  const loop = () => {
    const audioVal = audioRef.value
    audioVal.currentTime = 0
    store.commit('setPlayingState', true)
    nextTick(() => {
      audioVal.play()
    })
  }
  const onNext = () => {
    console.log(isCanplay.value)
    if (!isCanplay.value) return
    const audioVal = audioRef.value
    let currentIndexVal = currentIndex.value
    const maxNum = playlist.value.length - 1
    if (maxNum === 0) {
      loop()
      return
    }
    currentIndexVal++
    if (currentIndexVal > maxNum) {
      currentIndexVal = 0
    }
    if (playlist.value.length !== 0) {
      store.commit('setPlayingState', true)
      nextTick(() => {
        audioVal.play()
      })
    }
    store.commit('setCurrentIndex', currentIndexVal)
  }
  const onPrev = () => {
    if (!isCanplay.value) return
    const audioVal = audioRef.value
    let currentIndexVal = currentIndex.value
    const maxNum = playlist.value.length - 1
    if (maxNum === 0) {
      loop()
      return
    }
    currentIndexVal--
    if (currentIndexVal <= 0) {
      currentIndexVal = maxNum
    }
    if (playlist.value.length !== 0) {
      store.commit('setPlayingState', true)
      nextTick(() => {
        audioVal.play()
      })
    }
    currentTime.value = 0
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
      // nextTick(()=>{
      //   audioRef.value.play()
      // })
      console.log(1)
    }
    bus.emit('play-canplay', true)
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
  const onUpdateTime = (e) => {
    if (!isProgressChanging) {
      currentTime.value = e.target.currentTime
    }
  }
  let percent = 0
  const onProgressClick = ({
    offset,
    proWrapWidth
  }) => {
    percent = offset / proWrapWidth
    percent = Math.min(1, Math.max(0, percent))
    audioRef.value.currentTime = currentTime.value = currentSongRef.value.duration * percent
    if (!playing.value) {
      store.commit('setPlayingState', true)
      audioRef.value.play()
    }
  }
  const onProgressChanging = ({
    offset,
    proWrapWidth
  }) => {
    isProgressChanging = true
    percent = offset / proWrapWidth
    percent = Math.min(1, Math.max(0, percent))
    currentTime.value = currentSongRef.value.duration * percent
  }
  const onProgressChanged = () => {
    currentTime.value = audioRef.value.currentTime = currentSongRef.value.duration * percent
    if (!playing.value) {
      store.commit('setPlayingState', true)
      audioRef.value.play()
    }
    isProgressChanging = false
  }
  const onPlayEnded = () => {
    if (playMode.value === PLAY_MODE.loop) {
      loop()
      return
    }
    onNext()
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
    onPlayEnded,
    currentFavoriteClass,
    currentName,
    currentSinger,
    currentCover,
    currentTime,
    currentTotalTime,
    currentProgress,
    currentPlayingTime,
    onCanplay,
    onPlayError,
    onPlayPause,
    operateStateClass,
    onUpdateTime,
    onProgressChanging,
    onProgressChanged,
    onProgressClick,
    ...mapActions(['selectPlay', 'randomPlay'])
  }
}
