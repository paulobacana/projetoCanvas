import { createApp } from 'vue'
import './styles/style.css'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'

createApp(App).use(createPinia()).use(router).mount('#app');