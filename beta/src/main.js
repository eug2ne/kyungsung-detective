import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'

// pinia global-state store
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
// eventbus
const emitter = mitt()
const app = createApp(App).use(router)

app.config.globalProperties.emitter = emitter
app.use(pinia)
app.mount('#app')