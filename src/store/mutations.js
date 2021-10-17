export default {
  setFullScreen(state, flag) {
    state.fullScreen = flag
    if (!flag) {
      state.miniPlayer = true
    } else {
      state.miniPlayer = false
    }
  }
}
