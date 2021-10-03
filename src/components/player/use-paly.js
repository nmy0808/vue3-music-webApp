import { useStore, mapActions } from 'vuex'
// import { PLAY_MODE } from '@/assets/js/constant'
import { useState } from '@/assets/js/userStore'
// eslint-disable-next-line no-unused-vars
import { computed, ref, watchEffect } from 'vue'

export default () => {
  const store = useStore()
  const audioRef = ref(null)
  const {
    sequenceList,
    playlist,
    playing,
    playMode,
    currentIndex,
    fullScreen,
    favoriteList
  } = useState(['sequenceList', 'playlist', 'playing', 'playMode', 'currentIndex', 'fullScreen', 'favoriteList'])
  // computed
  const currentName = computed(() => {
    return playlist.value[currentIndex.value].name
  })
  const currentSinger = computed(() => {
    return playlist.value[currentIndex.value].singer
  })
  const currentPlay = computed(() => {
    return sequenceList.value[currentIndex.value]
  })
  const playIconClass = computed(() => {
    return !playing.value ? 'icon-play' : 'icon-pause'
  })

  // watch
  // 监听当前播放状态
  watchEffect(() => {
    const audioVal = audioRef.value
    if (playing.value) {
      audioVal.src = currentPlay.value.url
      audioVal.play()
    }
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
    let currentIndexVal = currentIndex.value
    const maxNum = playlist.value.length - 1
    if (maxNum === 0) {
      const audioVal = audioRef.value
      audioVal.currentTime = 0
      audioVal.play()
      return
    }
    currentIndexVal++
    if (currentIndexVal > maxNum) {
      currentIndexVal = 0
    }
    store.commit('setCurrentIndex', currentIndexVal)
  }
  const onPrev = () => {
    let currentIndexVal = currentIndex.value
    const maxNum = playlist.value.length - 1
    if (maxNum === 0) {
      const audioVal = audioRef.value
      audioVal.currentTime = 0
      audioVal.play()
      return
    }
    currentIndexVal--
    if (currentIndexVal <= 0) {
      currentIndexVal = maxNum
    }
    store.commit('setCurrentIndex', currentIndexVal)
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
    onCancelFullScreen,
    onSwitchPlayState,
    onNext,
    onPrev,
    currentName,
    currentSinger,
    ...mapActions(['selectPlay', 'randomPlay'])
  }
}
