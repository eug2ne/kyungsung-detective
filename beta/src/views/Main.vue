<template>
  <div id="router-view" class="pixel-borders--1">
    <Navbar/>
    <div class="contents">
      <Game v-show="this.show_Game"/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Game from './Game.vue'

export default {
  name: 'Main',
  components: { Navbar, Game },
  computed: {
    show_Game() {
      if (this.$route.path == '/Game') {
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

.contents {
  margin-top: 10px;
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