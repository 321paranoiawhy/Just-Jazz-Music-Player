import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import musicData from '../public/data/music.json'
console.log(musicData);
createApp(App).use(store).use(router).use(musicData).mount('#app')
