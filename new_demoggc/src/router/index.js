import { createRouter, createWebHashHistory } from 'vue-router'
import Game from '../views/Game.vue'
import Quiz from '../views/Quiz.vue'
import Cluenote from '../views/Cluenote.vue'
import Inventory from '../views/Inventory.vue'
import Tutorial from '../views/Tutorial.vue'

const routes = [
  {
    path: '/Map',
    name: 'Map',
    component: Game
  },
  {
    path: '/Quiz/:quiz_id',
    name: 'Quiz',
    component: Quiz,
    props: true
  },
  {
    path: '/Cluenote',
    name: 'Cluenote',
    component: Cluenote
  },
  {
    path: '/Inventory',
    name: 'Inventory',
    component: Inventory
  },
  {
    path: '/Tutorial',
    name: 'Tutorial',
    component: Tutorial
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
