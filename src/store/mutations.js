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
    state.playStata = flag
  },
  setPlayModeType(state) {
    let type = (state.playModeType + 1) % 4
    type = type === 0 ? 1 : type
    state.playModeType = type
    return type
  }
}
