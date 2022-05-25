// src/store/index.js

import { createStore } from 'vuex'

export default createStore({
  state: {
    // 全局 player
    globalPlayer: "",
    // 可视化函数
    globalVisualization: "",
    globalCanvas: "",
  },
  getters: {
  },
  // mutations用于变更 state 中的数据
  // this.$store.state.visualization
  mutations: {
    getGlobalPlayer(state, parameter) {
      console.log(parameter);
      state.globalPlayer = parameter;
    },
    getGlobalVisualization(state, parameter) {
      console.log(parameter);
      state.visualization = parameter;
    },
    getGlobalCanvas(state, parameter) {
      console.log(parameter);
      state.globalCanvas = parameter;
    },
  },
  actions: {
  },
  modules: {
  }
})
