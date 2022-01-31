import { createRouter, createWebHashHistory } from 'vue-router'
import Game from '../views/Game.vue'
import Quiz from '../views/Quiz.vue'
import Cluenote from '../views/Cluenote.vue'
import Inventory from '../views/Inventory.vue'
import Rules from '../views/Rules.vue'
import Home from '../views/Home.vue'
import License from '../views/License.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Map',
    name: 'Map',
    component: Game
  },
  {
    path: '/Quiz/:quiz_id/:user_id',
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
    path: '/Rules',
    name: 'Rules',
    component: Rules
  },
  {
    path: '/License',
    name: 'License',
    component: License
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
