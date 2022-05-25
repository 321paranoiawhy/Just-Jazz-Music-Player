import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import musicData from './data/music.json'

createApp(App).use(store).use(router).mount('#app')
