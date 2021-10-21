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
    state.currentLyric = parseLyric(lyric)
  },
  setLyric(state, lyricObj) {
    const songs = state.songs
    songs.forEach(song => {
      if (song.id === lyricObj.id) {
        song.lyric = parseLyric(lyricObj.lyric)
      }
    })
  },
  removeSong(state, id) {
    // 根据id获取索引
    const delIndex = state.songs.findIndex(song => song.id === id)
    // 根据索引删除歌曲
    state.songs.splice(delIndex, 1)
    // 如果删除的索引在当前播放歌曲索引的前面, 当前播放歌曲的索引需要-1
    if (delIndex < state.currentIndex) {
      state.currentIndex !== 0 && state.currentIndex--
    }
    // 如果歌曲列表内没有音乐了, 当前播放状态为暂停
    if (state.songs.length === 0) {
      state.playStata = playingState.PAUSE
      state.miniPlayer = false
    }
  },
  clearSongs(state) {
    state.songs = []
    state.currentIndex = 0
    state.playStata = playingState.PAUSE
    state.miniPlayer = false
  },
  setCurrentTotalTime(state, time) {
    state.currentTotalTime = time
  },
  setCurrentTime(state, time) {
    state.currentTime = time
  },
  setCurrentPercent(state, val) {
    state.currentPercent = val
  },
  //
  setFavoriteList(state, list) {
    state.favoriteList = list
  },
  addFavorite(state, item) {
    state.favoriteList.push(item)
  },
  clearFavoriteList(state, item) {
    state.favoriteList = []
  },
  removeFavorite(state, id) {
    const currentIndex = state.favoriteList.findIndex(item => item.id === id)
    if (currentIndex !== -1) {
      state.favoriteList.splice(currentIndex, 1)
    }
  },
  setHistoryList(state, list) {
    state.historyList = list
  },
  addHistory(state, song) {
    const currentIndex = state.historyList.findIndex(item => item.id === song.id)
    if (currentIndex !== -1) {
      state.historyList.splice(currentIndex, 1)
    }
    state.historyList.unshift(song)
  },
  clearHistoryList(state, item) {
    state.historyList = []
  },
  removeHistory(state, id) {
    const currentIndex = state.historyList.findIndex(item => item.id === id)
    if (currentIndex !== -1) {
      state.historyList.splice(currentIndex, 1)
    }
  }
}

function clearNoneStr(str) {
  return str.replace(/none/g, '')
}

// 格式化歌词方法
function parseLyric(lrc) {
  const lyrics = lrc.split('\n')
  // [00:00.000] 作曲 : 林俊杰
  // 1.定义正则表达式提取[00:00.000]
  const reg1 = /\[\d*:\d*\.\d*\]/g
  // 2.定义正则表达式提取 [00
  const reg2 = /\[\d*/i
  // 3.定义正则表达式提取 :00
  const reg3 = /\:\d*/i
  // 4.定义对象保存处理好的歌词
  const lyricObj = {}
  lyrics.forEach(function(lyric) {
    // 1.提取时间
    let timeStr = lyric.match(reg1)
    if (!timeStr) {
      return
    }
    timeStr = timeStr[0]
    // 2.提取分钟
    const minStr = timeStr.match(reg2)[0].substr(1)
    // 3.提取秒钟
    const secondStr = timeStr.match(reg3)[0].substr(1)
    // 4.合并时间, 将分钟和秒钟都合并为秒钟
    const time = parseInt(minStr) * 60 + parseInt(secondStr)
    // 5.处理歌词
    const text = lyric.replace(reg1, '').trim()
    // 6.保存数据
    lyricObj[time] = text
  })
  return lyricObj
}
