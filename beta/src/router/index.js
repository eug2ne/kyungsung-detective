import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Quiz from '../views/Quiz.vue'
import Cluenote from '../views/Cluenote.vue'
import Inventory from '../views/Inventory.vue'
import Rules from '../views/Rules.vue'
import License from '../views/License.vue'
import Login from '../views/auth/Login.vue'
import SignUp from '../views/auth/SignUp.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Game',
    name: 'Game',
    component: Main,
    children: [
      {
        path: 'Quiz/:_quiz_id',
        name: 'Quiz',
        component: Quiz,
        props: true
      },
      {
        path: 'Cluenote',
        name: 'Cluenote',
        component: Cluenote
      },
      {
        path: 'Inventory',
        name: 'Inventory',
        component: Inventory
      },
      {
        path: '/Rules',
        name: 'Rules',
        component: Rules
      }
    ]
  },
  {
    path: '/License',
    name: 'License',
    component: License
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: SignUp
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
