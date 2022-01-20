<template>
  <Navbar>
    <li class="nav"><router-link :to="{ name: 'Map' }">맵</router-link></li>
    <li class="nav"><router-link :to="{ name: 'Inventory' }">인벤토리</router-link></li>
    <li class="nav"><router-link :to="{ name: 'Cluenote' }">단서노트</router-link></li>
    <li class="nav"><router-link :to="{ name: 'Quiz', params: {quiz_id:'5pSYFHRok3Es4xw6XWcC', user_id:'admin2'} }">단서판서</router-link></li>
  </Navbar>
  <div class="view">
    <router-view/>
  </div>
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

.view {
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-self: center;
  justify-items: center;
  align-items: center;
}
</style>
