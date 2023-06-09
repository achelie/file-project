import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "@/styles/common.scss"
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import mitt from "mitt"
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.config.globalProperties.$mitt = mitt();

app.mount('#app')