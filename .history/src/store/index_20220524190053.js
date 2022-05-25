// src/store/index.js

import { createStore } from 'vuex'

export default createStore({
  state: {
    // 全局 player
    globalPlayer: "",
    visualization: "",
  },
  getters: {
  },
  // mutations用于变更 state 中的数据
  mutations: {
    getPlayer(state, parameter) {
      console.log(parameter);
      state.globalPlayer = parameter;
    },
    getVisualization(state, parameter) {
      console.log(parameter);
      state.visualization = parameter;
    },
  },
  actions: {
  },
  modules: {
  }
})
