import './assets/main.css'

import { createApp } from 'vue'

import { createPinia } from 'pinia' //Pinia（Vue 官方推荐的状态管理库）

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
