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
    const currSong = state.songs.filter(item => item.id !== songs.id)
    // 如果传入的数组,整体添加到前面
    if (songs.length > 1) {
      songs.forEach(song => {
        currSong.push(song)
      })
      // 否则添加到最前面
    } else {
      currSong.unshift(songs[0])
    }
    state.songs = currSong
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
