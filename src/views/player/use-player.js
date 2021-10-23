import { useStore } from 'vuex'

import playingState from '@/store/playing-state'
import playModeType from '@/store/play-mode-type'
import { computed, nextTick, watch } from 'vue'
import { getRandomIntInclusive } from '@/tool/indxe'
import busEvent from '@/bus-event'
import { CLICK_PROGRESS_PERCENT } from '@/bus-event/bus-event-type'

export default function({ audioRef }) {
  const store = useStore()
  const songs = computed(() => store.state.songs)
  const currentSong = computed(() => store.getters.getCurrentSong)
  const currentIndex = computed(() => store.state.currentIndex)
  const currentPlayModeType = computed(() => store.getters.getPlayModeType)
  const playState = computed(() => store.getters.isPlayState)
  const isPlayState = computed(() => store.getters.isPlayState)
  const totalTime = computed(() => store.state.currentTotalTime)
  const currentTime = computed(() => store.state.currentTime)
  // 监听暂停播放状态
  watch(playState, async (state) => {
    await nextTick()
    if (state === playingState.PLAY) {
      audioRef.value.play()
    } else {
      audioRef.value.pause()
    }
  }, { immediate: true })
  // 监听换歌
  watch(currentIndex, async (newIndex, oldIndex) => {
    await nextTick()
    //
    if (newIndex !== oldIndex) {
      audioRef.value.oncanplay = () => {
        audioRef.value.play()
        store.commit('setPlayState', playingState.PLAY)
      }
    } else {
      audioRef.value.pause()
      store.commit('setPlayState', playingState.PAUSE)
    }
  }, { immediate: true })
  // 监听当前歌曲被删除了
  watch(currentSong, async (newSong, oldSong = {}) => {
    if (newSong.id === oldSong.id) return
    await nextTick()
    if (isPlayState.value === playingState.PLAY) {
      audioRef.value.oncanplay = () => {
        audioRef.value.play()
        store.commit('setPlayState', playingState.PLAY)
      }
    } else {
      audioRef.value.pause()
      store.commit('setPlayState', playingState.PAUSE)
    }
  }, { immediate: true })
  // 监听加载musicUrl, 播放器播放
  // watch(() => currentSong.value.musicUrl, (url) => {
  //   audioRef.value.play()
  //   store.commit('setPlayState', playingState.PLAY)
  // })
  // 监听当前时间 播放器跟着改动事件
  busEvent.on(CLICK_PROGRESS_PERCENT, (percent) => {
    if (percent === undefined) return
    audioRef.value.currentTime = totalTime.value * percent
  })
  // 上一首
  const prevPlay = () => {
    const currType = currentPlayModeType.value
    let index = currentIndex.value
    const maxIndex = songs.value.length - 1
    if (currType === playModeType.RANDOM) {
      index = getRandomIntInclusive(0, maxIndex)
    } else {
      index--
      if (index < 0) {
        index = maxIndex
      }
    }
    setCurrentIndex(index)
  }

  // 下一首
  const nextPlay = () => {
    const currType = currentPlayModeType.value
    let index = currentIndex.value
    const maxIndex = songs.value.length - 1
    if (currType === playModeType.RANDOM) {
      index = getRandomIntInclusive(0, maxIndex)
    } else {
      index++
      if (index > maxIndex) {
        index = 0
      }
    }
    setCurrentIndex(index)
  }
  // 当音乐加载完成后 获取总时长, 存入vuex
  const onCanPlay = (e) => {
    audioRef.value.play()
    store.commit('setPlayState', playingState.PLAY)
    store.commit('setCurrentTotalTime', getTotalTime())
  }
  //
  const onEnded = (e) => {
    const currType = currentPlayModeType.value
    if (currType === playModeType.SINGLE) {
      audioRef.value.currentTime = 0
      audioRef.value.play()
    } else {
      nextPlay()
    }
  }
  // 当前音乐时间变化和计算当前比例, 存入vuex
  const onTimeUpdate = () => {
    store.commit('setCurrentTime', getCurrentTime())
    store.commit('setCurrentPercent', getCurrentPercent())
  }

  function setCurrentIndex(index) {
    store.commit('setCurrentIndex', index)
  }

  function getTotalTime() {
    return audioRef.value.duration
  }

  function getCurrentTime() {
    return audioRef.value.currentTime
  }

  function getCurrentPercent() {
    return currentTime.value / totalTime.value
  }

  return {
    prevPlay,
    nextPlay,
    onCanPlay,
    onEnded,
    onTimeUpdate
  }
}
