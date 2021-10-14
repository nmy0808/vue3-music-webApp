import { createStore } from 'vuex'

export default createStore({
  state: {
    isShow: false,
    age: 19
  },
  getters: {},
  mutations: {
    addAge(state) {
      state.age++
    },
    switchShow(state) {
      state.isShow = !state.isShow
    }
  },
  actions: {}
})
