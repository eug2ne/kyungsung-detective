<template>
  <nav  @keydown.tab.exact.prevent="movePointer()" @keydown.tab.shift.exact.prevent="movePointer(true)">
    <div class="invisible-box" />
    <button class="navbar icon" id="stage_select" @click="this.toggleStageSelect($event)">
      <img src="../assets/refresh.png" alt="새로고침" />
    </button>
    <div class="between-box" />
    <ul class="navbar">
      <li :class="{ 'router-link-exact-active': this.$parent.nav_pointer === 0 }">
        <p class="pixel-borders--2" @click="clickNav(0)">맵</p>
      </li>
      <li :class="{ 'router-link-exact-active': this.$parent.nav_pointer === 1 }">
        <p class="pixel-borders--2" @click="clickNav(1)">인벤토리</p>
      </li>
      <li :class="{ 'router-link-exact-active': this.$parent.nav_pointer === 2 }">
        <p class="pixel-borders--2" @click="clickNav(2)">단서노트</p>
      </li>
      <li :class="{ 'router-link-exact-active': this.$parent.nav_pointer === 3 }">
        <p class="pixel-borders--2" @click="clickNav(3)">단서판서</p>
      </li>
    </ul>
    <div class="invisible-box" />
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  emits: [ 'toContent', 'toggleStageSelect' ],
  methods: {
    movePointer(reverse = false) {
      // move pointer
      if (reverse) {
        if (this.$parent.nav_pointer === 0) {
          this.$parent.nav_pointer = 3
        } else {
          this.$parent.nav_pointer--
        }
      } else {
        if (this.$parent.nav_pointer === 3) {
          this.$parent.nav_pointer = 0
        } else {
          this.$parent.nav_pointer++
        }
      }

      this.$emit('toContent')
    },
    clickNav(pointer) {
      // set pointer to given value
      this.$parent.nav_pointer = pointer

      this.$emit('toContent')
    },
    toggleStageSelect(event) {
      // rotate stage-select icon
      event.target.classList.add('rotate')
      setTimeout(() => {
        event.target.classList.remove('rotate')
      }, 1000)
      
      // toggle stage-select popup
      this.$emit('toggleStageSelect')
    }
  }
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
  animation-duration: 2s;
}

.rotate {
  transform: rotate(-360deg);
  transition-duration: 1s;
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
