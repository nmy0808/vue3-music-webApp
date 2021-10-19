import playingState from './playing-state'

export default {
  setFullScreen(state, flag) {
    state.fullScreen = flag
    if (!flag) {
      state.miniPlayer = true
    } else {
      state.miniPlayer = false
    }
  },
  setPlayState(state, flag) {
    if (flag === playingState.PLAY) {
      state.playStata = playingState.PLAY
    }
    if (flag === playingState.PAUSE) {
      state.playStata = playingState.PAUSE
    }
  },
  togglePlayModeType(state) {
    let type = (state.playModeType + 1) % 4
    type = type === 0 ? 1 : type
    state.playModeType = type
    return type
  },
  setMatrix(state, val) {
    state.matrix = clearNoneStr(val)
  },
  clearSongs(state) {
    state.songs = []
  },
  setSongs(state, songs) {
    state.songs = songs
  },
  setSong(state, song) {
    const currSongIndex = state.songs.findIndex(item => item.id === song.id)
    // 如果播放列表有这首歌,index指向当前歌曲
    if (currSongIndex !== -1) {
      state.currentIndex = currSongIndex
      return
    }
    //  反之插入到列表最前面, index为0
    state.currentIndex = 0
    state.songs.unshift(song)
  },
  setCurrentIndex(state, index) {
    state.currentIndex = index
  },
  setCurrentLyric(state, lyric) {
    state.currentLyric = lyric
  },
  setLyric(state, lyricObj) {
    const songs = state.songs
    songs.forEach(song => {
      if (song.id === lyricObj.id) {
        song.lyric = lyricObj.lyric
      }
    })
  }
}

function clearNoneStr(str) {
  return str.replace(/none/g, '')
}
