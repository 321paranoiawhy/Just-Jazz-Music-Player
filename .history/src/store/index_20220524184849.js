// src/store/index.js

import { createStore } from 'vuex'

export default createStore({
  state: {
    // 全局 player
    globalPlayer,
  },
  getters: {
  },
  // mutations用于变更 state 中的数据
  mutations: {
    getPlayer(state, parameter) {
      state.globalPlayer = parameter;
    },
  },
  actions: {
  },
  modules: {
  }
})
