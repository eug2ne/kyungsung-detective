<template>
  <Navbar>
    <li><router-link :to="{ name: 'Inventory' }">인벤토리</router-link></li>
    <li><router-link :to="{ name: 'Cluenote' }">단서노트</router-link></li>
    <li><router-link :to="{ name: 'Quiz' }">단서판서</router-link></li>
  </Navbar>
  <router-view/>

  <Game/>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Game from './views/Game.vue'

export default {
  name: 'app',
  components: { Navbar, Game }
}
</script>

<style>
body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}
</style>
