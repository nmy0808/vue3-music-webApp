import playModeType from './play-mode-type'
import playingState from './playing-state'

export default {
  fullScreen: false,
  miniPlayer: false,
  playStata: playingState.PAUSE,
  playModeType: playModeType.SHUNXU,
  matrix: 'none',
  songs: [],
  currentIndex: 0,
  currentLyric: [],
  currentTotalTime: '',
  // currentTime: '',
  currentTime: 0,
  currentPercent: 0,
  favoriteList: [],
  historyList: []
}
