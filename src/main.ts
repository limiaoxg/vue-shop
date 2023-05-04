import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/main.css'
//基础css全局生效，用到第三方插件
import "normalize.css"
import "vant/lib/index.css"
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
