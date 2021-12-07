import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'

// eventbus
const emitter = mitt()
const app = createApp(App).use(router)
app.mount('#app')
app.config.globalProperties.emitter = emitter
