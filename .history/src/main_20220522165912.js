import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
createApp(App).use(store).use(router).mount('#app')
// EventBus
// import Vue from 'vue';
// const EventBus = new Vue();
Vue.prototype.$EventBus = new Vue();