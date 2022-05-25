// src/store/index.js
// vuex 组件间传值 (状态管理)
import { createStore } from 'vuex'

export default createStore({
  state: {
    // 全局 player
    globalPlayer: "",
    // 全局 可视化函数
    globalVisualization: "",
  },
  getters: {
  },
  // mutations用于变更 state 中的数据
  mutations: {
    // 获取 全局 player
    getGlobalPlayer(state, parameter) {
      state.globalPlayer = parameter;
    },
    // 获取 全局 可视化函数
    getGlobalVisualization(state, parameter) {
      state.globalVisualization = parameter;
    },
  },
  actions: {
  },
  modules: {
  }
})
