<template>
  <Navbar>
    <li><router-link :to="{ name: 'Map' }">맵</router-link></li>
    <li><router-link :to="{ name: 'Inventory' }">인벤토리</router-link></li>
    <li><router-link :to="{ name: 'Cluenote' }">단서노트</router-link></li>
    <li><router-link :to="{ name: 'Quiz', params: {quiz_id:'quiz_1'} }">단서판서</router-link></li>
  </Navbar>
  <router-view/>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'app',
  components: { Navbar }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  font-size: 25px;
  padding: 10px 20px;
  position: relative;
  text-align: center;
  display: flex;
  transition: 0.4%;
  cursor: pointer;
}
</style>
