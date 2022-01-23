<template>
  <nav ref="navbar" @scroll="scroll">
    <button class="navbar" id="terminate">
      <img src="../assets/refresh.png" alt="">
    </button>
    <ul class="navbar">
      <slot></slot>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    scroll(event) {
      this.$refs.navbar.style.display = 'sticky'
      this.$refs.navbar.style.top = event.scrollY
    }
  }
}
</script>

<style>
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background-color: #84C0D5;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
}

ul {
  position: relative;
  align-self: flex-end;
  display: flex;
  align-items: flex-end;
}

li {
  text-decoration: none;
  font-size: 25px;
  text-decoration: none;
  color: #3B2F2C;
  padding: 10px 20px;
  position: relative;
  text-align: center;
  display: flex;
  transition: 0.4%;
  cursor: pointer;
}

a {
  text-decoration: none;
  color: #3B2F2C;
}
</style>
