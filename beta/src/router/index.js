import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
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
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/Game/Rules',
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
  history: createWebHistory(),
  routes
})

export default router
