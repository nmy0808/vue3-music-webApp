export default {
  isFullScreen(state) {
    return state.fullScreen
  },
  isMiniPlayer(state) {
    return state.miniPlayer
  },
  isPlayState(state) {
    return state.playStata
  },
  getPlayModeType(state) {
    return state.playModeType
  },
  getCurrentSong(state) {
    return state.songs[state.currentIndex] || {}
  }
}
