import { createRouter, createWebHashHistory } from 'vue-router'
import Game from '../views/Game.vue'
import Home from '../views/Home.vue'
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
    path: '/Map',
    name: 'Map',
    params: [ 'user_id' ],
    props: true,
    component: Game
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