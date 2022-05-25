// src/store/index.js

import { createStore } from 'vuex'

export default createStore({
  state: {
    // 全局 player
    globalPlayer: "",
    // 可视化函数
    visualization: "",
  },
  getters: {
  },
  // mutations用于变更 state 中的数据
  // this.$store.state.visualization
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
