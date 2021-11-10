import { createApp } from 'vue'
import Quiz from './Quiz.vue'
import mitt from 'mitt'

// eventbus
const emitter = mitt()
const quiz = createApp(Quiz)
quiz.config.globalProperties.emitter = emitter
quiz.mount('#Quiz')