<template>
  <div id="router-view" class="pixel-borders--1">
    <nav>
      <div class="invisible-box" />
      <button class="navbar icon" id="terminate">
        <img src="../assets/refresh.png" alt="새로고침" />
      </button>
      <div class="between-box" />
      <ul class="navbar">
        <li>
          <router-link :to="{ name: 'Map' }">
            <p class="pixel-borders--2">맵</p>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Inventory' }">
            <p class="pixel-borders--2">인벤토리</p>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Cluenote' }">
            <p class="pixel-borders--2">단서노트</p>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Quiz', params: { quiz_id: '5pSYFHRok3Es4xw6XWcC' } }">
            <p class="pixel-borders--2">단서판서</p>
          </router-link>
        </li>
      </ul>
      <div class="invisible-box" />
    </nav>
    <router-view/>
  </div>
</template>

<script>
import Game from './Game.vue'

export default {
  name: 'Main',
  components: { Game },
  computed: {
    show_Game() {
      if (this.$route.path == '/Map') {
        return true
      } else {
        return false
      }
    }
  }

}
</script>

<style scoped>
nav {
  position: sticky;
  width: calc(935px + 50px);
  height: 80px;
  display: flex;
  margin: 15px 0 0 0;
  z-index: 1;
}

.icon {
  margin: 15px;
  width: 50px;
  height: 50px;
}

.between-box {
  flex-grow: 1;
}

.invisible-box {
  width: 25px;
  height: 80px;
}

ul {
  align-self: flex-end;
  display: flex;
  align-items: flex-end;
}

li {
  padding: 0;
}

p {
  color: white;
  text-shadow: 2px 2px #000;
  padding: 0 20px;
  background: hsl(0, 0%, 60%);
  border-radius: 24px 24px 0 0;
  border-width: 5px;
  border-bottom: none;
  line-height: 70px;
  position: relative;
  bottom: 5px;
  right: 5px;
  font-size: 28px;
}

.router-link-exact-active p {
  color: black;
  text-shadow: 2px 2px rgba(255, 255, 255, 0.7);
  background: white;
  line-height: 75px;
  position: relative;
  bottom: 0;
  font-size: 28px;
}
</style>