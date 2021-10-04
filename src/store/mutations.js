const mutations = {
  setPlayingState(state, playing) {
    state.playing = playing
  },
  setSequenceList(state, list) {
    state.sequenceList = list
  },
  setPlaylist(state, list) {
    state.playlist = list
  },
  setPlayMode(state, mode) {
    state.playMode = mode
  },
  setCurrentIndex(state, index) {
    state.currentIndex = index
  },
  setFullScreen(state, fullScreen) {
    state.fullScreen = fullScreen
  },
  setFavoriteList(state, favoriteList) {
    state.favoriteList = favoriteList
  },
  setLyric(state, {
    song,
    lyric
  }) {
    state.sequenceList.map(item => {
      if (item.id === song.id) {
        item.lyric = lyric
      }
    })
  }
}

export default mutations
