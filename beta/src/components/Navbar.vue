<template>
  <nav>
    <div class="invisible-box" />
    <button class="navbar icon" id="reset" @click="this.emitter.emit('reset')">
      <img src="../assets/refresh.png" alt="새로고침" />
    </button>
    <div class="between-box" />
    <ul class="navbar">
      <li>
        <p class="pixel-borders--2" @click="this.$emit('toContent', 'game')">맵</p>
      </li>
      <li>
        <p class="pixel-borders--2" @click="this.$emit('toContent', 'inventory')">인벤토리</p>
      </li>
      <li>
        <p class="pixel-borders--2" @click="this.$emit('toContent', 'cluenote')">단서노트</p>
      </li>
      <li>
        <p class="pixel-borders--2" @click="this.$emit('toContent', 'quiz')">단서판서</p>
      </li>
    </ul>
    <div class="invisible-box" />
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  emits: [ 'toContent' ]
};
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

.router-link-exact-active p, p:hover {
  color: black;
  text-shadow: 2px 2px rgba(255, 255, 255, 0.7);
  background: white;
  line-height: 75px;
  position: relative;
  bottom: 0;
  font-size: 28px;
}
</style>
