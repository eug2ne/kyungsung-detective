<template>
  <nav>
    <button class="navbar" id="return">
      <a href="main.html"><img src="../assets/refresh.png" alt="돌아가기"></a>
    </button>
    <ul class="navbar">
      <li class="navbar" id="tutorial">튜토리얼<a href=""></a></li>
      <li @mouseover="mouseOverHint" @mouseleave="mouseLeaveHint" class="navbar" id="hint">힌트<a href=""></a></li>
    </ul>
  </nav>
  <nav v-if="showHintDropdown" id="hint-dropdown">
    <ul>
      <li><a href="#"></a></li>
      <li><a href="#"></a></li>
      <li><a href="#"></a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      showDropdown: false
    }
  },
  methods: {
    mouseOverHint() {
      // show hintDropdown
      this.showDropdown = true
    },
    mouseLeaveHint() {
      // hide hintDropdown
      this.showDropdown = false
    }
  }
}
</script>

<style scoped>
nav {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

a {
  display: inherit;
  width: inherit;
  height: inherit;
}

ul {
  align-self: flex-end;
  margin-bottom: 10px;
  display: flex;
  align-items: flex-end;
}

ul .navbar {
  font-size: 25px;
  padding: 10px 20px;
  position: relative;
  text-align: center;
  display: flex;
  transition: 0.4%;
}
</style>
